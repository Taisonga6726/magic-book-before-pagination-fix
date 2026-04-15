

# Plan: Adjust positioning, brighten text & page numbers

## Changes in `src/components/FinalBook.tsx`

### 1. Move content down: `top: 27%` → `top: 29%`
Both left and right page containers (lines 141, 156).

### 2. Brighten description text (line 100)
- Remove `opacity-80` class
- Change color from `#2a1f5a` to `#1a1440` (same as title) or darker `#1a1030`
- Increase font size: `text-xs` → `text-sm`

### 3. Brighten page numbers (lines 147-148, 162-163)
- Opacity: `0.55` → `0.85`
- Font size: `13px` → `15px`
- Color: `#1a1440` → `#0f0a2a` (deeper, more visible)

### 4. Brighten reaction text (line 104)
- Color from `#2a1f5a` to `#1a1440`

No logic changes. Only style tweaks across ~6 lines.

