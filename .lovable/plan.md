

# Plan: Remove "Clear Dictionary" button

## Changes

### 1. `src/components/ControlBar.tsx`
- Remove `onClearAll` from props interface
- Remove the "🗑 очистить словарь" button from edit mode section

### 2. `src/pages/Index.tsx`
- Remove `handleClearAll` function
- Remove `onClearAll={handleClearAll}` from ControlBar props

No other files affected.

