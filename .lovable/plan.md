

# Plan: Add debug logging + restore video preview flow

## Analysis

After reading all source files, the data flow is **structurally correct**:
- Save logic in MagicBook uses `setEntries(prev => [...prev, newEntry])` — correct
- FinalBook receives `entries` prop and renders with `renderEntry` — correct
- Props are passed from Index to both components — correct

The user wants diagnostic logging to verify at runtime, plus restoring the video preview flow.

## Changes

### 1. `src/components/MagicBook.tsx` — Add debug logs to handleSave

Add `console.log` inside `handleSave` to confirm the function fires and entries update:
- Log before save: `"SAVE CLICKED"`, word, description
- Log inside `setEntries`: `"UPDATED ENTRIES:"`, updated array

### 2. `src/components/ControlBar.tsx` — Restore video preview flow

Line 48: Change `setMode("reading")` back to `setMode("preview")` so the video intro plays before showing the book.

### 3. `src/pages/Index.tsx` — Add global entries log

Add `console.log("GLOBAL entries:", entries.length)` inside a `useEffect` that watches `entries`, confirming state updates propagate.

### 4. `src/components/FinalBook.tsx` — Add received data log

Add `console.log("FinalBook entries:", entries.length, entries)` at the top of the component to verify data reaches FinalBook at render time.

### Unchanged
- Save logic (already correct)
- FinalBook layout (already structured flex)
- Pagination, reactions, entry rendering
- Button styles

