import { useState, useCallback, useRef, useEffect, Dispatch, SetStateAction } from "react";
import bookImg from "@/assets/book.png";
import SpineEffect from "./SpineEffect";
import InkWriteEffect from "./InkWriteEffect";

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

interface MagicBookProps {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[]>>;
  onOpenCatalog: () => void;
  onFinish: () => void;
  onPageNav?: (nav: PageNav) => void;
}

const MagicBook = ({ entries, setEntries, onOpenCatalog, onFinish, onPageNav }: MagicBookProps) => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");

  const entriesRef = useRef(entries);
  useEffect(() => { entriesRef.current = entries; }, [entries]);
  const [burst, setBurst] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [showSavedOverlay, setShowSavedOverlay] = useState(false);
  const [showDuplicateOverlay, setShowDuplicateOverlay] = useState(false);
  const [showFinishOverlay, setShowFinishOverlay] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [pageBreaks, setPageBreaks] = useState<number[]>([0]);

  const penAudio = useRef<HTMLAudioElement | null>(null);
  const flipAudio = useRef<HTMLAudioElement | null>(null);
  const stopTimer = useRef<number | null>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const prevPageBreaksLen = useRef(1);

  const playPenSound = useCallback(() => {
    if (!penAudio.current) {
      penAudio.current = new Audio("/pen-scratch.mp3");
      penAudio.current.volume = 0.3;
    }
    if (penAudio.current.paused) {
      penAudio.current.currentTime = 0;
      penAudio.current.play().catch(() => {});
    }
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = window.setTimeout(() => {
      penAudio.current?.pause();
    }, 1000);
  }, []);

  const playFlipSound = useCallback(() => {
    if (!flipAudio.current) {
      flipAudio.current = new Audio("/page-flip.mp3");
      flipAudio.current.volume = 0.5;
    }
    flipAudio.current.currentTime = 0;
    flipAudio.current.play().catch(() => {});
  }, []);

  // Compute current page entries from pageBreaks
  const currentPageStart = pageBreaks[currentPage] ?? 0;
  const currentPageEnd = pageBreaks[currentPage + 1] ?? entries.length;
  const pageEntries = entries.slice(currentPageStart, currentPageEnd);
  const totalPages = pageBreaks.length;
  const hasNextPage = currentPage < totalPages - 1;
  const isLastPage = currentPage === totalPages - 1;
  const hasPrevPage = currentPage > 0;

  const handleFlipNext = useCallback(() => {
    if (flipping || !hasNextPage) return;
    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setFlipping(false);
    }, 1000);
  }, [flipping, hasNextPage, playFlipSound]);

  const handleFlipPrev = useCallback(() => {
    if (flipping || currentPage === 0) return;
    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setFlipping(false);
    }, 1000);
  }, [flipping, currentPage, playFlipSound]);

  useEffect(() => {
    onPageNav?.({
      hasPrev: hasPrevPage,
      hasNext: hasNextPage,
      onPrev: handleFlipPrev,
      onNext: handleFlipNext,
    });
  }, [hasPrevPage, hasNextPage, onPageNav, handleFlipPrev, handleFlipNext]);
  useEffect(() => {
    if (entries.length === 0) {
      setPageBreaks([0]);
      prevPageBreaksLen.current = 1;
      return;
    }

    const container = rightContentRef.current;
    if (!container) return;
    const availableHeight = container.clientHeight;

    const measure = document.createElement("div");
    measure.style.cssText = `position:absolute;visibility:hidden;width:${container.offsetWidth}px;font-family:inherit;padding:0;`;
    container.appendChild(measure);

    const breaks: number[] = [0];
    let currentHeight = 0;

    for (let i = 0; i < entries.length; i++) {
      measure.innerHTML = `
        <div style="margin-bottom:8px">
          <div><span style="font-size:1.5rem;font-weight:700">${i + 1}.</span>
          <span style="font-size:1.5rem">${entries[i].word}</span></div>
          ${entries[i].description ? `<div style="font-size:1.125rem;margin-left:1.75rem">— ${entries[i].description}</div>` : ""}
        </div>`;
      const h = measure.offsetHeight;

      if (currentHeight + h > availableHeight && i > breaks[breaks.length - 1]) {
        breaks.push(i);
        currentHeight = h;
      } else {
        currentHeight += h;
      }
    }

    container.removeChild(measure);

    const oldLen = prevPageBreaksLen.current;
    prevPageBreaksLen.current = breaks.length;
    setPageBreaks(breaks);

    // If a new page was created, animate flip
    if (breaks.length > oldLen && oldLen > 0) {
      playFlipSound();
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(breaks.length - 1);
        setFlipping(false);
      }, 1000);
    } else {
      setCurrentPage(breaks.length - 1);
    }
  }, [entries, playFlipSound]);

  const handleSave = useCallback(() => {
    if (!word.trim()) return;

    // Duplicate check (only for new entries)
    if (editIdx === null) {
      const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
      const isDuplicate = entriesRef.current.some(
        (e) => normalize(e.word) === normalize(word)
      );
      if (isDuplicate) {
        setShowDuplicateOverlay(true);
        setTimeout(() => setShowDuplicateOverlay(false), 1500);
        return;
      }
    }

    if (editIdx !== null) {
      setEntries((prev) => {
        const copy = [...prev];
        copy[editIdx] = { word: word.trim(), description: description.trim() };
        return copy;
      });
      setEditIdx(null);
    } else {
      setEntries((prev) => [...prev, { word: word.trim(), description: description.trim() }]);
    }

    setBurst(false);
    requestAnimationFrame(() => setBurst(true));
    setTimeout(() => setBurst(false), 1200);

    setWord("");
    setDescription("");

    setShowSavedOverlay(true);
    setTimeout(() => setShowSavedOverlay(false), 1500);
  }, [word, description, editIdx, entries, setEntries]);

  const handleEdit = useCallback(() => {
    if (entries.length === 0) return;
    const lastIdx = entries.length - 1;
    const entry = entries[lastIdx];
    setWord(entry.word);
    setDescription(entry.description);
    setEditIdx(lastIdx);
    setTimeout(() => wordInputRef.current?.focus(), 50);
  }, [entries]);

  const handleFlipPage = useCallback(() => {
    if (flipping || !hasNextPage) return;
    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setFlipping(false);
    }, 1000);
  }, [flipping, hasNextPage, playFlipSound]);

  const handleFlipBack = useCallback(() => {
    if (flipping || currentPage === 0) return;
    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setFlipping(false);
    }, 1000);
  }, [flipping, currentPage, playFlipSound]);

  const handleFinish = useCallback(() => {
    if (fadingOut || flipping) return;
    setShowFinishOverlay(true);
    setTimeout(() => {
      setFlipping(true);
      playFlipSound();
      setBurst(false);
      requestAnimationFrame(() => setBurst(true));
      setTimeout(() => setFadingOut(true), 600);
      setTimeout(() => onFinish(), 1500);
    }, 400);
  }, [fadingOut, flipping, playFlipSound, onFinish]);

  const liveText = word ? (description ? `${word} — ${description}` : word) : "";

  return (
    <div
      className={`relative w-full max-w-[1100px] mx-auto magic-cursor ${fadingOut ? "scene-fade-out" : ""}`}
      style={{
        aspectRatio: "1.5 / 1",
        maskImage: "radial-gradient(ellipse 95% 95% at center, black 55%, transparent 98%)",
        WebkitMaskImage: "radial-gradient(ellipse 95% 95% at center, black 55%, transparent 98%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 150px 80px rgba(0,0,0,0.9)", borderRadius: "8px" }}
      />
      <img
        src={bookImg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      <SpineEffect burst={burst} />

      {/* Left page — input */}
      <div
        className="absolute font-handwriting magic-cursor-write no-scroll"
        style={{ left: "18%", top: "20%", width: "30%", height: "58%", padding: "10px 14px 40px 24px", overflow: "hidden" }}
      >
        <input
          ref={wordInputRef}
          type="text"
          value={word}
          onChange={(e) => { setWord(e.target.value); playPenSound(); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); descRef.current?.focus(); } }}
          placeholder="Слово"
          className="magic-input w-full text-2xl font-semibold font-handwriting mb-4 text-ink"
        />

        <div className="writing-zone rounded-sm mt-2" style={{ minHeight: "55%" }}>
          <textarea
            ref={descRef}
            value={description}
            onChange={(e) => { setDescription(e.target.value); playPenSound(); }}
            placeholder="Описание…"
            className="magic-textarea w-full h-full font-handwriting text-lg notebook-lines magic-cursor-write"
            style={{ minHeight: "160px", lineHeight: "22px" }}
          />
        </div>

        <div className="mt-1 flex justify-center items-center gap-2">
          <span className="action-text cursor-pointer font-handwriting text-base font-medium" onClick={handleSave}>сохранить</span>
          <span className="font-handwriting text-base font-medium" style={{ color: "hsl(var(--ink) / 0.3)" }}>|</span>
          <span className="action-text cursor-pointer font-handwriting text-base font-medium" onClick={handleEdit}>редактировать</span>
        </div>

        {showSavedOverlay && (
          <div className="mt-2 flex justify-center pointer-events-none">
            <div className="word-saved-overlay">
              <span className="word-saved-text" style={{
                color: "#22c55e",
                fontWeight: 800,
                textShadow: "0 0 8px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)",
              }}>СЛОВО ВНЕСЕНО!</span>
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="word-saved-spark"
                  style={{
                    left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    animationDelay: `${i * 0.05}s`,
                    background: "#22c55e",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {showDuplicateOverlay && (
          <div className="mt-2 flex justify-center pointer-events-none">
            <div className="word-saved-overlay">
              <span className="word-saved-text" style={{
                color: "#ef4444",
                fontWeight: 800,
                fontSize: "0.85rem",
                textShadow: "0 0 8px rgba(239,68,68,0.6), 0 0 20px rgba(239,68,68,0.3)",
              }}>СЛОВО ЕСТЬ УЖЕ В СЛОВАРЕ!</span>
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="word-saved-spark"
                  style={{
                    left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    animationDelay: `${i * 0.05}s`,
                    background: "#ef4444",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right page — results */}
      <div
        className="absolute font-handwriting no-scroll"
        style={{
          left: "52%", top: "18%", width: "36%", height: "60%",
          padding: "12px 20px 40px 20px",
          overflow: "hidden", overflowWrap: "break-word", wordBreak: "break-word",
          perspective: "1200px",
        }}
      >
        <div ref={rightContentRef} style={{ height: "100%", overflow: "hidden" }}>
          <div className={flipping ? "page-flip-anim" : ""} style={{ transformOrigin: "left center" }}>
            {pageEntries.length === 0 && !liveText ? (
              <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
                Здесь появятся ваши записи…
              </p>
            ) : (
              <div className="space-y-2">
                {pageEntries.map((entry, i) => {
                  const globalIdx = currentPageStart + i;
                  if (editIdx === globalIdx && liveText) return null;

                  return (
                    <div key={globalIdx} className="text-ink">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold" style={{ color: "#1a1440" }}>{globalIdx + 1}.</span>
                        <span className="text-2xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#1a1440", textShadow: "0 0 2px rgba(20,10,50,0.15)" }}>
                          {entry.word}
                        </span>
                      </div>
                      {entry.description && (
                        <div className="font-handwriting text-lg mt-0.5 ml-7" style={{ color: "#2a1f5a" }}>
                          — {entry.description}
                        </div>
                      )}
                    </div>
                  );
                })}

                {isLastPage && liveText && (
                  <div className="text-ink">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold" style={{ color: "#1a1440" }}>{editIdx !== null ? editIdx + 1 : entries.length + 1}.</span>
                      <span className="text-2xl leading-tight inline-flex items-end" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#1a1440", textShadow: "0 0 2px rgba(20,10,50,0.15)" }}>
                        <InkWriteEffect text={word} className="ink-fresh" />
                      </span>
                    </div>
                    {description && (
                      <div className="font-handwriting text-lg mt-0.5 ml-7 ink-fresh" style={{ color: "#2a1f5a" }}>
                        — <InkWriteEffect text={description} className="" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation buttons hidden — managed by ControlBar */}

      {/* "КНИГА СОЗДАНА ✦" overlay */}
      {showFinishOverlay && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <span className="book-created-text">КНИГА СОЗДАНА ✦</span>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="word-saved-spark"
              style={{
                left: `${50 + 12 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${45 + 12 * Math.sin((i * Math.PI * 2) / 8)}%`,
                animationDelay: `${i * 0.06}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MagicBook;
