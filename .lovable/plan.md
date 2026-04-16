

# Plan: Убрать INITIAL_ENTRIES и выровнять левую страницу

## 1. `src/pages/Index.tsx`

**Удалить** строки 23–32 (весь массив `INITIAL_ENTRIES`).

**Заменить** инициализацию entries (строки 36–40):
```tsx
const [entries, setEntries] = useState<Entry[]>(() => {
  const saved = localStorage.getItem("magic-book-entries");
  return saved ? JSON.parse(saved) : [];
});
```

## 2. `src/components/FinalBook.tsx` — левая страница (строка 177)

Изменить:
- `left: "22%"` → `"24%"`
- `padding: "12px 8px 40px 12px"` → `"12px 8px 40px 16px"`

## Не затрагивается
- Правая страница
- Логика сохранения/добавления
- localStorage

