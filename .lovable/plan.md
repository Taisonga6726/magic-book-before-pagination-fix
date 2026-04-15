

# Plan: Add reactions to words + stats on final screen

## Context
The app already has word input, saving, and book display. This plan adds emoji reactions per word and aggregate stats on the final screen.

## Changes

### 1. Update Entry interface (all files using it)
Add `reactions` field to the `Entry` interface:
```ts
interface Entry {
  word: string;
  description: string;
  reactions: { fire: number; love: number; rocket: number };
}
```
Files affected: `src/pages/Index.tsx`, `src/components/MagicBook.tsx`, `src/components/FinalBook.tsx`

### 2. `src/components/MagicBook.tsx` — Initialize reactions on save
Update `handleSave` to include `reactions: { fire: 0, love: 0, rocket: 0 }` when creating new entries.

### 3. `src/components/FinalBook.tsx` — Add reaction buttons to entries
- Accept `setEntries` prop (currently missing)
- Add `updateReaction(globalIdx, type)` function that increments the reaction count
- Render 🔥 ❤️ 🚀 buttons below each entry with counts

### 4. `src/pages/Index.tsx` — Pass `setEntries` to FinalBook
```tsx
<FinalBook entries={entries} setEntries={setEntries} onBack={...} onPageNav={...} />
```

### 5. `src/components/FinalScreen.tsx` — Show stats
- Accept `entries` prop
- Display total word count and aggregate reaction totals (🔥, ❤️, 🚀)

### 6. `src/pages/Index.tsx` — Pass entries to FinalScreen
```tsx
<FinalScreen entries={entries} onBack={() => setMode("form")} />
```

### What stays unchanged
- Book design, animations, intro video, page flipping, neon effects — all untouched
- localStorage sync already works via existing `useEffect`

