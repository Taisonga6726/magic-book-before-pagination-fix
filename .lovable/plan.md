

# Доработка визуала магической книги

Большая задача, разбитая на 7 блоков. Логика ввода, звук пера, изображения и фон не затрагиваются.

## 1. Кнопки → текстовые ссылки
**`src/components/MagicBook.tsx`** — заменить `neon-btn-gold` на `action-text` класс, добавить разделитель `|`:
```
сохранить | редактировать
```
**`src/index.css`** — удалить весь блок `.neon-btn-gold` и `glow-pulse`. Кнопки станут обычным текстом книги с hover-свечением (уже есть `.action-text`).

## 2. Нумерация — цифры крупнее
**`src/components/MagicBook.tsx`** — увеличить цифры с `text-lg` до `text-2xl font-bold`, чтобы они были заметнее текста записей (как на скриншоте image-29).

## 3. Магическое подтверждение «СЛОВО ВНЕСЕНО!»
**`src/components/MagicBook.tsx`** — при `handleSave` вместо `toast()` показывать собственный оверлей по центру книги: золотой текст «СЛОВО ВНЕСЕНО!» с анимацией появления (opacity + scale) и затухания за ~1.5 с. Добавить мелкие искры вокруг текста (переиспользовать логику из `SpineEffect`).

**`src/index.css`** — добавить `@keyframes word-saved` для появления/затухания.

## 4. Перелистывание страниц
**`src/components/MagicBook.tsx`**:
- Хранить `currentPage` (номер страницы, по 6 записей на страницу).
- Правая страница показывает `entries.slice(page*6, (page+1)*6)`, нумерация глобальная.
- Кнопка «далее →» внизу справа на орнаменте (заменяет «каталог →»; каталог переносится).
- При клике — CSS-анимация перелистывания (rotateY с perspective), звук из MP3.
- После анимации — следующая порция записей.

**Звук**: скопировать `flipping_through_the_pages_of_a_book.MP3` в `public/page-flip.mp3`, загружать через `new Audio`.

**`src/index.css`** — анимация `.page-flip-anim` (rotateY от 0 до -180deg, 1 с, с тенью).

## 5. Эффект «впитывания чернил»
**`src/index.css`** — обновить `.ink-letter` и добавить `.ink-absorb`:
```css
@keyframes ink-absorb {
  0% { opacity: 0.6; filter: blur(1px); color: hsl(250 70% 30%); }
  100% { opacity: 1; filter: blur(0); color: hsl(250 50% 25%); }
}
.ink-absorb { animation: ink-absorb 0.8s ease-out forwards; }
```
**`src/components/InkWriteEffect.tsx`** — добавить класс `ink-absorb` к символам, которые уже полностью появились.

## 6. Левая страница — тетрадные линии и мягкое свечение
Уже частично реализовано (`.notebook-lines`, `.writing-zone`). Уточнить:
- `.writing-zone` — чуть усилить подсветку (opacity 0.08 → 0.12).
- `.magic-input` — сделать нижнюю линию чуть ярче (`0.2` → `0.3`).

## 7. Кнопка «редактировать» — фокус в поле
**`src/components/MagicBook.tsx`** — в `handleEdit` добавить `wordInputRef.current?.focus()` (добавить ref на input «Слово»).

---

## Файлы, которые будут изменены
- `src/components/MagicBook.tsx` — основные доработки (кнопки, нумерация, перелистывание, оверлей «СЛОВО ВНЕСЕНО!»)
- `src/index.css` — стили (убрать neon-btn, добавить анимации flip/absorb/saved)
- `src/components/InkWriteEffect.tsx` — эффект впитывания
- `public/page-flip.mp3` — звук перелистывания (копия загруженного файла)

## Что НЕ меняется
- `FloatingWords.tsx` — без изменений
- `SpineEffect.tsx` — без изменений
- Фон, изображения, HeroWave, screen1/screen2 — не трогаем
- Логика ввода и звук пера — без изменений

