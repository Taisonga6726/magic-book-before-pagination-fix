import React from "react";
import NeonGlassButton from "./NeonGlassButton";

interface PageNav {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface ControlBarProps {
  mode: "edit" | "read" | "final";
  setMode: (mode: "edit" | "read" | "final") => void;
  onAddWord: () => void;
  onRestart: () => void;
  onShare: () => void;
  pageNav?: PageNav | null;
}

const ControlBar: React.FC<ControlBarProps> = ({ mode, setMode, onAddWord, onRestart, onShare, pageNav }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        background: "rgba(30, 15, 60, 0.5)",
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
          {pageNav?.hasPrev && (
            <NeonGlassButton onClick={pageNav.onPrev}>← назад</NeonGlassButton>
          )}
          {pageNav?.hasNext && (
            <NeonGlassButton onClick={pageNav.onNext}>далее →</NeonGlassButton>
          )}
          <NeonGlassButton onClick={() => setMode("read")}>📖 читать книгу</NeonGlassButton>
          <NeonGlassButton onClick={() => setMode("final")}>✦ завершить</NeonGlassButton>
        </>
      )}

      {mode === "read" && (
        <>
          <NeonGlassButton onClick={onAddWord}>✏️ внести слово</NeonGlassButton>
          {pageNav?.hasPrev && (
            <NeonGlassButton onClick={pageNav.onPrev}>← назад</NeonGlassButton>
          )}
          {pageNav?.hasNext && (
            <NeonGlassButton onClick={pageNav.onNext}>далее →</NeonGlassButton>
          )}
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
