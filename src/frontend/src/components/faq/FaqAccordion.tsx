import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'When does the bootcamp start?',
      answer: 'The bootcamp starts on February 14, 2026. The program runs for 4 weeks with live sessions and hands-on projects.'
    },
    {
      question: 'What is the time commitment?',
      answer: 'Expect to dedicate 10-15 hours per week, including live sessions (2-3 hours), self-paced learning, and project work. Sessions are recorded if you can\'t attend live.'
    },
    {
      question: 'Do I need prior programming experience?',
      answer: 'No programming experience is required! This bootcamp is designed for beginners. We\'ll teach you everything you need to know about AI tools and applications, starting from the basics.'
    },
    {
      question: 'What AI tools will we use?',
      answer: 'You\'ll get hands-on experience with Claude Sonnet 4.5, Emergent AI, and other cutting-edge AI platforms. We\'ll cover prompt engineering, API integration, and practical applications.'
    },
    {
      question: 'Is there a certificate upon completion?',
      answer: 'Yes! You\'ll receive a certificate of completion after finishing the bootcamp and your capstone project. This demonstrates your AI skills to employers and clients.'
    },
    {
      question: 'What is the cost of the bootcamp?',
      answer: 'Pricing details will be shared with waitlist members first. Join the waitlist to get early access to enrollment and special pricing.'
    },
    {
      question: 'Can I join from anywhere in the world?',
      answer: 'Absolutely! The bootcamp is 100% online. Live sessions will be scheduled to accommodate multiple time zones, and all sessions are recorded for later viewing.'
    },
    {
      question: 'What happens after I join the waitlist?',
      answer: 'You\'ll receive updates about the bootcamp, early access to enrollment, and exclusive content. We\'ll notify you as soon as registration opens with all the details you need.'
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about the bootcamp
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
