

## Цель
Добавить две новые реакции — 😂 (laugh) и 👍 (like) — в конец списка реакций. Текущие 🔥 ❤️ 🚀 не трогаем.

## Изменения

### 1. `src/pages/Index.tsx` (строка 13)
Расширить тип:
```ts
reactions: { fire: number; love: number; rocket: number; laugh: number; like: number };
```

### 2. `src/components/MagicBook.tsx`
- Строка 9 — тот же тип.
- Строка 230 — инициализация новой записи: `reactions: { fire: 0, love: 0, rocket: 0, laugh: 0, like: 0 }`.

### 3. `src/components/FinalBook.tsx`
- Строка 8 — тот же тип.
- Строка 83 (measure-блок) — `reactions.textContent = "🔥 0 ❤️ 0 🚀 0 😂 0 👍 0";` чтобы пагинация учла дополнительную ширину.
- Строка 159 — расширить тип в `updateReaction`: `"fire" | "love" | "rocket" | "laugh" | "like"`.
- Строки 202–206 — в конец блока кнопок добавить две кнопки:
```tsx
<button type="button" onClick={() => updateReaction(globalIdx, "laugh")} className="cursor-pointer hover:scale-110 transition-transform">😂 {entry.reactions?.laugh || 0}</button>
<button type="button" onClick={() => updateReaction(globalIdx, "like")} className="cursor-pointer hover:scale-110 transition-transform">👍 {entry.reactions?.like || 0}</button>
```

### 4. `src/components/FinalScreen.tsx`
- Строка 6 — тот же тип.
- Строки 15–17 — добавить `totalLaugh`, `totalLike`.
- Строки 37–39 — добавить `<div>😂 {totalLaugh}</div>` и `<div>👍 {totalLike}</div>` в конец.

## Обратная совместимость
Старые записи в localStorage не имеют полей `laugh`/`like`. Везде используется `entry.reactions?.laugh || 0`, поэтому undefined корректно даст 0. При первом клике `(w.reactions?.[type] || 0) + 1` создаст поле. Миграция не требуется.

## Что НЕ меняем
- Стили, размеры, расположение блока реакций
- Порядок существующих реакций (🔥 ❤️ 🚀 остаются первыми)
- Логику `updateReaction`, сохранение в localStorage
- MagicBook UI (там реакций нет — только сохранение)
- Пагинация: единственный риск — ширина строки реакций в measure; обновление текста measure (п.3) это покрывает

## Критерии приёмки
- В FinalBook у каждой записи 5 кнопок: 🔥 ❤️ 🚀 😂 👍
- Клики увеличивают счётчики, сохраняются в localStorage
- На финальном экране totals: 🔥 ❤️ 🚀 😂 👍
- Старые записи продолжают работать (счётчики стартуют с 0)
- Пагинация и перелистывание не сломаны

