

# Plan: Final UI polish — stats layout + remove top overlap

## Analysis
- ✅ `src/pages/Index.tsx` has NO old bottom reaction buttons — clean
- ❌ `src/components/FinalScreen.tsx` currently centers stats (lines 27-38), which overlaps the "VIBE CODER" title at the top

## Changes

### 1. `src/components/FinalScreen.tsx` — Move stats to bottom with two separate blocks (lines 27-38)

Replace the centered overlay with bottom-aligned layout:

```tsx
<div className="absolute inset-0 flex flex-col justify-end items-center pb-24 text-white pointer-events-none">
  {/* Word count block */}
  <div className="mb-6 px-6 py-3 rounded-xl bg-black/30 backdrop-blur-md text-2xl">
    Всего слов: {entries.length}
  </div>

  {/* Reactions block */}
  <div className="px-8 py-4 rounded-2xl bg-black/30 backdrop-blur-md">
    <div className="text-sm mb-2 opacity-80 text-center">
      Реакции
    </div>
    <div className="flex gap-10 text-4xl justify-center">
      <div>🔥 {totalFire}</div>
      <div>❤️ {totalLove}</div>
      <div>🚀 {totalRocket}</div>
    </div>
  </div>
</div>
```

**Result:**
- Stats move to bottom with `pb-24` spacing
- Two separate glassmorphism blocks (black/30 + backdrop-blur)
- No overlap with title
- Clean visual hierarchy: title → image → stats

