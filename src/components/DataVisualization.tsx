import React, { useEffect, useRef, useState } from 'react';

type ColorScheme = 'purple' | 'yellow';

interface ColorPalette {
  source: string;
  transform: string;
  sink: string;
  connection: string;
}

const colorSchemes: Record<ColorScheme, ColorPalette> = {
  purple: {
    source: '#8B5CF6',
    transform: '#A855F7', 
    sink: '#7C3AED',
    connection: '#8B5CF6'
  },
  yellow: {
    source: '#F59E0B',
    transform: '#FCD34D',
    sink: '#D97706', 
    connection: '#F59E0B'
  }
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const DataVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('dataVizColorScheme');
    return (saved === 'purple' || saved === 'yellow') ? saved : 'purple';
  });

  const handleColorSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    localStorage.setItem('dataVizColorScheme', scheme);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentColors = colorSchemes[colorScheme];

    // Data nodes representing different data sources
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      type: 'source' | 'transform' | 'sink';
    }> = [];

    // Connections between nodes
    const connections: Array<{
      from: number;
      to: number;
      alpha: number;
    }> = [];

    // Initialize nodes
    for (let i = 0; i < 25; i++) {
      const type = i < 8 ? 'source' : i < 18 ? 'transform' : 'sink';
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: type === 'source' ? 3 : type === 'transform' ? 2 : 4,
        color: type === 'source' ? currentColors.source : type === 'transform' ? currentColors.transform : currentColors.sink,
        alpha: Math.random() * 0.3 + 0.1,
        type
      });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      const connectionCount = Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : 0;
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i && !connections.some(c => c.from === i && c.to === targetIndex)) {
          connections.push({
            from: i,
            to: targetIndex,
            alpha: Math.random() * 0.2 + 0.05
          });
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        const rgb = hexToRgb(currentColors.connection);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${connection.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Animate connection alpha
        connection.alpha += (Math.random() - 0.5) * 0.01;
        connection.alpha = Math.max(0.02, Math.min(0.15, connection.alpha));
      });

      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw node
        ctx.fillStyle = `${node.color}${Math.round(node.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Animate alpha
        node.alpha += (Math.random() - 0.5) * 0.01;
        node.alpha = Math.max(0.05, Math.min(0.4, node.alpha));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [colorScheme]);

  return (
    <>
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => handleColorSchemeChange('purple')}
          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
            colorScheme === 'purple'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          Purple
        </button>
        <button
          onClick={() => handleColorSchemeChange('yellow')}
          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
            colorScheme === 'yellow'
              ? 'bg-yellow-600 text-white shadow-lg'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          }`}
        >
          Yellow
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        style={{ mixBlendMode: 'multiply' }}
      />
    </>
  );
};

export default DataVisualization;