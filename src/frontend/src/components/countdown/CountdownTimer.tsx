import { useCountdown } from '../../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="p-8 rounded-2xl bg-card border border-border">
        <p className="text-xl font-semibold text-muted-foreground">
          The February 18, 2026 cohort has started!
        </p>
        <p className="text-muted-foreground mt-2">
          Join the waitlist for the next cohort.
        </p>
      </div>
    );
  }

  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
        >
          <div className="text-4xl md:text-5xl font-bold gradient-text font-display">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
