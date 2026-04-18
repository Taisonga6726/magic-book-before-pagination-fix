

## Цель
Добавить кнопку «💾 экспорт» в `ControlBar`, которая скачивает все записи (`entries`) в виде JSON-файла — резервной копии словаря.

## Что сделаем

### 1. `src/pages/Index.tsx`
- Добавить `handleExport`: формирует `Blob` из `JSON.stringify(entries, null, 2)`, создаёт временную ссылку и инициирует скачивание файла `tanya-vibecoder-backup-YYYY-MM-DD.json`.
- Если `entries` пуст — показать toast «Словарь пуст».
- Передать `onExport={handleExport}` в `ControlBar`.

### 2. `src/components/ControlBar.tsx`
- Добавить проп `onExport: () => void`.
- В режимах `form` и `reading` добавить кнопку `<NeonGlassButton onClick={onExport}>💾 экспорт</NeonGlassButton>` (рядом с уже существующими, без `accent`).
- В `preview` и `final` — не показывать (минимум визуального шума).

## Что НЕ трогаем
- Логику сохранения в `localStorage`, валидацию, пагинацию, анимации, фон, FinalBook.
- Стиль `NeonGlassButton` (используем как есть — pill, фиолетовый).

## Критерии приёмки
- Кнопка «💾 экспорт» видна в ControlBar в режимах ввода и чтения.
- По клику скачивается `.json`-файл со всеми текущими записями.
- Если словарь пуст — toast вместо скачивания.
- Никаких изменений в визуале и поведении остальных элементов.

