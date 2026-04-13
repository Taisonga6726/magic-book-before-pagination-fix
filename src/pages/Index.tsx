import { useState, useEffect, useCallback } from "react";
import FloatingWords from "@/components/FloatingWords";
import MagicBook from "@/components/MagicBook";
import FinalBook from "@/components/FinalBook";
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
  const [mode, setMode] = useState<"edit" | "read" | "final">("edit");
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem("magic-book-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [pageNav, setPageNav] = useState<PageNav | null>(null);


  useEffect(() => {
    localStorage.setItem("magic-book-entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddWord = () => {
    setMode("edit");
  };

  const handleRestart = () => {
    setEntries([]);
    setMode("edit");
  };

  const handleClearAll = () => {
    localStorage.removeItem("magic-book-entries");
    setEntries([]);
  };

  const handleShare = () => {
    toast({ title: "Функция скоро появится!", description: "Поделиться книгой можно будет в следующем обновлении." });
  };

  const handlePageNav = useCallback((nav: PageNav) => {
    setPageNav(nav);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <HeroWave />

      <div className="relative z-40 w-full flex items-center justify-center">
        <FloatingWords />

        {mode === "edit" && (
          <MagicBook
            entries={entries}
            setEntries={setEntries}
            onOpenCatalog={() => setMode("read")}
            onFinish={() => setMode("final")}
            onPageNav={handlePageNav}
          />
        )}
        {(mode === "read" || mode === "final") && (
          <FinalBook entries={entries} onBack={() => setMode("edit")} onPageNav={handlePageNav} />
        )}
      </div>

      <ControlBar
        mode={mode}
        setMode={setMode}
        onAddWord={handleAddWord}
        onRestart={handleRestart}
        onShare={handleShare}
        onClearAll={handleClearAll}
        pageNav={pageNav}
      />
    </div>
  );
};

export default Index;
