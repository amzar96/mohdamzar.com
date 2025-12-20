import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string | ReactNode;
  timestamp?: Date;
}

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const startYear = 2019;
  const workingYears = currentYear - startYear;

  // Welcome message
  useEffect(() => {
    const welcomeMessages: TerminalLine[] = [
      { type: 'output', content: '╔═══════════════════════════════════════════════════════════════╗' },
      { type: 'output', content: '║                    Welcome to Amzar\'s Terminal                ║' },
      { type: 'output', content: '╚═══════════════════════════════════════════════════════════════╝' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Senior Data Engineer | Kuala Lumpur, Malaysia' },
      { type: 'output', content: `Building data solutions with ${workingYears}+ years of experience` },
      { type: 'output', content: '' },
      { type: 'output', content: 'Type "help" to see available commands' },
      { type: 'output', content: '' },
    ];
    setLines(welcomeMessages);
  }, [workingYears]);

  // Auto-focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    const terminal = terminalRef.current;
    terminal?.addEventListener('click', handleClick);
    return () => terminal?.removeEventListener('click', handleClick);
  }, []);

  // Scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const getHelp = (): ReactNode => {
    return (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold">Available Commands:</div>
        <div className="ml-4 space-y-1">
          <div><span className="text-cyan-400">about</span>     - Learn more about me</div>
          <div><span className="text-cyan-400">experience</span> - View my work experience</div>
          <div><span className="text-cyan-400">skills</span>     - List my technical skills</div>
          <div><span className="text-cyan-400">contact</span>   - Get my contact information</div>
          <div><span className="text-cyan-400">social</span>    - View my social media links</div>
          <div><span className="text-cyan-400">projects</span>  - See my projects</div>
          <div><span className="text-cyan-400">clear</span>     - Clear the terminal</div>
          <div><span className="text-cyan-400">help</span>      - Show this help message</div>
        </div>
      </div>
    );
  };

  const getAbout = (): ReactNode => {
    return (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold">About Me</div>
        <div className="ml-4 space-y-2">
          <div>👋 Hi! I'm <span className="text-cyan-400">Amzar</span> (he/him)</div>
          <div>💼 <span className="text-yellow-400">Senior Data Engineer</span> at AEON Bank</div>
          <div>📍 Based in <span className="text-purple-400">Kuala Lumpur, Malaysia</span></div>
          <div className="pt-2">
            With over <span className="text-green-400">{workingYears} years</span> of experience in Python programming,
            I specialize in data engineering. My focus lies in utilizing the Python stack
            for back-end development, deploying applications, and creating automation
            solutions aimed at reducing manual workload.
          </div>
          <div className="pt-2">
            Now, I am a <span className="text-yellow-400">Data & Analytics Engineer</span> working on data
            operation, including managing the ETL/ELT, database, and business analytics
            using multiple cloud and open-source technologies. And yes, I code every day!
          </div>
        </div>
      </div>
    );
  };

  const getExperience = (): ReactNode => {
    const experiences = [
      {
        title: "Senior Data Engineer",
        company: "AEON Bank",
        period: "Sep 2024 - Present",
        location: "Kuala Lumpur · Hybrid",
        tech: ["Python", "dbt", "Terraform", "AWS", "Kubernetes", "Git", "SQL"]
      },
      {
        title: "Analytics Engineer & Platform Engineer",
        company: "Be U by Bank Islam",
        period: "Jul 2022 - Sep 2024 · 2 yrs 3 mos",
        location: "Kuala Lumpur · Hybrid",
        tech: ["Python", "AWS", "Kubernetes", "SQL", "Git"]
      },
      {
        title: "Performance & System Analyst",
        company: "DHL eCommerce Solutions",
        period: "Sep 2020 - Jul 2022 · 1 yr 11 mos",
        location: "Puchong · Hybrid",
        tech: ["Python", "PostgreSQL", "Google Data Studio", "Splunk", "Tableau", "Power BI", "Selenium", "Bash", "Linux"]
      }
    ];

    return (
      <div className="space-y-4">
        <div className="text-green-400 font-semibold">Work Experience</div>
        {experiences.map((exp, index) => (
          <div key={index} className="ml-4 space-y-1 border-l-2 border-purple-500 pl-4">
            <div className="text-cyan-400 font-semibold">{exp.title}</div>
            <div className="text-yellow-400">{exp.company}</div>
            <div className="text-gray-400 text-sm">{exp.location} | {exp.period}</div>
            <div className="flex flex-wrap gap-2 pt-1">
              {exp.tech.map((tech, i) => (
                <span key={i} className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getSkills = (): ReactNode => {
    const skillCategories = [
      {
        category: "Languages",
        skills: ["Python", "SQL", "Bash", "JavaScript/TypeScript"]
      },
      {
        category: "Data Engineering",
        skills: ["dbt", "Apache Airflow", "ETL/ELT", "Data Modeling", "SQLAlchemy"]
      },
      {
        category: "Cloud & Infrastructure",
        skills: ["AWS", "Terraform", "Kubernetes", "Docker", "Linux"]
      },
      {
        category: "Databases",
        skills: ["PostgreSQL", "MySQL", "Redis", "SQL Databases"]
      },
      {
        category: "Analytics & Visualization",
        skills: ["Tableau", "Power BI", "Google Data Studio", "Splunk"]
      },
      {
        category: "Tools & Others",
        skills: ["Git", "Selenium", "REST APIs", "CI/CD"]
      }
    ];

    return (
      <div className="space-y-3">
        <div className="text-green-400 font-semibold">Technical Skills</div>
        {skillCategories.map((cat, index) => (
          <div key={index} className="ml-4">
            <div className="text-yellow-400 mb-1">{cat.category}:</div>
            <div className="flex flex-wrap gap-2 ml-4">
              {cat.skills.map((skill, i) => (
                <span key={i} className="text-sm bg-gray-800 text-cyan-400 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getContact = (): ReactNode => {
    return (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold">Contact Information</div>
        <div className="ml-4 space-y-2">
          <div>📧 Email: <a href="mailto:me@mohdamzar.com" className="text-cyan-400 hover:underline">me@mohdamzar.com</a></div>
          <div>📍 Location: <span className="text-purple-400">Kuala Lumpur, Malaysia</span></div>
          <div className="pt-2 text-gray-400">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </div>
        </div>
      </div>
    );
  };

  const getSocial = (): ReactNode => {
    const socials = [
      { name: "GitHub", url: "https://github.com/amzar96", icon: "🐙" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/amzar96/", icon: "💼" },
      { name: "Stack Overflow", url: "https://stackoverflow.com/users/9816541/amzar/", icon: "📚" },
      { name: "Behance", url: "https://www.behance.net/amzar96", icon: "🎨" }
    ];

    return (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold">Social Media & Links</div>
        <div className="ml-4 space-y-2">
          {socials.map((social, index) => (
            <div key={index}>
              {social.icon} <span className="text-yellow-400">{social.name}:</span>{' '}
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                {social.url}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getProjects = (): ReactNode => {
    return (
      <div className="space-y-3">
        <div className="text-green-400 font-semibold">Projects</div>
        <div className="ml-4 space-y-3">
          <div className="border-l-2 border-cyan-500 pl-4">
            <div className="text-cyan-400 font-semibold">Data Pipeline Automation</div>
            <div className="text-sm text-gray-400 mt-1">
              Automated ETL pipeline processing millions of records daily with real-time monitoring and alerting.
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">Python</span>
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">Apache Airflow</span>
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">PostgreSQL</span>
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">Redis</span>
            </div>
          </div>
          <div className="border-l-2 border-yellow-500 pl-4">
            <div className="text-cyan-400 font-semibold">Analytics Dashboard</div>
            <div className="text-sm text-gray-400 mt-1">
              Interactive business intelligence dashboard providing real-time insights for stakeholders.
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">React</span>
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">D3.js</span>
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">FastAPI</span>
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded">Docker</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command to terminal
    setLines(prev => [...prev, { type: 'command', content: cmd }]);

    // Process command
    switch (trimmedCmd) {
      case 'help':
        setLines(prev => [...prev, { type: 'output', content: getHelp() }]);
        break;
      case 'about':
        setLines(prev => [...prev, { type: 'output', content: getAbout() }]);
        break;
      case 'experience':
      case 'exp':
        setLines(prev => [...prev, { type: 'output', content: getExperience() }]);
        break;
      case 'skills':
      case 'tech':
        setLines(prev => [...prev, { type: 'output', content: getSkills() }]);
        break;
      case 'contact':
        setLines(prev => [...prev, { type: 'output', content: getContact() }]);
        break;
      case 'social':
      case 'links':
        setLines(prev => [...prev, { type: 'output', content: getSocial() }]);
        break;
      case 'projects':
        setLines(prev => [...prev, { type: 'output', content: getProjects() }]);
        break;
      case 'clear':
      case 'cls':
        setLines([]);
        break;
      default:
        setLines(prev => [...prev, {
          type: 'error',
          content: `Command not found: ${cmd}. Type 'help' for available commands.`
        }]);
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'about', 'experience', 'skills', 'contact', 'social', 'projects', 'clear'];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Window */}
        <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm font-medium">amzar@terminal:~</div>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-4 md:p-6 h-[70vh] overflow-y-auto custom-scrollbar"
          >
            {lines.map((line, index) => (
              <div key={index} className={`mb-2 ${
                line.type === 'command' ? 'text-white' :
                line.type === 'error' ? 'text-red-400' :
                'text-green-400'
              }`}>
                {line.type === 'command' ? (
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400">❯</span>
                    <span className="flex-1">{line.content}</span>
                  </div>
                ) : (
                  <div className="pl-4">{line.content}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-cyan-400">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-green-400"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Tab</kbd> for autocomplete |
          <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400 ml-1">↑</kbd>
          <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">↓</kbd> for history</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
