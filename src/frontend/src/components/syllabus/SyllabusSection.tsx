import { BookOpen, Brain, Code, Rocket } from 'lucide-react';

export function SyllabusSection() {
  const weeks = [
    {
      week: 1,
      title: 'AI Fundamentals',
      icon: BookOpen,
      topics: [
        'Introduction to Artificial Intelligence',
        'Machine Learning basics and terminology',
        'Understanding neural networks',
        'AI ethics and responsible AI practices'
      ]
    },
    {
      week: 2,
      title: 'AI Tools & Platforms',
      icon: Code,
      topics: [
        'Working with Claude Sonnet 4.5',
        'Exploring Emergent AI capabilities',
        'Prompt engineering best practices',
        'Integrating AI APIs into applications'
      ]
    },
    {
      week: 3,
      title: 'Practical Applications',
      icon: Brain,
      topics: [
        'Building AI-powered chatbots',
        'Content generation and automation',
        'Data analysis with AI assistance',
        'Computer vision fundamentals'
      ]
    },
    {
      week: 4,
      title: 'Real-World Projects',
      icon: Rocket,
      topics: [
        'Capstone project development',
        'Deploying AI solutions',
        'Performance optimization',
        'Career paths in AI'
      ]
    }
  ];

  return (
    <section id="syllabus" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              4-Week Curriculum
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive journey from AI fundamentals to real-world applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {weeks.map((week) => {
              const Icon = week.icon;
              return (
                <div
                  key={week.week}
                  className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">
                        Week {week.week}
                      </div>
                      <h3 className="text-xl font-bold font-display">
                        {week.title}
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {week.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
