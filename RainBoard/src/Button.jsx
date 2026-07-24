export const Button = ({ text, id, className = "btn", children, onClick }) => {
  return (
    <button onClick={onClick} id={id} className={className}>
      {text ? text : children}
    </button>
  );
}