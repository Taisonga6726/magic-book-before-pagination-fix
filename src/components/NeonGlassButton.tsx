import React from "react";

interface NeonGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const NeonGlassButton: React.FC<NeonGlassButtonProps> = ({ children, onClick, disabled, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition-all duration-200 cursor-pointer select-none ${disabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105"} ${className}`}
      style={{
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: disabled ? "none" : "0 0 12px rgba(138,92,246,0.3)",
        color: "white",
        fontWeight: 600,
        padding: "8px 20px",
        borderRadius: "12px",
        fontSize: "15px",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </button>
  );
};

export default NeonGlassButton;
