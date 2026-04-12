

# Радужная анимация кнопок с полупрозрачным фоном

## Изменения — 1 файл: `src/index.css`

Заменить текущие стили `.neon-btn-gold` (строки 127-147) на версию с rainbow-анимацией:

```css
.neon-btn-gold {
  position: relative;
  display: inline-block;
  padding: 5px 18px;
  font-family: 'Marck Script', cursive;
  font-size: 1.15rem;
  color: #fff;
  background: transparent;
  border: none;
  border-radius: 20px;
  z-index: 0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px hsl(265 90% 70% / 0.8), 0 0 25px hsl(265 80% 60% / 0.5);
}

/* Радужная рамка — псевдоэлемент под кнопкой */
.neon-btn-gold::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  background-size: 400% 400%;
  animation: rainbow 8s linear infinite;
  z-index: -1;
}

/* Полупрозрачный внутренний фон */
.neon-btn-gold::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background: rgba(20, 10, 40, 0.4);
  z-index: -1;
}

.neon-btn-gold:hover::after {
  background: rgba(20, 10, 40, 0.55);
}

@keyframes rainbow {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}
```

Hover-стили `.neon-btn-gold:hover` (строки 141-147) — удалить старые, оставить только `::after` hover выше.

Никаких изменений в JSX — кнопки уже используют класс `.neon-btn-gold`.

