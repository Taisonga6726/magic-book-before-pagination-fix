

# Plan: Fix FinalBook text layout — expand, center, remove clipping

## Changes in `src/components/FinalBook.tsx`

### 1. Expand page containers and center text (lines 237-242, 259-263)

**Left page** (line 238):
```
left: "18%" → "12%"
width: "30%" → "36%"
top: "20%" → "14%"
height: "58%" → "70%"
padding: "10px 14px 40px 24px" → "16px 20px 20px 20px"
```

**Right page** (line 260):
```
left: "52%" → "52%"
width: "34%" → "36%"
top: "20%" → "14%"
height: "58%" → "70%"
padding: "10px 18px 40px 18px" → "16px 20px 20px 20px"
```

### 2. Remove radial mask (lines 214-218)

Delete the `maskImage` and `WebkitMaskImage` properties from the outer container style.

### 3. Reduce vignette shadow (line 222)

```
box-shadow: "inset 0 0 150px 80px rgba(0,0,0,0.9)"
→
box-shadow: "inset 0 0 80px 40px rgba(0,0,0,0.6)"
```

### What does NOT change
- Word size (`text-2xl`), description size (`text-sm`)
- Pagination logic, entries, localStorage
- MagicBook, Index, ControlBar
- Animations, sound, SpineEffect

