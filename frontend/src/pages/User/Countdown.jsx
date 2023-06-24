import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Countdown = ({ duration, onFinish }) => {
  const [remainingTime, setRemainingTime] = useState(duration * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
    }, 1000);

    if (remainingTime <= 0) {
      clearInterval(interval);
      onFinish();
    }

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, onFinish]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <div style={{fontSize: '20px'}}>{formatTime(remainingTime)}</div>;
};

Countdown.propTypes = {
  duration: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default Countdown;
