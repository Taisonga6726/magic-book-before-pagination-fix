

# Шрифт Marck Script для полей ввода + каталога

## Изменения

### 1. `src/index.css`
- `.font-handwriting`: `'Dancing Script'` → `'Marck Script'`

### 2. `src/components/MagicBook.tsx`
- Поле ввода слова (строка 101): добавить `font-handwriting` вместо `font-book` → шрифт Marck Script для поля «Слово»

### 3. `src/components/CatalogView.tsx`
- Уже использует `font-handwriting` — подхватит автоматически

Итого: 2 файла, 2 правки.

