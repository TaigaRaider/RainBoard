import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const forecast = [
  { day: "Mon", icon: faSun, high: "70°", low: "58°" },
  { day: "Tue", icon: faCloudSun, high: "68°", low: "56°" },
  { day: "Wed", icon: faCloudRain, high: "64°", low: "54°" },
  { day: "Thu", icon: faCloudShowersHeavy, high: "62°", low: "53°" },
  { day: "Fri", icon: faSun, high: "72°", low: "59°" },
  { day: "Sat", icon: faCloudSun, high: "69°", low: "57°" },
  { day: "Sun", icon: faSun, high: "74°", low: "60°" },
];

export const WeekReport = () => {
  return (
    <div className="weekReport">
      <div className="day-report">
        <span className="day-desc">DAY</span>
        <FontAwesomeIcon icon={faWind} className="day-icon" />
        <span className="day-high">H</span><span className="day-low">L</span>
      </div>
      {forecast.map((item) => (
        <div className="day-report" key={item.day}>
          <span className="day-name">{item.day}</span>
          <FontAwesomeIcon icon={item.icon} className="day-icon" />
          <span className="day-high">{item.high}</span>
          <span className="day-low">{item.low}</span>
        </div>
      ))}
    </div>
  );
};
