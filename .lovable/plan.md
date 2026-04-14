

# Plan: Raise book position in reading screens

## Changes

### 1. `src/components/FinalBook.tsx` (line 213)
```tsx
// Before:
<div className="relative w-full h-full flex items-center justify-center">

// After:
<div className="relative w-full h-full flex items-end justify-center pb-20">
```

### 2. `src/components/MagicBook.tsx` (line 231)
```tsx
// Before:
<div className="relative w-full h-full flex items-center justify-center">

// After:
<div className="relative w-full h-full flex items-end justify-center pb-20">
```

### What does NOT change
- Preview screen, FinalScreen
- Text positions, images, object-contain, logos
- ControlBar, mode transitions, any logic

