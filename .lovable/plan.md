

# Plan: Final book dictionary layout + green stats button

## Current State
- **FinalBook.tsx**: Already uses flex overlay with `inset-0` padding-based layout. Content is structured with `renderEntry`. Reactions are interactive buttons inside entries.
- **FinalScreen.tsx**: Already horizontal layout with two blocks. Uses `bg-black/40` for word count.
- **Index.tsx**: No emoji buttons found — already clean.

## Changes

### 1. `src/components/FinalBook.tsx` — Adjust page content containers

Replace current padding-based overlay (line 140) with the user's requested layout using `w-[68%]`, `mt-[14%]`, `mb-[12%]` margins instead of outer padding. Remove reaction buttons — make reactions display-only (no `<button>`, just text).

**Lines 140-165** — Replace overlay:
```tsx
<div className="absolute inset-0 flex z-20 pointer-events-auto">
  <div className="w-1/2 flex justify-center">
    <div className="w-[68%] mt-[14%] mb-[12%] flex flex-col gap-6 overflow-hidden">
      {leftEntries.map((entry, i) => renderEntry(entry, start + i))}
      {leftEntries.length === 0 && (
        <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>Пустая страница</p>
      )}
    </div>
  </div>
  <div className="w-1/2 flex justify-center">
    <div className="w-[68%] mt-[14%] mb-[12%] flex flex-col gap-6 overflow-hidden">
      {rightEntries.map((entry, i) => renderEntry(entry, start + ITEMS_PER_PAGE + i))}
    </div>
  </div>
</div>
```

**Lines 101-117** — Simplify `renderEntry` to display-only (no buttons):
```tsx
const renderEntry = (entry: Entry, globalIdx: number) => (
  <div key={globalIdx} className="flex flex-col">
    <div className="border-b border-black/30 pb-1 text-lg font-semibold"
         style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
      {globalIdx + 1}. {renderInkWord(entry.word)}
    </div>
    {entry.description && (
      <div className="mt-1 text-sm opacity-80 font-handwriting" style={{ color: "#2a1f5a" }}>
        — {entry.description}
      </div>
    )}
    <div className="flex gap-4 mt-2 text-sm" style={{ color: "#2a1f5a" }}>
      🔥 {entry.reactions?.fire || 0}  ❤️ {entry.reactions?.love || 0}  🚀 {entry.reactions?.rocket || 0}
    </div>
  </div>
);
```

### 2. `src/components/FinalScreen.tsx` — Green word count button

**Lines 27-36** — Replace word count block with green gradient style:
```tsx
<div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white pointer-events-none">
  <div className="px-6 py-3 rounded-xl text-lg font-semibold"
       style={{
         background: "linear-gradient(135deg, #22c55e, #4ade80)",
         color: "#022c22",
         boxShadow: "0 0 20px rgba(34,197,94,0.4)"
       }}>
    Всего слов: {entries.length}
  </div>
  <div className="flex items-center gap-5 px-5 py-3 rounded-xl bg-black/30 backdrop-blur-md text-2xl">
    <div>🔥 {totalFire}</div>
    <div>❤️ {totalLove}</div>
    <div>🚀 {totalRocket}</div>
  </div>
</div>
```

### 3. `src/pages/Index.tsx` — No changes needed
Already clean, no emoji buttons.

### Unchanged
- Pagination constants, flip animations, spine effect, backgrounds, data flow, page counter

