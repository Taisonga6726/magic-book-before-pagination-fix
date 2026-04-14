import React from "react";

interface FinalScreenProps {
  onBack: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-40 scene-fade-in">
      <img
        src="/images/final-screen.png"
        alt="Финальный экран"
        className="relative w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
};

export default FinalScreen;
