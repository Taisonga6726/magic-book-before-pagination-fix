const fonts = [
  { name: "Marck Script (текущий)", family: "'Marck Script', cursive" },
  { name: "Dancing Script", family: "'Dancing Script', cursive" },
  { name: "Great Vibes", family: "'Great Vibes', cursive" },
  { name: "Caveat", family: "'Caveat', cursive" },
  { name: "Pacifico", family: "'Pacifico', cursive" },
  { name: "Comforter", family: "'Comforter', cursive" },
  { name: "Bad Script", family: "'Bad Script', cursive" },
  { name: "Cormorant Garamond (italic)", family: "'Cormorant Garamond', serif", italic: true },
];

const FontPreview = () => (
  <div className="fixed inset-0 z-[9999] bg-black/90 overflow-y-auto p-8">
    <h2 className="text-center text-white text-xl mb-6 font-sans">Выберите шрифт</h2>
    <div className="max-w-3xl mx-auto grid gap-4">
      {fonts.map((f) => (
        <div
          key={f.name}
          className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
        >
          <p className="text-white/50 text-xs font-sans mb-2">{f.name}</p>
          <p
            style={{ fontFamily: f.family, fontStyle: f.italic ? "italic" : "normal" }}
            className="text-white text-4xl leading-relaxed"
          >
            ВАйкобчанин
          </p>
          <p
            style={{ fontFamily: f.family, fontStyle: f.italic ? "italic" : "normal" }}
            className="text-white/70 text-2xl mt-1"
          >
            Tanya Gaiduk
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default FontPreview;
