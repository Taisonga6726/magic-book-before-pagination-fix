

## Цель
Поднять блок «Всего слов + реакции» на финальном экране ближе к надписи «AI CREATOR» на `final-screen.png`. Убрать пустой зазор.

## Изменение
Файл: `src/components/FinalScreen.tsx`, строка 26.

Заменить:
```tsx
<div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white pointer-events-none">
```
на:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-12 flex items-center gap-6 text-white pointer-events-none">
```

Привязка к центру (`top-1/2 + translate-y-12`) даёт стабильную позицию относительно центрированного `final-screen.png` (`object-contain`) — блок встаёт прямо под «AI CREATOR» независимо от высоты экрана. Если по факту окажется чуть выше/ниже идеала — подкрутим одно число (`translate-y-8` / `translate-y-16` / `translate-y-20`).

## Что НЕ трогаем
- Скрины, вставку, удаление, записи, нумерацию, логику реакций
- Верстку книги, MagicBook, FinalBook, ControlBar
- Стили блока (градиент, blur, размеры, эмодзи, тексты)
- Изображение `final-screen.png` и его позиционирование

## Критерии приёмки
- Блок визуально под «AI CREATOR», без пустого зазора
- Стили и содержимое блока не изменились
- Стабильная позиция на разных высотах экрана
- Остальной функционал не затронут

