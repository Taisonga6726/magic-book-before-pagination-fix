

# Plan: Fine-tune FinalBook left page positioning

## Current Issue
From the live screenshot: entries on the left page start too high — "1. Вайбкодинг" touches/overlaps the top ornament border. The left edge is also tight.

## Changes in `src/components/FinalBook.tsx`

### Left page container (line 177)
- `top: "18%"` → `"20%"` — push text down away from top ornament
- `height: "60%"` → `"56%"` — reduce height to keep text away from bottom ornament too
- Keep `left: "22%"`, `width: "24%"`, `padding: "12px 8px 40px 12px"` — horizontal alignment looked good

### Right page (lines 192-193)
No changes — right page is empty on this test but its MagicBook-matched coordinates should be correct.

## Result
Text on the left page will have visible clearance from the top ornament, matching the visual balance of the right page.

