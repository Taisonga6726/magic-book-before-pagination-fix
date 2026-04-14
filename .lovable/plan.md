

# Plan: Screen restructure with 4 modes + flip sound/animation everywhere

## Overview
Restructure the app into 4 screen modes, add uploaded images, and ensure flip sound + animation on all transitions.

## Steps

### 1. Copy uploaded images to `public/images/`
- `cover-book.png`, `open-book.png`, `final-screen.png`

### 2. Create `src/components/FinalScreen.tsx`
- Simple component showing `/images/final-screen.png` with fade-in animation
- Props: `onBack: () => void`

### 3. Update `src/pages/Index.tsx`
- Change mode type to `"form" | "preview" | "reading" | "final"`
- Add `flipAudio` ref and `playFlipSound` function at Index level
- Add `flipping` state for cover→reading transition animation
- Add `handleOpenBook`: calls `playFlipSound()`, `setFlipping(true)`, then `setTimeout(() => { setMode("reading"); setFlipping(false); }, 300)`
- Rendering:
  - `"form"` → MagicBook (same as current "edit")
  - `"preview"` → clickable cover image (`/images/cover-book.png`), click calls `handleOpenBook`
  - `"reading"` → FinalBook (same as current "read")
  - `"final"` → FinalScreen

### 4. Update `src/components/FinalBook.tsx`
- Replace `bookFinalImg` import with `/images/open-book.png`
- Flip sound/animation already works on page navigation (confirmed in `handleFlip` and `handleFlipFromBar`) — no changes needed

### 5. Update `src/components/ControlBar.tsx`
- Change mode type to `"form" | "preview" | "reading" | "final"`
- `"form"` mode: show "внести слово", pagination, "читать книгу" (→ sets preview), "завершить"
- `"preview"` mode: show "внести слово" (→ form) only
- `"reading"` mode: show "внести слово" (→ form), pagination (with flip sound via existing pageNav), reaction buttons, "завершить" (→ final)
- `"final"` mode: same as current
- "продолжить чтение" concept = "далее →" button already calls `pageNav.onNext` which triggers `playFlipSound()` + `setFlipping(true)` inside FinalBook

## What does NOT change
- MagicBook component, word input, localStorage, duplicate checking
- FinalBook pagination logic and flip animation internals
- Entry structure

