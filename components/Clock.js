import { useState, useEffect } from "react";

export const Clock = ({ serverTime }) => {
  const [date, setDate] = useState(new Date(serverTime));

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return <div>{date.toLocaleString("en-GB")}</div>;
}

