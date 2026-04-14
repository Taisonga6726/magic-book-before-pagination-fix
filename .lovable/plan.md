

# Plan: Fullscreen + blur background for FinalBook and FinalScreen

Apply the same double-layer fullscreen pattern already used in preview mode.

## 1. `src/components/FinalBook.tsx`

Wrap the entire return in a fullscreen container with blur background layer:

```tsx
return (
  <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
    {/* Blurred background */}
    <img src="/images/open-book.png" className="absolute w-full h-full object-cover blur-2xl scale-110 opacity-40" />
    
    {/* Existing book content — change outer div from relative+max-w to centered */}
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`relative w-full max-w-[1100px] mx-auto ...existing classes...`} style={{ aspectRatio: "1.5 / 1" }}>
        ...all existing inner content unchanged...
      </div>
    </div>
  </div>
);
```

- The outer wrapper becomes `fixed inset-0 w-screen h-screen` with z-index 40
- Blurred background layer uses `open-book.png`
- Inner book container keeps its current `max-w-[1100px]` and `aspectRatio` but is centered with flex

## 2. `src/components/FinalScreen.tsx`

Replace with double-layer fullscreen layout:

```tsx
return (
  <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
    <img src="/images/final-screen.png" className="absolute w-full h-full object-cover blur-2xl scale-110 opacity-40" />
    <img src="/images/final-screen.png" className="relative w-full h-full object-contain select-none" draggable={false} />
  </div>
);
```

## What does NOT change
- FinalBook internal logic (pagination, flip animation, text rendering, spine effect)
- ControlBar (already `position: fixed`, `z-index: 100` — will stay on top)
- localStorage, MagicBook, preview mode

