

# Реализация: MagicBook → FinalBook (полный сценарий)

## Обзор

Реализуем полный flow: ввод слов → перелистывание → «завершить книгу» → плавный переход → FinalBook с просмотром всех записей и перелистыванием. Без скролла нигде.

---

## Файлы и изменения

### 1. Ассеты
- Скопировать `user-uploads://book_04-3.png` → `src/assets/book-final.png`
- Скопировать `user-uploads://flipping_through_the_pages_of_a_book-2.MP3` → `public/page-flip.mp3` (перезапись)

### 2. `src/index.css` — новые стили

Добавить:
- `.scene-fade-out` — мягкое затемнение `opacity: 1 → 0.3` за `0.6s ease` (не в чёрный, не полное исчезновение)
- `.scene-fade-in` — появление `opacity: 0 → 1` за `0.8s ease`
- Улучшить `.page-flip-anim` — добавить `box-shadow` на сгибе и `filter: brightness(0.85)` для затемнения уходящей страницы
- `.no-scroll` — `overflow: hidden !important` для гарантии

### 3. `src/components/MagicBook.tsx`

**Что меняется:**
- Строка 209: `overflowY: "auto"` → `overflow: "hidden"` (запрет скролла)
- Добавить prop `onFinish: () => void`
- Заменить блок «каталог →» (строки 272-279) на «завершить книгу» — класс `.action-text-gold`, текстовый, без фона
- Добавить состояние `fadingOut` для CSS-класса на корневом div
- Добавить `handleFinish`:
  1. Пауза 400ms
  2. `setFlipping(true)` + звук + `setBurst(true)` — одновременно
  3. Через 600ms — `setFadingOut(true)` (CSS `scene-fade-out` на корневом div)
  4. Через 1500ms — `onFinish()`

**Что НЕ меняется:** handleSave, «СЛОВО ВНЕСЕНО!», InkWriteEffect, звук пера, SpineEffect

### 4. Новый `src/components/FinalBook.tsx`

Структура идентична MagicBook:
- Та же маска `radial-gradient(ellipse 95% 95% ...)`, inset shadow, absolute позиционирование
- Фон: `book-final.png` вместо `book.png`
- Props: `entries: Entry[]`, `onBack: () => void`
- Пагинация: строго 6 записей на страницу, глобальная нумерация (1..N)
- Те же отступы от переплёта (left: 18%, width: 22% для левой; left: 52%, width: 32% для правой)
- Та же типографика: `font-handwriting`, `text-ink`, `text-2xl`, Cormorant Garamond italic
- Левая страница: записи 1-6 (или 1-3 и 4-6 — по аналогии с MagicBook), правая: продолжение
- 3D перелистывание идентичное MagicBook: `perspective(1200px)`, `rotateY`, тень на сгибе, `brightness(0.85)`, звук синхронно
- Один `flipAudio` ref (не пересоздаётся)
- Кнопки текстом `.action-text`: «← назад» (предыдущая страница), «далее →» (следующая)
- Кнопка «← к книге» (`.action-text`) — при клике: flip + звук → fade → `onBack()`
- `overflow: hidden` на всех контейнерах
- Подпись `podpis.png` на месте
- Появление через `.scene-fade-in` на корневом div
- Записи отображаются как чернила (цвет + glow), не как UI-список

### 5. `src/pages/Index.tsx`

- View тип: `"book" | "catalog" | "final"`
- При `"final"` — `<FinalBook entries={entries} onBack={() => setView("book")} />`
- FloatingWords и HeroWave **всегда** отрендерены (не размонтируются при переходе)
- Передать `onFinish={() => setView("final")}` в MagicBook

---

## Что НЕ меняется
- `FloatingWords.tsx` — без изменений
- `SpineEffect.tsx` — без изменений
- `InkWriteEffect.tsx` — без изменений
- HeroWave, фон — без изменений
- «СЛОВО ВНЕСЕНО!» — без изменений
- Звук пера — без изменений

