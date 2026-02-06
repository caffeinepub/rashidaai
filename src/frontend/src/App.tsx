import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CountdownSection } from './components/countdown/CountdownSection';
import { SyllabusSection } from './components/syllabus/SyllabusSection';
import { InteractivePreview } from './components/preview/InteractivePreview';
import { FaqAccordion } from './components/faq/FaqAccordion';
import { WaitlistSection } from './components/waitlist/WaitlistSection';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';

function App() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onJoinWaitlist={scrollToWaitlist} />
      <main>
        <Hero onJoinWaitlist={scrollToWaitlist} />
        <CountdownSection />
        <SyllabusSection />
        <InteractivePreview />
        <FaqAccordion />
        <WaitlistSection />
      </main>
      <Footer />
      <ChatbotWidget onJoinWaitlist={scrollToWaitlist} />
    </div>
  );
}

export default App;
