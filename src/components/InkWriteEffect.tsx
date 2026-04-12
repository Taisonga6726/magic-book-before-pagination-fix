import { useState, useEffect, useRef } from "react";

interface InkWriteEffectProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

const InkWriteEffect = ({ text, onComplete, className = "" }: InkWriteEffectProps) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    setVisibleCount(0);
    completedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (visibleCount >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    const timer = setInterval(() => {
      setVisibleCount((c) => {
        const next = c + 1;
        if (next >= text.length) clearInterval(timer);
        return next;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [text, visibleCount, onComplete]);

  return (
    <span className={className}>
      {text.split("").map((char, i) => {
        if (i >= visibleCount) return <span key={i} style={{ opacity: 0 }}>{char}</span>;
        if (i === visibleCount - 1) return <span key={i} className="ink-letter">{char}</span>;
        return <span key={i}>{char}</span>;
      })}
    </span>
  );
};

export default InkWriteEffect;
