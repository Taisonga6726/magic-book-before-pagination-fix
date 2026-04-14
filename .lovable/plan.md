

# Plan: Strengthen activation effect — visible magic pulse from book center

## Changes to `src/pages/Index.tsx`

### 1. Replace activation effect block
Find the current `activating` block and replace with a multi-layered magic pulse:
- Central white flash (`w-24 h-24 bg-white/80 blur-2xl animate-pulse`)
- Yellow ring (`w-56 h-56 border-2 border-yellow-300/80 animate-ping`)
- Outer soft glow (`w-72 h-72 bg-yellow-200/20 blur-3xl animate-ping`)

### 2. Add scale effect to cover image
Add conditional `scale-105` transform on the cover image when `activating` is true, with `transition-transform duration-300`.

## What does NOT change
- Video logic, preload, handleOpenBook, flip animation, all other screens

