const QuillPen = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <span className="quill-pen inline-block align-middle ml-1" style={{ width: 28, height: 36 }}>
      <svg viewBox="0 0 28 36" width="28" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Feather body */}
        <path
          d="M22 2C18 6 14 14 10 22C8 26 6 30 5 34"
          stroke="hsl(250, 50%, 25%)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Feather vane left */}
        <path
          d="M22 2C16 4 12 8 10 14C8 10 6 6 2 4"
          fill="hsl(250, 40%, 35%)"
          opacity="0.6"
        />
        {/* Feather vane right */}
        <path
          d="M22 2C24 6 25 10 24 16C20 12 16 10 10 14"
          fill="hsl(265, 50%, 40%)"
          opacity="0.5"
        />
        {/* Nib */}
        <path
          d="M5 34L4 36L6 35L5 34Z"
          fill="hsl(40, 60%, 40%)"
        />
        {/* Ink drops */}
        <circle className="ink-drop-1" cx="5" cy="35" r="1" fill="hsl(250, 60%, 20%)" opacity="0" />
        <circle className="ink-drop-2" cx="7" cy="34" r="0.7" fill="hsl(250, 60%, 20%)" opacity="0" />
      </svg>
    </span>
  );
};

export default QuillPen;
