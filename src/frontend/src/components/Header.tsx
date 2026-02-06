import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onJoinWaitlist: () => void;
}

export function Header({ onJoinWaitlist }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/rashidaai-logo.dim_512x512.png" 
            alt="RashidaAi Logo" 
            className="h-10 w-10"
          />
          <span className="font-display text-xl font-bold gradient-text">
            RashidaAi
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('countdown')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Countdown
          </button>
          <button
            onClick={() => scrollToSection('syllabus')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Syllabus
          </button>
          <button
            onClick={() => scrollToSection('preview')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Preview
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            FAQ
          </button>
          <button
            onClick={onJoinWaitlist}
            className="px-6 py-2 rounded-full gradient-primary text-white font-semibold hover:shadow-glow transition-all"
          >
            Join Waitlist
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('countdown')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Countdown
            </button>
            <button
              onClick={() => scrollToSection('syllabus')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Syllabus
            </button>
            <button
              onClick={() => scrollToSection('preview')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={onJoinWaitlist}
              className="px-6 py-2 rounded-full gradient-primary text-white font-semibold hover:shadow-glow transition-all text-center"
            >
              Join Waitlist
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
