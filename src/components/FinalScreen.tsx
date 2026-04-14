import React from "react";

interface FinalScreenProps {
  onBack: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onBack }) => {
  return (
    <div
      className="relative w-full max-w-[1100px] mx-auto flex items-center justify-center scene-fade-in"
      style={{ aspectRatio: "1.5 / 1" }}
    >
      <img
        src="/images/final-screen.png"
        alt="Финальный экран"
        className="w-full h-auto object-contain select-none"
        draggable={false}
      />
    </div>
  );
};

export default FinalScreen;
