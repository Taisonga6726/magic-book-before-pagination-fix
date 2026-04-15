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
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center font-handwriting" style={{ color: "#e8dcc8" }}>
          <p className="text-3xl mb-4 font-bold" style={{ textShadow: "0 0 12px rgba(0,0,0,0.6)" }}>
            Всего слов: {entries.length}
          </p>
          <div className="flex gap-8 justify-center text-4xl" style={{ textShadow: "0 0 12px rgba(0,0,0,0.6)" }}>
            <span>🔥 {totalFire}</span>
            <span>❤️ {totalLove}</span>
            <span>🚀 {totalRocket}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalScreen;