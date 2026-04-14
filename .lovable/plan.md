

# Plan: Upgrade magic effect — strong glowing core + particles burst

## Changes to `src/pages/Index.tsx`

### 1. Replace introEffect block (lines 143-148)
Replace with enhanced multi-layered magic: bright white core, neon yellow glow, ping ring, outer blur sияние, and 3 particle sparks.

### 2. Update cover image (lines 149-150)
- Change scale from `scale-95` to `scale-90` for stronger entrance
- Add inline `style` with conditional `drop-shadow` glow when `introEffect` is true

### 3. No other changes
handleOpenBook, activating effect, flip animation, video logic, preload, all other components remain unchanged.

