export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Intent {
  keywords: string[];
  response: string;
  action?: () => void;
}

export function matchIntent(userInput: string, onJoinWaitlist: () => void): string {
  const input = userInput.toLowerCase();

  const intents: Intent[] = [
    {
      keywords: ['start', 'when', 'date', 'begin'],
      response: 'The bootcamp starts on February 14, 2026. It\'s a 4-week intensive program with live sessions and hands-on projects. Would you like to join the waitlist?'
    },
    {
      keywords: ['duration', 'long', 'weeks', 'time'],
      response: 'The bootcamp runs for 4 weeks. You\'ll need to dedicate 10-15 hours per week, including live sessions (2-3 hours), self-paced learning, and project work. All sessions are recorded!'
    },
    {
      keywords: ['cost', 'price', 'fee', 'payment', 'how much'],
      response: 'Pricing details will be shared with waitlist members first! Join the waitlist to get early access to enrollment and special pricing. Would you like me to take you to the waitlist form?'
    },
    {
      keywords: ['prerequisite', 'experience', 'beginner', 'programming', 'coding'],
      response: 'No prior programming or AI experience is required! This bootcamp is designed for complete beginners. We\'ll teach you everything from the ground up, starting with AI fundamentals.'
    },
    {
      keywords: ['tools', 'software', 'claude', 'emergent', 'ai'],
      response: 'You\'ll work with cutting-edge AI tools including Claude Sonnet 4.5 and Emergent AI. We\'ll cover prompt engineering, API integration, and practical applications. Everything you need to become proficient with modern AI platforms!'
    },
    {
      keywords: ['certificate', 'certification', 'credential'],
      response: 'Yes! You\'ll receive a certificate of completion after finishing the bootcamp and your capstone project. This demonstrates your AI skills to employers and clients.'
    },
    {
      keywords: ['online', 'remote', 'location', 'where'],
      response: 'The bootcamp is 100% online! You can join from anywhere in the world. Live sessions are scheduled to accommodate multiple time zones, and all sessions are recorded for later viewing.'
    },
    {
      keywords: ['waitlist', 'join', 'signup', 'register', 'enroll'],
      response: 'Great! I can take you to the waitlist form right now. Just click below and you\'ll be all set!',
      action: onJoinWaitlist
    },
    {
      keywords: ['syllabus', 'curriculum', 'learn', 'topics', 'cover'],
      response: 'The 4-week curriculum covers: Week 1 - AI Fundamentals, Week 2 - AI Tools & Platforms (Claude, Emergent AI), Week 3 - Practical Applications (chatbots, automation), and Week 4 - Real-World Projects. Check out the full syllabus on the page!'
    },
    {
      keywords: ['help', 'support', 'question'],
      response: 'I\'m here to help! You can ask me about the start date, duration, prerequisites, tools we\'ll use, pricing, or how to join the waitlist. What would you like to know?'
    }
  ];

  // Find matching intent
  for (const intent of intents) {
    if (intent.keywords.some(keyword => input.includes(keyword))) {
      if (intent.action) {
        setTimeout(() => intent.action!(), 1000);
      }
      return intent.response;
    }
  }

  // Default response
  return 'That\'s a great question! The RashidaAi bootcamp is a 4-week intensive program starting February 14, 2026. You can ask me about the start date, duration, prerequisites, tools, pricing, or how to join the waitlist. What would you like to know?';
}
