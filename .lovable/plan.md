

# Plan: Fix word visibility in book + button animation

## Root Cause

The data flow is correct — words ARE being saved to `entries[]`. The problem is the **mode transition**: clicking "📖 читать книгу" goes to `preview` mode (plays video intro), then requires clicking the cover to reach `reading` mode where FinalBook renders. Words are there but the user may not be reaching reading mode.

Additionally, if the user has already seen the intro, repeating the video each time is unnecessary.

## Changes

### 1. `src/components/ControlBar.tsx` — Skip video, go straight to reading

Change the "📖 читать книгу" button in form mode to set mode to `"reading"` instead of `"preview"`, so the user sees their words immediately without re-watching the video intro.

### 2. `src/components/NeonGlassButton.tsx` — Add accent variant

Add an optional `accent` boolean prop that applies a purple-to-pink gradient background with a pulsing glow animation for the "✏️ внести слово" button.

### 3. `src/components/ControlBar.tsx` — Apply accent to "внести слово"

Pass `accent` prop to the "✏️ внести слово" button in all modes.

### 4. `src/index.css` — Add neon-pulse keyframe

```css
@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 15px rgba(168,85,247,0.4); }
  50% { box-shadow: 0 0 25px rgba(168,85,247,0.8); }
}
```

### Unchanged
- FinalBook layout (already correct structured flex)
- entries state & data flow (already working)
- Pagination, flip animations, spine effect

