import { useCallback, useRef, useEffect } from "react";
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

const FinalBook = ({ entries, setEntries, onBack, onPageNav }: FinalBookProps) => {
  const flipAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    flipAudio.current = new Audio("/page-flip.mp3");
    flipAudio.current.volume = 0.5;
  }, []);

  // Clear page nav since no pagination in this simplified version
  useEffect(() => {
    onPageNav?.({ hasPrev: false, hasNext: false, onPrev: () => {}, onNext: () => {} });
  }, [onPageNav]);

  const playFlipSound = useCallback(() => {
    if (flipAudio.current) {
      flipAudio.current.currentTime = 0;
      flipAudio.current.play().catch(() => {});
    }
  }, []);

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

  // Split entries into two columns: left and right pages
  const splitIndex = Math.ceil(entries.length / 2);
  const leftEntries = entries.slice(0, splitIndex);
  const rightEntries = entries.slice(splitIndex);

  const renderEntry = (entry: Entry, globalIdx: number) => (
    <div key={globalIdx} className="flex flex-col mb-4">
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

      {/* Page content overlay */}
      <div className="absolute inset-0 flex z-20 pointer-events-auto">
        {/* Left page */}
        <div className="w-1/2 flex justify-center">
          <div className="w-[68%] mt-[14%] mb-[12%] flex flex-col gap-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {leftEntries.map((entry, i) => renderEntry(entry, i))}
          </div>
        </div>
        {/* Right page */}
        <div className="w-1/2 flex justify-center">
          <div className="w-[68%] mt-[14%] mb-[12%] flex flex-col gap-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {rightEntries.map((entry, i) => renderEntry(entry, splitIndex + i))}
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default FinalBook;
