

# Plan: Очистить тестовые слова из localStorage

## Проблема
Код уже чист — никаких `INITIAL_ENTRIES` или `DEMO_ENTRIES` нет. Но 8 тестовых слов были сохранены в `localStorage` браузера во время предыдущего сеанса и продолжают отображаться.

## Решение

### `src/pages/Index.tsx` — одноразовая очистка тестовых данных

Добавить `useEffect`, который при первом запуске проверяет флаг `magic-book-test-cleaned`. Если флаг не установлен — очищает `magic-book-entries` и ставит флаг. Это сработает один раз, после чего книга будет пустой и готова к заполнению реальными словами.

```tsx
useEffect(() => {
  if (!localStorage.getItem("magic-book-test-cleaned")) {
    localStorage.removeItem("magic-book-entries");
    localStorage.setItem("magic-book-test-cleaned", "true");
    setEntries([]);
  }
}, []);
```

После очистки:
- Книга пуста при первом открытии
- Пользователь вводит слова через MagicBook
- Слова сохраняются в localStorage как обычно
- Тестовые данные больше не появляются

## Не затрагивается
- Логика сохранения и добавления слов
- MagicBook / FinalBook компоненты
- Структура Entry

