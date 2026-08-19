import React, { useState, useEffect } from 'react';
import { 
  LayoutTemplate, 
  Bookmark, 
  X, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  Download, 
  Upload, 
  Code2, 
  Layers, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Zap,
  Terminal,
  Palette
} from 'lucide-react';
import { CustomCodeTemplate, WebTrack } from '../../types/html';
import { HtmlBoilerplate } from './HtmlCodeEditor';
import { Language, TRANSLATIONS } from '../../i18n/translations';
import { 
  getSavedUserTemplates, 
  deleteUserTemplate, 
  exportUserTemplatesAsJson, 
  importUserTemplatesFromJson 
} from '../../utils/templateStorage';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  builtInTemplates: HtmlBoilerplate[];
  onInsertFullCode: (code: string) => void;
  onInsertAtCursor: (code: string) => void;
  onOpenSaveModal: () => void;
  language?: Language;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  builtInTemplates,
  onInsertFullCode,
  onInsertAtCursor,
  onOpenSaveModal,
  language = 'sv'
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'my' | 'builtin'>('my');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userTemplates, setUserTemplates] = useState<CustomCodeTemplate[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Reload user templates
  const reloadTemplates = () => {
    setUserTemplates(getSavedUserTemplates());
  };

  useEffect(() => {
    if (isOpen) {
      reloadTemplates();
      setImportStatus(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => reloadTemplates();
    window.addEventListener('kodarena_templates_updated', handleUpdate);
    return () => window.removeEventListener('kodarena_templates_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  // Filter logic
  const filteredUserTemplates = userTemplates.filter(t => {
    const matchQuery = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    if (selectedCategory === 'all') return matchQuery;
    return matchQuery && t.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const filteredBuiltInTemplates = builtInTemplates.filter(t => {
    const matchQuery = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchQuery;
    return matchQuery && t.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Extract distinct categories
  const allCategories = Array.from(
    new Set([
      ...userTemplates.map(t => t.category),
      ...builtInTemplates.map(t => t.category)
    ])
  );

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(language === 'sv' ? 'Vill du radera denna mall?' : 'Are you sure you want to delete this template?')) {
      deleteUserTemplate(id);
      reloadTemplates();
    }
  };

  const handleExport = () => {
    const jsonStr = exportUserTemplatesAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kodarena-mallar-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importUserTemplatesFromJson(content);
      if (res.success) {
        setImportStatus(language === 'sv' ? `✅ Importerade ${res.count} mallar!` : `✅ Imported ${res.count} templates!`);
        reloadTemplates();
      } else {
        setImportStatus(`❌ ${res.error}`);
      }
      setTimeout(() => setImportStatus(null), 3500);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-4xl bg-[#080d1a] rounded-3xl border border-white/15 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in text-slate-100">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#050811] border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20 shrink-0">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>{language === 'sv' ? 'Mallar & Återanvändbara Kodsnuttar' : 'Templates & Reusable Code Snippets'}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {userTemplates.length} {language === 'sv' ? 'sparade' : 'saved'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t.selectTemplate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenSaveModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? 'Spara Ny Mall' : 'Save New Template'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection & Search Bar */}
        <div className="p-3 sm:p-4 bg-[#060a14] border-b border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Main Tabs */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 shrink-0">
              <button
                onClick={() => setActiveTab('my')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'my'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{t.myTemplates} ({userTemplates.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('builtin')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'builtin'
                    ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.builtInTemplates} ({builtInTemplates.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'sv' ? 'Sök mallar, taggar, kod...' : 'Search templates, tags, code...'}
                className="w-full pl-9 pr-3.5 py-1.5 bg-[#04060d] border border-white/10 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Kategori:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'sv' ? 'Alla' : 'All'}
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status notice */}
        {importStatus && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-xs font-mono text-amber-300 flex items-center justify-between">
            <span>{importStatus}</span>
          </div>
        )}

        {/* Templates Grid Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: User's Custom Templates */}
          {activeTab === 'my' && (
            <div>
              {filteredUserTemplates.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-4 bg-white/5 rounded-3xl border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                    <Bookmark className="w-7 h-7" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h4 className="text-sm font-bold text-slate-200">
                      {language === 'sv' ? 'Inga sparade mallar hittades' : 'No saved templates found'}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t.noCustomTemplates}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSaveModal();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === 'sv' ? 'Spara Nuvarande Kod som Mall' : 'Save Current Code as Template'}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredUserTemplates.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      className="p-4 rounded-2xl bg-[#0b1020] hover:bg-[#0f172a] border border-white/10 hover:border-amber-500/40 transition flex flex-col justify-between space-y-3 group shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{tmpl.icon || '📝'}</span>
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {tmpl.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={() => handleCopy(tmpl.id, tmpl.code)}
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                              title={t.copyCode}
                            >
                              {copiedId === tmpl.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={(e) => handleDelete(tmpl.id, e)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                              title={t.deleteTemplate}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition">
                          {tmpl.title}
                        </h4>
                        {tmpl.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                            {tmpl.description}
                          </p>
                        )}

                        {/* Snippet preview container */}
                        <div className="mt-2.5 p-2 bg-[#04060d] rounded-xl border border-white/5 font-mono text-[11px] text-amber-200/80 max-h-24 overflow-hidden relative">
                          <pre className="whitespace-pre overflow-x-hidden">
                            {tmpl.code.slice(0, 180)}
                            {tmpl.code.length > 180 ? '...' : ''}
                          </pre>
                          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#04060d] to-transparent pointer-events-none" />
                        </div>
                      </div>

                      {/* Insertion actions */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-slate-500">
                          {tmpl.code.split('\n').length} {language === 'sv' ? 'rader' : 'lines'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onInsertAtCursor(tmpl.code);
                              onClose();
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition active:scale-95"
                            title={t.insertAtCursor}
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t.insertAtCursor}</span>
                          </button>

                          <button
                            onClick={() => {
                              onInsertFullCode(tmpl.code);
                              onClose();
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition active:scale-95"
                            title={t.insertFullCode}
                          >
                            <span>{t.insertFullCode}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Built-in Starter Templates */}
          {activeTab === 'builtin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBuiltInTemplates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="p-4 rounded-2xl bg-[#0b1020] hover:bg-[#0f172a] border border-white/10 hover:border-orange-500/40 transition flex flex-col justify-between space-y-3 group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{tmpl.icon}</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                        {tmpl.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-orange-300 transition">
                      {tmpl.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="mt-2.5 p-2 bg-[#04060d] rounded-xl border border-white/5 font-mono text-[11px] text-orange-200/80 max-h-24 overflow-hidden relative">
                      <pre className="whitespace-pre overflow-x-hidden">
                        {tmpl.code.slice(0, 180)}...
                      </pre>
                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#04060d] to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-mono text-slate-500">
                      {tmpl.code.split('\n').length} {language === 'sv' ? 'rader kod' : 'lines'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onInsertAtCursor(tmpl.code);
                          onClose();
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition active:scale-95"
                        title={t.insertAtCursor}
                      >
                        <Zap className="w-3.5 h-3.5 text-orange-400" />
                        <span>{t.insertAtCursor}</span>
                      </button>

                      <button
                        onClick={() => {
                          onInsertFullCode(tmpl.code);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-orange-500/20 transition active:scale-95"
                      >
                        <span>{t.insertFullCode}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer: Import/Export & Dismiss */}
        <div className="p-3 sm:p-4 bg-[#050811] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition"
              title={t.importTemplates}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.importTemplates}</span>
            </button>

            <button
              onClick={handleExport}
              disabled={userTemplates.length === 0}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition disabled:opacity-40"
              title={t.exportTemplates}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportTemplates}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition"
          >
            {language === 'sv' ? 'Stäng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
