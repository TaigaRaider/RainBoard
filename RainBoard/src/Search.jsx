import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchButton } from "./SearchButton";

export const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="Search">
      <SearchBar
        className="SearchBar"
        text="Search City"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSubmit} />
    </div>
  );
};
