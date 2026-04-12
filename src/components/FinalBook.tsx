import { useState, useCallback, useRef, useEffect } from "react";
import bookFinalImg from "@/assets/book-final.png";
import SpineEffect from "./SpineEffect";

interface Entry {
  word: string;
  description: string;
}

interface FinalBookProps {
  entries: Entry[];
  onBack: () => void;
}

const ENTRIES_PER_PAGE = 6;

const FinalBook = ({ entries, onBack }: FinalBookProps) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [burst, setBurst] = useState(false);
  const flipAudio = useRef<HTMLAudioElement | null>(null);

  // Initialize audio once
  useEffect(() => {
    flipAudio.current = new Audio("/page-flip.mp3");
    flipAudio.current.volume = 0.5;
  }, []);

  const playFlipSound = useCallback(() => {
    if (flipAudio.current) {
      flipAudio.current.currentTime = 0;
      flipAudio.current.play().catch(() => {});
    }
  }, []);

  // Each spread shows 2 pages (left + right), each page has ENTRIES_PER_PAGE entries
  const entriesPerSpread = ENTRIES_PER_PAGE * 2;
  const totalSpreads = Math.max(1, Math.ceil(entries.length / entriesPerSpread));
  const hasNext = currentSpread < totalSpreads - 1;
  const hasPrev = currentSpread > 0;

  const spreadStart = currentSpread * entriesPerSpread;
  const leftEntries = entries.slice(spreadStart, spreadStart + ENTRIES_PER_PAGE);
  const rightEntries = entries.slice(spreadStart + ENTRIES_PER_PAGE, spreadStart + entriesPerSpread);

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
        <span
          className="text-2xl font-bold"
          style={{ color: "#1a1440" }}
        >
          {globalIdx + 1}.
        </span>
        <span
          className="text-2xl leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            color: "#1a1440",
            textShadow: "0 0 10px hsl(var(--glow-purple) / 0.4), 0 0 3px hsl(var(--ink) / 0.2)",
          }}
        >
          {renderInkWord(entry.word)}
        </span>
      </div>
      {entry.description && (
        <div
          className="font-handwriting text-lg mt-0.5 ml-7"
          style={{ color: "#2a1f5a", textShadow: "0 0 4px hsl(var(--ink) / 0.15)" }}
        >
          — {entry.description}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`relative w-full max-w-[1100px] mx-auto magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}
      style={{
        aspectRatio: "1.5 / 1",
        maskImage: "radial-gradient(ellipse 95% 95% at center, black 55%, transparent 98%)",
        WebkitMaskImage: "radial-gradient(ellipse 95% 95% at center, black 55%, transparent 98%)",
      }}
    >
      {/* Inset shadow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 150px 80px rgba(0,0,0,0.9)", borderRadius: "8px" }}
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
        className="absolute font-handwriting no-scroll"
        style={{
          left: "18%", top: "18%", width: "22%", height: "60%",
          padding: "16px 24px 12px 32px",
          overflow: "hidden",
          perspective: "1200px",
        }}
      >
        <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "right center" }}>
          <div className="space-y-4">
            {leftEntries.map((entry, i) => renderEntry(entry, spreadStart + i))}
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
        className="absolute font-handwriting no-scroll"
        style={{
          left: "52%", top: "18%", width: "32%", height: "60%",
          padding: "16px 28px 12px 24px",
          overflow: "hidden", overflowWrap: "break-word", wordBreak: "break-word",
          perspective: "1200px",
        }}
      >
        <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "left center" }}>
          <div className="space-y-4">
            {rightEntries.map((entry, i) => renderEntry(entry, spreadStart + ENTRIES_PER_PAGE + i))}
          </div>
          {rightEntries.length === 0 && leftEntries.length > 0 && (
            <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
              
            </p>
          )}
        </div>
      </div>

      {/* Navigation — text actions */}
      <div className="absolute bottom-[12%] left-[18%] right-[14%] flex justify-between items-center z-20">
        {/* Left: back to book */}
        <span
          className="font-handwriting text-lg action-text cursor-pointer tracking-wider"
          onClick={handleBack}
        >
          ← к книге
        </span>

        {/* Right: page navigation */}
        <div className="flex items-center gap-4">
          {hasPrev && (
            <span
              className="font-handwriting text-xl action-text cursor-pointer tracking-wider"
              onClick={() => handleFlip("prev")}
            >
              ← назад
            </span>
          )}
          {hasNext && (
            <span
              className="font-handwriting text-xl action-text cursor-pointer tracking-wider"
              onClick={() => handleFlip("next")}
            >
              далее →
            </span>
          )}
        </div>
      </div>

      {/* Page indicator */}
      <div
        className="absolute bottom-[8%] right-[14%] font-handwriting text-xs z-20"
        style={{ color: "hsl(var(--ink) / 0.3)" }}
      >
        {currentSpread + 1} / {totalSpreads}
      </div>

      <img
        src="/src/assets/podpis.png"
        alt="Tanya Gaiduk"
        className="absolute w-44 z-20 pointer-events-none select-none"
        style={{
          bottom: "5%",
          right: "10%",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};

export default FinalBook;
