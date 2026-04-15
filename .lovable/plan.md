
Цель: сделать `FinalBook` максимально прямым и детерминированным, чтобы слова рендерились внутри открытой книги без логики, которая может их скрывать.

1. `src/components/FinalBook.tsx` — упростить рендер до прямого вывода списка
- Убрать из режима чтения всё, что связано со spread/pagination и может прятать контент:
  - `ITEMS_PER_PAGE`, `ITEMS_PER_SPREAD`
  - `currentSpread`, `totalSpreads`, `hasPrev`, `hasNext`
  - `start`, текущие slice по spread
  - `handleFlip`
  - счётчик страниц
  - `Пустая страница` и любые fallback-условия
- Оставить только каркас книги и два контейнера страниц.
- Разбить `entries` один раз на две видимые колонки, чтобы все текущие слова были видны сразу, без перелистывания:
  - `const splitIndex = Math.ceil(entries.length / 2)`
  - `leftEntries = entries.slice(0, splitIndex)`
  - `rightEntries = entries.slice(splitIndex)`

2. `src/components/FinalBook.tsx` — рендерить записи как словарь
- Использовать простой `renderEntry`, соответствующий вашему формату:
```tsx
<div key={idx}>
  <div>{idx + 1}. {entry.word}</div>
  <div>— {entry.description}</div>
  <div>🔥 {entry.reactions?.fire || 0} ❤️ {entry.reactions?.love || 0} 🚀 {entry.reactions?.rocket || 0}</div>
</div>
```
- Левую страницу заполнять `leftEntries.map(...)`, правую — `rightEntries.map(...)`.
- Не добавлять условий, которые скрывают список. Если в `entries` есть хотя бы одно слово, оно обязано появиться на странице.

3. `src/components/FinalBook.tsx` — убрать всё, что может физически обрезать список
- Убрать у внутренних текстовых контейнеров clipping, который может скрывать записи (`overflow-hidden` внутри области текста).
- Сохранить текущий фон книги, позиционирование книги на экране, шрифты и визуальный стиль страницы.

4. `src/components/FinalBook.tsx` / `src/pages/Index.tsx` — отключить лишнюю навигацию в reading
- Так как сложная пагинация убирается, `FinalBook` должен сбрасывать `onPageNav`, чтобы в `ControlBar` не оставались старые кнопки prev/next из form-режима.
- Видео-flow и переходы `form → preview → reading` не менять.

5. `src/components/MagicBook.tsx` и `src/pages/Index.tsx` — только cleanup
- Сохранение не трогать: оно уже работает.
- Удалить временные debug `console.log`, чтобы код снова соответствовал требованию “без диагностики”.

Технически итог:
- Источник данных остаётся один: `entries`.
- `MagicBook` только добавляет записи.
- `FinalBook` только напрямую отображает `entries`.
- После открытия книги пользователь сразу видит список слов внутри страниц, без пустых заглушек и без скрывающих условий.
