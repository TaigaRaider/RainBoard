import { useState, useEffect } from "react";
import "./App.css";
import { Search } from "./Search";
import { DashBoard } from "./DashBoard";
import { CurrentCondition } from "./CurrentCondition";
import { DashBoardBlock } from "./DashBoardBlock";
import { WeekReport } from "./WeekReport";
import { fetchWeather } from "./api";
import {
  faDroplet,
  faGaugeHigh,
  faSun,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

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
      },
    );
  }, []);

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

  const headerText = location
    ? `${location.name},\n ${location.region || location.country}`
    : "Search for a city";

  console.log(weather);
  return (
    <>
      <header>
        <pre id="city-date">{headerText}</pre>
        <Search onSearch={handleSearch} />
      </header>

      {error && <p className="error">{error}</p>}

      {current && (
        <CurrentCondition
          condition={current.condition.text}
          temperature={`${current.temp_c}°`}
          location={`${location.region}, ${location.country}`}
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
