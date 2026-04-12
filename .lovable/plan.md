

# План: ControlBar + фикс дубликатов

## Файлы

### 1. `src/components/NeonGlassButton.tsx` (новый)

Кнопка со стеклянным неоновым стилем:
- `background: rgba(255,255,255,0.12)`, `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(255,255,255,0.2)`, `box-shadow: 0 0 12px rgba(138,92,246,0.3)`
- hover: `scale(1.05)`, усиление свечения
- `color: white`, `font-weight: 600`, `padding: 8px 20px`, `border-radius: 12px`
- Props: `children`, `onClick`, `disabled?`, `className?`

### 2. `src/components/ControlBar.tsx` (новый)

Фиксированная панель: `fixed bottom-5 left-1/2 -translate-x-1/2 z-[100]`
Фон панели: `rgba(0,0,0,0.4)` с blur, скругление.

Кнопки по режиму:
- **edit**: `[ внести слово ]` `[ читать книгу ]` `[ завершить ]`
- **read**: `[ внести слово ]` `[ 🙂 😮 🔥 ]`
- **final**: `[ начать заново ]` `[ к книге ]` `[ поделиться ]`

Props: `mode`, `setMode`, `onAddWord`, `onRestart`, `onShare`

`onAddWord` — переключает в edit и фокусирует поле ввода (или просто `setMode("edit")`).

### 3. `src/pages/Index.tsx`

- Заменить `view` на `mode: "edit"|"read"|"final"`
- `"edit"` → MagicBook, `"read"` → FinalBook, `"final"` → FinalBook
- Рендерить `<ControlBar />` вне книги
- `onRestart` → `setEntries([])`, `setMode("edit")`
- `onShare` → toast
- MagicBook `onFinish` → `setMode("final")`
- FinalBook `onBack` → `setMode("edit")`

### 4. `src/components/MagicBook.tsx` — только фикс дубликатов

Добавить нормализацию:
```tsx
const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
const isDuplicate = entries.some(e => normalize(e.word) === normalize(word));
```

### Что НЕ меняется
- Кнопки внутри MagicBook и FinalBook остаются
- pageBreaks, currentPage — без изменений
- Анимации, звуки, localStorage

