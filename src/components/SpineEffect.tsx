import { useEffect, useRef, useState } from "react";

interface SpineEffectProps {
  burst: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  angle: number;
}

const COLORS = [
  "hsl(40, 90%, 55%)",
  "hsl(300, 60%, 55%)",
  "hsl(265, 70%, 60%)",
  "hsl(220, 70%, 55%)",
];

const SpineEffect = ({ burst }: SpineEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!burst) return;
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: idRef.current++,
        x: (Math.random() - 0.5) * 40,
        y: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 2 + Math.random() * 4,
        duration: 0.4 + Math.random() * 0.6,
        angle: -90 + (Math.random() - 0.5) * 60,
      });
    }
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 1200);
    return () => clearTimeout(timer);
  }, [burst]);

  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-20">
      {/* Constant spine glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, 
            hsl(265 60% 50% / 0.05), 
            hsl(40 80% 50% / 0.15) 50%, 
            hsl(265 60% 50% / 0.05))`,
          animation: "spine-glow 4s ease-in-out infinite",
        }}
      />
      {/* Burst particles */}
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const dist = 60 + Math.random() * 40;
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: "50%",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}, 0 0 12px ${p.color}`,
              animation: `spark-burst ${p.duration}s ease-out forwards`,
              transform: `translate(${Math.cos(rad) * dist}px, ${Math.sin(rad) * dist}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default SpineEffect;
