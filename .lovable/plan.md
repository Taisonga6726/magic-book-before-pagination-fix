

# Plan: Make FinalBook fullscreen — remove max-width and aspectRatio

## Changes

### `src/components/FinalBook.tsx`

**Line 215**: Replace `max-w-[1100px] mx-auto` with `w-full h-full` and remove `aspectRatio` style:

```tsx
// Before (line 214-218):
<div
  className={`relative w-full max-w-[1100px] mx-auto magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}
  style={{ aspectRatio: "1.5 / 1" }}
>

// After:
<div
  className={`relative w-full h-full magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}
>
```

The book image (line 224-229) already uses `object-contain` so it will scale to fill the screen while maintaining its aspect ratio. Text overlays use percentage-based positioning (`left: "12%"`, `top: "14%"`, etc.) so they will adapt automatically.

### What does NOT change
- Text positioning (percentage-based, stays proportional)
- Pagination logic, flip animations, sounds
- SpineEffect, page indicator
- Index.tsx (already clean, no extra padding/margin)
- Inner shadow overlay (line 220-223) — stays as visual polish

