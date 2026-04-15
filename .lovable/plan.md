
# Plan: Clean UX — Remove reactions from book + improve stats

## Changes

### 1. `src/components/FinalBook.tsx` — Remove reactions from book pages
Delete the reaction buttons block (🔥 ❤️ 🚀) from word entries. Keep only word, description, and numbering.

### 2. `src/components/MagicBook.tsx` — Fix input layout (left page)
Replace current input form with clean positioned block:
- Input for word with underline border
- Textarea for description
- Save button below

### 3. `src/components/FinalScreen.tsx` — BIG centered stats
Replace current stats overlay with centered large display:
- "Всего слов: X" as large text (text-3xl)
- 🔥 ❤️ 🚀 reactions in row with large counts (text-4xl)
- Full flex centering in overlay

### 4. Reaction placement policy
Reactions removed from:
- Book pages (FinalBook)
- Input form (MagicBook)

Reactions will only exist in:
- Catalog/reading view (future implementation)

### Unchanged
- Book magic effects, animations, page flipping
- Save logic, localStorage sync
- Intro video, cover image
