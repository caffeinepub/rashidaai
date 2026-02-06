import { useState } from 'react';
import { useWaitlistMutation } from '../../hooks/useQueries';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { mutate: addToWaitlist, isPending, isError, error, reset } = useWaitlistMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      return;
    }

    // Reset any previous errors
    reset();

    addToWaitlist(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () => {
          setSubmitted(true);
          setName('');
          setEmail('');
        },
        onError: (err) => {
          console.error('Waitlist submission error:', err);
        }
      }
    );
  };

  const handleRetry = () => {
    reset();
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
          <CheckCircle2 size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
          <p className="text-muted-foreground">
            Thank you for joining! You'll receive updates about the bootcamp as we get closer to the February 18, 2026 start date.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary hover:underline font-medium"
        >
          Submit another email
        </button>
      </div>
    );
  }

  const isDuplicateEmail = error instanceof Error && error.message.includes('already in your waitlist');
  const isConnectionError = error instanceof Error && (
    error.message.includes('Actor not initialized') || 
    error.message.includes('Actor not available') ||
    error.message.includes('network') ||
    error.message.includes('fetch')
  );

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your full name"
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
            disabled={isPending}
          />
        </div>
      </div>

      {isError && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              {isDuplicateEmail ? (
                <p>This email is already on the waitlist. We'll keep you updated!</p>
              ) : isConnectionError ? (
                <p>Unable to connect to the server. Please check your connection and try again.</p>
              ) : (
                <p>Something went wrong. Please try again. If the problem persists, please contact support.</p>
              )}
            </div>
          </div>
          {!isDuplicateEmail && (
            <button
              type="button"
              onClick={handleRetry}
              className="text-destructive hover:underline font-medium text-xs"
            >
              Clear error and retry
            </button>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !name.trim() || !email.trim()}
        className="w-full px-8 py-4 rounded-full gradient-primary text-white font-bold text-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Joining...</span>
          </>
        ) : (
          'Join the Waitlist'
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        By joining, you agree to receive updates about the RashidaAi bootcamp. 
        You can unsubscribe at any time.
      </p>
    </form>
  );
}
