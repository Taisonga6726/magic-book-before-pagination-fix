

# Сделать кнопки «сохранить | редактировать» видимыми неоновыми кнопками

## Проблема
Золотой текст «сохранить | редактировать» сливается с пергаментным фоном и почти не виден.

## Решение
Заменить простой текст на компактные неоновые кнопки с полупрозрачным фоном и свечением — видимые, но органично вписанные в стиль книги.

## Изменения

### `src/components/MagicBook.tsx` (строки 115-119)
Обернуть каждое действие в `<span>` с классом `neon-btn-gold` вместо `action-text-gold`:
```tsx
<div className="mt-3 flex justify-center gap-4">
  <span className="neon-btn-gold cursor-pointer" onClick={handleSave}>сохранить</span>
  <span className="neon-btn-gold cursor-pointer" onClick={handleEdit}>редактировать</span>
</div>
```

### `src/index.css` — новый класс `.neon-btn-gold`
```css
.neon-btn-gold {
  display: inline-block;
  padding: 4px 14px;
  font-family: 'Marck Script', cursive;
  font-size: 1.1rem;
  color: hsl(40 90% 65%);
  background: hsl(40 60% 20% / 0.35);
  border: 1px solid hsl(40 80% 50% / 0.5);
  border-radius: 20px;
  text-shadow: 0 0 8px hsl(40 90% 55% / 0.6), 0 0 20px hsl(40 90% 55% / 0.3);
  box-shadow: 0 0 8px hsl(40 80% 50% / 0.3), inset 0 0 6px hsl(40 80% 50% / 0.15);
  transition: all 0.3s ease;
}
.neon-btn-gold:hover {
  color: hsl(40 95% 75%);
  background: hsl(40 60% 25% / 0.5);
  text-shadow: 0 0 12px hsl(40 90% 60% / 0.8), 0 0 30px hsl(40 90% 55% / 0.5);
  box-shadow: 0 0 14px hsl(40 80% 55% / 0.5), inset 0 0 8px hsl(40 80% 50% / 0.25);
}
```

Итого: 2 файла. Кнопки будут компактные, округлые, с золотым неоновым свечением — хорошо видны на пергаменте.

