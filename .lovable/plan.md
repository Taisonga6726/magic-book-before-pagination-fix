

# Plan: Make MagicBook fullscreen

## Changes

### `src/components/MagicBook.tsx`

**Lines 232-235**: Remove `max-w-[1100px] mx-auto` and `aspectRatio`:

```tsx
// Before:
<div
  className="relative w-full max-w-[1100px] mx-auto magic-cursor"
  style={{ aspectRatio: "1.5 / 1" }}
>

// After:
<div className="relative w-full h-full magic-cursor">
```

Everything else stays unchanged — the outer fullscreen wrapper (line 230-231) is already correct, the book image uses `object-contain`, and text overlays use percentage positioning.

