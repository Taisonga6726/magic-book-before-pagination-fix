

# Удалить строку "Реакции" + все предыдущие неприменённые изменения

## Изменения

### Из предыдущих планов (ещё не применены):

**1. Золотое свечение для "сохранить | редактировать" (`MagicBook.tsx` + `index.css`)**
- `text-sm` → `text-base`, золотой цвет `#c9a227` + textShadow glow
- Новый класс `.action-text-gold` в CSS

**2. Летающие слова на передний план + неон (`FloatingWords.tsx` + `index.css` + `Index.tsx`)**
- z-index: слова `z-30`, книга `z-40`
- Размер шрифта 20-36px, opacity 0.7+
- Неоновая пульсация `neon-pulse` keyframes

### Новое:

**3. Удалить строку "Реакции" (`MagicBook.tsx`, строка 129)**
- Убрать `<div className="mt-2 text-xs" ...>Реакции</div>`

## Файлы
- `src/components/MagicBook.tsx` — золотые кнопки, убрать "Реакции"
- `src/components/FloatingWords.tsx` — увеличить, z-30, неон
- `src/index.css` — `.action-text-gold`, `neon-pulse`, усилить `.glow-text-*`
- `src/pages/Index.tsx` — книга z-40

