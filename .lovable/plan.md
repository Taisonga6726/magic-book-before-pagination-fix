

# Fix: Duplicate check not working

## Root cause

The `handleSave` function uses `useCallback` with `entries` in its dependency array. However, when `setEntries` is called with a functional updater `(prev) => [...prev, newItem]`, the state updates asynchronously. The `entries` prop from the parent component should update on the next render, but the `useCallback` closure may still reference the old `entries` array in certain edge cases with React batching.

## Fix

Replace the duplicate check to use a ref that always holds the latest `entries`, ensuring no stale closure issues:

### `src/components/MagicBook.tsx`

1. Add a ref to track the latest entries:
```tsx
const entriesRef = useRef(entries);
useEffect(() => { entriesRef.current = entries; }, [entries]);
```

2. Change the duplicate check in `handleSave` (line 132) to use `entriesRef.current` instead of `entries`:
```tsx
const isDuplicate = entriesRef.current.some(
  (e) => normalize(e.word) === normalize(word)
);
```

3. Keep `entries` in `useCallback` deps (no other changes).

This guarantees the check always uses the latest entries, even if React batched multiple state updates.

## What does NOT change
- ControlBar, NeonGlassButton, Index.tsx — no changes
- Pagination, localStorage, animations — untouched
- The duplicate overlay UI — stays as is

