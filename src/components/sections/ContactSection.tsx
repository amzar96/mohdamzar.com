import React from 'react';
import { Section } from '../common/Section';
import { getIconByType } from '../common/Icons';
import type { Contact } from '../../types/config';

interface ContactSectionProps {
  contact: Contact;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-md">
            {contact.message}
          </p>
          <ul className="space-y-4">
            {contact.methods.map((method, index) => {
              const IconComponent = getIconByType(method.icon_type);
              return (
                <li key={index}>
                  <a href={method.link} className="group flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 group-hover:border-primary-600 dark:group-hover:border-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors rounded-sm shrink-0">
                      <IconComponent />
                    </span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        {method.title}
                      </span>
                      <span className="text-stone-900 dark:text-stone-100 group-hover:underline underline-offset-4">
                        {method.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <form className="space-y-5" action={contact.form_action} method="POST">
          <input type="hidden" name="_subject" value="New contact from website" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 rounded-sm focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 rounded-sm focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Your message..."
              className="w-full px-4 py-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 rounded-sm focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 transition-colors resize-none"
            ></textarea>
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </Section>
  );
};
