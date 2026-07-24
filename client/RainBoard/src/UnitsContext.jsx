import { createContext, useContext, useState } from "react";

const UnitsContext = createContext();

const STORAGE_KEY = "rainboard-units";

function loadUnits() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.temp && saved?.wind) return saved;
  } catch {
    // fall through
  }
  return { temp: "C", wind: "kph" };
}

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState(loadUnits);

  const setTemp = (temp) => {
    const next = { ...units, temp };
    setUnits(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const setWind = (wind) => {
    const next = { ...units, wind };
    setUnits(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const tempC = (c) => {
    if (units.temp === "F") return Math.round(c * 9 / 5 + 32);
    return Math.round(c);
  };

  const windKph = (kph) => {
    if (units.wind === "mph") return Math.round(kph * 0.621371);
    return Math.round(kph);
  };

  const tempSuffix = units.temp === "F" ? "°F" : "°C";
  const windSuffix = units.wind === "mph" ? "mph" : "km/h";

  return (
    <UnitsContext.Provider value={{ units, setTemp, setWind, tempC, windKph, tempSuffix, windSuffix }}>
      {children}
    </UnitsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUnits() {
  return useContext(UnitsContext);
}
