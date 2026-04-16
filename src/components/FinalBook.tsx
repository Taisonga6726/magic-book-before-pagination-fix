import { useCallback, useRef, useEffect, useState } from "react";
import bookFinalImg from "@/assets/book.png";
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
  const [currentSpread, setCurrentSpread] = useState(0);
  const [pages, setPages] = useState<Entry[][]>([]);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    flipAudio.current = new Audio("/page-flip.mp3");
    flipAudio.current.volume = 0.5;
  }, []);

  // Dynamic pagination — measure entry heights like MagicBook
  useEffect(() => {
    if (entries.length === 0) {
      setPages([]);
      return;
    }

    const container = leftContentRef.current;
    if (!container) return;
    const availableHeight = container.clientHeight;

    const measure = document.createElement("div");
    measure.style.cssText = `position:absolute;visibility:hidden;width:${container.offsetWidth}px;font-family:'Cormorant Garamond',serif;padding:0;`;
    container.appendChild(measure);

    const result: Entry[][] = [[]];
    let currentHeight = 0;

    for (let i = 0; i < entries.length; i++) {
      measure.innerHTML = `
        <div style="margin-bottom:4px">
          <div style="font-size:1.25rem;font-weight:700;line-height:1.15;text-align:justify;font-style:italic">
            ${i + 1}. ${entries[i].word}
          </div>
          ${entries[i].description ? `<div style="font-size:1rem;line-height:1.15;text-align:justify;margin-top:2px">— ${entries[i].description.replace(/^[—–\-]\s*/, "")}</div>` : ""}
          <div style="font-size:10px;text-align:right;margin-top:1px">🔥 0 ❤️ 0 🚀 0</div>
        </div>`;
      const h = measure.offsetHeight;

      if (currentHeight + h > availableHeight && result[result.length - 1].length > 0) {
        result.push([entries[i]]);
        currentHeight = h;
      } else {
        result[result.length - 1].push(entries[i]);
        currentHeight += h;
      }
    }

    container.removeChild(measure);
    setPages(result);
  }, [entries]);

  // Auto-navigate to last spread
  useEffect(() => {
    if (pages.length > 0) {
      const lastSpread = Math.floor((pages.length - 1) / 2);
      setCurrentSpread(lastSpread);
    }
  }, [pages.length]);

  const playFlipSound = useCallback(() => {
    if (flipAudio.current) {
      flipAudio.current.currentTime = 0;
      flipAudio.current.play().catch(() => {});
    }
  }, []);

  const totalSpreads = Math.max(1, Math.ceil(pages.length / 2));

  // Wire page nav to ControlBar
  useEffect(() => {
    onPageNav?.({
      hasPrev: currentSpread > 0,
      hasNext: currentSpread < totalSpreads - 1,
      onPrev: () => { playFlipSound(); setCurrentSpread(s => s - 1); },
      onNext: () => { playFlipSound(); setCurrentSpread(s => s + 1); },
    });
  }, [currentSpread, totalSpreads, onPageNav, playFlipSound]);

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

  // Get global index for an entry
  const getGlobalIndex = (entry: Entry) => entries.indexOf(entry);

  const leftPageIdx = currentSpread * 2;
  const rightPageIdx = currentSpread * 2 + 1;
  const leftPageEntries = pages[leftPageIdx] || [];
  const rightPageEntries = pages[rightPageIdx] || [];
  const leftPageNum = leftPageIdx + 1;
  const rightPageNum = rightPageIdx + 1;

  const renderEntry = (entry: Entry, globalIdx: number) => (
    <div key={globalIdx} className="flex flex-col mb-0">
      <div className="pb-0.5 text-xl leading-tight font-bold"
           style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", textAlign: "justify", lineHeight: "1.15" }}>
        {globalIdx + 1}. {renderInkWord(entry.word)}
      </div>
      {entry.description && (
        <div className="text-base font-handwriting leading-tight mt-0" style={{ color: "#1a1030", textAlign: "justify", lineHeight: "1.15" }}>
          — {entry.description.replace(/^[—–\-]\s*/, "")}
        </div>
      )}
      <div className="flex gap-2 text-[10px] justify-end" style={{ color: "#1a1440" }}>
        <button type="button" onClick={() => updateReaction(globalIdx, "fire")} className="cursor-pointer hover:scale-110 transition-transform">🔥 {entry.reactions?.fire || 0}</button>
        <button type="button" onClick={() => updateReaction(globalIdx, "love")} className="cursor-pointer hover:scale-110 transition-transform">❤️ {entry.reactions?.love || 0}</button>
        <button type="button" onClick={() => updateReaction(globalIdx, "rocket")} className="cursor-pointer hover:scale-110 transition-transform">🚀 {entry.reactions?.rocket || 0}</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full magic-cursor scene-fade-in" style={{ transform: "translateY(-3%)" }}>
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

          <SpineEffect burst={false} />

          {/* Left page */}
          <div
            ref={leftContentRef}
            className="absolute z-20 overflow-hidden pointer-events-auto flex flex-col gap-0"
            style={{
               left: "22%", top: "20%", width: "24%", height: "56%",
               padding: "12px 8px 40px 12px",
            }}
          >
            {leftPageEntries.map((entry) => renderEntry(entry, getGlobalIndex(entry)))}
            <div className="absolute bottom-[4px] left-0 right-0 flex justify-center select-none"
                 style={{ color: "#0f0a2a", fontFamily: "'Cormorant Garamond', serif", fontWeight: "bold", fontStyle: "italic", fontSize: "16px", opacity: 0.9, letterSpacing: "1px" }}>
              — {leftPageNum} —
            </div>
          </div>

          {/* Right page */}
          <div
            className="absolute z-20 overflow-hidden pointer-events-auto flex flex-col gap-0"
            style={{
              left: "54%", top: "18%", width: "26%", height: "60%",
              padding: "12px 2px 40px 4px",
            }}
          >
            {rightPageEntries.map((entry) => renderEntry(entry, getGlobalIndex(entry)))}
            {rightPageEntries.length > 0 && (
              <div className="absolute bottom-[4px] left-0 right-0 flex justify-center select-none"
                   style={{ color: "#0f0a2a", fontFamily: "'Cormorant Garamond', serif", fontWeight: "bold", fontStyle: "italic", fontSize: "16px", opacity: 0.9, letterSpacing: "1px" }}>
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
