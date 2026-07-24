export const SearchBar = ({ className = "search-bar", text, value, onChange, onKeyDown }) => {
  return (
    <input
      type="text"
      placeholder={text}
      className={className}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
