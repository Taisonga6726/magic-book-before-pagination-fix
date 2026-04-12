import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import bookImg from "@/assets/book.png";
import SpineEffect from "./SpineEffect";
import InkWriteEffect from "./InkWriteEffect";

interface Entry {
  word: string;
  description: string;
}

interface MagicBookProps {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[]>>;
  onOpenCatalog: () => void;
}

const MagicBook = ({ entries, setEntries, onOpenCatalog }: MagicBookProps) => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [burst, setBurst] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

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
      setEntries((prev) => [...prev, { word: word.trim(), description: description.trim() }]);
    }

    setBurst(false);
    requestAnimationFrame(() => setBurst(true));
    setTimeout(() => setBurst(false), 1200);

    setWord("");
    setDescription("");
    toast("Запись внесена");
  }, [word, description, editIdx, setEntries]);

  const handleEdit = useCallback(() => {
    if (entries.length === 0) return;
    const lastIdx = entries.length - 1;
    const entry = entries[lastIdx];
    setWord(entry.word);
    setDescription(entry.description);
    setEditIdx(lastIdx);
  }, [entries]);

  // Build live preview text
  const liveText = word
    ? (description ? `${word} — ${description}` : word)
    : "";

  return (
    <div className="relative w-full max-w-[1100px] mx-auto magic-cursor" style={{ aspectRatio: "1.5 / 1" }}>
      <img
        src={bookImg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      <SpineEffect burst={burst} />

      {/* Left page — input */}
      <div
        className="absolute font-book magic-cursor-write"
        style={{ left: "18%", top: "18%", width: "22%", height: "60%", padding: "16px 24px 12px 32px" }}
      >
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Слово"
          className="magic-input w-full text-2xl font-semibold font-book mb-4 text-ink"
        />

        <div className="writing-zone rounded-sm mt-2" style={{ minHeight: "55%" }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Пишите от руки…"
            className="magic-textarea w-full h-full font-handwriting text-lg notebook-lines magic-cursor-write"
            style={{ minHeight: "160px", lineHeight: "32px" }}
          />
        </div>

        <div className="mt-3 font-book text-sm tracking-wide">
          <span className="action-text cursor-pointer" onClick={handleSave}>сохранить</span>
          <span className="mx-2" style={{ color: "hsl(var(--ink) / 0.3)" }}>|</span>
          <span className="action-text cursor-pointer" onClick={handleEdit}>редактировать</span>
        </div>
        <div className="mt-2 text-xs" style={{ color: "hsl(var(--ink) / 0.25)" }}>Реакции</div>
      </div>

      {/* Right page — results */}
      <div
        className="absolute font-book"
        style={{ right: "13%", top: "18%", width: "28%", height: "60%", padding: "16px 20px 12px 24px", overflowY: "auto", overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        {entries.length === 0 && !liveText ? (
          <p className="font-handwriting text-base italic mt-8 text-center" style={{ color: "hsl(var(--ink) / 0.25)" }}>
            Здесь появятся ваши записи…
          </p>
        ) : (
          <ol className="list-none space-y-3">
            {entries.map((entry, i) => {
              // If editing this entry, skip it — live preview replaces it
              if (editIdx === i && liveText) return null;

              return (
                <li key={i} className="text-ink text-base leading-relaxed">
                  <span className="font-semibold" style={{ color: "hsl(var(--ink) / 0.5)" }}>{i + 1}. </span>
                  <span className="font-semibold">{entry.word}</span>
                  {entry.description && <span className="font-handwriting"> — {entry.description}</span>}
                </li>
              );
            })}

            {/* Live preview row */}
            {liveText && (
              <li className="text-ink text-base leading-relaxed">
                <span className="font-semibold" style={{ color: "hsl(var(--ink) / 0.5)" }}>
                  {editIdx !== null ? editIdx + 1 : entries.length + 1}.{" "}
                </span>
                <InkWriteEffect
                  text={liveText}
                  className="ink-fresh font-handwriting"
                />
              </li>
            )}
          </ol>
        )}
      </div>

      <div className="absolute bottom-[12%] right-[14%] font-book text-xs action-text cursor-pointer tracking-wider" onClick={onOpenCatalog}>
        каталог →
      </div>
    </div>
  );
};

export default MagicBook;
