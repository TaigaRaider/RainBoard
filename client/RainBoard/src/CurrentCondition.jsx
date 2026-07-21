import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudShowersHeavy,
  faCloudBolt,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

export const CurrentCondition = ({
  condition = "Clear",
  temperature = "68°",
  location = "Abuja, FCT",
}) => {
  const iconMap = {
    Clear: faSun,
    Rain: faCloudShowersHeavy,
    PartlyCloudy: faCloudSun,
    ThunderStorm: faCloudBolt,
    Snow: faSnowflake,
  };
  return (
    <div className="current-condition">
      
      <span className="curr-desc">
        <h1 className="current-temp">{temperature}</h1>
        <p className="current-condition-text">{condition}</p>
        <p className="current-location">{location}</p>
      </span>
      
      <span className="currentwrap">
        <FontAwesomeIcon icon={iconMap[condition]} className="current-icon" />
      </span>
    </div>
  );
};
