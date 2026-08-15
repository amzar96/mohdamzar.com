import React from 'react';
import type { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 border-t border-stone-200 dark:border-stone-800 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="font-display text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-stone-600 dark:text-stone-400 mb-12 max-w-2xl">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
