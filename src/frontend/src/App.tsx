import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CountdownSection } from './components/countdown/CountdownSection';
import { SyllabusSection } from './components/syllabus/SyllabusSection';
import { InteractivePreview } from './components/preview/InteractivePreview';
import { FaqAccordion } from './components/faq/FaqAccordion';
import { WaitlistSection } from './components/waitlist/WaitlistSection';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { AdminWaitlistDashboard } from './components/admin/AdminWaitlistDashboard';
import { getSecretParameter } from './utils/urlParams';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');

  useEffect(() => {
    const handleHashChange = () => {
      // Extract any secret parameters (like caffeineAdminToken) from the hash
      // This must happen before we parse the route to ensure the token is persisted
      getSecretParameter('caffeineAdminToken');

      // Parse the hash to determine the current view
      const hash = window.location.hash.slice(1); // Remove leading #
      
      // Extract route path (before any query parameters)
      const queryIndex = hash.indexOf('?');
      const routePath = queryIndex !== -1 ? hash.substring(0, queryIndex) : hash;
      
      setCurrentView(routePath === 'admin' ? 'admin' : 'landing');
    };

    // Set initial view based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (currentView === 'admin') {
    return <AdminWaitlistDashboard />;
  }

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
