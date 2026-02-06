import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { matchIntent, type ChatMessage } from './chatbotScript';

interface ChatbotWidgetProps {
  onJoinWaitlist: () => void;
}

export function ChatbotWidget({ onJoinWaitlist }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you learn about the RashidaAi AI Made Easy Bootcamp. Ask me anything!'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = matchIntent(input, onJoinWaitlist);
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full gradient-primary shadow-lg hover:shadow-glow transition-all"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <img 
            src="/assets/generated/rashidaai-chat-icon.dim_256x256.png" 
            alt="Chat" 
            className="w-6 h-6"
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[500px] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 gradient-primary text-white">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/rashidaai-logo.dim_512x512.png" 
                alt="RashidaAi" 
                className="w-8 h-8"
              />
              <div>
                <div className="font-bold">RashidaAi Assistant</div>
                <div className="text-xs opacity-90">Ask me about the bootcamp</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
