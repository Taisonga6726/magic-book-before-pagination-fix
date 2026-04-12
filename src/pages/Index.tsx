import { useState } from "react";
import FloatingWords from "@/components/FloatingWords";
import MagicBook from "@/components/MagicBook";
import CatalogView from "@/components/CatalogView";
import HeroWave from "@/components/ui/dynamic-wave-canvas-background";
import FontPreview from "@/components/FontPreview";
interface Entry {
  word: string;
  description: string;
}

const Index = () => {
  const [view, setView] = useState<"book" | "catalog">("book");
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <HeroWave />

      <div className="relative z-40 w-full flex items-center justify-center">
        {/* FloatingWords now inside the scene container */}
        <FloatingWords />

        {view === "book" ? (
          <MagicBook
            entries={entries}
            setEntries={setEntries}
            onOpenCatalog={() => setView("catalog")}
          />
        ) : (
          <CatalogView entries={entries} onBack={() => setView("book")} />
        )}
      </div>

    </div>
  );
};

export default Index;
