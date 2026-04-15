import React from "react";

interface Entry {
  word: string;
  description: string;
  reactions: { fire: number; love: number; rocket: number };
}

interface FinalScreenProps {
  entries: Entry[];
  onBack: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ entries, onBack }) => {
  const totalFire = entries.reduce((sum, w) => sum + (w.reactions?.fire || 0), 0);
  const totalLove = entries.reduce((sum, w) => sum + (w.reactions?.love || 0), 0);
  const totalRocket = entries.reduce((sum, w) => sum + (w.reactions?.rocket || 0), 0);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40 scene-fade-in">
      <img
        src="/images/final-screen.png"
        alt="Финальный экран"
        className="absolute w-full h-full object-contain select-none"
        draggable={false}
      />
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 text-white pointer-events-none">
        <div className="px-5 py-2 rounded-xl bg-black/40 backdrop-blur-md text-xl font-handwriting">
          Всего слов: {entries.length}
        </div>
        <div className="flex items-center gap-6 px-6 py-3 rounded-xl bg-black/30 backdrop-blur-md text-3xl">
          <div>🔥 {totalFire}</div>
          <div>❤️ {totalLove}</div>
          <div>🚀 {totalRocket}</div>
        </div>
      </div>
    </div>
  );
};

export default FinalScreen;