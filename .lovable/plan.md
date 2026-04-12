

# Тестируем два шрифта: сначала Cormorant Garamond, потом Marck Script

## Что делаем

1. **Убираем блок превью 4 шрифтов** — он больше не нужен
2. **Применяем Cormorant Garamond italic** для слов (вместо Great Vibes) — и для слов, и для описания, но слово крупнее и bold italic
3. **Делаем нумерацию заметнее** — `text-sm opacity-50` вместо `text-xs opacity-35`

После того как посмотрите результат — скажете «дальше» или «Marck Script», и я переключу на второй вариант для сравнения.

## Изменения

### `src/components/MagicBook.tsx`
- Удалить блок превью шрифтов (временная секция с 4 вариантами)
- Слово: заменить `font-calligraphy` (Great Vibes) на `font-book italic font-bold text-xl`
- Нумерация: `text-xs opacity-35` → `text-sm opacity-50`
- Live preview: аналогично — `font-book italic font-bold text-xl`

Один файл, минимальные правки.

