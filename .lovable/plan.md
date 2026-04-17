

## Цель
Paste изображений (Ctrl+V) в описание с live preview и стабильной пагинацией. Картинки хранятся отдельно от текста (`images: string[]`), description остаётся plain text. Без innerHTML, без новых библиотек.

## План правок

### 1. `src/pages/Index.tsx`
В `interface Entry` добавить опциональное поле:
```ts
images?: string[]
```
Старые записи в localStorage остаются валидными.

### 2. `src/components/MagicBook.tsx`

**State:**
```ts
const [pastedImages, setPastedImages] = useState<string[]>([]);
```

**Paste-обработчик** на textarea описания:
- Перебрать `e.clipboardData.items`. Для `item.type.startsWith("image/")`:
  - `e.preventDefault()` (только если есть image-items)
  - `item.getAsFile()` → `FileReader.readAsDataURL` → `setPastedImages(prev => [...prev, dataUrl])`
- Текст пастится штатно (preventDefault только при наличии image-item).

**Сохранение / редактирование:**
- `handleSave`: записать `images: pastedImages` в Entry, затем `setPastedImages([])`.
- `handleEdit`: `setPastedImages(entry.images ?? [])`.

**Live preview (правая страница):**
- Мемоизированный draftEntry:
  ```ts
  const draftEntry = useMemo(
    () => ({ word: currentWord, description: currentDesc, images: pastedImages }),
    [currentWord, currentDesc, pastedImages]
  );
  ```
- Передать `draftEntry` в существующий `renderEntry(...)` — никаких структурных правок renderEntry.

**В `renderEntry` — единственная вставка**, после блока описания:
```tsx
{entry.images?.map((src, i) => (
  <img key={i} src={src} alt=""
    style={{display:"block", maxWidth:"100%", height:"auto", margin:"8px 0"}} />
))}
```

**Measure / пагинация (без innerHTML):**
- В существующем measure-цикле для каждой записи после текстовых нод:
  ```ts
  (entry.images ?? []).forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.style.cssText = "display:block;max-width:100%;height:auto;margin:8px 0";
    container.appendChild(img);
  });
  ```
- Перед измерением высот:
  ```ts
  const imgs = Array.from(measureRoot.querySelectorAll("img"));
  await Promise.all(imgs.map(img =>
    img.decode ? img.decode().catch(()=>{}) :
    new Promise<void>(r => { if (img.complete) r(); else { img.onload = img.onerror = () => r(); }})
  ));
  ```
- Зависимости пересчёта оставить как сейчас + добавить `pastedImages` (для live preview правой страницы).

### 3. `src/components/FinalBook.tsx`

- В `renderEntry` **между описанием и реакциями** добавить тот же блок с `entry.images?.map(...)`.
- В measure-цикле — те же `createElement("img")` + ожидание `decode()` перед расчётом, без innerHTML.
- Реакции остаются последним блоком → визуально окажутся под изображениями.

## Что НЕ трогаем
Координаты left/width страниц, textAlign:"left", lineHeight, шрифты, ink-эффект, перелистывание, реакции, валидацию дубликатов, ControlBar, порядок renderEntry.

## Технические нюансы
- Хранение: data URL в localStorage (~5MB лимит, для теста ок).
- Множественный paste — накопительно.
- Без кнопок удаления картинок (правило «no manual delete buttons»).
- `useMemo` для draftEntry → стабильная ссылка, нет лишних пересчётов пагинации.
- `decode()` перед measure → нет визуальных скачков при первой загрузке.

## Критерии приёмки
- Ctrl+V → картинка сразу в live preview правой страницы.
- Save → визуально без изменений (картинка переезжает из `pastedImages` в `entry.images`).
- Edit → картинки восстановлены в `pastedImages`.
- FinalBook: description → images → реакции.
- Пагинация стабильна, без скачков.
- Нет innerHTML / dangerouslySetInnerHTML.
- Существующая вёрстка и логика не задеты.

