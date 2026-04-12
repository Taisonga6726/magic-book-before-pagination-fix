

# План: видимость кнопок + исправление дубликатов

## 1. MagicBook.tsx — кнопки навигации

### «← назад» (строка 374-380)
Заменить `bottom-[18%]` → `bottom-[22%]`, `z-20` → `z-50`, добавить inline style с фоном и контрастом.

### «далее →» (строка 382-389)
Заменить `bottom-[18%]` → `bottom-[22%]`, `z-20` → `z-50`, добавить inline style.

### «завершить книгу ✦» (строка 392-400)
Заменить `bottom: "16%"` → `bottom: "20%"`, `z-20` → `z-50`, добавить inline style.

Общий стиль для всех трёх кнопок:
```
color: #1a1440
fontWeight: 700
textShadow: "0 0 3px rgba(0,0,0,0.15)"
background: "rgba(255,255,255,0.6)"
padding: "4px 10px"
borderRadius: "6px"
backdropFilter: "blur(2px)"
```
hover через `hover:scale-105` класс (уже есть через action-text).

## 2. MagicBook.tsx — дубликаты (строка 132)

Добавить `.trim()` к `e.word`:
```tsx
(e) => e.word.trim().toLowerCase() === word.trim().toLowerCase()
```

## 3. FinalBook.tsx — кнопки навигации (строка 247)

Поднять контейнер: `bottom-[12%]` → `bottom-[18%]`, `z-20` → `z-50`.
Добавить inline style с тем же фоном/контрастом к каждой кнопке внутри.

## Что НЕ меняется
- Пагинация, entries, localStorage, анимации, звуки

## Файлы
- `src/components/MagicBook.tsx`
- `src/components/FinalBook.tsx`

