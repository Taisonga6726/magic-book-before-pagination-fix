const WORDS = [
  { text: "VIBE", color: "purple" },
  { text: "CODE", color: "blue" },
  { text: "AI", color: "purple" },
  { text: "FLOW", color: "blue" },
  { text: "FOCUS", color: "purple" },
  { text: "MAGIC", color: "blue" },
  { text: "IDEA", color: "purple" },
  { text: "SPEED", color: "blue" },
  { text: "ПОТОК", color: "purple" },
  { text: "ФОКУС", color: "blue" },
  { text: "МАГИЯ", color: "purple" },
  { text: "СМЫСЛ", color: "blue" },
  { text: "НЕЙРО", color: "purple" },
  { text: "ВАЙБ", color: "blue" },
  { text: "КОД", color: "purple" },
];

// Positions around the book edges — left, right, top, bottom margins
const POSITIONS = [
  { top: "8%", left: "1%" },
  { top: "14%", right: "8%" },
  { top: "25%", left: "2%" },
  { top: "32%", right: "7%" },
  { top: "50%", left: "0%" },
  { top: "55%", right: "7%" },
  { top: "68%", left: "1%" },
  { top: "73%", right: "6%" },
  { bottom: "18%", left: "1%" },
  { bottom: "14%", right: "8%" },
  { top: "8%", left: "32%" },
  { top: "7%", right: "28%" },
  { bottom: "10%", left: "28%" },
  { bottom: "8%", right: "32%" },
  { bottom: "22%", left: "2%" },
];

const SIZES = [16, 20, 15, 22, 18, 24, 14, 18, 16, 22, 15, 22, 18, 20, 14];

const FloatingWords = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
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
              opacity: 0.85,
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
