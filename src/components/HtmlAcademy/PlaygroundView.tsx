import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  FolderOpen, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  RotateCcw, 
  FileCode, 
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  Palette,
  Terminal,
  FileDown,
  Layers,
  Copy,
  FolderArchive,
  Split,
  Eye,
  Undo2,
  Redo2
} from 'lucide-react';
import { HtmlCodeEditor } from './HtmlCodeEditor';
import { HtmlPreviewOutput } from './HtmlPreviewOutput';
import { executeAndValidateHtml } from '../../services/htmlRunner';
import { HtmlExecutionResult } from '../../types/html';
import { Language, TRANSLATIONS } from '../../i18n/translations';
import { 
  splitHtmlInto3Files, 
  combine3FilesIntoHtml, 
  downloadFile, 
  download3Files, 
  ThreeFilesBundle 
} from '../../utils/fileSplitter';

interface PlaygroundViewProps {
  language?: Language;
  initialProject?: { id: string; title: string; code: string };
}

type ActiveFileType = 'html' | 'css' | 'js';
type EditorMode = 'three-files' | 'single-file';

const STARTER_TEMPLATES = [
  {
    id: 'portfolio',
    title: 'Modern Portfolio & CV',
    icon: '👤',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Min Portfolio</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 30px;
    }
    .header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      border-radius: 20px;
      border: 1px solid #6366f1;
    }
    h1 { margin: 0; color: #818cf8; font-size: 2.2rem; }
    p.lead { color: #cbd5e1; font-size: 1.1rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .card {
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
    }
    .card h3 { color: #38bdf8; margin-top: 0; }
    .btn {
      display: inline-block;
      margin-top: 15px;
      padding: 10px 20px;
      background: #38bdf8;
      color: #0f172a;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Alex Lindström</h1>
    <p class="lead">Frontend Utvecklare & Designer</p>
    <a href="#kontakt" class="btn" id="contactBtn">Kontakta Mig</a>
  </div>

  <h2>Mina Projekt</h2>
  <div class="grid">
    <div class="card">
      <h3>🚀 Nexus Web App</h3>
      <p>Byggd med ren HTML5 och CSS Grid.</p>
    </div>
    <div class="card">
      <h3>🎨 Cyberpunk Theme</h3>
      <p>Futuristisk design med neon-accenter.</p>
    </div>
  </div>

  <script>
    document.getElementById('contactBtn').addEventListener('click', (e) => {
      e.preventDefault();
      alert('Tack för ditt intresse! Skicka ett mail till alex@kodarena.se');
    });
  </script>
</body>
</html>`
  },
  {
    id: 'interactive-app',
    title: 'HTML+CSS+JS Räknare',
    icon: '⚡',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Interaktiv JavaScript-App</title>
  <style>
    body {
      background-color: #080d1a;
      color: #f8fafc;
      font-family: system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 85vh;
      margin: 0;
    }
    .card {
      background: #131d31;
      padding: 30px;
      border-radius: 20px;
      border: 1px solid #1e293b;
      text-align: center;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 15px 35px rgba(0,0,0,0.5);
    }
    h2 { color: #38bdf8; margin-top: 0; }
    .display {
      font-size: 3rem;
      font-weight: bold;
      color: #f59e0b;
      margin: 20px 0;
      font-family: monospace;
    }
    .btn-group { display: flex; gap: 10px; justify-content: center; }
    button {
      padding: 10px 18px;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      transition: transform 0.1s;
    }
    button:active { transform: scale(0.95); }
    .btn-plus { background: #10b981; color: #080d1a; }
    .btn-minus { background: #ef4444; color: #fff; }
    .btn-reset { background: #64748b; color: #fff; }
  </style>
</head>
<body>
  <div class="card">
    <h2>⚡ Interaktiv JS Räknare</h2>
    <div id="counter" class="display">0</div>
    <div class="btn-group">
      <button class="btn-minus" id="dec">- 1</button>
      <button class="btn-reset" id="rst">Nollställ</button>
      <button class="btn-plus" id="inc">+ 1</button>
    </div>
  </div>

  <script>
    let count = 0;
    const display = document.getElementById('counter');
    document.getElementById('inc').addEventListener('click', () => {
      count++;
      display.textContent = count;
      console.log('Räknare ökad:', count);
    });
    document.getElementById('dec').addEventListener('click', () => {
      count--;
      display.textContent = count;
      console.log('Räknare minskad:', count);
    });
    document.getElementById('rst').addEventListener('click', () => {
      count = 0;
      display.textContent = count;
      console.log('Räknare nollställd.');
    });
  </script>
</body>
</html>`
  },
  {
    id: 'registration-form',
    title: 'Responsivt Formulär',
    icon: '📝',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Medlemsansökan</title>
  <style>
    body {
      background: #0f172a;
      color: #e2e8f0;
      font-family: sans-serif;
      padding: 30px;
      display: flex;
      justify-content: center;
    }
    .form-box {
      background: #1e293b;
      padding: 30px;
      border-radius: 16px;
      border: 1px solid #334155;
      max-width: 400px;
      width: 100%;
    }
    label { display: block; margin-top: 15px; font-size: 14px; font-weight: 600; color: #94a3b8; }
    input, select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 8px;
      border: 1px solid #475569;
      background: #0f172a;
      color: #fff;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      margin-top: 25px;
      padding: 12px;
      background: #10b981;
      color: #0f172a;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="form-box">
    <h2>Skapa Medlemskonto</h2>
    <form id="regForm">
      <label for="namn">Fullständigt namn:</label>
      <input type="text" id="namn" required placeholder="Sara Sjödin">

      <label for="epost">E-post:</label>
      <input type="email" id="epost" required placeholder="sara@exempel.se">

      <label for="kurs">Välj Kurs:</label>
      <select id="kurs">
        <option>HTML5 & Modern Webb</option>
        <option>CSS Styling & Flexbox</option>
        <option>JavaScript DOM</option>
      </select>

      <button type="submit">Slutför Registrering</button>
    </form>
  </div>

  <script>
    document.getElementById('regForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const namn = document.getElementById('namn').value;
      alert('Tack ' + namn + '! Din registrering är mottagen.');
    });
  </script>
</body>
</html>`
  }
];

const PLAYGROUND_DRAFT_KEY = 'nexus_web_playground_draft_v1';

type DraftSnapshot = {
  files: ThreeFilesBundle;
  singleCode: string;
};

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ language = 'sv', initialProject }) => {
  const t = TRANSLATIONS[language];
  
  // State for 3-file mode vs single-file mode
  const [editorMode, setEditorMode] = useState<EditorMode>('three-files');
  const [activeFile, setActiveFile] = useState<ActiveFileType>('html');
  const [playgroundMobileView, setPlaygroundMobileView] = useState<'editor' | 'preview' | 'split'>('editor');

  // 3-files storage
  const [files, setFiles] = useState<ThreeFilesBundle>(() => {
    try {
      const saved = localStorage.getItem(`${PLAYGROUND_DRAFT_KEY}:${initialProject?.id || 'free'}`);
      if (saved) return JSON.parse(saved) as ThreeFilesBundle;
    } catch {}
    return splitHtmlInto3Files(STARTER_TEMPLATES[0].code);
  });
  
  // Single-file fallback storage
  const [singleCode, setSingleCode] = useState<string>(STARTER_TEMPLATES[0].code);
  const [history, setHistory] = useState<DraftSnapshot[]>([]);
  const [redoHistory, setRedoHistory] = useState<DraftSnapshot[]>([]);

  const [activeTemplate, setActiveTemplate] = useState<string>(STARTER_TEMPLATES[0].id);
  const [currentTitle, setCurrentTitle] = useState('Mitt Projekt');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(`${PLAYGROUND_DRAFT_KEY}:${initialProject?.id || 'free'}`, JSON.stringify(files));
    } catch {}
  }, [files]);
  
  const saveHistoryPoint = () => {
    setHistory(previous => [...previous.slice(-39), { files, singleCode }]);
    setRedoHistory([]);
  };

  useEffect(() => {
    if (!initialProject) return;
    setActiveTemplate(initialProject.id);
    setCurrentTitle(initialProject.title);
    setSingleCode(initialProject.code);
    setFiles(splitHtmlInto3Files(initialProject.code));
    setResult(executeAndValidateHtml(initialProject.code));
  }, [initialProject]);

  // Combined code for live preview
  const effectiveHtml = editorMode === 'three-files' 
    ? combine3FilesIntoHtml(files.html, files.css, files.js)
    : singleCode;

  const [result, setResult] = useState<HtmlExecutionResult | null>(() => executeAndValidateHtml(effectiveHtml));

  // Real-time live execution debounce (150ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const res = executeAndValidateHtml(effectiveHtml);
      setResult(res);
    }, 150);

    return () => clearTimeout(timer);
  }, [effectiveHtml]);

  const handleRun = () => {
    const res = executeAndValidateHtml(effectiveHtml);
    setResult(res);
  };

  const handleSelectTemplate = (template: typeof STARTER_TEMPLATES[0]) => {
      saveHistoryPoint();
    setActiveTemplate(template.id);
    setCurrentTitle(template.title);
    setSingleCode(template.code);
    setFiles(splitHtmlInto3Files(template.code));
    setResult(executeAndValidateHtml(template.code));
  };

  // Switch between 3-files mode and single-file mode
  const handleToggleMode = (newMode: EditorMode) => {
      if (newMode === editorMode) return;
      saveHistoryPoint();
    if (newMode === 'three-files' && editorMode === 'single-file') {
      setFiles(splitHtmlInto3Files(singleCode));
    } else if (newMode === 'single-file' && editorMode === 'three-files') {
      setSingleCode(combine3FilesIntoHtml(files.html, files.css, files.js));
    }
    setEditorMode(newMode);
  };

  // Handle updates to individual files in 3-file mode
  const handleUpdateActiveFile = (newContent: string) => {
    saveHistoryPoint();
    if (activeFile === 'html') {
      setFiles(prev => ({ ...prev, html: newContent }));
    } else if (activeFile === 'css') {
      setFiles(prev => ({ ...prev, css: newContent }));
    } else if (activeFile === 'js') {
      setFiles(prev => ({ ...prev, js: newContent }));
    }
  };

  const handleUndo = () => {
    const previous = history[history.length - 1];
    if (!previous) return;
    setRedoHistory(next => [...next, { files, singleCode }]);
    setHistory(next => next.slice(0, -1));
    setFiles(previous.files);
    setSingleCode(previous.singleCode);
  };

  const handleRedo = () => {
    const next = redoHistory[redoHistory.length - 1];
    if (!next) return;
    setHistory(previous => [...previous, { files, singleCode }]);
    setRedoHistory(previous => previous.slice(0, -1));
    setFiles(next.files);
    setSingleCode(next.singleCode);
  };

  // Download all 3 files (index.html, style.css, script.js)
  const handleDownload3Files = () => {
    const bundleToDownload = editorMode === 'three-files' 
      ? files 
      : splitHtmlInto3Files(singleCode);

    download3Files(bundleToDownload);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Download single combined index.html file
  const handleDownloadSingleHtml = () => {
    downloadFile('index.html', effectiveHtml, 'text/html;charset=utf-8');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Current code displayed in the editor
  const currentEditorCode = editorMode === 'three-files'
    ? activeFile === 'html' ? files.html : activeFile === 'css' ? files.css : files.js
    : singleCode;

  const currentEditorTitle = editorMode === 'three-files'
    ? `${currentTitle} • ${activeFile === 'html' ? 'index.html' : activeFile === 'css' ? 'style.css' : 'script.js'}`
    : `${currentTitle} • index.html`;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 animate-in fade-in duration-300">
      {/* Top Header & 3-File Workspace Bar */}
      <div className="bg-[#070b16] p-4 rounded-3xl border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-sky-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20 text-xs shrink-0">
            3x
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100">
                {language === 'sv' ? 'Koderarena Arbetsstudio' : 'Koderarena Work Studio'}
              </h3>
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                HTML + CSS + JS
              </span>
            </div>
            <p className="text-xs text-slate-400">
                {language === 'sv' 
                ? 'Koda fritt i HTML, CSS och JavaScript med live-preview och autosparat utkast.' 
                : 'Code freely in HTML, CSS, and JavaScript with live preview and autosaved drafts.'}
            </p>
          </div>
        </div>

        {/* Action Controls: Mode Switch & 3-File Download */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode Switcher */}
          <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/5 text-xs font-semibold">
            <button
              onClick={() => handleToggleMode('three-files')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                editorMode === 'three-files'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? '3 Filer (Separerade)' : '3 Files (Separated)'}</span>
            </button>
            <button
              onClick={() => handleToggleMode('single-file')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                editorMode === 'single-file'
                  ? 'bg-orange-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? '1 Samlad Fil' : '1 Single File'}</span>
            </button>
          </div>

          {/* Download 3 Files Button */}
          <button
            onClick={handleDownload3Files}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
            title="Ladda ner index.html, style.css och script.js som 3 rena filer"
          >
            <FileDown className="w-4 h-4" />
            <span>{downloadSuccess ? (language === 'sv' ? 'Filer Nedladdade! ✓' : 'Files Downloaded! ✓') : (language === 'sv' ? 'Ladda ner 3 Filer' : 'Download 3 Files')}</span>
          </button>
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            <button onClick={handleUndo} disabled={!history.length} className="rounded-lg p-2 text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30" title={language === 'sv' ? 'Ångra' : 'Undo'}><Undo2 className="h-4 w-4" /></button>
            <button onClick={handleRedo} disabled={!redoHistory.length} className="rounded-lg p-2 text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30" title={language === 'sv' ? 'Gör om' : 'Redo'}><Redo2 className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Templates Bar */}
      <div className="flex items-center justify-between bg-[#070b16] p-3 rounded-2xl border border-white/10 flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">
            {language === 'sv' ? 'Färdiga Mallar:' : 'Starter Templates:'}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {STARTER_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl)}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold transition border ${
                  activeTemplate === tmpl.id
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/10'
                }`}
              >
                <span>{tmpl.icon}</span>
                <span>{tmpl.title}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownloadSingleHtml}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded-lg hover:bg-white/5 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{language === 'sv' ? 'Ladda ner som index.html' : 'Download index.html'}</span>
        </button>
      </div>

      {/* File Tabs for 3-File Mode */}
      {editorMode === 'three-files' && (
        <div className="flex items-center justify-between bg-[#070b16] px-4 py-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase mr-1">
              {language === 'sv' ? 'Aktiv Fil:' : 'Active File:'}
            </span>

            {/* HTML Tab */}
            <button
              onClick={() => setActiveFile('html')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition border ${
                activeFile === 'html'
                  ? 'bg-orange-500 text-slate-950 border-orange-400 shadow-md shadow-orange-500/20'
                  : 'bg-white/5 text-orange-400 hover:bg-white/10 border-white/5'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>index.html</span>
              <span className={`text-[9px] px-1 rounded ${activeFile === 'html' ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-orange-500/20 text-orange-300'}`}>
                HTML5
              </span>
            </button>

            {/* CSS Tab */}
            <button
              onClick={() => setActiveFile('css')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition border ${
                activeFile === 'css'
                  ? 'bg-sky-400 text-slate-950 border-sky-300 shadow-md shadow-sky-500/20'
                  : 'bg-white/5 text-sky-400 hover:bg-white/10 border-white/5'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>style.css</span>
              <span className={`text-[9px] px-1 rounded ${activeFile === 'css' ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-sky-500/20 text-sky-300'}`}>
                CSS3
              </span>
            </button>

            {/* JS Tab */}
            <button
              onClick={() => setActiveFile('js')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition border ${
                activeFile === 'js'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-amber-400 hover:bg-white/10 border-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>script.js</span>
              <span className={`text-[9px] px-1 rounded ${activeFile === 'js' ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-amber-500/20 text-amber-300'}`}>
                JS ES6
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'sv' ? 'Realtidssynkronisering aktiv' : 'Live sync active'}</span>
          </div>
        </div>
      )}

      {/* Phone-only selector. iPad keeps editor and preview visible together. */}
      <div className="flex md:hidden items-center bg-[#070b16] p-1.5 rounded-2xl border border-white/10 shadow-lg">
        <button
          onClick={() => setPlaygroundMobileView('editor')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            playgroundMobileView === 'editor'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>{language === 'sv' ? 'Kod-Editor' : 'Editor'}</span>
        </button>
        <button
          onClick={() => setPlaygroundMobileView('preview')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            playgroundMobileView === 'preview'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{language === 'sv' ? 'Förhandsgranska' : 'Preview'}</span>
        </button>
        <button
          onClick={() => setPlaygroundMobileView('split')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            playgroundMobileView === 'split'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'sv' ? 'Båda' : 'Both'}</span>
        </button>
      </div>

      {/* Editor & Preview Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        <div className={`md:col-span-1 lg:col-span-6 min-w-0 md:min-h-[620px] space-y-3 ${
          playgroundMobileView === 'editor' || playgroundMobileView === 'split' ? 'block' : 'hidden md:block'
        }`}>
          <HtmlCodeEditor
            code={currentEditorCode}
            onChange={(newCode) => {
              if (editorMode === 'three-files') {
                handleUpdateActiveFile(newCode);
              } else {
                setSingleCode(newCode);
              }
            }}
            onRun={handleRun}
            onReset={() => {
              saveHistoryPoint();
              const tmpl = STARTER_TEMPLATES.find(t => t.id === activeTemplate);
              if (tmpl) {
                if (editorMode === 'three-files') {
                  setFiles(splitHtmlInto3Files(tmpl.code));
                } else {
                  setSingleCode(tmpl.code);
                }
              }
            }}
            isRunning={false}
            showSubmit={false}
            exerciseTitle={currentEditorTitle}
            initialHeight={560}
            language={language}
          />
        </div>

        <div className={`md:col-span-1 lg:col-span-6 min-w-0 md:min-h-[620px] space-y-3 ${
          playgroundMobileView === 'preview' || playgroundMobileView === 'split' ? 'block' : 'hidden md:block'
        }`}>
          <HtmlPreviewOutput
            result={result}
            rawHtml={effectiveHtml}
            onRefresh={handleRun}
            language={language}
            isRealTime={true}
          />
        </div>
      </div>
    </div>
  );
};
