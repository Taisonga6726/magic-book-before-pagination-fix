

# План: пересчёт pageBreaks из entries при монтировании

## Проблема
`pageBreaks` инициализируется как `[0]` и пересчитывается только при добавлении новой записи (overflow detection). При загрузке 23 существующих записей из localStorage — все попадают на одну "страницу", переполняя контейнер. Кнопка «далее» не появляется, нумерация сломана.

## Принцип
- `entries` — единственный источник данных
- `pageBreaks` — производная структура, пересчитывается из entries
- Никакой логики сохранения через pageBreaks

## Изменения в MagicBook.tsx

### 1. Добавить useEffect для начального расчёта pageBreaks

При монтировании и при изменении `entries.length` — измерить через скрытый div, сколько записей помещается на каждую страницу:

```tsx
useEffect(() => {
  if (entries.length === 0) {
    setPageBreaks([0]);
    return;
  }

  const container = rightContentRef.current;
  if (!container) return;
  const availableHeight = container.clientHeight;

  // Создать скрытый div для измерения
  const measure = document.createElement("div");
  measure.style.cssText = `
    position:absolute; visibility:hidden; width:${container.offsetWidth}px;
    font-family:inherit; padding:0;
  `;
  container.appendChild(measure);

  const breaks: number[] = [0];
  let currentHeight = 0;

  for (let i = 0; i < entries.length; i++) {
    // Рендерим запись для измерения высоты
    measure.innerHTML = `
      <div style="margin-bottom:8px">
        <div><span style="font-size:1.5rem;font-weight:700">${i+1}.</span>
        <span style="font-size:1.5rem">${entries[i].word}</span></div>
        ${entries[i].description ? `<div style="font-size:1.125rem;margin-left:1.75rem">— ${entries[i].description}</div>` : ""}
      </div>`;
    const h = measure.offsetHeight;

    if (currentHeight + h > availableHeight && i > breaks[breaks.length-1]) {
      breaks.push(i);
      currentHeight = h;
    } else {
      currentHeight += h;
    }
  }

  container.removeChild(measure);
  setPageBreaks(breaks);
  setCurrentPage(breaks.length - 1); // Показать последнюю страницу
}, [entries.length]);
```

### 2. Упростить overflow detection после save

Текущий `useEffect` с `needsOverflowCheck` — оставить как fallback, но теперь основной пересчёт делает useEffect выше. После `handleSave` → `entries.length` меняется → срабатывает полный пересчёт → `currentPage` автоматически переключается на последнюю страницу.

Можно **убрать** отдельный overflow useEffect (строки 80-109) и `needsOverflowCheck` ref — они больше не нужны, т.к. полный пересчёт pageBreaks уже обрабатывает этот случай. Анимацию перелистывания при добавлении запрячем в тот же useEffect: если `breaks.length > pageBreaks.length` — значит создалась новая страница → `playFlipSound()` + `setFlipping(true)`.

### 3. handleSave — без изменений в логике entries

Запись добавляется в конец `entries` через `setEntries(prev => [...prev, ...])`. Это триггерит useEffect пересчёта. Убрать `needsOverflowCheck.current = true` (строка 135).

### 4. Навигация «далее →»

Сейчас показывается только при `hasNextPage` (есть следующая страница). После пересчёта pageBreaks это будет работать корректно — если 23 записи разбиты на 4 страницы, на странице 0-2 будет видна кнопка «далее →».

## Файлы
- `src/components/MagicBook.tsx` — единственный файл

## Что НЕ меняется
- entries, localStorage, Index.tsx
- Отступы, padding, цвета, анимации
- FinalBook.tsx (у него своя измерительная логика)
- Звуки, SpineEffect, InkWriteEffect

