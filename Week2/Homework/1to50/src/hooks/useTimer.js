import { useState, useRef } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(null);

  // 시작 시각과의 차이로 걸린 시간 계산 (0.01초마다 갱신)
  const start = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(
      () => setTime((Date.now() - startTimeRef.current) / 1000),
      10,
    );
  };

  // 멈추고 최종 시간 돌려주기
  const stop = () => {
    clearInterval(intervalRef.current);
    const finalTime = (Date.now() - startTimeRef.current) / 1000;
    setTime(finalTime);
    return finalTime;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
  };

  return { time, start, stop, reset };
};
