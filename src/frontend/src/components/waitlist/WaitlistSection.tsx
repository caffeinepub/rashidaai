import { WaitlistForm } from './WaitlistForm';
import { Users } from 'lucide-react';

export function WaitlistSection() {
  return (
    <section id="waitlist" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6">
              <Users size={16} />
              <span>Limited Spots Available</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground">
              Be the first to know when enrollment opens for the February 14, 2026 cohort. 
              Get exclusive early access and special pricing.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
