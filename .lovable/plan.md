

# Plan: Fix text positioning and clickable reactions in FinalBook

## Changes

### 1. `src/components/FinalBook.tsx` — Adjust page container padding

**Left page** (line 114-118): Shrink container inward from ornament edges, shift text toward spine:
```
left: "20%", top: "22%", width: "27%", height: "54%",
padding: "16px 12px 16px 30px"
```
- `padding-left: 30px` — away from outer ornament
- `padding-right: 12px` — closer to spine (center)

**Right page** (line 126-130): Mirror asymmetry:
```
left: "53%", top: "22%", width: "27%", height: "54%",
padding: "16px 30px 16px 12px"
```
- `padding-left: 12px` — closer to spine
- `padding-right: 30px` — away from outer ornament

### 2. `src/components/FinalBook.tsx` — Make reactions clickable

Replace static `<span>` elements in `renderEntry` (lines 82-86) with clickable buttons:
```tsx
<div className="flex gap-4 mt-2 text-sm" style={{ color: "#2a1f5a" }}>
  <button type="button" onClick={() => updateReaction(globalIdx, "fire")} className="cursor-pointer hover:scale-110 transition-transform">🔥 {entry.reactions?.fire || 0}</button>
  <button type="button" onClick={() => updateReaction(globalIdx, "love")} className="cursor-pointer hover:scale-110 transition-transform">❤️ {entry.reactions?.love || 0}</button>
  <button type="button" onClick={() => updateReaction(globalIdx, "rocket")} className="cursor-pointer hover:scale-110 transition-transform">🚀 {entry.reactions?.rocket || 0}</button>
</div>
```

### 3. `src/components/FinalBook.tsx` — Ensure vignette doesn't block clicks

The vignette overlay (line 97-100) has `pointer-events-none` — already correct. The page containers have `pointer-events-auto` — also correct. No change needed here.

### Unchanged
- Container coordinates (left/top positions stay close to current)
- Book image, SpineEffect, animations
- Save logic, entry split logic
- Design, colors, fonts

