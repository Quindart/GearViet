"use client";
import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTimeMs = endTime.getTime();
      const difference = endTimeMs - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2">
      <div className="bg-white text-black px-3 py-2 rounded font-bold min-w-[50px] text-center">
        {String(timeLeft.days).padStart(2, "0")}
        <div className="text-xs text-gray-600">Ngày</div>
      </div>
      <div className="bg-white text-black px-3 py-2 rounded font-bold min-w-[50px] text-center">
        {String(timeLeft.hours).padStart(2, "0")}
        <div className="text-xs text-gray-600">Giờ</div>
      </div>
      <div className="bg-white text-black px-3 py-2 rounded font-bold min-w-[50px] text-center">
        {String(timeLeft.minutes).padStart(2, "0")}
        <div className="text-xs text-gray-600">Phút</div>
      </div>
      <div className="bg-white text-black px-3 py-2 rounded font-bold min-w-[50px] text-center">
        {String(timeLeft.seconds).padStart(2, "0")}
        <div className="text-xs text-gray-600">Giây</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
