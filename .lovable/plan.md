

# Plan: Video intro plays once, then static preview + open book

## Changes

### 1. Copy video asset
Copy `user-uploads://ГРОК_читать_книгу_03.mp4` → `public/videos/book-intro.mp4`

### 2. `src/pages/Index.tsx`

**Add states** after existing state declarations:
```tsx
const [videoFinished, setVideoFinished] = useState(false);
const [videoSeen, setVideoSeen] = useState(false);
```

**Replace preview block** (lines 107-119) with conditional video/static rendering:

```tsx
{mode === "preview" && (
  <div
    className={`fixed inset-0 w-screen h-screen scene-fade-in ${flipping ? "page-flip-anim" : ""}`}
    onClick={() => { if (videoFinished || videoSeen) handleOpenBook(); }}
    style={{ perspective: "1200px", zIndex: 50, cursor: (videoFinished || videoSeen) ? "pointer" : "default" }}
  >
    {!videoSeen ? (
      <video
        src="/videos/book-intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => { setVideoFinished(true); setVideoSeen(true); }}
        className="relative w-full h-full object-contain select-none"
      />
    ) : (
      <img
        src="/images/cover-book.png"
        alt="Обложка книги"
        className="relative w-full h-full object-contain select-none"
        draggable={false}
      />
    )}
    {(videoFinished || videoSeen) && (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl md:text-5xl font-bold text-white cursor-pointer select-none"
              style={{ textShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)" }}>
          ЧИТАТЬ КНИГУ
        </span>
      </div>
    )}
  </div>
)}
```

**No reset** — `onOpenCatalog` stays as `() => setMode("preview")` without resetting video state. Video plays only once per session.

### What does NOT change
- MagicBook, FinalBook, FinalScreen, ControlBar
- Pagination, localStorage, animations, flip sound logic

