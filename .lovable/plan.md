

# Правки цветов — тёмные чернила вместо золота

## Суть
Заменить все золотые/неоновые цвета на тёмно-чернильные. Текст и кнопки должны выглядеть как настоящие чернила на бумаге.

## Файлы и изменения

### 1. `src/index.css`

**`.action-text`** (строки 147-157):
- `color: hsl(40 75% 50%)` → `color: #2a1f5a`
- `text-shadow` → `0 0 2px rgba(20, 10, 50, 0.15)`
- hover: `color: #3a2f7a`, `text-shadow: 0 0 3px rgba(20, 10, 50, 0.2)`, keep `scale(1.05)`

**`.action-text-gold`** (строки 136-144):
- `color` → `#2a1f5a`
- `text-shadow` → `0 0 2px rgba(20, 10, 50, 0.15)`
- hover: `#3a2f7a`, минимальный glow

**`.book-created-text`** (строки 166-184):
- `color: hsl(40 90% 55%)` → `#1a1440`
- `text-shadow` → `0 0 4px rgba(20, 10, 50, 0.25), 0 0 12px rgba(42, 31, 90, 0.15)`

### 2. `src/components/MagicBook.tsx`

**Записи** (строки 240-248):
- Номер: `color: "hsl(var(--ink) / 0.8)"` → `color: "#1a1440"`
- Слово: `textShadow: "0 0 8px ..."` → `textShadow: "0 0 2px rgba(20,10,50,0.15)"`
- Описание: `color: "hsl(var(--ink) / 0.85)"` → `color: "#2a1f5a"`

**Live text** (строки 257-263): те же изменения

### 3. `src/components/FinalBook.tsx`

Записи уже частично исправлены, но:
- Слово `textShadow`: `"0 0 10px hsl(...)"` → `"0 0 2px rgba(20,10,50,0.15)"`
- Описание `textShadow`: `"0 0 4px hsl(...)"` → `"0 0 2px rgba(20,10,50,0.1)"`

### 4. `src/components/CatalogView.tsx`

Использует `.action-text` — подхватит из CSS автоматически.

## Что НЕ меняется
- FloatingWords (они фоновые, там glow уместен)
- SpineEffect, InkWriteEffect, QuillPen
- Логика ввода, звуки, анимации

