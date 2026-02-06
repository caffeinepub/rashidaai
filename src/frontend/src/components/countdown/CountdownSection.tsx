import { CountdownTimer } from './CountdownTimer';

export function CountdownSection() {
  return (
    <section id="countdown" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Bootcamp Starts In
            </h2>
            <p className="text-muted-foreground">
              Don't miss out! The February 14, 2026 cohort is filling up fast.
            </p>
          </div>
          <CountdownTimer targetDate={new Date('2026-02-14T00:00:00')} />
        </div>
      </div>
    </section>
  );
}
