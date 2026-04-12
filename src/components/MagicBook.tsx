import { useState, useCallback, useRef, useEffect, Dispatch, SetStateAction } from "react";
import bookImg from "@/assets/book.png";
import SpineEffect from "./SpineEffect";
import InkWriteEffect from "./InkWriteEffect";

interface Entry {
  word: string;
  description: string;
}

interface MagicBookProps {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[]>>;
  onOpenCatalog: () => void;
  onFinish: () => void;
}

const ENTRIES_PER_PAGE = 6;

const MagicBook = ({ entries, setEntries, onOpenCatalog, onFinish }: MagicBookProps) => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [burst, setBurst] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [showSavedOverlay, setShowSavedOverlay] = useState(false);
  const [showFinishOverlay, setShowFinishOverlay] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const penAudio = useRef<HTMLAudioElement | null>(null);
  const flipAudio = useRef<HTMLAudioElement | null>(null);
  const stopTimer = useRef<number | null>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(entries.length / ENTRIES_PER_PAGE));
    const lastPage = totalPages - 1;
    if (currentPage < lastPage) {
      setCurrentPage(lastPage);
    }
  }, [entries.length]);

  const handleSave = useCallback(() => {
    if (!word.trim()) return;

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
  }, [word, description, editIdx, setEntries]);

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
    if (flipping) return;
    const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE);
    if (currentPage >= totalPages - 1) return;

    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setFlipping(false);
    }, 1000);
  }, [flipping, currentPage, entries.length, playFlipSound]);

  const handleFinish = useCallback(() => {
    if (fadingOut || flipping) return;
    setShowFinishOverlay(true);
    setTimeout(() => {
      setFlipping(true);
      playFlipSound();
      setBurst(false);
      requestAnimationFrame(() => setBurst(true));
      setTimeout(() => setFadingOut(true), 600);
      setTimeout(() => {
        onFinish();
      }, 1500);
    }, 400);
  }, [fadingOut, flipping, playFlipSound, onFinish]);

  const liveText = word
    ? (description ? `${word} — ${description}` : word)
    : "";

  const pageStart = currentPage * ENTRIES_PER_PAGE;
  const pageEnd = pageStart + ENTRIES_PER_PAGE;
  const pageEntries = entries.slice(pageStart, pageEnd);
  const totalPages = Math.max(1, Math.ceil(entries.length / ENTRIES_PER_PAGE));
  const hasNextPage = currentPage < totalPages - 1;
  const isLastPage = currentPage === totalPages - 1;

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

      {showSavedOverlay && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="word-saved-overlay">
            <span className="word-saved-text">СЛОВО ВНЕСЕНО!</span>
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="word-saved-spark"
                style={{
                  left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Left page — input */}
      <div
        className="absolute font-handwriting magic-cursor-write no-scroll"
        style={{ left: "18%", top: "18%", width: "22%", height: "60%", padding: "16px 24px 12px 32px" }}
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
            style={{ minHeight: "160px", lineHeight: "32px" }}
          />
        </div>

        <div className="mt-3 flex justify-center items-center gap-2">
          <span className="action-text cursor-pointer font-handwriting text-base" onClick={handleSave}>сохранить</span>
          <span className="font-handwriting text-base" style={{ color: "hsl(var(--ink) / 0.3)" }}>|</span>
          <span className="action-text cursor-pointer font-handwriting text-base" onClick={handleEdit}>редактировать</span>
        </div>
      </div>

      {/* Right page — results */}
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
          {pageEntries.length === 0 && !liveText ? (
            <p className="font-handwriting text-xl mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
              Здесь появятся ваши записи…
            </p>
          ) : (
            <div className="space-y-4">
              {pageEntries.map((entry, i) => {
                const globalIdx = pageStart + i;
                if (editIdx === globalIdx && liveText) return null;

                return (
                  <div key={globalIdx} className="text-ink">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold" style={{ color: "hsl(var(--ink) / 0.8)" }}>{globalIdx + 1}.</span>
                      <span className="text-2xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", textShadow: "0 0 8px hsl(var(--glow-purple) / 0.3)" }}>
                        {entry.word}
                      </span>
                    </div>
                    {entry.description && (
                      <div className="font-handwriting text-lg mt-0.5 ml-7" style={{ color: "hsl(var(--ink) / 0.85)" }}>
                        — {entry.description}
                      </div>
                    )}
                  </div>
                );
              })}

              {isLastPage && liveText && (
                <div className="text-ink">
                 <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold" style={{ color: "hsl(var(--ink) / 0.8)" }}>{editIdx !== null ? editIdx + 1 : entries.length + 1}.</span>
                    <span className="text-2xl leading-tight inline-flex items-end" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", textShadow: "0 0 8px hsl(var(--glow-purple) / 0.3)" }}>
                      <InkWriteEffect text={word} className="ink-fresh" />
                    </span>
                  </div>
                  {description && (
                    <div className="font-handwriting text-lg mt-0.5 ml-7 ink-fresh" style={{ color: "hsl(var(--ink) / 0.85)" }}>
                      — <InkWriteEffect text={description} className="" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* "далее →" — flip to next page */}
      {hasNextPage && (
        <div
          className="absolute bottom-[15%] right-[14%] font-handwriting text-xl action-text cursor-pointer tracking-wider z-20"
          onClick={handleFlipPage}
        >
          далее →
        </div>
      )}

      {/* "завершить книгу" — gold text action */}
      {entries.length > 0 && (
        <div
          className="absolute font-handwriting text-base action-text-gold cursor-pointer tracking-wider z-20"
          onClick={handleFinish}
          style={{ bottom: hasNextPage ? "10%" : "12%", right: "14%" }}
        >
          завершить книгу ✦
        </div>
      )}

      {/* "КНИГА СОЗДАНА ✦" magic overlay */}
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

export default MagicBook;
