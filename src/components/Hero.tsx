import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const currentYear = new Date().getFullYear();
  const startYear = 2019;
  const workingYears = currentYear - startYear;

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
        
        <div className="relative">
          <div className="glass-effect rounded-2xl p-8 text-center">
            <div className="relative">
              <img 
                src="https://personal-website-amzar.s3-ap-southeast-1.amazonaws.com/img/personal2.png"
                alt="Amzar Profile Photo"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white dark:border-gray-700 shadow-2xl"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Amzar <span className="text-sm text-gray-500 dark:text-gray-400">(he/him)</span>
            </h1>
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-4">
              Senior Data Engineer
            </p>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Kuala Lumpur, Malaysia
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:me@mohdamzar.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  me@mohdamzar.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Building Data
              <span className="gradient-text block">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              With over <span className="font-semibold text-primary-600 dark:text-primary-400">{workingYears} years</span> of experience in 
              <span className="font-semibold"> Python programming</span>, I specialize in data engineering. 
              My focus lies in utilizing the Python stack for back-end development, deploying applications, 
              and creating automation solutions aimed at reducing manual workload.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Now, I am a <span className="font-semibold text-primary-600 dark:text-primary-400">Data & Analytics Engineer</span> working 
              on data operation, including managing the ETL/ELT, database, and business analytics using multiple 
              cloud and open-source technologies. And yes, I code every day!
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            {/* <a href="#projects" className="btn-ghost">
              View Projects
            </a> */}
          </div>

          <div className="flex items-center gap-6 pt-4">
            <a 
              href="https://github.com/amzar96" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/amzar96/" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://stackoverflow.com/users/9816541/amzar/" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Stack Overflow"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z"/>
              </svg>
            </a>
            <a 
              href="https://www.behance.net/amzar96" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Behance"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 7.5v9c0 .827.673 1.5 1.5 1.5h21c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-21c-.827 0-1.5.673-1.5 1.5zm2.25 1.5h3.375c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25h-1.125v1.5h-2.25v-6zm2.25 3h1.125c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.125v1.5zm6.75-3h6v1.5h-6v-1.5zm0 6v-3h4.5c1.24 0 2.25 1.01 2.25 2.25 0 .621-.252 1.183-.659 1.591-.407.408-.97.659-1.591.659h-4.5zm1.5-1.5h3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3v1.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;