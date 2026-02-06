import { useState } from 'react';
import { Play } from 'lucide-react';

export function InteractivePreview() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const previews = [
    {
      week: 1,
      title: 'Introduction to AI',
      description: 'Discover the fundamentals of artificial intelligence and how it\'s transforming industries.',
      lessonTitle: 'What is Artificial Intelligence?',
      lessonContent: 'In this foundational lesson, you\'ll explore the history of AI, understand key concepts like machine learning and deep learning, and see real-world examples of AI in action. We\'ll demystify the technology and show you how accessible AI has become.',
      duration: '45 minutes'
    },
    {
      week: 2,
      title: 'Mastering AI Tools',
      description: 'Get hands-on experience with cutting-edge AI platforms like Claude Sonnet 4.5 and Emergent AI.',
      lessonTitle: 'Prompt Engineering Masterclass',
      lessonContent: 'Learn the art and science of crafting effective prompts to get the best results from AI models. You\'ll practice with real examples, understand context windows, and discover advanced techniques like chain-of-thought prompting and few-shot learning.',
      duration: '60 minutes'
    },
    {
      week: 3,
      title: 'Building AI Solutions',
      description: 'Create practical AI applications that solve real problems.',
      lessonTitle: 'Building Your First AI Chatbot',
      lessonContent: 'Step-by-step guidance on creating an intelligent chatbot from scratch. You\'ll learn about conversation design, context management, and how to integrate AI APIs. By the end, you\'ll have a working chatbot you can customize and deploy.',
      duration: '90 minutes'
    },
    {
      week: 4,
      title: 'Launch Your Project',
      description: 'Bring everything together in a capstone project that showcases your new AI skills.',
      lessonTitle: 'Capstone Project Workshop',
      lessonContent: 'Work on your own AI project with guidance from instructors. You\'ll learn deployment strategies, performance optimization, and best practices for production AI systems. Present your project to the cohort and get valuable feedback.',
      duration: '120 minutes'
    }
  ];

  const currentPreview = previews[selectedWeek - 1];

  return (
    <section id="preview" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Interactive Course Preview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore sample lessons from each week of the bootcamp
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {previews.map((preview) => (
              <button
                key={preview.week}
                onClick={() => setSelectedWeek(preview.week)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedWeek === preview.week
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card border border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-semibold mb-1">Week {preview.week}</div>
                <div className="text-sm font-medium">{preview.title}</div>
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 rounded-xl bg-secondary/10 text-secondary">
                <Play size={32} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-secondary mb-2">
                  Sample Lesson - Week {currentPreview.week}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-display mb-2">
                  {currentPreview.lessonTitle}
                </h3>
                <p className="text-muted-foreground">
                  {currentPreview.description}
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-foreground/90 leading-relaxed">
                {currentPreview.lessonContent}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">Duration:</span> {currentPreview.duration}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">Format:</span> Live + Recording
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
