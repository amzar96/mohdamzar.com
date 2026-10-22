import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../../types/config';
import { MermaidDiagram } from './MermaidDiagram';

interface ProjectArchitectureModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({
  project,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose]);

  const diagram = project.diagram ?? '';
  const fileName = `${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}-architecture.mmd`;

  const downloadDiagram = () => {
    const blob = new Blob([diagram.trim(), '\n'], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="architecture-title"
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-stone-200 bg-stone-50 shadow-2xl dark:border-stone-800 dark:bg-stone-950"
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 p-5 dark:border-stone-800 sm:p-6">
          <div>
            <p className="eyebrow mb-2">Architecture</p>
            <h3
              id="architecture-title"
              className="font-display text-2xl text-stone-900 dark:text-stone-100"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Private project · Mermaid diagram
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close architecture diagram"
            className="shrink-0 rounded-sm p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100 dark:focus-visible:ring-offset-stone-950"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-auto bg-stone-100 p-4 dark:bg-stone-900 sm:p-6">
          <div className="min-w-[680px] rounded-sm border border-stone-200 bg-stone-50 p-4 sm:min-w-0 sm:p-6">
            <MermaidDiagram chart={diagram} />
          </div>
          <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 sm:hidden">
            Swipe horizontally to explore the diagram.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 p-5 dark:border-stone-800 sm:p-6">
          <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
            Editable Mermaid source
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={downloadDiagram}
              className="inline-flex items-center gap-2 border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 transition-colors hover:border-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:focus-visible:ring-offset-stone-950"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              Download .mmd
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-primary-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:bg-primary-500 dark:text-stone-950 dark:hover:bg-primary-400 dark:focus-visible:ring-offset-stone-950"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
