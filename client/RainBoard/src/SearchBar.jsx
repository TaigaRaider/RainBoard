export const SearchBar = ({ className = "search-bar", text, onChange }) => {
  return (
    <input
      type="text"
      placeholder={text}
      className={className}
      onChange={onChange}
    />
  );
};
