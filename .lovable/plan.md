

# Plan: Fix entry positioning — fit inside ornamental borders

## Problem
Screenshot shows entries overflow above and left of the page ornaments. The red boxes in the screenshot show where the actual writable page area is — content must stay inside those ornamental frames.

## Analysis of ornament positions (from screenshot)
The ornamental inner frame on each page starts roughly:
- **Left page**: `left: 15%`, `top: 24%`, `width: 28%`, `height: 48%`
- **Right page**: `left: 54%`, `top: 24%`, `width: 28%`, `height: 48%`

Current values have `top: 18%` (too high) and `width: 33%` (too wide), `left: 13%` (too far left).

## Changes in `src/components/FinalBook.tsx`

### 1. Left page container (line 141)
```
left: 13% → 15%
top: 18% → 25%
width: 33% → 28%
height: 55% → 47%
padding: 45px 30px 40px 50px → 20px 20px 30px 25px
```

### 2. Right page container (line 156)
```
left: 53% → 55%
top: 18% → 25%
width: 33% → 28%
height: 55% → 47%
padding: 45px 50px 40px 30px → 20px 25px 30px 20px
```

Smaller padding since the container itself is now tighter. Page numbers stay at `bottom: 6px` inside these containers.

No logic changes — positioning only.

