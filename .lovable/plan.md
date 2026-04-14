

# Plan: Finalize preview UX — activation effect + no delays

## Changes to `src/pages/Index.tsx`

### 1. Add `activating` state (line 31)
Add `const [activating, setActivating] = useState(false);`

### 2. Add final-screen preload (after line 89)
```tsx
<img src="/images/final-screen.png" className="hidden" alt="" />
```

### 3. Update `handleOpenBook` (lines 76-83)
Replace with staged activation effect:
```tsx
const handleOpenBook = useCallback(() => {
  setActivating(true);
  setTimeout(() => {
    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setMode("reading");
      setFlipping(false);
      setActivating(false);
    }, 300);
  }, 150);
}, [playFlipSound]);
```

### 4. Replace ping circle with activation effect (lines 135-137)
Replace the always-visible ping circle with click-triggered glow:
```tsx
{activating && (
  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
    <div className="w-40 h-40 rounded-full bg-white/30 animate-ping" />
  </div>
)}
```

## What does NOT change
- MagicBook, FinalBook, ControlBar, FinalScreen, flip CSS, video logic

