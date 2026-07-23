import { useState, useEffect } from "react";
import "./App.css";
import { Search } from "./Search";
import { DashBoard } from "./DashBoard";
import { CurrentCondition } from "./CurrentCondition";
import { DashBoardBlock } from "./DashBoardBlock";
import { WeekReport } from "./WeekReport";
import { fetchWeather } from "./api";
import { conditionToTheme } from "./conditionThemes";
import { Logo } from "./Logo";
import {
  faDroplet,
  faGaugeHigh,
  faSun,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg-layer-1", theme.layer1);
  root.style.setProperty("--bg-layer-2", theme.layer2);
  root.style.setProperty("--bg-layer-3", theme.layer3);
  root.style.setProperty("--bg-base", theme.base);
}

function isNightTime(location) {
  if (!location?.tz_id) return false;
  try {
    const now = new Date();
    const localTime = new Date(
      now.toLocaleString("en-US", { timeZone: location.tz_id })
    );
    const hour = localTime.getHours();
    return hour < 6 || hour >= 19;
  } catch {
    return false;
  }
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeather(`${latitude},${longitude}`);
          setWeather(data);
        } catch {
          setError("Could not load weather for your location");
        }
      },
      () => {
        setError("Location access denied. Search for a city instead.");
      }
    );
  }, []);

  useEffect(() => {
    if (!weather?.current) return;
    const night = isNightTime(weather.location);
    const theme = conditionToTheme(weather.current.condition.text, night);
    applyTheme(theme);
  }, [weather]);

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    try {
      setError(null);
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const location = weather?.location;
  const current = weather?.current;
  const forecast = weather?.forecast?.forecastday;

  return (
    <>
      <header>
        <Logo />
        <Search onSearch={handleSearch} />
      </header>

      {error && <p className="error">{error}</p>}

      {current && (
        <CurrentCondition
          condition={current.condition.text}
          temperature={`${current.temp_c}°`}
          location={`${location.region}, ${location.country}`}
          time={location.localtime}
        />
      )}

      {current && (
        <DashBoard>
          <DashBoardBlock
            icon={faDroplet}
            label="Humidity"
            value={`${current.humidity}%`}
          />
          <DashBoardBlock
            icon={faGaugeHigh}
            label="Pressure"
            value={`${current.pressure_mb}hPa`}
          />
          <DashBoardBlock
            icon={faSun}
            label="UV Index"
            value={`${current.uv}`}
          />
          <DashBoardBlock
            icon={faWind}
            label="Wind"
            value={`${current.wind_kph}km/h`}
          />
        </DashBoard>
      )}

      {forecast && <WeekReport forecast={forecast} />}
    </>
  );
}
