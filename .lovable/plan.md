

## Цель
Опустить блок «Всего слов + реакции» немного ниже — под надпись «AI CREATOR» (сейчас он накладывается на неё, должен быть строго под).

## Изменение
Файл: `src/components/FinalScreen.tsx`, строка 26.

Заменить:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-12 flex items-center gap-6 text-white pointer-events-none">
```
на:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 flex items-center gap-6 text-white pointer-events-none">
```

Увеличиваем смещение вниз с `translate-y-12` (≈48px) до `translate-y-32` (≈128px) — блок встанет в красный прямоугольник со скрина, прямо под «AI CREATOR», без наложения.

## Что НЕ трогаем
- Содержимое и стили блока (градиент «Всего слов», эмодзи, счётчики)
- Изображение `final-screen.png`
- Скрины, записи, реакции, нумерацию, MagicBook, FinalBook, ControlBar

## Критерии приёмки
- Блок расположен ниже надписи «AI CREATOR», как на референсе
- Нет наложения на текст
- Композиция центрирована, стабильна на разных высотах

