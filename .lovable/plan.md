

# Plan: Clear test words from localStorage

## Important note
Adding `localStorage.removeItem` in a permanent `useEffect` would clear **all** words on every page load, preventing accumulation. Instead, I'll use a **one-time flag** so it only clears once:

## Change: `src/pages/Index.tsx`

Add a one-time cleanup effect:

```tsx
useEffect(() => {
  const cleared = localStorage.getItem("magic-book-cleared-v1");
  if (!cleared) {
    localStorage.removeItem("magic-book-entries");
    setEntries([]);
    localStorage.setItem("magic-book-cleared-v1", "true");
  }
}, []);
```

This clears the test data exactly once, then new words accumulate normally starting from 1.

## What does NOT change
- FinalBook, MagicBook logic, pagination, animations, sound
- Entry structure, localStorage key name

