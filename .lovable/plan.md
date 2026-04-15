

# Plan: Add reactions to FinalBook catalog

## Changes

### 1. `src/components/FinalBook.tsx`

**Add `setEntries` prop back:**
- Update `FinalBookProps` to include `setEntries: React.Dispatch<React.SetStateAction<Entry[]>>`

**Add `updateReaction` function:**
```ts
const updateReaction = useCallback((globalIdx: number, type: "fire" | "love" | "rocket") => {
  setEntries((prev) =>
    prev.map((w, i) =>
      i === globalIdx ? { ...w, reactions: { ...w.reactions, [type]: (w.reactions?.[type] || 0) + 1 } } : w
    )
  );
}, [setEntries]);
```

**Update `renderEntry`** — add reaction buttons after description:
```tsx
<div className="mt-1 flex gap-3">
  <button onClick={() => updateReaction(globalIdx, "fire")} className="text-sm opacity-70 hover:opacity-100">
    🔥 {entry.reactions?.fire || 0}
  </button>
  <button onClick={() => updateReaction(globalIdx, "love")} className="text-sm opacity-70 hover:opacity-100">
    ❤️ {entry.reactions?.love || 0}
  </button>
  <button onClick={() => updateReaction(globalIdx, "rocket")} className="text-sm opacity-70 hover:opacity-100">
    🚀 {entry.reactions?.rocket || 0}
  </button>
</div>
```

**Update measurement div** in `computePages` to account for reaction row height (~28px).

### 2. `src/pages/Index.tsx`

Pass `setEntries` to FinalBook:
```tsx
<FinalBook entries={entries} setEntries={setEntries} onBack={() => setMode("form")} onPageNav={handlePageNav} />
```

### Unchanged
- MagicBook, animations, final screen, page flipping logic

