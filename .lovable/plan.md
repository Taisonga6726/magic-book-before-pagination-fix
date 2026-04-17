

## Диагноз

Запись `renderEntry` уже одинаковая для обеих страниц. Реальная причина «прыжков» слева:

1. **Левый контейнер**: `padding: "8px 0 20px 0"` — нулевой левый padding. **Правый**: `padding: "8px 4px 20px 4px"` — 4px слева. Из-за этого записи на правой странице визуально начинаются с одной четкой линии, а на левой — впритык к краю overflow без буфера.

2. **Контейнер записи**: `<div className="flex flex-col mb-0">` — flex без `items-start` и без явного `width: 100%`. Заголовок `{globalIdx + 1}. {renderInkWord(entry.word)}` использует `renderInkWord` который оборачивает каждый символ слова в `<span>` со случайной opacity — но номер `{globalIdx + 1}.` остаётся обычным текстом. Это ОК, номер и слово в одной строке.

3. **Главная причина неровности на левой странице** — отсутствие фиксированной левой границы для строки заголовка. При `text-align: left` без padding текст прилипает к `left: 20%`, но описание под ним начинается с `— ` (длинное тире + пробел), и из-за `text-align: justify` на описании первая строка может визуально смещаться.

## Изменения в `src/components/FinalBook.tsx`

**1. Унифицировать padding обеих страниц** (строки 178 и 193):
```
левый: padding: "8px 4px 20px 4px"  (было "8px 0 20px 0")
правый: padding: "8px 4px 20px 4px"  (без изменений)
```

**2. Добавить явную ширину и старт для записи** (строка 137):
```tsx
<div key={globalIdx} className="flex flex-col mb-0 w-full items-start">
```

**3. Гарантировать, что номер и слово — единая inline-строка без переноса** (строка 138-141): обернуть номер в `<span>` с `display: inline` и убедиться, что заголовок не имеет лишнего padding/margin:
```tsx
<div className="pb-0.5 text-xl leading-tight font-bold w-full"
     style={{ color: "#1a1440", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", textAlign: "left", lineHeight: "1.15", padding: 0, margin: 0 }}>
  <span>{globalIdx + 1}. </span>{renderInkWord(entry.word)}
</div>
```

**4. Описание — оставить `text-align: justify`** (по правилу из памяти `entry-text-rules`), но добавить `width: 100%` и `padding: 0`:
```tsx
<div className="text-base font-handwriting leading-tight mt-0 w-full"
     style={{ color: "#1a1030", textAlign: "justify", lineHeight: "1.15", padding: 0, margin: 0 }}>
```

## Что НЕ трогаю
- Координаты страниц (`left/top/width/height`)
- Шрифты, цвета, реакции
- Логику пагинации, нумерацию страниц
- Правую страницу структурно (только padding уже совпадает)

## Проверка
1. `navigate_to_sandbox` 1311×861.
2. Screenshot разворота 1-2 и 3-4.
3. Убедиться: номера записей на ОБЕИХ страницах выровнены по одной вертикальной линии у левого края контейнера, заголовки и описания идут единым блоком без визуальных «прыжков».

