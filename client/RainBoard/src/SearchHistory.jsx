import { useState } from "react";
import { getHistory, removeFromHistory } from "./historyStore";

export const SearchHistory = ({ onSelect }) => {
  const [history, setHistory] = useState(getHistory);

  const remove = (city) => {
    const next = removeFromHistory(city);
    setHistory(next);
  };

  if (!history.length) return null;

  return (
    <div className="search-history">
      <span className="history-label">Recent</span>
      <div className="history-pills">
        {history.map((city) => (
          <span className="history-pill" key={city}>
            <button className="history-city" onClick={() => onSelect(city)}>{city}</button>
            <button className="history-x" onClick={() => remove(city)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
};
