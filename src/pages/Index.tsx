import { useState, useEffect, useCallback, useRef } from "react";
import FloatingWords from "@/components/FloatingWords";
import MagicBook from "@/components/MagicBook";
import FinalBook from "@/components/FinalBook";
import FinalScreen from "@/components/FinalScreen";
import ControlBar from "@/components/ControlBar";
import HeroWave from "@/components/ui/dynamic-wave-canvas-background";
import { toast } from "@/hooks/use-toast";

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

const Index = () => {
  const [mode, setMode] = useState<"form" | "preview" | "reading" | "final">("form");
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem("magic-book-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [pageNav, setPageNav] = useState<PageNav | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [videoSeen, setVideoSeen] = useState(false);
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

  useEffect(() => {
    const cleared = localStorage.getItem("magic-book-initial-clean");
    if (!cleared) {
      localStorage.removeItem("magic-book-entries");
      localStorage.setItem("magic-book-initial-clean", "true");
      setEntries([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("magic-book-entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddWord = () => {
    setMode("form");
  };

  const handleRestart = () => {
    setEntries([]);
    setMode("form");
  };

  const handleShare = () => {
    toast({ title: "Функция скоро появится!", description: "Поделиться книгой можно будет в следующем обновлении." });
  };

  const handlePageNav = useCallback((nav: PageNav) => {
    setPageNav(nav);
  }, []);

  const handleOpenBook = useCallback(() => {
    playFlipSound();
    setFlipping(true);
    setTimeout(() => {
      setMode("reading");
      setFlipping(false);
    }, 300);
  }, [playFlipSound]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <img
        src="/images/open-book.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 select-none pointer-events-none"
        draggable={false}
      />
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-none z-10" />

      <HeroWave />
      <FloatingWords />

      <div className="relative z-20 w-full h-full">
      {mode === "form" && (
        <MagicBook
          entries={entries}
          setEntries={setEntries}
          onOpenCatalog={() => setMode("preview")}
          onFinish={() => setMode("final")}
          onPageNav={handlePageNav}
        />
      )}

      {mode === "preview" && (
        <div
          className={`fixed inset-0 w-screen h-screen scene-fade-in ${flipping ? "page-flip-anim" : ""}`}
          onClick={() => { if (videoFinished || videoSeen) handleOpenBook(); }}
          style={{ perspective: "1200px", zIndex: 50, cursor: (videoFinished || videoSeen) ? "pointer" : "default" }}
        >
          {!videoSeen ? (
            <video
              src="/videos/book-intro.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => { setVideoFinished(true); setVideoSeen(true); }}
              className="relative w-full h-full object-contain select-none"
            />
          ) : (
            <img
              src="/images/cover-book.png"
              alt="Обложка книги"
              className="relative w-full h-full object-contain select-none"
              draggable={false}
            />
          )}
          {(videoFinished || videoSeen) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl md:text-5xl font-bold text-white cursor-pointer select-none"
                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)" }}>
                ЧИТАТЬ КНИГУ
              </span>
            </div>
          )}
        </div>
      )}

      {mode === "reading" && (
        <FinalBook entries={entries} onBack={() => setMode("form")} onPageNav={handlePageNav} />
      )}

      {mode === "final" && (
        <FinalScreen onBack={() => setMode("form")} />
      )}
      </div>

      <ControlBar
        mode={mode}
        setMode={setMode}
        onAddWord={handleAddWord}
        onRestart={handleRestart}
        onShare={handleShare}
        pageNav={pageNav}
      />
    </div>
  );
};

export default Index;
