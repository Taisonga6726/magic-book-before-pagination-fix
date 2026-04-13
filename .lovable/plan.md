

# Plan: Add "Clear Dictionary" button to ControlBar

## Changes

### 1. `src/pages/Index.tsx`
- Add `handleClearAll` function: calls `localStorage.removeItem("magic-book-entries")` and `setEntries([])`
- Pass it to `ControlBar` as `onClearAll` prop

### 2. `src/components/ControlBar.tsx`
- Accept new `onClearAll` prop
- In `edit` mode, add a button labeled "🗑 очистить словарь" that calls `onClearAll`
- Style as NeonGlassButton consistent with existing buttons

No other files changed. No auto-clear logic. Dictionary accumulates normally after manual clear.

