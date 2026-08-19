import React, { useState } from 'react';
import { BookOpen, Search, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { pythonCheatsheet } from '../../data/pythonCheatsheet';

interface CheatsheetViewProps {
  onOpenPlaygroundWithCode?: (code: string) => void;
}

export const CheatsheetView: React.FC<CheatsheetViewProps> = ({ onOpenPlaygroundWithCode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredCategories = pythonCheatsheet.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.syntax.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Search Header */}
      <div className="p-6 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-slate-100 font-sans">Python Lathund & Snabbreferens</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Snabbguide över de vanligaste funktionerna, syntaxreglerna och metoderna i Python.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Sök syntax, metoder, print..."
              className="w-full pl-9 pr-4 py-2 bg-[#050810] rounded-xl border border-white/10 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Cheatsheet Categories */}
      <div className="space-y-8">
        {filteredCategories.map(cat => (
          <div key={cat.id} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 px-1">
              <span>{cat.title}</span>
              <div className="flex-1 h-px bg-white/10 ml-2" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((item, idx) => {
                const copyKey = `${cat.id}-${idx}`;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-lg space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-100 font-sans">{item.name}</h4>
                        <button
                          onClick={() => handleCopy(item.example, copyKey)}
                          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition p-1 rounded-lg hover:bg-white/5"
                        >
                          {copiedKey === copyKey ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">Kopierat!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Kopiera</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-400">{item.description}</p>

                      <div className="p-2 bg-[#050810] rounded-lg border border-white/5 font-mono text-[11px] text-cyan-300">
                        <code>{item.syntax}</code>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Exempel & Utskrift:</div>
                      <pre className="p-2.5 bg-[#050810] rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto">
                        {item.example}
                      </pre>
                      <div className="text-[11px] text-slate-400 font-mono bg-black/30 p-2 rounded-lg">
                        <span className="text-slate-500">Output: </span>
                        {item.output}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
