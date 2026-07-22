import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCountUp } from "./useCountUp";

const parseValue = (str) => {
  const match = String(str).match(/^([-+]?\d+\.?\d*)(.*)/);
  if (!match) return { number: 0, suffix: str };
  return { number: Number(match[1]), suffix: match[2] };
};

export const DashBoardBlock = ({ icon, label, value = "0" }) => {
  const { number, suffix } = parseValue(value);
  const displayValue = useCountUp(number, 1000);

  return (
    <div className="dashboard-block">
      <FontAwesomeIcon icon={icon} className="block-icon" />
      <span className="block-label">{label}</span>
      <span className="block-value">{displayValue}{suffix}</span>
    </div>
  );
};
