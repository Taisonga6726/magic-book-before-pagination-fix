

# Plan: Book pagination with fixed 4-per-page capacity

## What changes

### `src/components/FinalBook.tsx` — Full rewrite of content logic

**1. Add `currentSpread` state + auto-navigation**

```tsx
const ITEMS_PER_PAGE = 4;
const ITEMS_PER_SPREAD = 8;

const [currentSpread, setCurrentSpread] = useState(0);
```

When `entries` changes, auto-navigate to the spread containing the last entry:
```tsx
useEffect(() => {
  if (entries.length > 0) {
    const lastSpread = Math.floor((entries.length - 1) / ITEMS_PER_SPREAD);
    setCurrentSpread(lastSpread);
  }
}, [entries.length]);
```

**2. Slice entries for current spread**

```tsx
const spreadStart = currentSpread * ITEMS_PER_SPREAD;
const spreadEntries = entries.slice(spreadStart, spreadStart + ITEMS_PER_SPREAD);
const leftPageEntries = spreadEntries.slice(0, ITEMS_PER_PAGE);
const rightPageEntries = spreadEntries.slice(ITEMS_PER_PAGE);
```

Global index for numbering: `spreadStart + i` (never resets).

**3. Page numbers**

- Left page: `currentSpread * 2 + 1`
- Right page: `currentSpread * 2 + 2`
- Rendered at bottom of each page container, small text.

**4. Compact entry layout**

Tighten `renderEntry`:
- Remove `mb-4` → use `mb-1`
- Remove `gap-2` from container → use `gap-0`
- Description: `mt-0` instead of `mt-1`, smaller text
- Reactions: inline right-aligned, `mt-0`, smaller font
- Goal: 4 entries fit in ~54% height without overflow

**5. Replace `overflow-y-auto` → `overflow-hidden`**

No scrolling. If 4 entries don't fit, it's a layout bug to fix.

**6. Wire `onPageNav` to `currentSpread`**

```tsx
useEffect(() => {
  const totalSpreads = Math.ceil(entries.length / ITEMS_PER_SPREAD);
  onPageNav?.({
    hasPrev: currentSpread > 0,
    hasNext: currentSpread < totalSpreads - 1,
    onPrev: () => { playFlipSound(); setCurrentSpread(s => s - 1); },
    onNext: () => { playFlipSound(); setCurrentSpread(s => s + 1); },
  });
}, [currentSpread, entries.length, onPageNav, playFlipSound]);
```

ControlBar already renders prev/next arrows based on `pageNav`.

### No changes to other files

- `Index.tsx` — entries, save logic, mode switching stay as-is
- `MagicBook.tsx` — untouched
- `ControlBar.tsx` — already supports `pageNav` arrows

## Expected behavior

| Words added | Left page | Right page | Spread |
|---|---|---|---|
| 1–4 | words 1–4 | empty | 1 |
| 5–8 | words 1–4 | words 5–8 | 1 |
| 9 | words 9 | empty | 2 (auto-flip) |
| 9–12 | words 9–12 | empty | 2 |

Page numbers shown: "Страница 1" / "Страница 2" on spread 1, "Страница 3" / "Страница 4" on spread 2, etc.

