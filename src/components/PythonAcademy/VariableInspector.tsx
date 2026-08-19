import React from 'react';
import { VariableState } from '../../types/python';
import { Eye, Database, Code, Info } from 'lucide-react';

interface VariableInspectorProps {
  variables?: VariableState[];
}

export const VariableInspector: React.FC<VariableInspectorProps> = ({ variables = [] }) => {
  if (!variables || variables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-500 space-y-2 bg-[#080d1a] rounded-2xl border border-white/10">
        <Database className="w-8 h-8 opacity-30 text-cyan-400" />
        <div className="text-xs font-semibold text-slate-400">Inga aktiva variabler i minnet</div>
        <p className="text-[11px] max-w-xs text-slate-500">
          Kör din Python-kod för att inspektera skapade variabler, typer (`int`, `str`, `list`, `dict`) och deras minnesvärden i realtid.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#080d1a] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#050810]/80 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 font-mono font-bold text-indigo-300">
          <Database className="w-3.5 h-3.5" />
          <span>Variabel & Minnesinspektör</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {variables.length} variabler
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-mono text-slate-400">
              <th className="pb-2 pl-2">Variabel</th>
              <th className="pb-2">Typ</th>
              <th className="pb-2 pr-2">Aktuellt Värde</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {variables.map((v, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="py-2.5 pl-2 font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400/80" />
                  {v.name}
                </td>
                <td className="py-2.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {v.type}
                  </span>
                </td>
                <td className="py-2.5 pr-2 text-slate-200 max-w-[200px] truncate">
                  <span className="text-emerald-300 bg-[#050810] px-2 py-1 rounded border border-white/5 inline-block max-w-full truncate">
                    {v.value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
