

# Plan: Увеличить книгу FinalBook до размера MagicBook + слова жирным

## Проблема
1. FinalBook использует контейнер с `aspectRatio` и `height: 100vh` — книга меньше чем в MagicBook
2. Слова (entry.word) не выделены жирным — bold только на номере

## Изменения в `src/components/FinalBook.tsx`

### 1. Контейнер книги (lines 156-165) — как в MagicBook
Заменить текущую обёртку на структуру MagicBook:
```tsx
<div className="fixed inset-0 w-screen h-screen overflow-hidden z-40">
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-full h-full magic-cursor scene-fade-in" style={{ transform: "translateY(-3%)" }}>
```
И картинку сделать `object-contain` как в MagicBook:
```tsx
<img src={bookFinalImg} className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none" />
```

### 2. Слово жирным (line 140)
Добавить `font-bold` на весь заголовок (и номер, и слово):
```tsx
<div className="pb-0.5 text-xl leading-tight font-bold" ...>
```

### 3. Тень от MagicBook (line 168-169)
Усилить виньетку как в MagicBook:
```
boxShadow: "inset 0 0 150px 80px rgba(0,0,0,0.9)"
```

Больше ничего не меняю — позиции страниц, пагинация, описание остаются как есть.

