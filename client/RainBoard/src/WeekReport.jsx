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

const getDayName = (dateStr, index) => {
  if (index === 0) return "Today";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const WeekReport = ({ forecast = [] }) => {
  const temps = forecast.flatMap((d) => [d.day.mintemp_c, d.day.maxtemp_c]);
  const overallLow = Math.min(...temps);
  const overallHigh = Math.max(...temps);
  const range = overallHigh - overallLow || 1;

  return (
    <div className="weekReport">
      {forecast.map((item, i) => {
        const low = item.day.mintemp_c;
        const high = item.day.maxtemp_c;
        const left = ((low - overallLow) / range) * 100;
        const width = ((high - low) / range) * 100;
        return (
          <div className="day-report" key={item.date}>
            <span className="day-name">{getDayName(item.date, i)}</span>
            <FontAwesomeIcon icon={getIcon(item.day.condition.text)} className="day-icon" />
            <span className="day-low">{low}°</span>
            <div className="temp-bar-track">
              <div
                className="temp-bar-fill"
                style={{ left: `${left}%`, width: `${width}%` }}
              />
            </div>
            <span className="day-high">{high}°</span>
          </div>
        );
      })}
    </div>
  );
};
