import { useUnits } from "./UnitsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudShowersHeavy,
  faCloudBolt,
  faSnowflake,
  faCloud,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  Clear: faSun,
  Sunny: faSun,
  "Partly cloudy": faCloudSun,
  Cloudy: faCloud,
  Overcast: faSmog,
  Mist: faSmog,
  Fog: faSmog,
  Rain: faCloudShowersHeavy,
  "Light rain": faCloudShowersHeavy,
  Drizzle: faCloudShowersHeavy,
  Thunderstorm: faCloudBolt,
  Snow: faSnowflake,
};

const fallbackIcon = faCloud;

const getIcon = (text) => {
  const matchedKey = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === text.toLowerCase()
  );
  return matchedKey ? iconMap[matchedKey] : fallbackIcon;
};

export const HourlyForecast = ({ hours = [] }) => {
  const { tempC } = useUnits();

  if (!hours.length) return null;

  return (
    <div className="hourly-forecast">
      <h3 className="hourly-title">Hourly</h3>
      <div className="hourly-scroll">
        {hours.map((h, i) => {
          const time = h.time.split(" ")[1] || "00:00";
          return (
            <div className="hourly-item" key={i}>
              <span className="hourly-time">{time}</span>
              <FontAwesomeIcon icon={getIcon(h.condition.text)} className="hourly-icon" />
              <span className="hourly-temp">{tempC(h.temp_c)}°</span>
              {h.chance_of_rain > 0 && (
                <span className="hourly-rain">{h.chance_of_rain}%</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
