

# Заменить подпись на загруженное изображение + разнообразить цвета слов

## Изменения

### 1. Подпись — заменить `podpis.jpg` на `image-24.png`
**Файл: `src/assets/podpis.jpg` → `src/assets/podpis.png`**
- Скопировать `user-uploads://image-24.png` в `src/assets/podpis.png`
- В `src/components/MagicBook.tsx` обновить путь на новое изображение
- Оставить `mix-blend-mode: screen` для прозрачности тёмного фона

### 2. Плавающие слова — добавить разнообразие неоновых цветов
**Файл: `src/components/FloatingWords.tsx`**
- Добавить новые цвета: `"cyan"`, `"gold"`, `"green"` — помимо `purple` и `blue`
- Распределить цвета по словам для разнообразия

**Файл: `src/index.css`**
- Добавить новые glow-классы:
  - `.glow-text-cyan` — бирюзовое свечение (hsl 180 100% 60%)
  - `.glow-text-gold` — золотое свечение (hsl 45 100% 55%)
  - `.glow-text-green` — зелёное свечение (hsl 140 80% 55%)

