

# Plan: Position word list inside book pages

## Root Cause

FinalBook renders content in a fullscreen overlay (`absolute inset-0 flex` with `w-1/2` columns). The book image uses `object-contain`, so the actual paper area is smaller than the viewport. The content ends up aligned to the screen edges, not to the book pages.

MagicBook already solves this correctly — it uses absolute positioning with percentage coordinates that match the book's paper zones:
- Left page: `left: 18%, top: 20%, width: 30%, height: 58%`
- Right page: `left: 52%, top: 18%, width: 36%, height: 60%`

## Change

### `src/components/FinalBook.tsx` — Replace fullscreen overlay with page-bound containers

**Remove** (lines 110-124):
```tsx
<div className="absolute inset-0 flex z-20 pointer-events-auto">
  <div className="w-1/2 flex justify-center">
    <div className="w-[68%] mt-[14%] mb-[12%] ...">
      ...
    </div>
  </div>
  <div className="w-1/2 flex justify-center">
    ...
  </div>
</div>
```

**Replace with** two absolute containers matching MagicBook's geometry:
```tsx
{/* Left page */}
<div
  className="absolute z-20 overflow-y-auto pointer-events-auto"
  style={{
    left: "18%", top: "20%", width: "30%", height: "58%",
    padding: "10px 14px 10px 24px",
    scrollbarWidth: "none",
  }}
>
  {leftEntries.map((entry, i) => renderEntry(entry, i))}
</div>

{/* Right page */}
<div
  className="absolute z-20 overflow-y-auto pointer-events-auto"
  style={{
    left: "52%", top: "18%", width: "36%", height: "60%",
    padding: "12px 20px 10px 20px",
    scrollbarWidth: "none",
  }}
>
  {rightEntries.map((entry, i) => renderEntry(entry, splitIndex + i))}
</div>
```

### Nothing else changes
- Entry split logic stays the same
- `renderEntry` stays the same
- Book image, vignette, SpineEffect, audio — untouched
- Save logic in MagicBook — untouched

