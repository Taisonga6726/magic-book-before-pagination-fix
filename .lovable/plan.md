

# Plan: Fix book content — structured list layout

## Changes

### 1. `src/components/FinalBook.tsx` — Replace absolute page containers with flex layout

**Lines 153-195**: Replace both left and right page `<div>` containers. Remove `absolute` positioning with manual `left/top/width/height` styles. Instead, overlay a single flex container over the book image:

```tsx
{/* Page content overlay */}
<div className="absolute inset-0 flex z-20" style={{ padding: "14% 12% 18% 12%" }}>
  {/* Left page */}
  <div className="w-1/2 h-full flex justify-center overflow-hidden">
    <div className="w-[80%] flex flex-col gap-5">
      <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "right center" }}>
        {leftEntries.map((entry, i) => renderEntry(entry, start + i))}
        {leftEntries.length === 0 && (
          <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>Пустая страница</p>
        )}
      </div>
    </div>
  </div>
  {/* Right page */}
  <div className="w-1/2 h-full flex justify-center overflow-hidden">
    <div className="w-[80%] flex flex-col gap-5">
      <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "left center" }}>
        {rightEntries.map((entry, i) => renderEntry(entry, start + ITEMS_PER_PAGE + i))}
        {rightEntries.length === 0 && leftEntries.length > 0 && <p> </p>}
      </div>
    </div>
  </div>
</div>
```

**Lines 101-131** — Update `renderEntry` to use structured form-like layout:

```tsx
const renderEntry = (entry: Entry, globalIdx: number) => (
  <div key={globalIdx} className="flex flex-col">
    <div className="text-lg font-semibold border-b border-black/20 pb-1" style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
      {globalIdx + 1}. {renderInkWord(entry.word)}
    </div>
    {entry.description && (
      <div className="text-sm mt-1 opacity-80 font-handwriting" style={{ color: "#2a1f5a" }}>
        — {entry.description}
      </div>
    )}
    <div className="flex gap-4 mt-1.5 text-sm">
      <button onClick={() => updateReaction(globalIdx, "fire")} className="opacity-70 hover:opacity-100" style={{ background: "none", border: "none", cursor: "pointer" }}>🔥 {entry.reactions?.fire || 0}</button>
      <button onClick={() => updateReaction(globalIdx, "love")} className="opacity-70 hover:opacity-100" style={{ background: "none", border: "none", cursor: "pointer" }}>❤️ {entry.reactions?.love || 0}</button>
      <button onClick={() => updateReaction(globalIdx, "rocket")} className="opacity-70 hover:opacity-100" style={{ background: "none", border: "none", cursor: "pointer" }}>🚀 {entry.reactions?.rocket || 0}</button>
    </div>
  </div>
);
```

**Also move page counter** inside the new flex overlay container.

### 2. `src/components/FinalScreen.tsx` — Make word count block bigger

Line 28: increase text size from `text-xl` to `text-2xl` and add more padding. Reactions block stays `text-2xl` (down from `text-3xl`) so word count is visually dominant.

### 3. `src/pages/Index.tsx` — Already clean, no emoji buttons to remove

### Unchanged
- Animations, flip logic, spine effect, backgrounds, pagination constants, book image

