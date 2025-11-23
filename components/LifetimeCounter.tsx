import React, { useEffect, useState } from 'react';
import { TimeCounter } from '../types';

export const LifetimeCounter: React.FC = () => {
  const [time, setTime] = useState<TimeCounter>({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const birthDate = new Date('2007-02-05T00:00:00');

    const updateCounter = () => {
      const now = new Date();
      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();
      let hours = now.getHours() - birthDate.getHours();
      let minutes = now.getMinutes() - birthDate.getMinutes();
      let seconds = now.getSeconds() - birthDate.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) { months += 12; years--; }

      setTime({ years, months, days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] shadow-lg transform hover:scale-105 transition-transform duration-300">
      <span className="text-2xl sm:text-3xl font-bold text-gold-accent font-serif tracking-wider">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80 mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 my-8 max-w-4xl mx-auto px-4">
      <TimeUnit value={time.years} label="Years" />
      <TimeUnit value={time.months} label="Months" />
      <TimeUnit value={time.days} label="Days" />
      <TimeUnit value={time.hours} label="Hours" />
      <TimeUnit value={time.minutes} label="Minutes" />
      <TimeUnit value={time.seconds} label="Seconds" />
    </div>
  );
};