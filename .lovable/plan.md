

# Plan: Зафиксировать слова, убрать сброс, восстановить данные

## Изменения

### 1. `src/pages/Index.tsx`

**Удалить блок очистки** (строки 50–57) — `magic-book-initial-clean` useEffect полностью убирается.

**Добавить INITIAL_ENTRIES** перед компонентом — список всех ранее внесённых слов (нужен точный список от вас, либо я вставлю те что были видны на скриншотах: Вайбкодинг, Промпт, Нейросеть, Токен, Галлюцинация, Эмбеддинг, Файнтюнинг, Трансформер).

**Изменить инициализацию entries** (строки 25–28):
```tsx
const [entries, setEntries] = useState<Entry[]>(() => {
  const saved = localStorage.getItem("magic-book-entries");
  const parsed = saved ? JSON.parse(saved) : [];
  return parsed.length > 0 ? parsed : INITIAL_ENTRIES;
});
```

**Убрать handleRestart** (строки 67–70) — функция сброса удаляется полностью.

### 2. `src/components/ControlBar.tsx`

**Удалить кнопку "начать заново"** из режима `final` (строка 74). Убрать `onRestart` из props интерфейса.

### 3. `src/pages/Index.tsx` — убрать onRestart из ControlBar

Удалить проп `onRestart={handleRestart}` из JSX ControlBar.

## Результат
- Книга никогда не обнуляется
- Кнопка сброса отсутствует в UI
- При пустом localStorage загружаются зафиксированные слова
- Новые слова добавляются в конец через `setEntries(prev => [...prev, newEntry])`

