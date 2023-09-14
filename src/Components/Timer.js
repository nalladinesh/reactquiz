import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(timer);
    },
    [dispatch]
  );

  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  return (
    <span className="timer">
      {`${min}`.padStart(2, 0)}:{`${sec}`.padStart(2, 0)}
    </span>
  );
}

export default Timer;
