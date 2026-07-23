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
import { useCountUp } from "./useCountUp";

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
  "Heavy rain": faCloudShowersHeavy,
  Drizzle: faCloudShowersHeavy,
  "Light drizzle": faCloudShowersHeavy,
  Thunderstorm: faCloudBolt,
  Snow: faSnowflake,
  "Light snow": faSnowflake,
  "Heavy snow": faSnowflake,
};

const fallbackIcon = faCloud;

const parseValue = (str) => {
  const match = String(str).match(/^([-+]?\d+\.?\d*)(.*)/);
  if (!match) return { number: 0, suffix: str };
  return { number: Number(match[1]), suffix: match[2] };
};

export const CurrentCondition = ({
  condition = "Clear",
  temperature = "0°",
  location = "",
  time = "",
}) => {
  const matchedKey = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === condition.toLowerCase()
  );
  const icon = matchedKey ? iconMap[matchedKey] : fallbackIcon;

  const { number, suffix } = parseValue(temperature);
  const displayTemp = useCountUp(number, 500);

  const formattedTime = time
    ? new Date(time.replace(" ", "T")).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="current-condition">
      <span className="curr-desc">
        <h1 className="current-temp">{displayTemp}{suffix}</h1>
        <p className="current-condition-text">{condition}</p>
        {formattedTime && <p className="current-time">{formattedTime}</p>}
        <p className="current-location">{location}</p>
      </span>
      <span className="currentwrap">
        <FontAwesomeIcon icon={icon} className="current-icon" />
      </span>
    </div>
  );
};
