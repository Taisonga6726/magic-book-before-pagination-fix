

# План: персистентное хранение записей (localStorage)

## Проблема
`entries` инициализируется как `useState<Entry[]>([])` — при каждой перезагрузке страницы все данные теряются.

## Решение

### `src/pages/Index.tsx`

1. **Инициализация из localStorage**: заменить `useState<Entry[]>([])` на ленивую инициализацию, читающую из `localStorage` ключ `"magic-book-entries"`.

2. **Синхронизация**: добавить `useEffect`, который при каждом изменении `entries` записывает их в `localStorage`.

3. **Никаких очисток**: при переходах между view (`book`/`catalog`/`final`) entries не сбрасывается — это уже работает корректно (state поднят в Index).

```tsx
const [entries, setEntries] = useState<Entry[]>(() => {
  const saved = localStorage.getItem("magic-book-entries");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("magic-book-entries", JSON.stringify(entries));
}, [entries]);
```

### Файлы
- `src/pages/Index.tsx` — единственное изменение

### Что НЕ меняется
- Отступы, цвета, анимации, звуки
- MagicBook, FinalBook, CatalogView — без изменений
- Логика добавления/редактирования слов

