import { useState, useCallback, useRef, useEffect } from "react";
const bookFinalImg = "/images/open-book.png";
import SpineEffect from "./SpineEffect";

interface Entry {
  word: string;
  description: string;
}

interface PageNav {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface FinalBookProps {
  entries: Entry[];
  onBack: () => void;
  onPageNav?: (nav: PageNav) => void;
}

const FinalBook = ({ entries, onBack, onPageNav }: FinalBookProps) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [burst, setBurst] = useState(false);
  const [pages, setPages] = useState<Entry[][]>([]);
  const flipAudio = useRef<HTMLAudioElement | null>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    flipAudio.current = new Audio("/page-flip.mp3");
    flipAudio.current.volume = 0.5;
  }, []);

  // Compute pages dynamically based on height measurement
  useEffect(() => {
    if (entries.length === 0) {
      setPages([]);
      return;
    }

    const computePages = () => {
      const container = leftPageRef.current;
      if (!container) {
        // Fallback: estimate 7 entries per page
        const fallback: Entry[][] = [];
        for (let i = 0; i < entries.length; i += 7) {
          fallback.push(entries.slice(i, i + 7));
        }
        setPages(fallback);
        return;
      }

      const style = getComputedStyle(container);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const availableHeight = container.clientHeight - paddingTop - paddingBottom;
      const contentWidth = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);

      // Measure entries using a hidden container
      const measureDiv = document.createElement("div");
      measureDiv.style.cssText = `position:fixed;visibility:hidden;top:-9999px;left:-9999px;width:${contentWidth}px;`;
      document.body.appendChild(measureDiv);

      const result: Entry[][] = [];
      let currentPageEntries: Entry[] = [];
      let currentHeight = 0;
      let globalIdx = 0;

      entries.forEach((entry) => {
        const el = document.createElement("div");
        el.style.marginBottom = "2px";
        el.innerHTML = `
          <div style="display:flex;align-items:baseline;gap:4px">
            <span style="font-size:1.5rem;font-weight:700;color:#1a1440">${globalIdx + 1}.</span>
            <span style="font-size:1.5rem;line-height:1.25;font-family:'Cormorant Garamond',serif;font-style:italic;color:#1a1440">${entry.word}</span>
          </div>
          ${entry.description ? `<div style="font-size:0.875rem;margin-top:0;margin-left:24px;color:#2a1f5a">— ${entry.description}</div>` : ""}
        `;
        measureDiv.appendChild(el);
        const h = el.offsetHeight + 4;
        measureDiv.removeChild(el);

        if (currentHeight + h > availableHeight && currentPageEntries.length > 0) {
          result.push(currentPageEntries);
          currentPageEntries = [entry];
          currentHeight = h;
        } else {
          currentPageEntries.push(entry);
          currentHeight += h;
        }
        globalIdx++;
      });

      if (currentPageEntries.length > 0) result.push(currentPageEntries);
      document.body.removeChild(measureDiv);
      setPages(result.length > 0 ? result : [[]]);
    };

    setTimeout(computePages, 100);
  }, [entries]);

  const playFlipSound = useCallback(() => {
    if (flipAudio.current) {
      flipAudio.current.currentTime = 0;
      flipAudio.current.play().catch(() => {});
    }
  }, []);

  // Each spread shows 2 pages (left + right)
  const totalSpreads = Math.max(1, Math.ceil(pages.length / 2));
  const hasNext = currentSpread < totalSpreads - 1;
  const hasPrev = currentSpread > 0;

  const handleFlipFromBar = useCallback((direction: "next" | "prev") => {
    if (flipping) return;
    if (direction === "next" && !hasNext) return;
    if (direction === "prev" && !hasPrev) return;
    playFlipSound();
    setFlipping(true);
    setBurst(false);
    requestAnimationFrame(() => setBurst(true));
    setTimeout(() => {
      setCurrentSpread((s) => direction === "next" ? s + 1 : s - 1);
      setFlipping(false);
      setBurst(false);
    }, 1000);
  }, [flipping, hasNext, hasPrev, playFlipSound]);

  useEffect(() => {
    onPageNav?.({
      hasPrev,
      hasNext,
      onPrev: () => handleFlipFromBar("prev"),
      onNext: () => handleFlipFromBar("next"),
    });
  }, [hasPrev, hasNext, onPageNav, handleFlipFromBar]);

  const leftPageIdx = currentSpread * 2;
  const rightPageIdx = currentSpread * 2 + 1;
  const leftEntries = pages[leftPageIdx] || [];
  const rightEntries = pages[rightPageIdx] || [];

  // Compute global start indices
  let leftGlobalStart = 0;
  for (let i = 0; i < leftPageIdx; i++) {
    leftGlobalStart += (pages[i]?.length || 0);
  }
  const rightGlobalStart = leftGlobalStart + leftEntries.length;

  const handleFlip = useCallback((direction: "next" | "prev") => {
    if (flipping) return;
    if (direction === "next" && !hasNext) return;
    if (direction === "prev" && !hasPrev) return;

    playFlipSound();
    setFlipping(true);
    setBurst(false);
    requestAnimationFrame(() => setBurst(true));

    setTimeout(() => {
      setCurrentSpread((s) => direction === "next" ? s + 1 : s - 1);
      setFlipping(false);
      setBurst(false);
    }, 1000);
  }, [flipping, hasNext, hasPrev, playFlipSound]);

  const handleBack = useCallback(() => {
    if (fadingOut || flipping) return;
    setTimeout(() => {
      setFlipping(true);
      playFlipSound();
      setBurst(false);
      requestAnimationFrame(() => setBurst(true));
      setTimeout(() => setFadingOut(true), 600);
      setTimeout(() => onBack(), 1500);
    }, 400);
  }, [fadingOut, flipping, playFlipSound, onBack]);

  const renderInkWord = (text: string) => (
    <span>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ opacity: 0.85 + Math.random() * 0.15 }}>{ch}</span>
      ))}
    </span>
  );

  const renderEntry = (entry: Entry, globalIdx: number) => (
    <div key={globalIdx} className="text-ink">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold" style={{ color: "#1a1440" }}>{globalIdx + 1}.</span>
        <span className="text-2xl leading-tight" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          color: "#1a1440",
          textShadow: "0 0 2px rgba(20,10,50,0.15)",
        }}>
          {renderInkWord(entry.word)}
        </span>
      </div>
      {entry.description && (
        <div className="font-handwriting text-sm ml-6" style={{ color: "#2a1f5a", textShadow: "0 0 2px rgba(20,10,50,0.1)" }}>
          — {entry.description}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
      <div className="relative w-full h-full flex items-center justify-center">
      <div
        className={`relative w-full h-full magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}
        style={{ transform: "translateY(-8%)" }}
      >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 80px 40px rgba(0,0,0,0.6)", borderRadius: "8px" }}
      />
      <img
        src={bookFinalImg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      <SpineEffect burst={burst} />

      {/* Left page */}
      <div
        ref={leftPageRef}
        className="absolute font-handwriting no-scroll z-20"
        style={{
          left: "12%", top: "14%", width: "36%", height: "70%",
          padding: "16px 20px 20px 20px",
          overflow: "hidden",
          perspective: "1200px",
        }}
      >
        <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "right center" }}>
          <div className="space-y-0.5">
            {leftEntries.map((entry, i) => renderEntry(entry, leftGlobalStart + i))}
          </div>
          {leftEntries.length === 0 && (
            <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
              Пустая страница
            </p>
          )}
        </div>
      </div>

      {/* Right page */}
      <div
        className="absolute font-handwriting no-scroll z-20"
        style={{
          left: "52%", top: "14%", width: "36%", height: "70%",
          padding: "16px 20px 20px 20px",
          overflow: "hidden", overflowWrap: "break-word", wordBreak: "break-word",
          perspective: "1200px",
        }}
      >
        <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "left center" }}>
          <div className="space-y-0.5">
            {rightEntries.map((entry, i) => renderEntry(entry, rightGlobalStart + i))}
          </div>
          {rightEntries.length === 0 && leftEntries.length > 0 && (
            <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
              {" "}
            </p>
          )}
        </div>
      </div>

      {/* Navigation buttons hidden — managed by ControlBar */}

      {/* Page indicator */}
      <div
        className="absolute bottom-[8%] right-[14%] font-handwriting text-xs z-20"
        style={{ color: "hsl(var(--ink) / 0.3)" }}
      >
        {currentSpread + 1} / {totalSpreads}
      </div>
    </div>
      </div>
    </div>
  );
};

export default FinalBook;
