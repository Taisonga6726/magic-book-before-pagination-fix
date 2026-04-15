import { useCallback, useRef, useEffect, useState } from "react";
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

const ITEMS_PER_PAGE = 4;
const ITEMS_PER_SPREAD = 8;

const FinalBook = ({ entries, setEntries, onBack, onPageNav }: FinalBookProps) => {
  const flipAudio = useRef<HTMLAudioElement | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);

  useEffect(() => {
    flipAudio.current = new Audio("/page-flip.mp3");
    flipAudio.current.volume = 0.5;
  }, []);

  // Auto-navigate to spread containing the last entry
  useEffect(() => {
    if (entries.length > 0) {
      const lastSpread = Math.floor((entries.length - 1) / ITEMS_PER_SPREAD);
      setCurrentSpread(lastSpread);
    }
  }, [entries.length]);

  const playFlipSound = useCallback(() => {
    if (flipAudio.current) {
      flipAudio.current.currentTime = 0;
      flipAudio.current.play().catch(() => {});
    }
  }, []);

  // Wire page nav to ControlBar
  useEffect(() => {
    const totalSpreads = Math.max(1, Math.ceil(entries.length / ITEMS_PER_SPREAD));
    onPageNav?.({
      hasPrev: currentSpread > 0,
      hasNext: currentSpread < totalSpreads - 1,
      onPrev: () => { playFlipSound(); setCurrentSpread(s => s - 1); },
      onNext: () => { playFlipSound(); setCurrentSpread(s => s + 1); },
    });
  }, [currentSpread, entries.length, onPageNav, playFlipSound]);

  const handleBack = useCallback(() => {
    playFlipSound();
    setTimeout(() => onBack(), 400);
  }, [playFlipSound, onBack]);

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

  // Pagination: slice for current spread
  const spreadStart = currentSpread * ITEMS_PER_SPREAD;
  const spreadEntries = entries.slice(spreadStart, spreadStart + ITEMS_PER_SPREAD);
  const leftPageEntries = spreadEntries.slice(0, ITEMS_PER_PAGE);
  const rightPageEntries = spreadEntries.slice(ITEMS_PER_PAGE);

  const leftPageNum = currentSpread * 2 + 1;
  const rightPageNum = currentSpread * 2 + 2;

  const renderEntry = (entry: Entry, globalIdx: number) => (
    <div key={globalIdx} className="flex flex-col mb-1">
      <div className="border-b border-black/30 pb-0.5 text-base font-semibold leading-tight"
           style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
        {globalIdx + 1}. {renderInkWord(entry.word)}
      </div>
      {entry.description && (
        <div className="text-xs opacity-80 font-handwriting leading-tight" style={{ color: "#2a1f5a" }}>
          — {entry.description}
        </div>
      )}
      <div className="flex gap-3 text-xs justify-end" style={{ color: "#2a1f5a" }}>
        <button type="button" onClick={() => updateReaction(globalIdx, "fire")} className="cursor-pointer hover:scale-110 transition-transform">🔥 {entry.reactions?.fire || 0}</button>
        <button type="button" onClick={() => updateReaction(globalIdx, "love")} className="cursor-pointer hover:scale-110 transition-transform">❤️ {entry.reactions?.love || 0}</button>
        <button type="button" onClick={() => updateReaction(globalIdx, "rocket")} className="cursor-pointer hover:scale-110 transition-transform">🚀 {entry.reactions?.rocket || 0}</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
      <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-full h-full magic-cursor scene-fade-in"
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

      <SpineEffect burst={false} />

      {/* Left page */}
      <div
        className="absolute z-20 overflow-hidden pointer-events-auto flex flex-col gap-0"
        style={{
          left: "20%", top: "22%", width: "27%", height: "54%",
          padding: "12px 10px 20px 28px",
        }}
      >
        {leftPageEntries.map((entry, i) => renderEntry(entry, spreadStart + i))}
        <div className="mt-auto text-center text-xs opacity-40 select-none"
             style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif" }}>
          — {leftPageNum} —
        </div>
      </div>

      {/* Right page */}
      <div
        className="absolute z-20 overflow-hidden pointer-events-auto flex flex-col gap-0"
        style={{
          left: "53%", top: "22%", width: "27%", height: "54%",
          padding: "12px 28px 20px 10px",
        }}
      >
        {rightPageEntries.map((entry, i) => renderEntry(entry, spreadStart + ITEMS_PER_PAGE + i))}
        {rightPageEntries.length > 0 && (
          <div className="mt-auto text-center text-xs opacity-40 select-none"
               style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif" }}>
            — {rightPageNum} —
          </div>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default FinalBook;
