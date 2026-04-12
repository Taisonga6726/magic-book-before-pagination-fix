

# Сменить шрифт описаний на Marck Script

## Проблема
Сейчас слова вводятся шрифтом `Marck Script` (`font-handwriting`), а описания и результаты используют `Cormorant Garamond` (`font-book`). Нужно унифицировать — везде Marck Script.

## Изменения — 1 файл: `src/components/MagicBook.tsx`

### 1. Поле ввода описания (строка 122)
Добавить `font-handwriting` к textarea (уже есть, ОК).

### 2. Результаты на правой странице
- Строка 156: описание записи — заменить `font-book italic` на `font-handwriting`
- Строка 174: live-preview описания — заменить `font-book italic` на `font-handwriting`
- Строка 139: placeholder «Здесь появятся…» — заменить `font-book` на `font-handwriting`
- Строка 184: «каталог →» — заменить `font-book` на `font-handwriting`

### 3. Контейнеры страниц
- Строка 104: левая страница `font-book` → `font-handwriting`
- Строка 135: правая страница `font-book` → `font-handwriting`

Итого: ~6 замен `font-book` → `font-handwriting` в одном файле.

