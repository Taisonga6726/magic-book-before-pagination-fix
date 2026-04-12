

# Plan: Neon glow button style with animated border

## Reference

The uploaded image shows a pill-shaped button with:
- Deep purple/blue translucent fill matching the cosmic background
- A glowing cyan-blue border with a light that travels around the perimeter (animated rotating highlight)
- Rounded pill shape (border-radius ~999px)

## Changes

### `src/components/NeonGlassButton.tsx`

Restyle the button to match the reference:
- **Background**: `rgba(80, 40, 160, 0.35)` — deeper purple tint instead of white
- **Border-radius**: `999px` (full pill shape)
- **Border**: `2px solid rgba(100, 160, 255, 0.5)` — cyan-blue glow border
- **Box-shadow**: layered cyan + purple glow: `0 0 15px rgba(100,160,255,0.4), 0 0 30px rgba(138,92,246,0.2), inset 0 0 20px rgba(100,160,255,0.1)`
- **Animated border glow**: Add a CSS `@keyframes` animation using a `::before` pseudo-element with a `conic-gradient` that rotates, creating the "light traveling around the border" effect. Since inline styles can't do pseudo-elements, this will be implemented via a Tailwind `className` approach with a `<style>` tag or by adding keyframes to `src/index.css`.

### `src/index.css`

Add keyframes and a utility class for the rotating border glow:
```css
@keyframes neon-border-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.neon-btn-glow {
  position: relative;
  overflow: hidden;
}
.neon-btn-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(from 0deg, transparent 60%, rgba(100,180,255,0.8) 80%, transparent 100%);
  animation: neon-border-spin 3s linear infinite;
  z-index: -1;
}
```

### `src/components/ControlBar.tsx`

Update the container background to be slightly more translucent purple to match the cosmic theme: `rgba(30, 15, 60, 0.5)`.

## What does NOT change
- Button text, click handlers, modes — all stay the same
- ControlBar layout and positioning — same
- MagicBook, FinalBook, Index — untouched

