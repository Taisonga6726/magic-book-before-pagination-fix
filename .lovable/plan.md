

# Эффект «запись пером» при сохранении и редактировании

## Что делаем
При нажатии «сохранить» (новая запись или после редактирования) текст на правой странице появляется посимвольно с анимацией чернил. На правой странице ничего не меняется, пока пользователь не нажмёт «сохранить».

## Изменения

### 1. Новый файл `src/components/InkWriteEffect.tsx`
- Компонент принимает `text: string` и `onComplete?: () => void`
- `useEffect` + `setInterval` (~40мс) увеличивает счётчик видимых символов
- Видимые символы — обычные `<span>`, текущий — с классом `ink-letter` (анимация `ink-appear`)
- Невидимые — `opacity: 0`
- По достижении конца текста вызывает `onComplete`

### 2. CSS в `src/index.css`
```css
@keyframes ink-appear {
  from { opacity: 0; filter: blur(1.5px); }
  to { opacity: 1; filter: blur(0); }
}
.ink-letter {
  animation: ink-appear 150ms ease-out forwards;
}
.ink-fresh {
  color: hsl(250, 60%, 20%);
  text-shadow: 0 0 6px hsl(250 70% 40% / 0.4);
}
```

### 3. Изменения в `src/components/MagicBook.tsx`
- Заменить `newEntryIdx` на `writingIdx: number | null`
- В `handleSave`: при новой записи `writingIdx = entries.length`, при редактировании `writingIdx = editIdx`
- На правой странице: если `i === writingIdx` → рендер через `<InkWriteEffect>` с классом `ink-fresh`, иначе — обычный текст
- `onComplete` сбрасывает `writingIdx = null`
- Убрать `animate-text-appear` и старый `newEntryIdx`

