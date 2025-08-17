import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'alternate';
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '', 
  background = 'default' 
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  const bgClass = background === 'alternate' 
    ? 'bg-gray-50 dark:bg-gray-800/50' 
    : 'bg-white dark:bg-gray-900';

  return (
    <section 
      id={id}
      ref={ref}
      className={`py-20 ${bgClass} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;