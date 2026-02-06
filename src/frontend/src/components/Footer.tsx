import { Heart, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/generated/rashidaai-logo.dim_512x512.png" 
                  alt="RashidaAi Logo" 
                  className="h-8 w-8"
                />
                <span className="font-display text-lg font-bold gradient-text">
                  RashidaAi
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making AI accessible to everyone through comprehensive, hands-on education.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-foreground transition-colors"
                  >
                    Syllabus
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-foreground transition-colors"
                  >
                    Course Preview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.location.hash = 'admin'}
                    className="hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <Shield size={14} />
                    Admin
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Bootcamp Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Start Date: February 18, 2026</li>
                <li>Duration: 4 Weeks</li>
                <li>Format: 100% Online</li>
                <li>Level: Beginner-Friendly</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2 flex-wrap">
              © 2026. Built with 
              <Heart size={16} className="text-secondary fill-secondary" /> 
              using 
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
