

# Plan: One-time cleanup of old test data

## Change: `src/pages/Index.tsx`

Add a one-time cleanup `useEffect` using a new flag key `"magic-book-initial-clean"`:

```tsx
useEffect(() => {
  const cleared = localStorage.getItem("magic-book-initial-clean");
  if (!cleared) {
    localStorage.removeItem("magic-book-entries");
    localStorage.setItem("magic-book-initial-clean", "true");
    setEntries([]);
  }
}, []);
```

This runs once on first load, clears old test words, then never runs again. After that, the dictionary accumulates normally.

## What does NOT change
- MagicBook, FinalBook, pagination, animations, sound
- Word addition logic, duplicate checking
- Entry structure, localStorage persistence

