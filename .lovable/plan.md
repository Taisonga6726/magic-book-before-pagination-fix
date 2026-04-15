

# Plan: Shift ControlBar to the left

The ControlBar is currently centered with `left: 50%` + `translateX(-50%)`. The user wants it shifted left to avoid overlapping the copyright text.

## Change

**`src/components/ControlBar.tsx` (line 26-27)** — Change `left: "50%"` to `left: "42%"` to shift the bar leftward while keeping it visually balanced.

