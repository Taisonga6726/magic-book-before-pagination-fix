

## Цель
1. Добавить яркую неоновую анимацию «энергетического потока» вдоль закладки (центральная синяя лента/корешок) в `FinalBook`.
2. Добавить короткую световую вспышку при клике на все `NeonGlassButton` (и в FinalBook, и на финальном баннере — это одна и та же кнопка).

Текст, страницы, изображения, логику не трогаем.

## Файл 1: `src/components/SpineEffect.tsx` (правка)

Сейчас компонент уже рендерит мягкий вертикальный градиент по корешку. Усилить его до неонового энергопотока:

- Контейнер: расширить до `w-10` (с 8) для лучшей видимости свечения, оставить `pointer-events-none`, `z-20`.
- Заменить текущий «constant spine glow» на 2 слоя:
  - **Базовое свечение ленты**: вертикальная сине-фиолетовая полоса шириной ~6px по центру  
    `background: linear-gradient(to bottom, transparent, rgba(80,120,255,0.6), rgba(160,90,255,0.7), rgba(80,120,255,0.6), transparent)`,  
    `filter: blur(2px) drop-shadow(0 0 8px rgba(120,140,255,0.8))`,  
    `mix-blend-mode: screen`.
  - **Бегущий световой импульс** (новый): узкая яркая полоска (~40px высотой), движущаяся сверху вниз бесконечно:  
    `background: linear-gradient(to bottom, transparent, rgba(180,200,255,0.95), rgba(255,255,255,0.9), rgba(180,200,255,0.95), transparent)`,  
    `filter: blur(3px) drop-shadow(0 0 12px rgba(140,170,255,1))`,  
    `animation: spine-energy-flow 2.8s linear infinite` (translateY от -20% до 120%).
  - **Лёгкая пульсация** базового слоя: `opacity 0.8 ↔ 1` 3s.
- Burst-частицы оставляем как есть (используются при flip).
- Keyframes `spine-energy-flow` и `spine-pulse` объявляем в `<style>` внутри компонента (изолированно).

## Файл 2: `src/components/NeonGlassButton.tsx` (правка)

Добавить короткую световую вспышку при клике:

- Добавить локальный state `flashing: boolean` + ref на счётчик ключей вспышки (для повторных кликов).
- Обернуть текущий `<button>` остаётся как есть; добавить внутри кнопки абсолютно позиционированный `<span>` со вспышкой только когда `flashing=true`:
  - `position: absolute; inset: 0; border-radius: 999px; pointer-events: none;`
  - `background: radial-gradient(circle at center, rgba(255,230,180,0.9) 0%, rgba(255,150,80,0.6) 30%, rgba(255,100,200,0.3) 60%, transparent 80%)`
  - `mix-blend-mode: screen`
  - `animation: neon-btn-flash 450ms ease-out forwards`
  - Keyframes: opacity 0→1→0, scale 0.4→1.3.
- В `onClick`: установить `flashing=true`, затем через 500ms `flashing=false`. Использовать уникальный `key` через счётчик, чтобы ре-триггерить анимацию при быстрых повторных кликах.
- Вызвать оригинальный `onClick` пользователя как обычно (логика без изменений).
- Кнопки на финальном экране (`FinalScreen.tsx`) — текущая реализация не показывает кнопок «под Tanya Vibe Coder» в самом `FinalScreen.tsx`. Кнопки на финальном экране рендерятся из `ControlBar` и используют `NeonGlassButton`, поэтому правка в `NeonGlassButton` автоматически покрывает их.
- Текст внутри кнопки не трогаем (вспышка рендерится позади текста через z-index).

## CSS keyframes (добавить инлайн в каждый компонент через `<style>` или один раз в `index.css`)

Простейший подход — `<style>` блок внутри `SpineEffect` и `NeonGlassButton`, чтобы изолировать.

```
@keyframes spine-energy-flow {
  0% { transform: translateY(-30%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(130%); opacity: 0; }
}
@keyframes spine-pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
@keyframes neon-btn-flash {
  0% { opacity: 0; transform: scale(0.4); }
  40% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(1.3); }
}
```

## Что НЕ трогаем
- `FinalBook.tsx`, `FinalScreen.tsx`, `ControlBar.tsx`, `FinalBookMagicFX.tsx`
- Текст, страницы, изображения, реакции, пагинация, ink-эффект
- Курсор, частицы, свечение под книгой, фон
- Размеры кнопок, layout

## Критерии приёмки
- По центру FinalBook вдоль корешка идёт яркий сине-фиолетовый поток света сверху вниз, мягкое неоновое свечение
- При клике на любую кнопку (`✏️ внести слово`, `← назад`, `далее →`, `✦ завершить`, `📖 к книге`, `📤 поделиться`) — короткая золото-розовая вспышка из центра
- Текст в кнопке не двигается, размер не меняется
- Эффекты не перекрывают страницы и текст книги
- Стабильно 60 FPS

