import { useUnits } from "./UnitsContext";

export const UnitToggle = () => {
  const { units, setTemp, setWind } = useUnits();

  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn${units.temp === "C" ? " active" : ""}`}
        onClick={() => setTemp("C")}
      >°C</button>
      <span className="unit-sep">/</span>
      <button
        className={`unit-btn${units.temp === "F" ? " active" : ""}`}
        onClick={() => setTemp("F")}
      >°F</button>
      <span className="unit-divider">|</span>
      <button
        className={`unit-btn${units.wind === "kph" ? " active" : ""}`}
        onClick={() => setWind("kph")}
      >km/h</button>
      <span className="unit-sep">/</span>
      <button
        className={`unit-btn${units.wind === "mph" ? " active" : ""}`}
        onClick={() => setWind("mph")}
      >mph</button>
    </div>
  );
};
