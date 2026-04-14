

# Plan: Refine magic effect — subtle particles + small focus ring

## Changes

### 1. `src/pages/Index.tsx` — Replace introEffect block (lines 143-156)
Remove all heavy layers (flash, big blurs, ping ring). Replace with:
```tsx
{introEffect && (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    <div className="absolute w-40 h-40 rounded-full border border-yellow-300/60 animate-pulse" />
    <div className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-[particleOut_0.8s_ease-out_forwards]" />
    <div className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-[particleOut2_0.8s_ease-out_0.1s_forwards]" />
    <div className="absolute w-2 h-2 bg-white rounded-full animate-[particleOut3_0.8s_ease-out_0.2s_forwards]" />
  </div>
)}
```

### 2. `src/pages/Index.tsx` — Reduce drop-shadow (line 159)
Change `40px` to `20px`:
```tsx
style={{ filter: introEffect ? "drop-shadow(0 0 20px rgba(255,200,100,0.6))" : "none" }}
```

### 3. `src/index.css` — Replace `@keyframes flash` (lines 402-404) with particle keyframes
```css
@keyframes particleOut {
  0% { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(-100px, -60px) scale(0.4); opacity: 0; }
}
@keyframes particleOut2 {
  0% { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(110px, -50px) scale(0.4); opacity: 0; }
}
@keyframes particleOut3 {
  0% { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(0px, 100px) scale(0.4); opacity: 0; }
}
```

### No other changes
Activating effect, handleOpenBook, video logic, cover image classes — all unchanged.

