import React, { useEffect, useRef } from 'react';
import { CanvasDrawCommand } from '../../types/python';
import { Sparkles, Maximize2, Trash2 } from 'lucide-react';

interface VisualCanvasOutputProps {
  commands?: CanvasDrawCommand[];
  onClear?: () => void;
}

export const VisualCanvasOutput: React.FC<VisualCanvasOutputProps> = ({ commands = [], onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI crisp canvas
    const width = canvas.width;
    const height = canvas.height;

    // Fill canvas background
    ctx.fillStyle = '#060a15';
    ctx.fillRect(0, 0, width, height);

    // Draw subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Process draw commands
    commands.forEach(cmd => {
      if (cmd.type === 'clear') {
        ctx.fillStyle = '#060a15';
        ctx.fillRect(0, 0, width, height);
      } else if (cmd.type === 'line') {
        const { x1, y1, x2, y2, color, width: lw } = cmd.params;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color || '#29e6d0';
        ctx.lineWidth = lw || 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      } else if (cmd.type === 'circle') {
        const { x, y, radius, color, width: lw } = cmd.params;
        ctx.beginPath();
        ctx.arc(x, y, Math.abs(radius), 0, Math.PI * 2);
        ctx.strokeStyle = color || '#6a5bff';
        ctx.lineWidth = lw || 2;
        ctx.stroke();
      } else if (cmd.type === 'dot') {
        const { x, y, radius, color } = cmd.params;
        ctx.beginPath();
        ctx.arc(x, y, Math.abs(radius || 4), 0, Math.PI * 2);
        ctx.fillStyle = color || '#ffd166';
        ctx.fill();
      } else if (cmd.type === 'barChart') {
        const { labels, values, color } = cmd.params;
        if (Array.isArray(values) && values.length > 0) {
          const maxVal = Math.max(...values, 1);
          const barWidth = Math.min(40, (width - 60) / values.length);
          const startX = 30;
          const baseY = height - 40;

          values.forEach((val, i) => {
            const barHeight = (val / maxVal) * (height - 80);
            const x = startX + i * (barWidth + 10);
            const y = baseY - barHeight;

            // Bar Gradient
            const grad = ctx.createLinearGradient(x, y, x, baseY);
            grad.addColorStop(0, color || '#29e6d0');
            grad.addColorStop(1, '#6a5bff');
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Value text
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(String(val), x + barWidth / 2, y - 5);

            // Label
            if (labels && labels[i]) {
              ctx.fillStyle = '#94a3b8';
              ctx.fillText(String(labels[i]), x + barWidth / 2, baseY + 15);
            }
          });
        }
      }
    });
  }, [commands]);

  return (
    <div className="flex flex-col h-full bg-[#080d1a] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#050810]/80 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 font-mono font-bold text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Python Grafik & Turtle Canvas</span>
          <span className="text-[10px] text-slate-500 font-sans">({commands.length} rit-kommandon)</span>
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="p-1 text-slate-400 hover:text-slate-200 transition"
            title="Rensa canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Canvas view */}
      <div className="flex-1 flex items-center justify-center p-3 bg-[#050810] overflow-auto">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="rounded-xl border border-white/10 shadow-lg max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};
