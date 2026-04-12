const WORDS = [
  { text: "VIBE", color: "purple" },
  { text: "CODE", color: "cyan" },
  { text: "AI", color: "gold" },
  { text: "FLOW", color: "blue" },
  { text: "FOCUS", color: "green" },
  { text: "MAGIC", color: "cyan" },
  { text: "IDEA", color: "purple" },
  { text: "SPEED", color: "gold" },
  { text: "ПОТОК", color: "green" },
  { text: "ФОКУС", color: "blue" },
  { text: "МАГИЯ", color: "cyan" },
  { text: "СМЫСЛ", color: "gold" },
  { text: "НЕЙРО", color: "purple" },
  { text: "ВАЙБ", color: "green" },
  { text: "КОД", color: "cyan" },
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

const SIZES = [11, 14, 10, 15, 12, 16, 10, 12, 11, 15, 10, 15, 12, 14, 10];

const FloatingWords = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {WORDS.map((word, i) => {
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * -20;
        const glowClass = `glow-text-${word.color}`;

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
