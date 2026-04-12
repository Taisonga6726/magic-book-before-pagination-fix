import { useEffect, useRef } from "react";

const WORDS = [
  { text: "VIBE", color: "purple" },
  { text: "CODE", color: "blue" },
  { text: "AI", color: "pink" },
  { text: "FLOW", color: "purple" },
  { text: "FOCUS", color: "blue" },
  { text: "MAGIC", color: "pink" },
  { text: "IDEA", color: "purple" },
  { text: "SPEED", color: "blue" },
  { text: "ПОТОК", color: "pink" },
  { text: "ФОКУС", color: "purple" },
  { text: "МАГИЯ", color: "blue" },
  { text: "СМЫСЛ", color: "pink" },
  { text: "НЕЙРО", color: "purple" },
  { text: "ВАЙБ", color: "blue" },
  { text: "КОД", color: "pink" },
];

const POSITIONS = [
  { top: "5%", left: "3%" }, { top: "8%", right: "5%" },
  { top: "15%", left: "8%" }, { top: "20%", right: "3%" },
  { bottom: "25%", left: "2%" }, { bottom: "20%", right: "4%" },
  { top: "40%", left: "1%" }, { top: "35%", right: "2%" },
  { bottom: "10%", left: "5%" }, { bottom: "8%", right: "7%" },
  { top: "60%", left: "3%" }, { top: "55%", right: "1%" },
  { bottom: "35%", left: "6%" }, { bottom: "40%", right: "5%" },
  { top: "75%", left: "2%" },
];

const SIZES = [24, 30, 22, 34, 28, 36, 20, 26, 24, 32, 22, 34, 28, 30, 20];

const FloatingWords = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {WORDS.map((word, i) => {
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * -20;
        const glowClass =
          word.color === "purple" ? "glow-text-purple" :
          word.color === "blue" ? "glow-text-blue" : "glow-text-pink";

        return (
          <span
            key={i}
            className={`absolute font-handwriting font-bold ${glowClass} select-none`}
            style={{
              ...POSITIONS[i],
              fontSize: `${SIZES[i]}px`,
              animation: `float-word ${duration}s ease-in-out ${delay}s infinite, neon-pulse ${3 + Math.random() * 2}s ease-in-out ${Math.random() * -3}s infinite`,
              opacity: 0.75,
            }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
};

export default FloatingWords;
