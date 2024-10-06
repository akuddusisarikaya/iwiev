import * as React from 'react';
import "../App.css"

const ToggleSwitch = ({ label }) => {
  const [isToggled, setIsToggled] = React.useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle-switch">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
