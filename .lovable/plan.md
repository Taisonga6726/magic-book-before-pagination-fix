

# Plan: Replace weak effect with neon circular particles animation

## Changes

### 1. `src/pages/Index.tsx` — Replace introEffect block (lines 143-150)
Replace with spinning neon particle ring + soft central glow:
```tsx
{introEffect && (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    {/* soft central glow */}
    <div className="absolute w-24 h-24 rounded-full bg-yellow-300/30 blur-2xl" />
    {/* spinning particle ring */}
    <div className="absolute w-48 h-48 animate-[spinSlow_3s_linear_infinite]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(255,200,50,0.8)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_6px_rgba(255,200,50,0.6)]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-100 rounded-full shadow-[0_0_6px_rgba(255,200,50,0.6)]" />
      <div className="absolute top-[15%] right-[15%] w-1 h-1 bg-yellow-300/80 rounded-full" />
      <div className="absolute bottom-[15%] left-[15%] w-1 h-1 bg-white/70 rounded-full" />
    </div>
  </div>
)}
```

### 2. `src/index.css` — Replace particle keyframes (lines 402-413) with spinSlow
```css
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### No other changes
Drop-shadow on book, activating effect, handleOpenBook, video logic — all unchanged.

