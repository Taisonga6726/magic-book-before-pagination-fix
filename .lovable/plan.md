

# Plan: Single global background, remove per-screen blur layers

## Overview
Move the blurred background to `Index.tsx` as one global layer. Remove all local blur `<img>` tags from MagicBook, FinalBook, FinalScreen, and the preview section.

## Changes

### 1. `src/pages/Index.tsx`
Add a global background image + darkening overlay right after the opening `<div>`, before `<HeroWave />`:

```tsx
<div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
  {/* Global blurred background */}
  <img
    src="/images/open-book.png"
    alt=""
    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 select-none pointer-events-none"
    draggable={false}
  />
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-none z-10" />

  {/* Existing layers */}
  <HeroWave />
  <FloatingWords />

  {/* All mode content at z-20 */}
  <div className="relative z-20 w-full h-full">
    {mode === "form" && <MagicBook ... />}
    {mode === "preview" && ( ... )}
    {mode === "reading" && <FinalBook ... />}
    {mode === "final" && <FinalScreen ... />}
  </div>

  <ControlBar ... /> {/* already z-100 */}
</div>
```

Remove the local blur `<img>` from the preview section (line 104-109).

### 2. `src/components/MagicBook.tsx` (line ~231)
Delete: `<img src="/images/open-book.png" alt="" className="absolute w-full h-full object-cover blur-2xl scale-110 opacity-40 select-none" draggable={false} />`

### 3. `src/components/FinalBook.tsx` (line ~213)
Delete: `<img src="/images/open-book.png" className="absolute w-full h-full object-cover blur-2xl scale-110 opacity-40 select-none" draggable={false} />`

### 4. `src/components/FinalScreen.tsx` (lines ~11-15)
Delete the blur `<img>` layer. Keep only the foreground `<img>` with `object-contain`.

### Z-index structure
- Background image: base layer
- Overlay: z-10
- Content (all modes): z-20
- ControlBar: z-100

### What does NOT change
- Mode transitions, flip sounds, animations
- MagicBook/FinalBook internal logic, pagination, localStorage
- ControlBar positioning

