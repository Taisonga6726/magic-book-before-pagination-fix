

## Анализ текущего состояния

Большая часть требований уже выполнена:
- ✅ `onPaste` только на textarea (строка 333)
- ✅ Live preview правой страницы без обработчиков paste
- ✅ Нумерация единая: новая запись добавляется через `setEntries(prev => [...prev, ...])`, в рендере используется `globalIdx + 1` и `entries.length + 1` для черновика. Запись со скрином ничем не отличается от обычной.
- ✅ FinalBook рендерит images между description и реакциями (предыдущий шаг)

Осталось два точечных фикса.

## Изменения в `src/components/MagicBook.tsx`

### Фикс 1. Фокус при редактировании → в textarea
Строка 254: заменить
```ts
setTimeout(() => wordInputRef.current?.focus(), 50);
```
на
```ts
setTimeout(() => descRef.current?.focus(), 50);
```
Чтобы при «редактировать» Ctrl+V сразу работал.

### Фикс 2. Кнопка «×» для каждого `pastedImages` в live preview
Строки 446–448 — обернуть `<img>` в относительный контейнер с кнопкой удаления:

```tsx
{pastedImages.map((src, k) => (
  <div key={k} style={{ position: "relative", margin: "8px 0" }}>
    <img src={src} alt="" style={{ display: "block", maxWidth: "100%", height: "auto" }} />
    <button
      type="button"
      onClick={() => setPastedImages(prev => prev.filter((_, idx) => idx !== k))}
      aria-label="Удалить изображение"
      style={{
        position: "absolute", top: 4, right: 4,
        width: 22, height: 22, borderRadius: "50%",
        background: "rgba(0,0,0,0.6)", color: "#fff",
        border: "none", cursor: "pointer",
        fontSize: 14, lineHeight: 1, padding: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >×</button>
  </div>
))}
```

Кнопка добавляется **только** в блок `pastedImages` (черновик). Блок `entry.images?.map(...)` (строки 428–430, сохранённые записи) **не трогаем**. `FinalBook.tsx` **не трогаем**.

## Что НЕ меняем
- `renderEntry` структуру и порядок (description → images)
- Логику сохранения, нумерацию, пагинацию, перелистывание, реакции
- Обработчик paste и его область действия
- `FinalBook.tsx`
- Удаление для сохранённых `entry.images`

## Критерии приёмки
- Ctrl+V работает только в textarea (без изменений)
- При «редактировать» курсор сразу в textarea — Ctrl+V работает
- В live preview каждая черновая картинка имеет «×» — клик удаляет её из `pastedImages`
- Сохранённые записи кнопок удаления не имеют
- Нумерация: 33 записей + «Скрин от Ольги» = 34 (логика уже корректна)
- FinalBook, реакции, перелистывание — без изменений

