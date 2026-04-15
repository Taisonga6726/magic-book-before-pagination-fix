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
  console.log("FinalBook entries:", entries.length, entries);
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
    <div key={globalIdx} className="flex flex-col">
      <div className="border-b border-black/30 pb-1 text-lg font-semibold"
           style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
        {globalIdx + 1}. {renderInkWord(entry.word)}
      </div>
      {entry.description && (
        <div className="mt-1 text-sm opacity-80 font-handwriting" style={{ color: "#2a1f5a" }}>
          — {entry.description}
        </div>
      )}
      <div className="flex gap-4 mt-2 text-sm" style={{ color: "#2a1f5a" }}>
        <span>🔥 {entry.reactions?.fire || 0}</span>
        <span>❤️ {entry.reactions?.love || 0}</span>
        <span>🚀 {entry.reactions?.rocket || 0}</span>
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

      {/* Page content overlay */}
      <div className="absolute inset-0 flex z-20 pointer-events-auto">
        {/* Left page */}
        <div className="w-1/2 flex justify-center">
          <div className="w-[68%] mt-[14%] mb-[12%] flex flex-col gap-6 overflow-hidden">
            <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "right center" }}>
              {leftEntries.map((entry, i) => renderEntry(entry, start + i))}
              {leftEntries.length === 0 && (
                <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>Пустая страница</p>
              )}
            </div>
          </div>
        </div>
        {/* Right page */}
        <div className="w-1/2 flex justify-center">
          <div className="w-[68%] mt-[14%] mb-[12%] flex flex-col gap-6 overflow-hidden">
            <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "left center" }}>
              {rightEntries.map((entry, i) => renderEntry(entry, start + ITEMS_PER_PAGE + i))}
              {rightEntries.length === 0 && leftEntries.length > 0 && <p> </p>}
            </div>
          </div>
        </div>
        {/* Page counter */}
        <div className="absolute bottom-4 right-8 font-handwriting text-xs" style={{ color: "hsl(var(--ink) / 0.3)" }}>
          {currentSpread + 1} / {totalSpreads}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default FinalBook;