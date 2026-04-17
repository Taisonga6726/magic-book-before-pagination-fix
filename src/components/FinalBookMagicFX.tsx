import { useEffect, useRef } from "react";

/**
 * Magical FX layer for FinalBook only.
 * - Soft pulsing glow from book center
 * - Thin rotating energy arcs (SVG)
 * - Floating sparks (canvas)
 * - Cursor proximity intensifies glow & spawns extra sparks
 * All layers use mix-blend-mode: screen so text stays fully readable.
 */
const FinalBookMagicFX = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type Spark = {
      x: number; y: number; vx: number; vy: number;
      life: number; max: number; size: number; color: string;
    };
    const sparks: Spark[] = [];
    const colors = ["255,210,120", "190,140,255", "255,255,255"];

    const spawn = (x?: number, y?: number, count = 1) => {
      for (let i = 0; i < count; i++) {
        const cx = x ?? w * 0.5;
        const cy = y ?? h * 0.55;
        const angle = Math.random() * Math.PI * 2;
        const radius = x == null ? 80 + Math.random() * 220 : Math.random() * 20;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        sparks.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.4,
          life: 0,
          max: 1500 + Math.random() * 1500,
          size: 1 + Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let last = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const dt = now - last;
      last = now;

      if (sparks.length < 25) spawn();

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        const t = s.life / s.max;
        const alpha = (1 - t) * 0.9;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    if (!reduce) raf = requestAnimationFrame(loop);

    let lastMove = 0;
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
      root.style.setProperty("--cursor-active", "1");
      const now = performance.now();
      if (!reduce && now - lastMove > 60) {
        spawn(x, y, 2);
        lastMove = now;
      }
    };
    const onLeave = () => {
      root.style.setProperty("--cursor-active", "0");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 5,
        ["--cursor-x" as never]: "50%",
        ["--cursor-y" as never]: "50%",
        ["--cursor-active" as never]: "0",
      }}
    >
      {/* A. Central pulsing glow */}
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(circle at 50% 55%, rgba(255,200,80,0.28) 0%, rgba(160,90,255,0.22) 35%, rgba(0,0,0,0) 65%)",
          filter: "blur(50px)",
          animation: "fbfx-pulse 4s ease-in-out infinite",
        }}
      />

      {/* D. Cursor halo */}
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(120px circle at var(--cursor-x) var(--cursor-y), rgba(255,220,140,0.25), rgba(180,120,255,0.18) 40%, rgba(0,0,0,0) 70%)",
          opacity: "calc(var(--cursor-active) * 1)",
          transition: "opacity 300ms ease-out",
        }}
      />

      {/* B. Energy arcs */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width="80%"
        height="80%"
        viewBox="-100 -100 200 200"
        style={{ mixBlendMode: "screen", opacity: 0.6 }}
      >
        <g style={{ animation: "fbfx-spin-slow 25s linear infinite", transformOrigin: "0 0" }}>
          <ellipse cx="0" cy="0" rx="80" ry="55" fill="none" stroke="rgba(255,210,120,0.45)" strokeWidth="0.6" />
        </g>
        <g style={{ animation: "fbfx-spin-rev 40s linear infinite", transformOrigin: "0 0" }}>
          <ellipse cx="0" cy="0" rx="92" ry="48" fill="none" stroke="rgba(190,140,255,0.4)" strokeWidth="0.5" />
        </g>
      </svg>

      {/* C. Sparks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen" }}
      />

      <style>{`
        @keyframes fbfx-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes fbfx-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fbfx-spin-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default FinalBookMagicFX;
