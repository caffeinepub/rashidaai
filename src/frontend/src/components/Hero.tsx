import { Sparkles } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export function Hero({ onJoinWaitlist }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/generated/rashidaai-hero-bg.dim_1920x1080.png" 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Sparkles size={16} />
            <span>4-Week Intensive Bootcamp</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            AI Made Easy
            <span className="block gradient-text mt-2">
              Master AI in 4 Weeks
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join RashidaAi's comprehensive bootcamp starting February 18, 2026. 
            Learn AI fundamentals, tools, and real-world applications from industry experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={onJoinWaitlist}
              className="px-8 py-4 rounded-full gradient-primary text-white font-bold text-lg hover:shadow-glow transition-all animate-pulse-glow"
            >
              Join the Waitlist
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('preview');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 transition-all"
            >
              Explore Curriculum
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">4</div>
              <div className="text-sm text-muted-foreground mt-1">Weeks</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">Live</div>
              <div className="text-sm text-muted-foreground mt-1">Sessions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">Hands-on</div>
              <div className="text-sm text-muted-foreground mt-1">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
