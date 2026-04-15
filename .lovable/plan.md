

# Plan: Fix page content positioning & page number visibility

## Issues from screenshot
1. Content overflows the ornamental borders — needs tighter bounding box
2. Page number "— Стр. N —" too small and blends into background
3. Content needs to shift further down and inward to stay within the decorated page area

## Changes in `src/components/FinalBook.tsx`

### 1. Adjust left page container (line 141)
- `left: 20%` → `left: 13%`
- `top: 29%` → `top: 18%`
- `width: 26%` → `width: 33%`
- `height: 44%` → `height: 55%`
- Increase padding to keep text away from ornament edges: `padding: 45px 30px 40px 50px`

### 2. Adjust right page container (line 156)
- `left: 55%` → `left: 53%`
- `top: 29%` → `top: 18%`
- `width: 26%` → `width: 33%`
- `height: 44%` → `height: 55%`
- Padding: `padding: 45px 50px 40px 30px`

### 3. Make page numbers much more visible (lines 146-149, 162-165)
- Font size: `15px` → `18px`
- Opacity: `0.85` → `1`
- Add subtle background pill: `background: rgba(26,20,64,0.08)`, `borderRadius: 12px`, `padding: 2px 16px`, inline styling
- `bottom: 2` → `bottom: 6px`

### 4. Reduce entry spacing to fit 4 entries reliably
- Entry container: `mb-1` → `mb-0.5`
- Description: `text-sm` → `text-xs`

No logic changes. Pure positioning & style tweaks.

