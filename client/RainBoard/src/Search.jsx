import { SearchBar } from "./SearchBar";
import { SearchButton } from "./SearchButton";

export const Search = () => {
  return (
    <div className="Search">
      <SearchBar className="SearchBar" text="Search City" />
      <SearchButton />
    </div>
  );
};
