import React, { useEffect, useId, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

type RenderState = 'loading' | 'ready' | 'error';

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = '' }) => {
  const reactId = useId().replace(/:/g, '');
  const diagramId = `mermaid-${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RenderState>('loading');

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      setState('loading');

      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: 'Inter, system-ui, sans-serif',
          themeVariables: {
            background: '#fafaf9',
            primaryColor: '#ecfdf5',
            primaryTextColor: '#1c1917',
            primaryBorderColor: '#047857',
            lineColor: '#78716c',
            secondaryColor: '#f5f5f4',
            tertiaryColor: '#f0fdfa',
            clusterBkg: '#fafaf9',
            clusterBorder: '#d6d3d1',
            titleColor: '#1c1917',
            edgeLabelBackground: '#fafaf9',
            nodeTextColor: '#1c1917',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
          },
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            padding: 12,
          },
        });

        const { svg } = await mermaid.render(diagramId, chart);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setState('ready');
        }
      } catch (error) {
        console.error('Failed to render Mermaid diagram', error);
        if (!cancelled) {
          setState('error');
        }
      }
    };

    void render();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  return (
    <div className={`relative ${className}`} aria-busy={state === 'loading'}>
      {state === 'loading' && (
        <div className="flex min-h-[240px] items-center justify-center gap-3 text-sm text-stone-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          Rendering architecture…
        </div>
      )}

      {state === 'error' && (
        <div role="alert" className="flex min-h-[240px] items-center justify-center text-center text-sm text-stone-600">
          <p>
            Unable to render the architecture diagram.
            <br />
            Please try again.
          </p>
        </div>
      )}

      <div
        ref={containerRef}
        className={`mermaid-diagram ${state === 'ready' ? 'block' : 'hidden'}`}
      />
    </div>
  );
};
