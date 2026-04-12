

# Приглушить яркость плавающих слов

## Изменения

### `src/components/FloatingWords.tsx`
- Снизить `opacity` с `0.55` до `0.3` (строка 56)

### `src/index.css` — glow-классы
- Уменьшить интенсивность `text-shadow` во всех `.glow-text-*` классах примерно вдвое
- В `@keyframes magic-glow` снизить пиковые значения: `brightness(1.15)` → `brightness(1.05)`, уменьшить spread теней на 50%

