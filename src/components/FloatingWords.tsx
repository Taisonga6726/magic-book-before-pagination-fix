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

// Positions around the book edges — left, right, top, bottom margins
const POSITIONS = [
  { top: "5%", left: "2%" },
  { top: "12%", right: "3%" },
  { top: "25%", left: "4%" },
  { top: "30%", right: "2%" },
  { top: "50%", left: "1%" },
  { top: "55%", right: "3%" },
  { top: "70%", left: "3%" },
  { top: "75%", right: "1%" },
  { bottom: "15%", left: "2%" },
  { bottom: "10%", right: "4%" },
  { top: "3%", left: "30%" },
  { top: "2%", right: "25%" },
  { bottom: "5%", left: "25%" },
  { bottom: "3%", right: "30%" },
  { bottom: "25%", left: "5%" },
];

const SIZES = [24, 30, 22, 34, 28, 36, 20, 26, 24, 32, 22, 34, 28, 30, 20];

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
