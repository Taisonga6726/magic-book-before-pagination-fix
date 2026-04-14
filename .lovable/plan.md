

# Plan: Add entrance magic effect after video before user click

## Changes to `src/pages/Index.tsx`

### 1. Add `introEffect` state (after line 31)
```tsx
const [introEffect, setIntroEffect] = useState(false);
```

### 2. Update video `onEnded` (line 127)
```tsx
onEnded={() => {
  setVideoFinished(true);
  setTimeout(() => setIntroEffect(true), 50);
}}
```

### 3. Add intro glow effect in the static preview block (before the cover image, ~line 139)
```tsx
{introEffect && (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    <div className="absolute w-40 h-40 rounded-full bg-white/70 blur-2xl animate-pulse" />
    <div className="absolute w-72 h-72 rounded-full border border-yellow-300/60 animate-ping" />
  </div>
)}
```

### 4. Update cover image with fade-in (line 139-140)
```tsx
<img src="/images/cover-book.png" alt="Обложка книги" draggable={false}
     className={`w-full h-full object-contain select-none transition-all duration-500 
       ${videoFinished ? "opacity-100 scale-100" : "opacity-0 scale-95"}
       ${activating ? "scale-105" : ""}`} />
```

### 5. Reset `introEffect` in `onOpenCatalog` (line 113)
Add `setIntroEffect(false)` alongside `setVideoFinished(false)`.

## What does NOT change
- handleOpenBook, activating effect, flip animation, preload, MagicBook/FinalBook

