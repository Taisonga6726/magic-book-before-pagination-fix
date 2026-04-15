import React from "react";

interface NeonGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  accent?: boolean;
}

const NeonGlassButton: React.FC<NeonGlassButtonProps> = ({ children, onClick, disabled, accent, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`neon-btn-glow transition-all duration-200 cursor-pointer select-none ${disabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105"} ${accent && !disabled ? "animate-neon-pulse" : ""} ${className}`}
      style={{
        background: accent ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(80, 40, 160, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "2px solid rgba(100, 160, 255, 0.5)",
        boxShadow: disabled
          ? "none"
          : "0 0 15px rgba(100,160,255,0.4), 0 0 30px rgba(138,92,246,0.2), inset 0 0 20px rgba(100,160,255,0.1)",
        color: "white",
        fontWeight: 600,
        padding: "8px 20px",
        borderRadius: "999px",
        fontSize: "15px",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </button>
  );
};

export default NeonGlassButton;
