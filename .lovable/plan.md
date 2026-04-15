

# Plan: Page numbers in ornament + verify sequential save

## Analysis

The core logic is already correct:
- `MagicBook.handleSave` appends to end: `[...prev, newEntry]`
- `FinalBook` uses stable slicing with `spreadStart + i` for global numbering
- Pagination and auto-navigation work

The main visual issue: page numbers are tiny (`text-xs opacity-40`) and not prominent enough.

## Changes

### `src/components/FinalBook.tsx` — Make page numbers prominent and book-styled

**Left page number** (lines 141-144): Replace small text with decorative book-style number:
- Font: Cormorant Garamond, ~14px, italic
- Opacity: 0.6 → more visible
- Position: pinned to bottom of page container via `mt-auto`
- Format: `— Стр. 1 —` with decorative dashes

**Right page number** (lines 157-160): Same treatment, mirrored.

Both use `position: absolute; bottom: 4px` inside the flex container to sit in the ornament zone without pushing content.

### Specific style update

```tsx
// Both page number elements:
<div className="absolute bottom-1 left-0 right-0 text-center select-none"
     style={{ 
       color: "#1a1440", 
       fontFamily: "'Cormorant Garamond', serif", 
       fontStyle: "italic",
       fontSize: "13px",
       opacity: 0.55,
       letterSpacing: "2px"
     }}>
  — Стр. {pageNum} —
</div>
```

Page containers get `position: relative` added so the absolute bottom element stays within bounds.

### No logic changes

- Entry save order — already correct (append-only)
- Numbering — already global (`spreadStart + i + 1`)
- Pagination — already works with 4 per page, 8 per spread
- No changes to `MagicBook.tsx` or `Index.tsx`

