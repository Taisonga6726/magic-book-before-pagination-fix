

# Заретушировать границы баннера + магическое неоновое свечение слов

## 1. Границы баннера — `src/components/MagicBook.tsx`

Текущая маска `ellipse 90% 90%` и тень `120px 60px` недостаточны, особенно слева. Усилим:

- Маска: расширить до `ellipse 95% 95%`, solid-зону до `55%`
- Inset shadow: увеличить до `150px 80px` с opacity `0.9`
- Добавить второй overlay-слой с `linear-gradient` по краям (left 5% fade, right 5% fade) для дополнительного размытия левой границы

```tsx
maskImage: "radial-gradient(ellipse 95% 95% at center, black 55%, transparent 98%)"
boxShadow: "inset 0 0 150px 80px rgba(0,0,0,0.9)"
```

## 2. Слова — умеренная яркость + магическая анимация свечения

### `src/index.css` — переработать glow-классы
- Снизить яркость: уменьшить opacity всех text-shadow слоёв (0.9→0.5, 0.6→0.3, 0.3→0.15)
- Переработать `neon-pulse` в более мягкую "магическую" анимацию: плавное нарастание и затухание свечения с изменением размера тени, а не просто brightness
- Добавить `@keyframes magic-glow` — плавный пульс свечения через text-shadow (тень расширяется/сужается), без резкого brightness

```css
@keyframes magic-glow {
  0%, 100% {
    filter: brightness(0.9);
    text-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
  }
  50% {
    filter: brightness(1.15);
    text-shadow: 0 0 8px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
  }
}
```

### `src/components/FloatingWords.tsx`
- Снизить базовую opacity с `0.85` до `0.55`
- Заменить анимацию `neon-pulse` на `magic-glow` с более длинным циклом (5-8 секунд)
- Это даст мягкое, ненавязчивое свечение — как магические руны

