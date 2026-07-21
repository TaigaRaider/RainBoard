import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DashBoardBlock = ({ icon, label, value }) => {
  return (
    <div className="dashboard-block">
      <FontAwesomeIcon icon={icon} className="block-icon" />
      <span className="block-label">{label}</span>
      <span className="block-value">{value}</span>
    </div>
  );
};
