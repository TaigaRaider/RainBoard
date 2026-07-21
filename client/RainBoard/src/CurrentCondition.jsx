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
  "Heavy rain": faCloudShowersHeavy,
  Drizzle: faCloudShowersHeavy,
  "Light drizzle": faCloudShowersHeavy,
  Thunderstorm: faCloudBolt,
  Snow: faSnowflake,
  "Light snow": faSnowflake,
  "Heavy snow": faSnowflake,
};

const fallbackIcon = faCloud;

export const CurrentCondition = ({
  condition = "Clear",
  temperature = "—",
  location = "",
}) => {
  const matchedKey = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === condition.toLowerCase()
  );
  const icon = matchedKey ? iconMap[matchedKey] : fallbackIcon;

  return (
    <div className="current-condition">
      <span className="curr-desc">
        <h1 className="current-temp">{temperature}</h1>
        <p className="current-condition-text">{condition}</p>
        <p className="current-location">{location}</p>
      </span>
      <span className="currentwrap">
        <FontAwesomeIcon icon={icon} className="current-icon" />
      </span>
    </div>
  );
};
