

# Plan: Remove one-time cleanup effect from Index.tsx

## Change: `src/pages/Index.tsx`

Delete the cleanup `useEffect` block (lines ~32-38):

```tsx
// DELETE THIS ENTIRE BLOCK:
useEffect(() => {
  const cleared = localStorage.getItem("magic-book-cleared-v1");
  if (!cleared) {
    localStorage.removeItem("magic-book-entries");
    setEntries([]);
    localStorage.setItem("magic-book-cleared-v1", "true");
  }
}, []);
```

The existing `useState` initializer already loads from localStorage, and the other `useEffect` already persists changes. No other changes needed — `entries` is already the single source of truth shared by both MagicBook and FinalBook.

## What does NOT change
- FinalBook, MagicBook, pagination, animations, sound
- Entry structure, localStorage persistence logic

