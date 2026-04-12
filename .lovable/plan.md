

# Убрать цветной фон кнопок, оставить лёгкую анимацию свечения

## Проблема
Кнопки «сохранить» и «редактировать» имеют яркий цветной градиентный фон (розово-фиолетовый) через `::before`. Нужно: прозрачный фон без цвета, только лёгкая анимация свечения вокруг кнопки, тёмный шрифт.

## Изменения — 1 файл: `src/index.css`

### `::before` (строки 145-156)
Убрать цветной градиентный фон, заменить на прозрачный с тонкой светящейся рамкой:
```css
.neon-btn-gold::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  background: transparent;
  border: 1.5px solid hsl(265 60% 65% / 0.4);
  z-index: -1;
  box-shadow: 0 0 8px 1px hsl(265 70% 60% / 0.3), 0 0 20px 2px hsl(300 60% 55% / 0.15);
  animation: glow-pulse 4s ease-in-out infinite;
}
```

### Основной стиль `.neon-btn-gold` (строка 142)
Уменьшить свечение drop-shadow:
```css
filter: drop-shadow(0 0 6px hsl(265 70% 65% / 0.3));
```

### Hover-состояния (строки 158-165)
Усилить свечение при наведении, но без цветного фона:
```css
.neon-btn-gold:hover {
  filter: drop-shadow(0 0 10px hsl(265 70% 65% / 0.5));
}
.neon-btn-gold:hover::before {
  box-shadow: 0 0 12px 2px hsl(265 70% 60% / 0.45), 0 0 28px 4px hsl(300 60% 55% / 0.25);
}
```

### Добавить `glow-pulse` анимацию (после `rainbow`)
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px 1px hsl(265 70% 60% / 0.3), 0 0 20px 2px hsl(300 60% 55% / 0.15); }
  50% { box-shadow: 0 0 12px 2px hsl(265 70% 60% / 0.45), 0 0 28px 3px hsl(300 60% 55% / 0.25); }
}
```

Анимация `rainbow` может остаться (не используется), или удалить для чистоты.

