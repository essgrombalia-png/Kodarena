import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Code, 
  Sparkles, 
  Layers, 
  Type, 
  Globe, 
  FileCheck,
  Palette,
  Code2,
  Terminal
} from 'lucide-react';
import { CheatsheetCategory, WebTrack } from '../../types/html';
import { getLocalizedCheatsheet } from '../../utils/localizedCurriculum';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface CheatsheetViewProps {
  language?: Language;
}

export const CheatsheetView: React.FC<CheatsheetViewProps> = ({ language = 'sv' }) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'all' | 'html' | 'css' | 'js'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const allCategories: CheatsheetCategory[] = getLocalizedCheatsheet(language);

  const filteredCategories = allCategories
    .filter(cat => {
      if (activeTab === 'html') return cat.track === 'html';
      if (activeTab === 'css') return cat.track === 'css';
      if (activeTab === 'js') return cat.track === 'js';
      return true;
    })
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.syntax.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(cat => cat.items.length > 0);

  const getCategoryBadge = (track?: WebTrack) => {
    if (track === 'js') {
      return (
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-amber-500/20 text-amber-300 border-amber-500/40">
          JS
        </span>
      );
    }
    if (track === 'css') {
      return (
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-sky-500/20 text-sky-300 border-sky-500/40">
          CSS
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-orange-500/20 text-orange-300 border-orange-500/40">
        HTML
      </span>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header & Search */}
      <div className="flex items-center justify-between bg-[#070b16] p-4 sm:p-6 rounded-3xl border border-white/10 flex-wrap gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <span>{t.tabCheatsheet}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'sv' ? 'Sök och kopiera vanliga HTML-taggar, CSS-regler och moderna JavaScript ES6-metoder.' : 'Search and copy common HTML tags, CSS rules, and modern JavaScript ES6 methods.'}
          </p>
        </div>

        {/* Track Filter & Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-orange-500 via-sky-500 to-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.allTracks}
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'html'
                  ? 'bg-orange-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3 text-orange-400" />
              <span>HTML</span>
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'css'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3 h-3 text-sky-400" />
              <span>CSS</span>
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'js'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3 text-amber-400" />
              <span>JS</span>
            </button>
          </div>

          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'sv' ? 'Sök tagg, flexbox, map()...' : 'Search tag, flexbox, map()...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-orange-500/50"
            />
          </div>
        </div>
      </div>

      {/* Cheatsheet Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-[#070b16] rounded-3xl border border-white/10 overflow-hidden shadow-xl"
          >
            <div className="p-4 bg-[#050811] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <h3 className="text-sm font-bold text-slate-100">{category.title}</h3>
              </div>
              {getCategoryBadge(category.track)}
            </div>

            <div className="p-4 space-y-3">
              {category.items.map((item, idx) => {
                const uniqueId = `${category.id}-${idx}`;
                const isCopied = copiedIndex === uniqueId;

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-amber-300 font-mono">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy(item.syntax, uniqueId)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition shrink-0"
                        title={isCopied ? (language === 'sv' ? 'Kopierad!' : 'Copied!') : (language === 'sv' ? 'Kopiera kod' : 'Copy code')}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <pre className="p-2 rounded-xl bg-[#04060d] border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto">
                      {item.syntax}
                    </pre>
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

