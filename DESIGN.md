# RainBoard — Animation & Transition Guide

## Simple — CSS Transitions (hover/state changes)

1. **Search button pulse** — scale up slightly on hover (`transform: scale(1.05)`)
   Component: `SearchButton.jsx`

2. **Dashboard block lift** — translateY(-2px) on hover with a soft shadow
   Component: `DashBoardBlock.jsx`

3. **Day report row highlight** — background fade-in on hover
   Component: `WeekReport.jsx`

4. **Search bar width expand** — grows wider on focus (transition `width`)
   Component: `SearchBar.jsx`

---

## Intermediate — CSS @keyframes Animations

5. **Fade-in on load** — all sections fade in with staggered delays (header → current → dashboard → week report)
   Component: `App.jsx` / all children

6. **Current icon float** — subtle up/down bobbing loop on the weather icon
   Component: `CurrentCondition.jsx`

7. **Temp bar fill animation** — bars animate from width 0 to their final width on data load
   Component: `WeekReport.jsx`

8. **Search button ripple** — radial gradient expanding outward on click
   Component: `SearchButton.jsx`

9. **Error message slide-in** — error text slides down from above with fade
   Component: `App.jsx`

---

## Advanced — JS + CSS Combined

10. **Number count-up** — temperature/humidity values animate from 0 to their final number on load
    Component: `CurrentCondition.jsx`, `DashBoardBlock.jsx`

11. **Weather icon morph** — crossfade between icons when switching cities (fade out old, fade in new)
    Component: `CurrentCondition.jsx`

12. **Skeleton loading state** — pulsing placeholder shapes shown while the API is fetching
    Component: `App.jsx`

13. **Background gradient shift** — body gradient colors subtly change based on condition (sunny = warm tones, rain = cool tones)
    Component: `index.css` / `App.jsx`

---

## Hard — React State-Driven Animations

14. **Page transition on search** — current data fades/slides out, new data fades/slides in (requires animating unmount with something like `framer-motion` or manual `useState` delay)
    Component: `App.jsx`

15. **Staggered dashboard entry** — each block animates in one after another with increasing delay
    Component: `DashBoard.jsx`

16. **Week report bar race** — temp bars animate in sequentially from top to bottom, not all at once
    Component: `WeekReport.jsx`

---

## Sample Example — Current Icon Float (#6)

This is the easiest keyframe animation and gives you an immediate visible result.

### Step 1: Define the keyframes in `App.css`

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
```

This moves the element 8px up at the midpoint, then back down, creating a bobbing effect.

### Step 2: Apply it to `.current-icon`

```css
.current-icon {
  font-size: 4rem;
  color: var(--accent);
  filter: drop-shadow(0 0 20px rgba(232, 168, 56, 0.25));
  animation: float 3s ease-in-out infinite;
}
```

### Breakdown

| Part | Meaning |
|------|---------|
| `float` | name of the @keyframes rule |
| `3s` | duration (one full cycle takes 3 seconds) |
| `ease-in-out` | timing function (starts slow, speeds up, slows down at end) |
| `infinite` | repeats forever |

### Tips

- Use `animation-delay` to offset multiple elements so they don't all bob in sync
- Keep `translateY` values small (4-10px) for subtle, natural motion
- Combine with `will-change: transform` for smoother performance:

```css
.current-icon {
  will-change: transform;
  animation: float 3s ease-in-out infinite;
}
```

### Variation — Pulse instead of float

```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.current-icon {
  animation: pulse 2s ease-in-out infinite;
}
```
