import { useState, useCallback, useRef } from "react";
import bookImg from "@/assets/book.png";
import SpineEffect from "./SpineEffect";

interface Entry {
  word: string;
  description: string;
}

interface MagicBookProps {
  onOpenCatalog: () => void;
}

const MagicBook = ({ onOpenCatalog }: MagicBookProps) => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [burst, setBurst] = useState(false);
  const [newEntryIdx, setNewEntryIdx] = useState<number | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const burstKey = useRef(0);

  const handleSave = useCallback(() => {
    if (!word.trim()) return;

    if (editIdx !== null) {
      setEntries((prev) => {
        const copy = [...prev];
        copy[editIdx] = { word: word.trim(), description: description.trim() };
        return copy;
      });
      setEditIdx(null);
    } else {
      const newEntry = { word: word.trim(), description: description.trim() };
      setEntries((prev) => [...prev, newEntry]);
      setNewEntryIdx(entries.length);
      setTimeout(() => setNewEntryIdx(null), 800);
    }

    burstKey.current++;
    setBurst(false);
    requestAnimationFrame(() => setBurst(true));
    setTimeout(() => setBurst(false), 1200);

    setWord("");
    setDescription("");
  }, [word, description, editIdx, entries.length]);

  const handleEdit = useCallback(() => {
    if (entries.length === 0) return;
    const lastIdx = entries.length - 1;
    const entry = entries[lastIdx];
    setWord(entry.word);
    setDescription(entry.description);
    setEditIdx(lastIdx);
  }, [entries]);

  return (
    <div className="relative w-full max-w-[960px] mx-auto magic-cursor" style={{ aspectRatio: "1.5 / 1" }}>
      {/* Book background image */}
      <img
        src={bookImg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      {/* Spine effect */}
      <SpineEffect burst={burst} />

      {/* Left page — input */}
      <div
        className="absolute font-book magic-cursor-write"
        style={{
          left: "7%",
          top: "12%",
          width: "38%",
          height: "72%",
          padding: "8px 16px",
        }}
      >
        {/* Word input */}
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Слово"
          className="magic-input w-full text-2xl font-semibold font-book mb-4 text-ink"
          style={{ textShadow: "0 0 8px hsl(265 60% 50% / 0.3)" }}
        />

        {/* Description */}
        <div className="writing-zone rounded-sm mt-2" style={{ minHeight: "55%" }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Пишите от руки…"
            className="magic-textarea w-full h-full font-handwriting text-lg notebook-lines magic-cursor-write"
            style={{ minHeight: "160px", lineHeight: "32px" }}
          />
        </div>

        {/* Actions */}
        <div className="mt-3 font-book text-sm tracking-wide">
          <span className="action-text cursor-pointer" onClick={handleSave}>
            сохранить
          </span>
          <span className="mx-2" style={{ color: "hsl(var(--ink) / 0.3)" }}>|</span>
          <span className="action-text cursor-pointer" onClick={handleEdit}>
            редактировать
          </span>
        </div>
        <div className="mt-2 text-xs" style={{ color: "hsl(var(--ink) / 0.25)" }}>
          Реакции
        </div>
      </div>

      {/* Right page — results */}
      <div
        className="absolute font-book"
        style={{
          right: "7%",
          top: "12%",
          width: "38%",
          height: "72%",
          padding: "8px 16px",
          overflowY: "auto",
        }}
      >
        {entries.length === 0 ? (
          <p
            className="font-handwriting text-base italic mt-8 text-center"
            style={{ color: "hsl(var(--ink) / 0.25)" }}
          >
            Здесь появятся ваши записи…
          </p>
        ) : (
          <ol className="list-none space-y-3">
            {entries.map((entry, i) => (
              <li
                key={i}
                className={`text-ink text-base leading-relaxed ${
                  i === newEntryIdx ? "animate-text-appear" : ""
                }`}
              >
                <span className="font-semibold" style={{ color: "hsl(var(--ink) / 0.5)" }}>
                  {i + 1}.{" "}
                </span>
                <span className="font-semibold">{entry.word}</span>
                {entry.description && (
                  <span className="font-handwriting"> — {entry.description}</span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Catalog link */}
      <div
        className="absolute bottom-[6%] right-[10%] font-book text-xs action-text cursor-pointer tracking-wider"
        onClick={onOpenCatalog}
      >
        каталог →
      </div>
    </div>
  );
};

export default MagicBook;
