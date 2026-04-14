

# Plan: Fix flash effect — make it centered, not fullscreen

## Change in `src/pages/Index.tsx`

Replace the fullscreen flash div (`fixed inset-0 bg-white/80`) with a centered rounded flash:

```tsx
<div className="absolute w-[300px] h-[300px] rounded-full bg-white/80 blur-3xl animate-[flash_0.6s_ease-out]" />
```

No other changes — all other intro layers, activating effect, video logic, cover image stay as-is.

