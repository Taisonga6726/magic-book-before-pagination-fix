

# Plan: Align entries within ornament & shift reactions right

## Problem
From the screenshot: right page entries overflow past the right ornament border. Reactions (🔥❤️🚀) are aligned left but should be pushed right.

## Changes in `src/components/FinalBook.tsx`

### 1. Right page — narrow and pull away from right ornament (line 156)
```
left: "52%" → "53%"
width: "24%" → "21%"
padding: "8px 14px 28px 2px" → "8px 10px 28px 4px"
```
Narrower width + more right padding keeps text from hitting the right ornament.

### 2. Left page — slight width reduction (line 141)
```
width: "18%" → "17%"
```
Tighter to avoid touching left ornament edge.

### 3. Reactions — align right instead of left (line 104)
```
justify-start → justify-end
```
Reactions shift to the right side of each entry.

No other changes — vertical positioning stays at `top: 32%`, `height: 40%`.

