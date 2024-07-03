import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let start = Date.now();
    let timeoutId;

    const updateTimer = () => {
      if (isRunning) {
        setTime((prevTime) => prevTime + (Date.now() - start));
        start = Date.now();
        timeoutId = setTimeout(updateTimer, 10);
      }
    };

    if (isRunning) {
      timeoutId = setTimeout(updateTimer, 10);
    }

    return () => clearTimeout(timeoutId);
  }, [isRunning]);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className='stopwatch-container'>
      <p className='stopwatch-time'>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className='stopwatch-buttons'>
        <button className='stopwatch-button' onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className='stopwatch-button' onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
