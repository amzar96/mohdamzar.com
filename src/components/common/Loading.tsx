import React from 'react';

export const Loading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
      <p className="mt-4 text-stone-600 dark:text-stone-400">Loading...</p>
    </div>
  </div>
);
