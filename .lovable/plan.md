

## Цель
Перенести превью вставленных картинок и кнопку «×» с правой страницы (preview) на левую страницу (форму ввода) — прямо под textarea description. Правая страница больше не показывает черновик изображения. Это убирает «лишний» черновик-запись справа (то самое, что пользователь воспринял как нежелательную тестовую запись).

## Изменения в `src/components/MagicBook.tsx`

### 1. Левая страница — добавить блок миниатюр под textarea
В блоке формы (строка 338, сразу после `</div>` writing-zone и перед строкой действий «сохранить | редактировать») вставить рендер `pastedImages` с кнопкой удаления:

```tsx
{pastedImages.length > 0 && (
  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
    {pastedImages.map((src, k) => (
      <div key={k} style={{ position: "relative" }}>
        <img src={src} alt="" style={{ display: "block", maxHeight: 64, width: "auto", borderRadius: 4 }} />
        <button
          type="button"
          onClick={() => setPastedImages(prev => prev.filter((_, idx) => idx !== k))}
          aria-label="Удалить изображение"
          style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18,
            borderRadius: "50%", background: "rgba(0,0,0,0.7)", color: "#fff",
            border: "none", cursor: "pointer", fontSize: 12, lineHeight: 1, padding: 0,
            display: "flex", alignItems: "center", justifyContent: "center" }}
        >×</button>
      </div>
    ))}
  </div>
)}
```

Размер миниатюр (`maxHeight: 64`) подобран чтобы поместиться в зону формы без скролла (`overflow:hidden` на контейнере уже стоит — лишнее обрежется, но при 1–3 картинках видно всё).

### 2. Правая страница — убрать рендер `pastedImages`
Строки 446–475 (блок `pastedImages.map(...)` внутри live-черновика) — **удалить полностью**. Live-черновик слова и описания справа остаётся как есть (`InkWriteEffect`), но без картинок. Картинка появится справа только после «сохранить» через существующий блок `entry.images?.map(...)` (строки 428–430).

### 3. Measure-логика пагинации — без изменений
Measure уже учитывает `entries[i].images` (строки 151–156). Черновик `pastedImages` в measure не участвовал и сейчас не участвует — корректно.

## Что НЕ трогаем
- `renderEntry` (структуру и порядок description → images для сохранённых записей)
- `handleSave`, `handleEdit`, `handleDescPaste`
- Нумерацию (`globalIdx + 1`, `entries.length + 1`)
- Пагинацию, перелистывание, реакции, FinalBook, ControlBar

## Критерии приёмки
- Ctrl+V в textarea → миниатюра появляется **слева, под полем описания**
- На правой странице черновика картинки **нет**
- Кнопка «×» на миниатюре удаляет картинку из `pastedImages`
- После «сохранить» запись со словом + описанием + картинкой появляется справа (через существующий рендер)
- Нумерация продолжается корректно (33 → 34)
- В FinalBook запись отображается с картинкой и реакциями
- Скроллов нет, пагинация и перелистывание не сломаны

