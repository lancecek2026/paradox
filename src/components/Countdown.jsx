import React, { useState, useEffect } from 'react';

const Countdown = ({ 
  targetDate = 'September 17, 2026 09:00:00',
  secondaryTargetDate = 'September 17, 2026 17:00:00',
  primaryLabel = 'Hackathon Starts In',
  secondaryLabel = 'Hackathon Ends In',
  endedLabel = 'Hackathon Has Concluded'
}) => {
  const calculateTimeLeft = () => {
    let target = new Date(targetDate).getTime();
    const secondaryTarget = new Date(secondaryTargetDate).getTime();
    const now = new Date().getTime();
    
    let difference = target - now;
    let currentPhase = 'primary';

    if (difference <= 0) {
      difference = secondaryTarget - now;
      currentPhase = 'secondary';
    }

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', phase: 'ended' };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      phase: currentPhase
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, secondaryTargetDate]);

  const allUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  const units = timeLeft.phase === 'primary' 
    ? allUnits 
    : allUnits.filter(u => u.label !== 'DAYS');

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 md:mb-5">
      {timeLeft.phase === 'primary' && (
         <div className="text-[var(--color-primary)] text-sm md:text-base font-bold uppercase tracking-widest mb-4">
            {primaryLabel}
         </div>
      )}
      {timeLeft.phase === 'secondary' && (
         <div className="text-[var(--color-primary)] text-sm md:text-base font-bold uppercase tracking-widest mb-4 animate-pulse">
            {secondaryLabel}
         </div>
      )}
      {timeLeft.phase === 'ended' && (
         <div className="text-[var(--color-primary)] text-sm md:text-base font-bold uppercase tracking-widest mb-4">
            {endedLabel}
         </div>
      )}
      <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 w-full">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center flex-1 max-w-[72px] sm:max-w-[80px]">
            {/* Box with Red Number */}
            <div className="w-full aspect-square bg-[#0c0c0e] border border-[var(--color-primary)]/30 hover:border-[var(--color-primary)]/60 transition-colors rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              <span className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-primary)] tracking-tight">
                {unit.value}
              </span>
            </div>
            {/* Label below box */}
            <span className="text-[10px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1.5 text-center">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;

