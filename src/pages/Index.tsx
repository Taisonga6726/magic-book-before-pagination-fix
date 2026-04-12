import { useState } from "react";
import FloatingWords from "@/components/FloatingWords";
import MagicBook from "@/components/MagicBook";
import CatalogView from "@/components/CatalogView";

interface Entry {
  word: string;
  description: string;
}

const Index = () => {
  const [view, setView] = useState<"book" | "catalog">("book");
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <div className="cosmic-bg w-full h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingWords />

      <div className="relative z-40 w-full flex items-center justify-center">
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

      <div
        className="absolute bottom-3 right-6 font-handwriting text-sm z-30"
        style={{ color: "hsl(40 80% 55% / 0.6)" }}
      >
        Tanya Gaiduk
      </div>
    </div>
  );
};

export default Index;
