

# Plan: Update cover image and adjust vertical offset

## Changes

### 1. Replace cover image
Copy uploaded image to `public/images/cover-book.png`, replacing the existing file.

### 2. `src/components/FinalBook.tsx` (line 216)
```tsx
// Before:
style={{ transform: "translateY(-8%)" }}
// After:
style={{ transform: "translateY(-3%)" }}
```

### 3. `src/components/MagicBook.tsx` (line 232)
```tsx
// Before:
style={{ transform: "translateY(-8%)" }}
// After:
style={{ transform: "translateY(-3%)" }}
```

### What does NOT change
- Logic, structure, ControlBar, animations, other images

