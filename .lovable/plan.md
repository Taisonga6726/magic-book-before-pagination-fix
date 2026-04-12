

# Убрать квадратные пятна — равномерный космический фон

## Проблема
Фон `.cosmic-bg` имеет слишком маленькие радиальные градиенты, которые не покрывают всю площадь — по краям видны резкие тёмные зоны, выглядящие как «квадраты».

## Изменения

### `src/index.css` — переписать `.cosmic-bg`
Заменить текущие градиенты на полностью покрывающие, с плавными переходами в тон книги (фиолетово-розово-красные):

```css
.cosmic-bg {
  background:
    radial-gradient(ellipse at 20% 30%, hsl(265 60% 18% / 0.7), transparent 55%),
    radial-gradient(ellipse at 80% 70%, hsl(330 60% 18% / 0.5), transparent 55%),
    radial-gradient(ellipse at 50% 0%, hsl(350 70% 20% / 0.4), transparent 60%),
    radial-gradient(ellipse at 0% 50%, hsl(280 50% 15% / 0.5), transparent 50%),
    radial-gradient(ellipse at 100% 50%, hsl(220 60% 15% / 0.4), transparent 50%),
    radial-gradient(ellipse at 50% 100%, hsl(300 50% 14% / 0.5), transparent 50%),
    linear-gradient(135deg, hsl(260 30% 10%), hsl(280 25% 8%), hsl(240 20% 8%));
}
```

Добавлены градиенты для всех краёв и углов, базовый `linear-gradient` стал светлее — никаких тёмных пустых зон. Один файл, одна правка.

