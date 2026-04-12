

# Plan: Keep words large, reduce only descriptions and spacing

## Changes in `src/components/FinalBook.tsx`

### 1. Reduce description size and spacing (rendering)
In `renderEntry` (lines 190-209):
- Keep word at `text-2xl` — no change
- Description: `text-lg` → `text-sm`, remove `mt-0.5`, reduce `ml-7` → `ml-6`
- Container spacing: `space-y-1` → `space-y-0.5` (lines 245, 267)

### 2. Match measurement div to new sizes (lines 72-95)
- Keep word measurement at `1.5rem` — no change
- Description: `font-size:1.125rem` → `font-size:0.875rem`, `margin-top:2px` → `margin-top:0`
- Entry `marginBottom: "4px"` → `"2px"`

### 3. Add z-20 to page containers (lines 236, 258)
Add `z-20` class to both left and right page containers so text renders above the vignette overlay.

### 4. Fix measurement timing (line 102)
Replace `requestAnimationFrame(computePages)` with `setTimeout(computePages, 100)` for layout stability.

## What does NOT change
- Word size stays `text-2xl` (large and prominent)
- Book size, layout, animation, sound — same
- MagicBook, ControlBar, Index — untouched

