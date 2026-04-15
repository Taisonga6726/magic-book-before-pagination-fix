

# Plan: Shift left page content further right toward the spine

## Problem
Left page entries start too far left — they need to move right, closer to the book's spine/binding.

## Changes in `src/components/FinalBook.tsx`

### Line 141 — Left page container
```
left: 19% → 23%
width: 24% → 22%
```

### Line 156 — Right page container
```
left: 57% → 55%
width: 24% → 22%
```

Both pages shift inward toward the spine. No other changes.

