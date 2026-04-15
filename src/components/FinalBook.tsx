import { useState, useCallback, useRef, useEffect } from "react";
const bookFinalImg = "/images/open-book.png";
import SpineEffect from "./SpineEffect";

interface Entry {
  word: string;
  description: string;
  reactions: { fire: number; love: number; rocket: number };
}

interface PageNav {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface FinalBookProps {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  onBack: () => void;
  onPageNav?: (nav: PageNav) => void;
}

const ITEMS_PER_PAGE = 3;
const ITEMS_PER_SPREAD = ITEMS_PER_PAGE * 2;

const FinalBook = ({ entries, setEntries, onBack, onPageNav }: FinalBookProps) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [burst, setBurst] = useState(false);
  const flipAudio = useRef<HTMLAudioElement | null>(null);

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

  const totalSpreads = Math.max(1, Math.ceil(entries.length / ITEMS_PER_SPREAD));
  const hasNext = currentSpread < totalSpreads - 1;
  const hasPrev = currentSpread > 0;

  const start = currentSpread * ITEMS_PER_SPREAD;
  const leftEntries = entries.slice(start, start + ITEMS_PER_PAGE);
  const rightEntries = entries.slice(start + ITEMS_PER_PAGE, start + ITEMS_PER_SPREAD);

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

  const updateReaction = useCallback((globalIdx: number, type: "fire" | "love" | "rocket") => {
    setEntries((prev) =>
      prev.map((w, i) =>
        i === globalIdx ? { ...w, reactions: { ...w.reactions, [type]: (w.reactions?.[type] || 0) + 1 } } : w
      )
    );
  }, [setEntries]);

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
      <div className="mt-1 flex gap-3">
        <button onClick={() => updateReaction(globalIdx, "fire")} className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ background: "none", border: "none", cursor: "pointer" }}>
          🔥 {entry.reactions?.fire || 0}
        </button>
        <button onClick={() => updateReaction(globalIdx, "love")} className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ background: "none", border: "none", cursor: "pointer" }}>
          ❤️ {entry.reactions?.love || 0}
        </button>
        <button onClick={() => updateReaction(globalIdx, "rocket")} className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ background: "none", border: "none", cursor: "pointer" }}>
          🚀 {entry.reactions?.rocket || 0}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
      <div className="relative w-full h-full flex items-center justify-center">
      <div
        className={`relative w-full h-full magic-cursor scene-fade-in ${fadingOut ? "scene-fade-out" : ""}`}
        style={{ transform: "translateY(-3%)" }}
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
        className="absolute font-handwriting no-scroll z-20"
        style={{
          left: "12%", top: "16%", width: "36%", height: "66%",
          padding: "16px 20px 20px 20px",
          overflow: "hidden",
          perspective: "1200px",
        }}
      >
        <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "right center" }}>
          <div className="space-y-0.5">
            {leftEntries.map((entry, i) => renderEntry(entry, start + i))}
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
          left: "52%", top: "16%", width: "36%", height: "66%",
          padding: "16px 20px 20px 20px",
          overflow: "hidden", overflowWrap: "break-word", wordBreak: "break-word",
          perspective: "1200px",
        }}
      >
        <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "left center" }}>
          <div className="space-y-0.5">
            {rightEntries.map((entry, i) => renderEntry(entry, start + ITEMS_PER_PAGE + i))}
          </div>
          {rightEntries.length === 0 && leftEntries.length > 0 && (
            <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
              {" "}
            </p>
          )}
        </div>
      </div>

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