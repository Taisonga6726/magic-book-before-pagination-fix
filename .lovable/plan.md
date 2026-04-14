

# Plan: Cleanup preview logic — remove videoSeen, fix CTA

## Current issues found
- `videoSeen` state exists (line 31) and is used in click guard (line 112), cursor (line 113), and CTA condition (line 130)
- Old CTA "ЧИТАТЬ КНИГУ" still renders on top of the book (line 134) — should be "КЛИКНИ" at top-10
- Preview is still a single block with layered video+image — not the two-state split from the approved plan

## Changes to `src/pages/Index.tsx`

### 1. Remove `videoSeen` state (line 31)
Delete: `const [videoSeen, setVideoSeen] = useState(false);`

### 2. Replace preview block (lines 109-139) with two separate states

**State 1 — Video (clean, no text, no click):**
```tsx
{mode === "preview" && !videoFinished && (
  <div className="fixed inset-0 w-screen h-screen scene-fade-in" style={{ zIndex: 50 }}>
    <video
      key="book-intro-video"
      src="/videos/book-intro.mp4"
      autoPlay
      playsInline
      preload="auto"
      onEnded={() => setVideoFinished(true)}
      className="w-full h-full object-contain select-none"
    />
  </div>
)}
```

**State 2 — Static cover + CTA (clickable):**
```tsx
{mode === "preview" && videoFinished && (
  <div
    className={`fixed inset-0 w-screen h-screen scene-fade-in ${flipping ? "page-flip-anim" : ""}`}
    onClick={() => handleOpenBook()}
    style={{ perspective: "1200px", zIndex: 50, cursor: "pointer" }}
  >
    <div className="absolute top-10 w-full text-center z-10">
      <span className="text-4xl md:text-6xl font-extrabold text-white animate-pulse select-none"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)" }}>
        КЛИКНИ
      </span>
    </div>
    <img src="/images/cover-book.png" alt="Обложка книги"
         className="w-full h-full object-contain select-none" draggable={false} />
  </div>
)}
```

### 3. Add test reset in onOpenCatalog (line 103)
Change `onOpenCatalog={() => setMode("preview")}` to:
```tsx
onOpenCatalog={() => { setVideoFinished(false); setMode("preview"); }}
```

## What does NOT change
- MagicBook, FinalBook, FinalScreen, ControlBar
- Flip animation, sound, project structure

