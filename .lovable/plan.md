

# Plan: Fine-tune entry positioning & styling in FinalBook

## Changes in `src/components/FinalBook.tsx`

### 1. Left page container (line 141-142)
```
left: "25%" → "27%"     ← ещё правее
top: "30%" → "32%"      ← чуть ниже
width: "20%" → "18%"    ← уже, чтобы не вылезать
height: "42%" → "40%"
```

### 2. Right page container (line 156-157)
```
left: "53%" → "52%"     ← ближе к переплёту
top: "30%" → "32%"      ← тоже ниже
width: "24%" → "24%"    ← без изменений
height: "42%" → "40%"
padding: "8px 14px 28px 4px" → "8px 14px 28px 2px"  ← левый отступ минимальный
```

### 3. Увеличить шрифт описания (line 100)
```
text-xs → text-sm
```

### 4. Реакции — сдвинуть к переплёту (line 104)
```
justify-end → justify-start
```
Реакции будут выровнены к левому краю (т.е. к переплёту на левой странице, и тоже к переплёту на правой).

Итого: контент садится глубже в орнамент, описание крупнее, реакции ближе к корешку.

