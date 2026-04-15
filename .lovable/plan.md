

# Plan: Fix numbering — switch to fixed items-per-spread pagination

## Problem
Current dynamic height-based pagination produces variable page sizes, causing unpredictable numbering. The user wants fixed, predictable pagination with continuous numbering.

## Changes

### `src/components/FinalBook.tsx`

1. **Replace dynamic pagination with fixed spread-based logic:**
   - Remove `pages` state, `computePages` useEffect, and measurement div logic (lines 30, 40-105)
   - Add constants: `ITEMS_PER_PAGE = 3`, `ITEMS_PER_SPREAD = 6`
   - Calculate `start = currentSpread * ITEMS_PER_SPREAD`
   - Left page: `entries.slice(start, start + ITEMS_PER_PAGE)`
   - Right page: `entries.slice(start + ITEMS_PER_PAGE, start + ITEMS_PER_SPREAD)`

2. **Fix totalSpreads calculation:**
   - `totalSpreads = Math.max(1, Math.ceil(entries.length / ITEMS_PER_SPREAD))`

3. **Remove old index variables** (`leftGlobalStart`, `rightGlobalStart`, `leftPageIdx`, `rightPageIdx`)

4. **Fix numbering in renderEntry calls:**
   - Left: `renderEntry(entry, start + i)`
   - Right: `renderEntry(entry, start + ITEMS_PER_PAGE + i)`

5. **Reactions use same index** — already correct since `renderEntry` passes `globalIdx` to `updateReaction`

6. **Remove `leftPageRef`** — no longer needed for measurement

### No changes to
- Layout, styles, animations, flip logic, reactions UI, SpineEffect, FinalScreen, Index.tsx

