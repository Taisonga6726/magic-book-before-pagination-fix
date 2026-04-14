

# Plan: Fix fullscreen layout — use transform instead of flex alignment

## Changes

### 1. `src/components/FinalBook.tsx` (line 213)
```tsx
// Before:
<div className="relative w-full h-full flex items-end justify-center pb-20">

// After:
<div className="relative w-full h-full flex items-center justify-center">
```

### 2. `src/components/FinalBook.tsx` (line 215)
```tsx
// Before:
className={`relative w-full h-full magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}

// After:
className={`relative w-full h-full magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}
style={{ transform: "translateY(-8%)" }}
```

### 3. `src/components/MagicBook.tsx` (line 231)
```tsx
// Before:
<div className="relative w-full h-full flex items-end justify-center pb-20">

// After:
<div className="relative w-full h-full flex items-center justify-center">
```

### 4. `src/components/MagicBook.tsx` (line 232)
```tsx
// Before:
<div className="relative w-full h-full magic-cursor">

// After:
<div className="relative w-full h-full magic-cursor" style={{ transform: "translateY(-8%)" }}>
```

### What does NOT change
- Logic, text, images, ControlBar, animations

