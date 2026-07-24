# Icon Morph Effects — Implementation Guide

Each effect describes how to transition between two FontAwesome icons when the weather condition changes.

---

## 1. Crossfade

**Stack:** CSS `@keyframes` + React `useState` for tracking old/new icons

**Difficulty:** Simple

**Logic:**
1. When `condition` changes, save the outgoing icon in a `useRef` (not `useState` — no re-render needed for the old value)
2. Render both icons stacked with `position: absolute` inside a relative container
3. Apply `fadeOut` animation to the old icon, `fadeIn` to the new icon
4. After the animation ends, clear the old icon from the ref

```css
/* CSS */
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.icon-exit  { animation: fadeOut 0.4s ease forwards; }
.icon-enter { animation: fadeIn 0.4s ease forwards; }
```

```jsx
// React logic
const prevIconRef = useRef(null);

useEffect(() => {
  prevIconRef.current = icon; // store current icon before it changes
}, [condition]);

// Render both during transition, old one fades out, new one fades in
```

**Best for:** Smooth, professional look. Most common choice.

---

## 2. Sequential Fade

**Stack:** CSS `@keyframes` + `animation-delay` + React state

**Difficulty:** Simple

**Logic:**
1. When condition changes, set a `transitioning` state to `true`
2. Apply `fadeOut` to the current icon
3. On `onAnimationEnd`, swap the icon and apply `fadeIn`
4. Set `transitioning` back to `false`

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.icon-exit  { animation: fadeOut 0.3s ease forwards; }
.icon-enter { animation: fadeIn 0.3s ease forwards; }
```

```jsx
// React logic
const [displayIcon, setDisplayIcon] = useState(icon);
const [animClass, setAnimClass] = useState("");

useEffect(() => {
  if (icon === displayIcon) return;
  setAnimClass("icon-exit");
}, [icon]);

const handleExitEnd = () => {
  setDisplayIcon(icon);
  setAnimClass("icon-enter");
};
```

**Best for:** Clear visual separation between old and new. No overlap.

---

## 3. Scale + Fade

**Stack:** CSS `@keyframes` + React ref for old icon

**Difficulty:** Simple

**Logic:**
1. Same as crossfade, but add `transform: scale()` to the keyframes
2. Old icon scales down (1 → 0.5) while fading out
3. New icon scales up (0.5 → 1) while fading in

```css
@keyframes scaleOut {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.5); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
}

.icon-exit  { animation: scaleOut 0.4s ease forwards; }
.icon-enter { animation: scaleIn 0.4s ease forwards; }
```

**Best for:** Adds depth. Icons feel like they're receding/emerging.

---

## 4. Slide + Fade

**Stack:** CSS `@keyframes` + `translateX` + React ref for old icon

**Difficulty:** Medium

**Logic:**
1. Both icons stacked with `position: absolute`
2. Old icon slides left (translateX: 0 → -30px) and fades out
3. New icon slides in from right (translateX: 30px → 0) and fades in
4. Both animations run simultaneously

```css
@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(-30px); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}

.icon-exit  { animation: slideOutLeft 0.4s ease forwards; }
.icon-enter { animation: slideInRight 0.4s ease forwards; }
```

**Best for:** Directional feel. Implies progression or movement.

---

## 5. Spin Out/In

**Stack:** CSS `@keyframes` + `rotate` + `scale` + React ref

**Difficulty:** Medium

**Logic:**
1. Old icon spins out: `rotate(0deg) → rotate(180deg)` + fades + scales down
2. After exit completes, new icon spins in: `rotate(-180deg) → rotate(0deg)` + fades in + scales up
3. Sequential (exit first, then enter) to avoid visual clash

```css
@keyframes spinOut {
  from { opacity: 1; transform: rotate(0deg) scale(1); }
  to   { opacity: 0; transform: rotate(180deg) scale(0.3); }
}
@keyframes spinIn {
  from { opacity: 0; transform: rotate(-180deg) scale(0.3); }
  to   { opacity: 1; transform: rotate(0deg) scale(1); }
}

.icon-exit  { animation: spinOut 0.5s ease forwards; }
.icon-enter { animation: spinIn 0.5s ease forwards; }
```

**Best for:** Playful, dynamic feel. Good for weather apps with personality.

---

## 6. Bounce In

**Stack:** CSS `@keyframes` with custom `cubic-bezier` + React state

**Difficulty:** Medium

**Logic:**
1. Old icon fades out (simple opacity)
2. New icon enters with a spring-like bounce using a custom cubic-bezier curve
3. The bounce overshoots slightly (scale goes past 1) then settles

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes bounceIn {
  0%   { opacity: 0; transform: scale(0.3); }
  50%  { opacity: 1; transform: scale(1.15); }
  70%  { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.icon-exit  { animation: fadeOut 0.3s ease forwards; }
.icon-enter { animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
```

**Best for:** Energetic, bouncy feel. Catches attention.

---

## 7. Morph (Shape Animation)

**Stack:** `flubber` library (or `react-spring`) + SVG icons + React state

**Difficulty:** Hard

**Logic:**
1. FontAwesome icons must be converted to raw SVG paths
2. Use `flubber.interpolate()` to generate intermediate shapes between two SVG paths
3. Animate with `requestAnimationFrame`, interpolating between the two path strings over time

```bash
npm install flubber
```

```js
import { interpolate } from "flubber";

// Two SVG path strings
const pathA = "M12 2..."; // sun path
const pathB = "M4 14..."; // cloud path

const interpolator = interpolate(pathA, pathB, { maxSegmentLength: 10 });

// In animation loop:
const tick = (t) => {
  const path = interpolator(t); // t goes from 0 to 1
  svgPathElement.setAttribute("d", path);
};
```

**Challenge:** FontAwesome icons aren't raw SVG paths by default. You'd need to:
- Extract the path data from FontAwesome's SVG output
- Or switch to a custom SVG icon set with known path data
- Handle path length differences (flubber normalizes this)

**Best for:** True shape morphing. The icon physically transforms into the next one. Visually impressive but complex to implement.

---

## Recommendation

Start with **#1 (Crossfade)** or **#3 (Scale + Fade)**. They give the best visual payoff for the least effort and teach you the core pattern of tracking old/new icons with refs + CSS animations.
