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
import { useUnits } from "./UnitsContext";

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
  const { tempC } = useUnits();

  const temps = forecast.flatMap((d) => [d.day.mintemp_c, d.day.maxtemp_c]);
  const overallLow = Math.min(...temps);
  const overallHigh = Math.max(...temps);
  const range = overallHigh - overallLow || 1;

  return (
    <div className="weekReport">
      {forecast.map((item, i) => {
        const low = tempC(item.day.mintemp_c);
        const high = tempC(item.day.maxtemp_c);
        const rawLow = item.day.mintemp_c;
        const rawHigh = item.day.maxtemp_c;
        const left = ((rawLow - overallLow) / range) * 100;
        const width = ((rawHigh - rawLow) / range) * 100;
        const rain = item.day.daily_chance_of_rain;
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
            {rain > 0 && (
              <span className="day-rain">💧{rain}%</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
