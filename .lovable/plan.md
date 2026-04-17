

## Цель
Лёгкий магический слой ТОЛЬКО в `FinalBook`: свечение из центра, искры, тонкие дуги, усиление при движении курсора. Текст, верстка, логика — без изменений.

## Файлы

### 1. Новый: `src/components/FinalBookMagicFX.tsx`
Изолированный компонент. `position: absolute inset-0`, `pointer-events-none`, `z-index: 5` (между фоном книги и страницами с текстом). Все слои с `mix-blend-mode: screen` — текст не темнеет.

**A. Свечение из центра (CSS)**
- Радиальный градиент: золото `rgba(255,200,80,0.28)` + фиолет `rgba(160,90,255,0.22)`
- `filter: blur(50px)`, анимация `pulse` 4s (opacity 0.7→1, scale 1→1.06)

**B. Тонкие дуги (SVG)**
- 2 эллипса вокруг книги, разные радиусы
- `stroke` золото/фиолет, `stroke-width: 1`, `opacity: 0.2`
- Вращение 25s / 40s linear infinite, в разные стороны

**C. Искры (Canvas)**
- ~25 частиц, спавн вокруг книги
- Дрейф вверх/наружу, размер 1–2px, цвет золото/фиолет/белый, life 1.5–3s, fade-out
- `requestAnimationFrame`, очистка при unmount
- `prefers-reduced-motion` → canvas off

**D. Реакция на курсор**
- `mousemove` на `window`, фильтр по bbox книги
- При движении: 2–3 доп. искры в позиции курсора
- CSS-переменные `--cursor-x/y` → radial-gradient 120px возле курсора (`opacity: 0.25`, screen blend)

### 2. `src/components/FinalBook.tsx`
Две точечные правки, разметка не меняется:
- Импорт `FinalBookMagicFX`
- Вставка `<FinalBookMagicFX />` сразу после `<img src={bookFinalImg} />` и до страниц с текстом

## Что НЕ трогаем
- `MagicBook.tsx` и другие экраны
- Текст, ink-эффект, шрифты, реакции, пагинация, скрины, навигация
- Layout страниц, координаты
- `SpineEffect`, `ControlBar`, `FloatingWords`, фон `HeroWave`, курсор

## Критерии приёмки
- Магия видна только в FinalBook
- Текст читается без потерь контраста
- 60 FPS (мало частиц, low-res canvas)
- Искры реагируют на курсор
- Остальные экраны без изменений

