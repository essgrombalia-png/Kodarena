import React, { useState } from 'react';
import { Palette, X, Check, Sparkles, Sun, Moon, Eye, Monitor } from 'lucide-react';
import { EDITOR_THEMES, EditorTheme, saveEditorTheme } from '../../types/theme';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  language?: Language;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
  language = 'sv'
}) => {
  const t = TRANSLATIONS[language];
  const [filterMode, setFilterMode] = useState<'all' | 'dark' | 'light'>('all');

  if (!isOpen) return null;

  const filteredThemes = EDITOR_THEMES.filter(theme => {
    if (filterMode === 'all') return true;
    return theme.mode === filterMode;
  });

  const handleChoose = (themeId: string) => {
    saveEditorTheme(themeId);
    onSelectTheme(themeId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-4xl bg-[#080d1a] rounded-3xl border border-white/15 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in text-slate-100">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#050811] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-purple-500/20 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>{t.syntaxThemes}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {EDITOR_THEMES.length} {language === 'sv' ? 'teman' : 'themes'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t.selectSyntaxTheme}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-3 bg-[#060a14] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => setFilterMode('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterMode === 'all'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{t.themeCategoryAll} ({EDITOR_THEMES.length})</span>
            </button>

            <button
              onClick={() => setFilterMode('dark')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterMode === 'dark'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t.themeCategoryDark} ({EDITOR_THEMES.filter(t => t.mode === 'dark').length})</span>
            </button>

            <button
              onClick={() => setFilterMode('light')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterMode === 'light'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t.themeCategoryLight} ({EDITOR_THEMES.filter(t => t.mode === 'light').length})</span>
            </button>
          </div>

          <span className="hidden sm:inline text-xs text-slate-400">
            {language === 'sv' ? '💡 Klicka för att aktivera direkt' : '💡 Click any theme to activate instantly'}
          </span>
        </div>

        {/* Themes Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredThemes.map((theme) => {
              const isSelected = currentThemeId === theme.id;

              return (
                <div
                  key={theme.id}
                  onClick={() => handleChoose(theme.id)}
                  className={`p-4 rounded-2xl border transition flex flex-col justify-between space-y-3 cursor-pointer group relative overflow-hidden shadow-lg ${
                    isSelected
                      ? 'bg-[#0f172a] border-purple-400/80 ring-2 ring-purple-500/40 shadow-purple-500/10'
                      : 'bg-[#0b1020] hover:bg-[#0e1526] border-white/10 hover:border-white/25'
                  }`}
                >
                  {/* Active Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold shadow-md shadow-purple-500/30">
                      <Check className="w-3 h-3" />
                      <span>{t.activeThemeBadge}</span>
                    </div>
                  )}

                  <div>
                    {/* Header: Title & Swatches */}
                    <div className="flex items-center justify-between mb-1.5 pr-20">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition">
                          {theme.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                          {theme.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {theme.description}
                    </p>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Palett:</span>
                      {theme.previewColors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-black/30 shadow-sm shrink-0"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    {/* Live Themed Mini Code Sandbox Preview */}
                    <div
                      className="p-3 rounded-xl border font-mono text-xs overflow-hidden select-none transition-all"
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: theme.borderColor,
                        color: theme.textColor
                      }}
                    >
                      <div className="flex gap-2">
                        {/* Gutter preview */}
                        <div 
                          className="text-right pr-2 select-none text-[11px]" 
                          style={{ color: theme.gutterFg, borderRight: `1px solid ${theme.borderColor}` }}
                        >
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                        </div>

                        {/* Code content preview */}
                        <div className="text-[11px] leading-relaxed overflow-x-hidden">
                          <div>
                            <span style={{ color: theme.palette.tag }}>&lt;button </span>
                            <span style={{ color: theme.palette.attrName }}>class</span>
                            <span style={{ color: theme.palette.punctuation }}>=</span>
                            <span style={{ color: theme.palette.string }}>&quot;btn-glow&quot;</span>
                            <span style={{ color: theme.palette.tag }}>&gt;</span>
                          </div>
                          <div className="pl-3">
                            <span style={{ color: theme.palette.function }}>handleClick</span>
                            <span style={{ color: theme.palette.punctuation }}>()</span>
                            <span style={{ color: theme.palette.comment }}> // {theme.name}</span>
                          </div>
                          <div>
                            <span style={{ color: theme.palette.tag }}>&lt;/button&gt;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {theme.mode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoose(theme.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        isSelected
                          ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                          : 'bg-white/10 hover:bg-white/20 text-slate-200'
                      }`}
                    >
                      {isSelected ? (language === 'sv' ? 'Vald' : 'Selected') : (language === 'sv' ? 'Välj Tema' : 'Select')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#050811] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>
            {language === 'sv' 
              ? 'Ditt valda färgtema sparas automatiskt och tillämpas på alla övningar och kod sandlådor.' 
              : 'Your chosen syntax theme is saved and applied across all lessons and playgrounds.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition"
          >
            {language === 'sv' ? 'Klar' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
