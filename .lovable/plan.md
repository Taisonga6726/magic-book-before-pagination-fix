

# Plan: Исправить пагинацию — заполнять страницу до нижнего орнамента

## Проблема
Размеры шрифтов в измерении не совпадают с реальным рендером, поэтому код считает, что записи занимают больше места, чем реально. Страница остаётся наполовину пустой.

## Изменения в `src/components/MagicBook.tsx`

### Измерение высоты записей (lines 131-136)
Привести размеры в измерении в точное соответствие с рендером:

| Параметр | Сейчас (измерение) | Рендер (реальный) | Исправить на |
|---|---|---|---|
| Заголовок font-size | 1.5rem (24px) | text-xl (20px) | 1.25rem |
| Описание font-size | 1.125rem (18px) | text-base (16px) | 1rem |
| Описание margin-left | 1.75rem | нет | убрать |
| lineHeight | default | 1.15 | 1.15 |
| margin-bottom | 8px | space-y-1 (4px) | 4px |
| textAlign | default | justify | justify |
| width | container.offsetWidth | с учётом padding | без изменений |

Точный код измерения:
```html
<div style="margin-bottom:4px">
  <div style="font-size:1.25rem;font-weight:700;line-height:1.15;text-align:justify;font-style:italic">
    N. word
  </div>
  <div style="font-size:1rem;line-height:1.15;text-align:justify;margin-top:2px">
    — description
  </div>
</div>
```

Это единственное изменение — логика пагинации (переворот когда не влезает) уже работает правильно.

