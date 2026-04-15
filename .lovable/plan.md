

# Plan: Final fixes — stats layout + content positioning

## Analysis

1. **Bottom emoji buttons in `Index.tsx`**: Already removed — no such buttons exist.
2. **FinalBook content positioning**: Currently uses `absolute` with `left: "12%", top: "14%", width: "36%"` etc. — this positions content over the book image but the user reports words rendering outside.
3. **FinalScreen stats**: Currently vertical (`flex-col`), user wants horizontal single-line layout.

## Changes

### 1. `src/components/FinalScreen.tsx` (lines 27-39) — Horizontal stats layout

Replace the vertical `flex-col justify-end` container with a single horizontal row at the bottom:

```tsx
<div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 text-white pointer-events-none">
  <div className="px-5 py-2 rounded-xl bg-black/40 backdrop-blur-md text-xl font-handwriting">
    Всего слов: {entries.length}
  </div>
  <div className="flex items-center gap-6 px-6 py-3 rounded-xl bg-black/30 backdrop-blur-md text-3xl">
    <div>🔥 {totalFire}</div>
    <div>❤️ {totalLove}</div>
    <div>🚀 {totalRocket}</div>
  </div>
</div>
```

Word count on the left, reactions on the right, one horizontal line.

### 2. `src/components/FinalBook.tsx` (lines 153-195) — Tighten page content positioning

Adjust the left/right page containers to ensure content stays strictly within the book pages. Increase `top` to `16%`, reduce `height` to `66%`, and add `overflow: hidden` safeguard to both pages. This keeps entries inside the visible book area without changing the overall layout or design.

### Unchanged
- Animations, flip logic, book design, backgrounds, numbering logic, reactions in catalog

