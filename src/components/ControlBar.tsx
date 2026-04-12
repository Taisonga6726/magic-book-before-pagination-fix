import React from "react";
import NeonGlassButton from "./NeonGlassButton";

interface ControlBarProps {
  mode: "edit" | "read" | "final";
  setMode: (mode: "edit" | "read" | "final") => void;
  onAddWord: () => void;
  onRestart: () => void;
  onShare: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ mode, setMode, onAddWord, onRestart, onShare }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "16px",
        padding: "10px 18px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      {mode === "edit" && (
        <>
          <NeonGlassButton onClick={onAddWord}>✏️ внести слово</NeonGlassButton>
          <NeonGlassButton onClick={() => setMode("read")}>📖 читать книгу</NeonGlassButton>
          <NeonGlassButton onClick={() => setMode("final")}>✦ завершить</NeonGlassButton>
        </>
      )}

      {mode === "read" && (
        <>
          <NeonGlassButton onClick={onAddWord}>✏️ внести слово</NeonGlassButton>
          <NeonGlassButton onClick={() => {}}>🙂</NeonGlassButton>
          <NeonGlassButton onClick={() => {}}>😮</NeonGlassButton>
          <NeonGlassButton onClick={() => {}}>🔥</NeonGlassButton>
        </>
      )}

      {mode === "final" && (
        <>
          <NeonGlassButton onClick={onRestart}>🔄 начать заново</NeonGlassButton>
          <NeonGlassButton onClick={() => setMode("edit")}>📖 к книге</NeonGlassButton>
          <NeonGlassButton onClick={onShare}>📤 поделиться</NeonGlassButton>
        </>
      )}
    </div>
  );
};

export default ControlBar;
