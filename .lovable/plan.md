

## Цель
Опустить блок «Всего слов + реакции» ещё чуть ниже и убедиться, что он строго по центру по горизонтали (как сейчас, но визуально подровнять).

## Изменение
Файл: `src/components/FinalScreen.tsx`, строка 26.

Заменить:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-40 flex items-center gap-6 text-white pointer-events-none">
```
на:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-48 flex items-center gap-6 text-white pointer-events-none">
```

Смещение вниз увеличиваем с `translate-y-40` (≈160px) до `translate-y-48` (≈192px). Горизонтальное центрирование (`left-1/2 -translate-x-1/2`) сохраняем — оно уже корректное.

## Что НЕ трогаем
- Содержимое и стили блока (градиент «Всего слов», эмодзи, счётчики)
- Изображение `final-screen.png`
- Скрины, записи, реакции, нумерацию, MagicBook, FinalBook, ControlBar

## Критерии приёмки
- Блок ниже текущей позиции, строго по центру
- Нет наложения на текст
- Композиция стабильна на разных высотах

