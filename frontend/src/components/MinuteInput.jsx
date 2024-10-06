import * as React from "react"
import "../App.css"

const MinuteInput = () => {
    const [minutes, setMinutes] = React.useState('');
  
    const handleMinuteChange = (e) => {
      const value = e.target.value;
      if (value === '' || (parseInt(value) >= 0 && parseInt(value) < 60)) {
        setMinutes(value);
      }
    };
  
    return (
      <div className="minute-input">
        <label htmlFor="minutes">Enter time (in minutes): </label>
        <input
          type="number"
          id="minutes"
          min="0"
          max="59"
          value={minutes}
          onChange={handleMinuteChange}
          placeholder="0-59"
        />
      </div>
    );
  };
  
  export default MinuteInput;