

# Plan: Fullscreen + blur background for MagicBook and Index wrapper

## 1. `src/components/MagicBook.tsx`

Wrap the existing return in a fullscreen container with blur background, same pattern as FinalBook/FinalScreen:

```tsx
return (
  <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
    <img src="/images/open-book.png" className="absolute w-full h-full object-cover blur-2xl scale-110 opacity-40 select-none" draggable={false} />
    <div className="relative w-full h-full flex items-center justify-center">
      {/* existing <div className="relative w-full max-w-[1100px] ..."> unchanged */}
    </div>
  </div>
);
```

- Remove the `maskImage` / `WebkitMaskImage` radial gradient from the outer book div (it creates the "vignette rectangle" effect that conflicts with fullscreen)
- Keep all inner content, overlays, SpineEffect, inputs exactly as-is

## 2. `src/pages/Index.tsx`

Simplify the main container — since every mode component now handles its own fullscreen layout:

- Change outer div from `w-full h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black` to `fixed inset-0 w-screen h-screen overflow-hidden bg-black`
- Remove the inner `<div className="relative z-40 w-full flex items-center justify-center">` wrapper — each mode component is already `fixed inset-0` so centering wrapper is unnecessary
- Keep `<HeroWave />` and `<FloatingWords />` at root level
- Keep `<ControlBar />` as-is (already fixed z-100)

## What does NOT change
- MagicBook internal logic (inputs, pagination, save, edit, overlays, sounds)
- ControlBar, FinalBook, FinalScreen, preview mode
- localStorage, entry structure, mode transitions

