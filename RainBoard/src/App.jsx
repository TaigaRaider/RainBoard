import { useState, useEffect } from "react";
import "./App.css";
import { Search } from "./Search";
import { DashBoard } from "./DashBoard";
import { CurrentCondition } from "./CurrentCondition";
import { DashBoardBlock } from "./DashBoardBlock";
import { WeekReport } from "./WeekReport";
import { HourlyForecast } from "./HourlyForecast";
import { UnitToggle } from "./UnitToggle";
import { SearchHistory } from "./SearchHistory";
import { addToHistory } from "./historyStore";
import { UnitsProvider, useUnits } from "./UnitsContext";
import { fetchWeather } from "./api";
import { conditionToTheme } from "./conditionThemes";
import { Logo } from "./Logo";
import {
  faDroplet,
  faGaugeHigh,
  faSun,
  faWind,
  faEye,
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

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { windKph, windSuffix } = useUnits();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading(true);
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeather(`${latitude},${longitude}`);
          setWeather(data);
        } catch {
          setError("Could not load weather for your location");
        }
        setLoading(false);
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
    setLoading(true);
    try {
      setError(null);
      const data = await fetchWeather(city);
      setWeather(data);
      addToHistory(city.trim());
    } catch {
      setError("City not found");
      setWeather(null);
    }
    setLoading(false);
  };

  const location = weather?.location;
  const current = weather?.current;
  const forecast = weather?.forecast?.forecastday;

  const todayHours = forecast?.[0]?.hour || [];
  const now = new Date();
  const currentHour = now.getHours();
  const upcomingHours = todayHours.filter((h) => {
    const hour = parseInt(h.time.split(" ")[1], 10);
    return hour >= currentHour;
  });

  return (
    <>
      <header>
        <Logo />
        <Search onSearch={handleSearch} />
      </header>

      <UnitToggle />
      <SearchHistory onSelect={handleSearch} />

      {error && <p className="error">{error}</p>}

      {loading && (
        <div className="skeleton-group">
          <div className="skeleton skeleton-hero" />
          <div className="skeleton-row">
            <div className="skeleton skeleton-block" />
            <div className="skeleton skeleton-block" />
            <div className="skeleton skeleton-block" />
            <div className="skeleton skeleton-block" />
          </div>
        </div>
      )}

      {current && !loading && (
        <CurrentCondition
          condition={current.condition.text}
          temperature={`${current.temp_c}°`}
          feelsLike={current.feelslike_c}
          location={`${location.region}, ${location.country}`}
          time={location.localtime}
          lastUpdated={current.last_updated}
        />
      )}

      {current && !loading && (
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
            value={`${windKph(current.wind_kph)}${windSuffix}`}
          />
          <DashBoardBlock
            icon={faEye}
            label="Visibility"
            value={`${current.vis_km}km`}
          />
        </DashBoard>
      )}

      {upcomingHours.length > 0 && !loading && (
        <HourlyForecast hours={upcomingHours} />
      )}

      {forecast && !loading && <WeekReport forecast={forecast} />}
    </>
  );
}

export default function App() {
  return (
    <UnitsProvider>
      <WeatherApp />
    </UnitsProvider>
  );
}
