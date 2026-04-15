

# Plan: Final alignment inside ornament + page numbers in corners

## Changes in `src/components/FinalBook.tsx`

### 1. Shift content down & tighten height (lines 141, 156)

**Left page:**
```
left: 15% → 16%
top: 25% → 29%
width: 28% → 27%
height: 47% → 43%
padding: 20px 20px 30px 25px → 10px 15px 28px 20px
```

**Right page:**
```
left: 55% → 56%
top: 25% → 29%
width: 28% → 27%
height: 47% → 43%
padding: 20px 25px 30px 20px → 10px 20px 28px 15px
```

### 2. Page numbers — corners instead of center (lines 146-149, 161-165)

**Left page** — bottom-left corner:
```tsx
<div className="absolute bottom-[4px] left-[8px] select-none"
     style={{ color: "#0f0a2a", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "15px", opacity: 0.9, letterSpacing: "1px" }}>
  — {leftPageNum} —
</div>
```

**Right page** — bottom-right corner:
```tsx
<div className="absolute bottom-[4px] right-[8px] select-none"
     style={{ color: "#0f0a2a", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "15px", opacity: 0.9, letterSpacing: "1px" }}>
  — {rightPageNum} —
</div>
```

Remove the pill background span — just plain number text in the corner, like a real book.

### 3. Compact entries (renderEntry, lines 93-110)

- Remove `border-b` from word line — cleaner look
- Reduce word size: `text-base` → `text-sm`
- Reactions: `text-xs` → `text-[10px]`, tighter gap `gap-3` → `gap-2`
- Entry margin: `mb-0.5` stays
- Description: keep `text-xs`, add `mt-0` explicitly

Result: notebook-style entries, 4 fit comfortably in 43% height.

