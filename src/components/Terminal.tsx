import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string | ReactNode;
  timestamp?: Date;
}

const TERMINAL_THEME = {
  dark: {
    outerBg: 'bg-gray-900',
    windowBg: 'bg-gray-800',
    headerBg: 'bg-gray-900',
    border: 'border-gray-700',
    text: 'text-gray-100',
    accent: 'text-violet-400',
    secondary: 'text-amber-400',
    error: 'text-red-400',
    footerBg: 'bg-gray-900',
  },
  light: {
    outerBg: 'bg-gray-100',
    windowBg: 'bg-white',
    headerBg: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    accent: 'text-violet-600',
    secondary: 'text-amber-600',
    error: 'text-red-600',
    footerBg: 'bg-white',
  },
};

const Terminal: React.FC = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showQuickInfo, setShowQuickInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const startYear = 2019;
  const workingYears = currentYear - startYear;
  const { isDark, toggleTheme } = useTheme();
  const t = isDark ? TERMINAL_THEME.dark : TERMINAL_THEME.light;

  useEffect(() => {
    const welcomeMessages: Array<string | ReactNode> = [
      <div key="box" className="whitespace-pre leading-none">
        {'╔═══════════════════════════════════════════════════════════════╗\n║                    Welcome to Amzar\'s Terminal                ║\n╚═══════════════════════════════════════════════════════════════╝'}
      </div>,
      '',
      'Senior Data Engineer | Kuala Lumpur, Malaysia',
      `Building data solutions with ${workingYears}+ years of experience`,
      '',
      'Type "help" to see available commands',
      '',
    ];

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < welcomeMessages.length) {
        setLines(prev => [...prev, {
          type: 'output',
          content: welcomeMessages[currentIndex]
        }]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [workingYears]);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    const terminal = terminalRef.current;
    terminal?.addEventListener('click', handleClick);
    return () => terminal?.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const getHelp = (): ReactNode => {
    return (
      <div className="space-y-3">
        <div className={`${t.text} font-semibold`}>Available Commands:</div>
        <div className="ml-4 space-y-1">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">📋 Information</div>
          <div><span className={t.accent}>about</span>     - Learn more about me</div>
          <div><span className={t.accent}>experience</span> - View my work experience</div>
          <div><span className={t.accent}>skills</span>     - List my technical skills</div>
          <div><span className={t.accent}>contact</span>   - Get my contact information</div>
          <div><span className={t.accent}>social</span>    - View my social media links</div>
          <div><span className={t.accent}>projects</span>  - See my projects</div>

          <div className="text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">🛠️ Tools</div>
          <div><span className={t.accent}>utils</span>     - Open developer utilities page</div>
          <div><span className={t.accent}>cv</span>        - View my CV / resume</div>

          <div className="text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">🎮 Fun Stuff</div>
          <div><span className={t.accent}>whoami</span>    - Who are you?</div>
          <div><span className={t.accent}>date</span>      - Show current date and time</div>
          <div><span className={t.accent}>quote</span>     - Get a random quote</div>
          <div><span className={t.accent}>joke</span>      - Hear a programming joke</div>
          <div><span className={t.accent}>pwd</span>       - Print working directory</div>
          <div><span className={t.accent}>ls</span>        - List directory contents</div>

          <div className="text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">⚙️ System</div>
          <div><span className={t.accent}>clear</span>     - Clear the terminal</div>
          <div><span className={t.accent}>help</span>      - Show this help message</div>
        </div>
      </div>
    );
  };

  const getAbout = (): ReactNode => {
    return (
      <div className="space-y-2">
        <div className={`${t.accent} font-semibold`}>About Me</div>
        <div className="ml-4 space-y-2">
          <div>👋 Hi! I'm <span className={t.accent}>Amzar</span> (he/him)</div>
          <div>💼 <span className={t.secondary}>Senior Data Engineer</span> at AEON Bank</div>
          <div>📍 Based in <span className={t.accent}>Kuala Lumpur, Malaysia</span></div>
          <div className="pt-2">
            With over <span className={t.accent}>{workingYears} years</span> of experience in Python programming,
            I specialize in data engineering. My focus lies in utilizing the Python stack
            for back-end development, deploying applications, and creating automation
            solutions aimed at reducing manual workload.
          </div>
          <div className="pt-2">
            Now, I am a <span className={t.secondary}>Data & Analytics Engineer</span> working on data
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
        <div className={`${t.accent} font-semibold`}>Work Experience</div>
        {experiences.map((exp, index) => (
          <div key={index} className="ml-4 space-y-1 border-l-2 border-violet-500 pl-4">
            <div className={`${t.accent} font-semibold`}>{exp.title}</div>
            <div className={t.secondary}>{exp.company}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{exp.location} | {exp.period}</div>
            <div className="flex flex-wrap gap-2 pt-1">
              {exp.tech.map((tech, i) => (
                <span key={i} className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>
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
        <div className={`${t.accent} font-semibold`}>Technical Skills</div>
        {skillCategories.map((cat, index) => (
          <div key={index} className="ml-4">
            <div className={`${t.secondary} mb-1`}>{cat.category}:</div>
            <div className="flex flex-wrap gap-2 ml-4">
              {cat.skills.map((skill, i) => (
                <span key={i} className={`text-sm ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>
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
        <div className={`${t.accent} font-semibold`}>Contact Information</div>
        <div className="ml-4 space-y-2">
          <div>📧 Email: <a href="mailto:me@mohdamzar.com" className={`${t.accent} hover:underline`}>me@mohdamzar.com</a></div>
          <div>📍 Location: <span className={t.accent}>Kuala Lumpur, Malaysia</span></div>
          <div className="pt-2 text-gray-500 dark:text-gray-400">
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
        <div className={`${t.accent} font-semibold`}>Social Media & Links</div>
        <div className="ml-4 space-y-2">
          {socials.map((social, index) => (
            <div key={index}>
              {social.icon} <span className={t.secondary}>{social.name}:</span>{' '}
              <a href={social.url} target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:underline`}>
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
        <div className={`${t.accent} font-semibold`}>Projects</div>
        <div className="ml-4 space-y-3">
          <div className="border-l-2 border-violet-500 pl-4">
            <div className={`${t.accent} font-semibold`}>Data Pipeline Automation</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Automated ETL pipeline processing millions of records daily with real-time monitoring and alerting.
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>Python</span>
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>Apache Airflow</span>
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>PostgreSQL</span>
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>Redis</span>
            </div>
          </div>
          <div className="border-l-2 border-amber-500 pl-4">
            <div className={`${t.accent} font-semibold`}>Analytics Dashboard</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Interactive business intelligence dashboard providing real-time insights for stakeholders.
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>React</span>
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>D3.js</span>
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>FastAPI</span>
              <span className={`text-xs ${t.headerBg} ${t.accent} px-2 py-1 rounded`}>Docker</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    setLines(prev => [...prev, { type: 'command', content: cmd }]);

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
      case 'utils':
        setLines(prev => [...prev, { type: 'output', content: '🛠️ Opening developer utilities...' }]);
        setTimeout(() => navigate('/utils'), 500);
        break;
      case 'cv':
        setLines(prev => [...prev, { type: 'output', content: '📄 Opening CV...' }]);
        setTimeout(() => navigate('/cv'), 500);
        break;
      case 'whoami':
        setLines(prev => [...prev, {
          type: 'output',
          content: "You're viewing Amzar's terminal portfolio! 🚀\nBut the real question is... who are YOU? 🤔"
        }]);
        break;
      case 'date':
        const now = new Date();
        setLines(prev => [...prev, {
          type: 'output',
          content: `📅 ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n⏰ ${now.toLocaleTimeString('en-US')}`
        }]);
        break;
      case 'pwd':
        setLines(prev => [...prev, { type: 'output', content: '/home/amzar/portfolio' }]);
        break;
      case 'ls':
        setLines(prev => [...prev, {
          type: 'output',
          content: (
            <div className="space-y-1">
              <div className={t.accent}>📁 about/</div>
              <div className={t.accent}>📁 experience/</div>
              <div className={t.accent}>📁 skills/</div>
              <div className={t.accent}>📁 projects/</div>
              <div className={t.accent}>📁 contact/</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Tip: Try running these as commands!</div>
            </div>
          )
        }]);
        break;
      case 'quote':
        const quotes = [
          "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
          "\"First, solve the problem. Then, write the code.\" - John Johnson",
          "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
          "\"Knowledge is power.\" - Francis Bacon",
          "\"Data is the new oil.\" - Clive Humby",
          "\"In God we trust. All others must bring data.\" - W. Edwards Deming",
          "\"Without data, you're just another person with an opinion.\" - W. Edwards Deming",
          "\"The goal is to turn data into information, and information into insight.\" - Carly Fiorina"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setLines(prev => [...prev, { type: 'output', content: randomQuote }]);
        break;
      case 'joke':
        const jokes = [
          "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
          "Why do data engineers always carry a ladder?\nTo reach the higher levels of abstraction! 🪜",
          "How many programmers does it take to change a light bulb?\nNone. It's a hardware problem! 💡",
          "Why did the database administrator leave his wife?\nShe had one-to-many relationships! 💔",
          "What's a data scientist's favorite type of music?\nAlgo-rhythm! 🎵",
          "Why do Python programmers wear glasses?\nBecause they can't C! 👓",
          "What did the router say to the doctor?\nIt hurts when IP! 🏥"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setLines(prev => [...prev, { type: 'output', content: randomJoke }]);
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
      const commands = ['help', 'about', 'experience', 'skills', 'contact', 'social', 'projects', 'utils', 'cv', 'clear'];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  };

  return (
    <div className={`min-h-screen ${t.outerBg} ${t.text} font-mono pb-20 md:pb-24 transition-colors duration-300`}>
      <div className={`${t.headerBg} ${t.border} border-b px-6 py-3 flex justify-end items-center sticky top-0 z-10`}>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle light/dark mode"
        >
          {isDark ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className={`${t.windowBg} rounded-lg shadow-2xl border-2 ${t.border} overflow-hidden`}>
          <div className={`${t.headerBg} px-4 py-3 flex items-center justify-between border-b ${t.border}`}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className={`text-xs ${t.text} opacity-50`}>terminal</div>
          </div>

          <div
            ref={terminalRef}
            className="p-4 md:p-6 h-[70vh] overflow-y-auto custom-scrollbar"
          >
            {lines.map((line, index) => (
              <div key={index} className={`mb-2 ${
                line.type === 'error' ? t.error : t.text
              }`}>
                {line.type === 'command' ? (
                  <div className="flex items-start gap-2">
                    <span className={t.accent}>❯</span>
                    <span className="flex-1">{line.content}</span>
                  </div>
                ) : (
                  <div className="pl-4">{line.content}</div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 mt-2">
              <span className={t.accent}>❯</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent outline-none ${t.text} ${t.accent.replace('text-', 'caret-')}`}
                autoFocus
                disabled={isTyping}
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className={`mt-4 text-center text-sm text-gray-500 dark:text-gray-400`}>
          <p>Press <kbd className={`px-2 py-1 ${t.headerBg} rounded ${t.text}`}>Tab</kbd> for autocomplete |
          <kbd className={`px-2 py-1 ${t.headerBg} rounded ${t.text} ml-1`}>↑</kbd>
          <kbd className={`px-2 py-1 ${t.headerBg} rounded ${t.text}`}>↓</kbd> for history</p>
        </div>
      </div>

      <button
        onClick={() => setShowQuickInfo(!showQuickInfo)}
        className="fixed bottom-24 md:bottom-28 right-4 md:right-8 w-14 h-14 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
        aria-label="Toggle quick info"
      >
        {showQuickInfo ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {showQuickInfo && (
        <div className={`fixed bottom-24 md:bottom-28 right-20 md:right-24 w-80 md:w-96 ${t.windowBg} border-2 ${t.border} rounded-lg shadow-2xl p-6 z-40 animate-slide-in`}>
          <div className="space-y-4">
            <div className={`flex items-center gap-4 pb-4 border-b ${t.border}`}>
              <img
                src="https://personal-website-amzar.s3-ap-southeast-1.amazonaws.com/img/personal2.png"
                alt="Amzar"
                className="w-16 h-16 rounded-full border-2 border-violet-500"
              />
              <div>
                <h3 className={`${t.text} font-bold text-lg`}>Amzar</h3>
                <p className={`${t.accent} text-sm`}>Senior Data Engineer</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Kuala Lumpur, Malaysia</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <a href="mailto:me@mohdamzar.com" className={`flex items-center gap-2 ${t.text} hover:${t.accent} transition-colors`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                me@mohdamzar.com
              </a>
            </div>

            <div className={`pt-2 border-t ${t.border}`}>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">Connect with me:</p>
              <div className="flex gap-3">
                <a href="https://github.com/amzar96" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${t.headerBg} hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors`} aria-label="GitHub">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/amzar96/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${t.headerBg} hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors`} aria-label="LinkedIn">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://stackoverflow.com/users/9816541/amzar/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${t.headerBg} hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors`} aria-label="Stack Overflow">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z"/>
                  </svg>
                </a>
                <a href="https://www.behance.net/amzar96" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${t.headerBg} hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors`} aria-label="Behance">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 7.5v9c0 .827.673 1.5 1.5 1.5h21c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-21c-.827 0-1.5.673-1.5 1.5zm2.25 1.5h3.375c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25h-1.125v1.5h-2.25v-6zm2.25 3h1.125c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.125v1.5zm6.75-3h6v1.5h-6v-1.5zm0 6v-3h4.5c1.24 0 2.25 1.01 2.25 2.25 0 .621-.252 1.183-.659 1.591-.407.408-.97.659-1.591.659h-4.5zm1.5-1.5h3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3v1.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className={`fixed bottom-0 left-0 right-0 ${t.footerBg} border-t ${t.border} z-30`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className={`text-gray-500 dark:text-gray-400 text-sm text-center md:text-left`}>
              <span className={`${t.accent} font-semibold`}>Amzar</span> • Senior Data Engineer
            </div>

            <div className="flex items-center gap-4">
              <a href="mailto:me@mohdamzar.com" className={`text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors`} aria-label="Email">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a href="https://github.com/amzar96" target="_blank" rel="noopener noreferrer" className={`text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors`} aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/amzar96/" target="_blank" rel="noopener noreferrer" className={`text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors`} aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://stackoverflow.com/users/9816541/amzar/" target="_blank" rel="noopener noreferrer" className={`text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors`} aria-label="Stack Overflow">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z"/>
                </svg>
              </a>
              <a href="https://www.behance.net/amzar96" target="_blank" rel="noopener noreferrer" className={`text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors`} aria-label="Behance">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 7.5v9c0 .827.673 1.5 1.5 1.5h21c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-21c-.827 0-1.5.673-1.5 1.5zm2.25 1.5h3.375c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25h-1.125v1.5h-2.25v-6zm2.25 3h1.125c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.125v1.5zm6.75-3h6v1.5h-6v-1.5zm0 6v-3h4.5c1.24 0 2.25 1.01 2.25 2.25 0 .621-.252 1.183-.659 1.591-.407.408-.97.659-1.591.659h-4.5zm1.5-1.5h3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3v1.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terminal;
