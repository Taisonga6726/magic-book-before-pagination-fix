

# Усилить растушёвку + точнее подстроить цвета canvas

## Что уже сделано
- CSS-маска на контейнере книги: `radial-gradient(ellipse 90% 88% at center, black 55%, transparent 100%)`
- Canvas-цвета сдвинуты в тёплые тона

## Проблема
Маска слишком мягкая — переход от чёрного к прозрачному начинается только с 55%, и эллипс 90%×88% почти покрывает весь контейнер, оставляя узкую полоску растушёвки. Границы всё ещё видны.

## Что поменять

### 1. `src/components/MagicBook.tsx` — агрессивнее маска
Уменьшить эллипс и сдвинуть начало прозрачности раньше:
```css
mask-image: radial-gradient(ellipse 80% 82% at center, black 40%, transparent 90%);
```
Это даст широкую зону растушёвки (от 40% до 90%) — края книги плавно растворятся.

### 2. `src/components/ui/dynamic-wave-canvas-background.tsx` — ещё теплее тона
Увеличить `warmth` и `purpleAccent`, уменьшить `blueAccent`, чтобы базовый тон canvas был ближе к тёмно-бордовому краю book.png:
- `warmth`: `0.06` → `0.10`
- `purpleAccent`: коэффициент `1.0` → `1.3` в красном канале
- `baseVal`: чуть светлее `0.08` → `0.10`

### 3. Дополнительно — gradient overlay вокруг книги
Добавить `<div>` с `pointer-events-none` поверх контейнера книги с box-shadow `inset 0 0 80px 40px rgba(0,0,0,0.7)` — внутренняя тень по краям ещё сильнее сгладит границу.

## Файлы
- `src/components/MagicBook.tsx` — маска + inset shadow overlay
- `src/components/ui/dynamic-wave-canvas-background.tsx` — подстройка RGB

2 файла, компактные правки.

