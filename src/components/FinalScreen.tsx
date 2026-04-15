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
      <div className="absolute inset-0 flex flex-col justify-end items-center pb-24 text-white pointer-events-none">
        <div className="mb-6 px-6 py-3 rounded-xl bg-black/30 backdrop-blur-md text-2xl font-handwriting">
          Всего слов: {entries.length}
        </div>
        <div className="px-8 py-4 rounded-2xl bg-black/30 backdrop-blur-md">
          <div className="text-sm mb-2 opacity-80 text-center">Реакции</div>
          <div className="flex gap-10 text-4xl justify-center">
            <div>🔥 {totalFire}</div>
            <div>❤️ {totalLove}</div>
            <div>🚀 {totalRocket}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalScreen;