import React, { useState } from 'react';
import { BookmarkPlus, X, Sparkles, Check, Code2, Tag, FileText } from 'lucide-react';
import { CustomCodeTemplate, WebTrack } from '../../types/html';
import { Language, TRANSLATIONS } from '../../i18n/translations';
import { saveUserTemplate } from '../../utils/templateStorage';

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode: string;
  defaultTitle?: string;
  language?: Language;
  onTemplateSaved?: (savedTemplate: CustomCodeTemplate) => void;
}

const EMOJI_OPTIONS = ['📝', '🚀', '🧭', '🎨', '⚡', '💡', '🏗️', '🛡️', '✨', '🌐', '🧩', '🏷️'];
const PRESET_CATEGORIES_SV = ['Mina Mallar', 'HTML', 'CSS', 'JavaScript', 'Komponenter', 'Formulär', 'Layout'];
const PRESET_CATEGORIES_EN = ['My Templates', 'HTML', 'CSS', 'JavaScript', 'Components', 'Forms', 'Layout'];

export const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({
  isOpen,
  onClose,
  initialCode,
  defaultTitle = '',
  language = 'sv',
  onTemplateSaved
}) => {
  const t = TRANSLATIONS[language];
  const presetCategories = language === 'sv' ? PRESET_CATEGORIES_SV : PRESET_CATEGORIES_EN;

  const [title, setTitle] = useState(defaultTitle || (language === 'sv' ? 'Min Återanvändbara Mall' : 'My Reusable Template'));
  const [category, setCategory] = useState(presetCategories[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('📝');
  const [description, setDescription] = useState('');
  const [templateCode, setTemplateCode] = useState(initialCode);
  const [isSaved, setIsSaved] = useState(false);

  // Sync initial code if modal is reopened
  React.useEffect(() => {
    if (isOpen) {
      setTemplateCode(initialCode);
      setIsSaved(false);
      if (defaultTitle) setTitle(defaultTitle);
    }
  }, [isOpen, initialCode, defaultTitle]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !templateCode.trim()) return;

    const finalCategory = isCustomCategory && customCategory.trim() 
      ? customCategory.trim() 
      : category;

    // Detect track
    let track: WebTrack = 'html';
    if (templateCode.includes('<script') || templateCode.includes('function') || templateCode.includes('const ')) {
      track = 'js';
    } else if (templateCode.includes('<style') || templateCode.includes('{') && templateCode.includes(':')) {
      track = 'css';
    }

    const saved = saveUserTemplate({
      title: title.trim(),
      category: finalCategory,
      icon: selectedIcon,
      description: description.trim(),
      code: templateCode,
      track
    });

    setIsSaved(true);
    if (onTemplateSaved) {
      onTemplateSaved(saved);
    }

    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#080d1a] rounded-3xl border border-white/15 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#050811] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0">
              <BookmarkPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {t.saveSnippetTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'sv' 
                  ? 'Spara koden som en personlig mall för snabb återanvändning i framtida lektioner' 
                  : 'Save this code as a custom template to easily reuse in future lessons'}
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Title & Icon */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {t.templateTitleLabel}
            </label>
            <div className="flex gap-2">
              {/* Icon selector dropdown/grid */}
              <div className="relative">
                <select
                  value={selectedIcon}
                  onChange={(e) => setSelectedIcon(e.target.value)}
                  aria-label={language === 'sv' ? 'Välj ikon' : 'Select icon'}
                  className="h-11 px-3 bg-[#04060d] border border-white/15 rounded-xl text-lg appearance-none cursor-pointer focus:outline-none focus:border-amber-400 text-center"
                >
                  {EMOJI_OPTIONS.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'sv' ? 'T.ex. Min Flexbox Navbar...' : 'E.g. My Flexbox Navbar...'}
                className="flex-1 px-3.5 py-2.5 bg-[#04060d] border border-white/15 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {t.templateCategoryLabel}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {presetCategories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setIsCustomCategory(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                    category === cat && !isCustomCategory
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustomCategory(true)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                  isCustomCategory
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                + {language === 'sv' ? 'Egen kategori' : 'Custom'}
              </button>
            </div>

            {isCustomCategory && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder={language === 'sv' ? 'Skriv kategorinamn...' : 'Enter category name...'}
                className="w-full mt-2 px-3.5 py-2 bg-[#04060d] border border-white/15 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {t.templateDescLabel}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'sv' ? 'Kort anteckning om vad koden gör...' : 'Short note on what this snippet does...'}
              className="w-full px-3.5 py-2 bg-[#04060d] border border-white/15 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Code Snippet Editor / Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.templateCodePreview}</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                {templateCode.split('\n').length} {language === 'sv' ? 'rader' : 'lines'}
              </span>
            </div>

            <textarea
              required
              rows={7}
              value={templateCode}
              onChange={(e) => setTemplateCode(e.target.value)}
              className="w-full p-3 bg-[#04060e] border border-white/15 rounded-xl font-mono text-xs text-amber-300/90 leading-relaxed resize-y focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition"
            >
              {language === 'sv' ? 'Avbryt' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isSaved}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>{t.templateSavedSuccess}</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{t.saveTemplateBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
