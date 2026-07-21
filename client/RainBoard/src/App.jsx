import "./App.css";
import { Search } from "./Search";
import { DashBoard } from "./DashBoard";
import { CurrentCondition } from "./CurrentCondition";
import { DashBoardBlock } from "./DashBoardBlock";
import { WeekReport } from "./WeekReport";
import {
  faDroplet,
  faGaugeHigh,
  faSun,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const date = `Abuja, FCT\nMonday, 20 July`;

  return (
    <>
      <header>
        <pre id="city-date">{date}</pre>
        <Search />
      </header>
      <CurrentCondition />
      <DashBoard>
        <DashBoardBlock icon={faDroplet} label="Humidity" value="72%" />
        <DashBoardBlock icon={faGaugeHigh} label="Pressure" value="1013hPa" />
        <DashBoardBlock icon={faSun} label="UV Index" value="6" />
        <DashBoardBlock icon={faWind} label="Wind" value="12km/h" />
      </DashBoard>
      <WeekReport />
    </>
  );
}
