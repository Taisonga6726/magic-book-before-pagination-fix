

# Plan: Fix video layer — stack video and image, no conditional swap

## Change in `src/pages/Index.tsx` (lines 115-131)

Replace the conditional `!videoSeen ? <video> : <img>` with both elements always rendered, image layered on top and shown only after video ends:

```tsx
<video
  src="/videos/book-intro.mp4"
  autoPlay
  playsInline
  onEnded={() => { setVideoFinished(true); setVideoSeen(true); }}
  className="absolute inset-0 w-full h-full object-contain select-none"
/>
{videoFinished && (
  <img
    src="/images/cover-book.png"
    alt="Обложка книги"
    className="absolute inset-0 w-full h-full object-contain select-none"
    draggable={false}
  />
)}
```

Both use `absolute inset-0` so they stack. Video plays underneath; image appears on top instantly when done — no flicker, no black frame.

## What does NOT change
- CTA "КЛИКНИ !!!" text and styling (keeping current text — plan from previous message not yet applied)
- Click logic, reset for testing, sound settings
- MagicBook, FinalBook, ControlBar, everything else

