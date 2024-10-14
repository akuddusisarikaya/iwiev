import * as React from "react";
import "../App.css";

const CountdownTimer = ({ totalTimeInMinutes }) => {
  const [timeLeft, setTimeLeft] = React.useState(totalTimeInMinutes * 60);

  React.useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div>
      <h2>Kalan Süre: {formatTime(timeLeft)}</h2>
      {timeLeft <= 0 && <p>Süre doldu!</p>}
    </div>
  );
};

export default CountdownTimer;
