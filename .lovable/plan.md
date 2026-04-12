

# Звук пера фоном при печати (debounce)

## Подход
Используем загруженный пользователем файл `pen_writing_in_a_book_magic.MP3` — он уже в `public/pen-scratch.mp3`. Меняем только логику воспроизведения:

- При **первом нажатии** клавиши — запускаем звук с начала
- Пока пользователь печатает — звук продолжает играть фоном
- Через **1 секунду** после последнего нажатия — звук плавно останавливается
- Применяем к обоим полям: «Слово» и «Описание»

## Изменения в `src/components/MagicBook.tsx`

1. Добавить `useRef` для debounce-таймера
2. Заменить `playPenSound`:
   - Если `paused` → `currentTime = 0`, `play()`
   - Сброс таймера, новый таймер `pause()` через 1000мс
3. Добавить вызов `playPenSound()` в `onChange` textarea (описание)

```ts
const stopTimer = useRef<number | null>(null);

const playPenSound = useCallback(() => {
  if (!penAudio.current) {
    penAudio.current = new Audio("/pen-scratch.mp3");
    penAudio.current.volume = 0.3;
  }
  if (penAudio.current.paused) {
    penAudio.current.currentTime = 0;
    penAudio.current.play().catch(() => {});
  }
  if (stopTimer.current) clearTimeout(stopTimer.current);
  stopTimer.current = window.setTimeout(() => {
    penAudio.current?.pause();
  }, 1000);
}, []);
```

Один файл, минимальное изменение.

