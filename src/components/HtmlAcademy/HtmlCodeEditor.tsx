import React, { useRef, useState, useMemo, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Wand2, 
  Maximize2, 
  Minimize2,
  Code2,
  GripHorizontal,
  ZoomIn,
  ZoomOut,
  WrapText,
  FileCode2,
  LayoutTemplate,
  X,
  Layers,
  Zap,
  FileText,
  Globe,
  BookmarkPlus,
  Bookmark,
  Palette
} from 'lucide-react';

import { Language, TRANSLATIONS } from '../../i18n/translations';
import { EN_BOILERPLATES } from '../../i18n/curriculumTranslations';
import { SaveTemplateModal } from './SaveTemplateModal';
import { TemplatesModal } from './TemplatesModal';
import { ThemeSelectorModal } from './ThemeSelectorModal';
import { getSavedUserTemplates } from '../../utils/templateStorage';
import { getSavedEditorTheme, getThemeById, saveEditorTheme } from '../../types/theme';

interface HtmlCodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onSubmit?: () => void;
  onReset?: () => void;
  onAskAI?: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
  showSubmit?: boolean;
  exerciseTitle?: string;
  initialHeight?: number;
  language?: Language;
}

export interface HtmlBoilerplate {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  code: string;
}

export const HTML_BOILERPLATES: HtmlBoilerplate[] = [
  {
    id: 'starter-basic',
    title: 'Standard HTML5 Grundmall',
    category: 'Nybörjare',
    icon: '🌐',
    description: 'Klassisk ren HTML5-mall med <!DOCTYPE html>, head, title och body.',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Min Nya Webbsida</title>
</head>
<body>
  <h1>Välkommen till min webbsida!</h1>
  <p>Detta är ett stycke med information.</p>
</body>
</html>`
  },
  {
    id: 'starter-styled',
    title: 'Modern Sida med Inbäddad CSS',
    category: 'Styling',
    icon: '🎨',
    description: 'Snygg mörk profil med inbäddad <style>-tagg, responsivt kort och knapp.',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Webbsida</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #0b0f19;
      color: #f8fafc;
      padding: 30px;
      margin: 0;
      line-height: 1.6;
    }
    .card {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      padding: 28px;
      border-radius: 16px;
      border: 1px solid #38bdf8;
      max-width: 600px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    h1 { color: #38bdf8; margin-top: 0; font-size: 1.8rem; }
    p { color: #cbd5e1; font-size: 1.05rem; }
    button {
      background: #38bdf8;
      color: #0b0f19;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 Välkommen till Framtidens Webb</h1>
    <p>Detta är en modern och responsiv HTML5-mall färdig att bygga vidare på.</p>
    <button onclick="alert('Knappen fungerar utmärkt!')">Klicka Här!</button>
  </div>
</body>
</html>`
  },
  {
    id: 'starter-semantic',
    title: 'Semantisk Webbplatsstruktur',
    category: 'Arkitektur',
    icon: '🏗️',
    description: 'Komplett semantisk struktur med <header>, <nav>, <main>, <section> och <footer>.',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantisk Webbplats</title>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 20px; background: #070c18; color: #f1f5f9; }
    header, nav, main, section, footer { padding: 16px; margin-bottom: 16px; border-radius: 12px; }
    header { background: #1e293b; border: 1px solid #334155; }
    nav a { color: #38bdf8; margin-right: 16px; text-decoration: none; font-weight: bold; }
    nav a:hover { text-decoration: underline; }
    main { background: #0f172a; border: 1px solid #1e293b; }
    footer { background: #0a0f1d; text-align: center; color: #94a3b8; font-size: 0.9rem; }
  </style>
</head>
<body>
  <header>
    <h1>🌐 Min Webbplats</h1>
    <nav>
      <a href="#start">Start</a>
      <a href="#tjanster">Tjänster</a>
      <a href="#om-oss">Om Oss</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>Välkommen till vår webbplats</h2>
      <p>Här finner du information om våra produkter och tjänster.</p>
    </section>
  </main>

  <footer>
    <p>© 2026 Min Webbplats. Alla rättigheter förbehållna.</p>
  </footer>
</body>
</html>`
  },
  {
    id: 'starter-form',
    title: 'Interaktivt Kontaktformulär',
    category: 'Formulär',
    icon: '📝',
    description: 'Färdigt kontaktformulär med namn, e-post, meddelande och submit-knapp.',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kontaktformulär</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 24px; display: flex; justify-content: center; }
    form { background: #1e293b; padding: 28px; border-radius: 16px; border: 1px solid #334155; max-width: 440px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    h2 { margin-top: 0; color: #38bdf8; }
    label { display: block; margin-top: 14px; font-size: 13px; font-weight: 600; color: #94a3b8; }
    input, textarea, button { width: 100%; padding: 12px; margin-top: 6px; border-radius: 8px; border: 1px solid #475569; background: #0a0f1d; color: #fff; box-sizing: border-box; font-family: inherit; font-size: 14px; }
    input:focus, textarea:focus { border-color: #38bdf8; outline: none; }
    button { background: #10b981; color: #0f172a; font-weight: bold; border: none; cursor: pointer; margin-top: 20px; font-size: 15px; }
    button:hover { background: #059669; }
  </style>
</head>
<body>
  <form onsubmit="event.preventDefault(); alert('Tack för ditt meddelande! Vi återkommer snart.');">
    <h2>📬 Kontakta Oss</h2>
    
    <label for="namn">Ditt Fullständiga Namn:</label>
    <input type="text" id="namn" required placeholder="Anna Andersson">

    <label for="epost">E-postadress:</label>
    <input type="email" id="epost" required placeholder="anna@exempel.se">

    <label for="meddelande">Ditt Meddelande:</label>
    <textarea id="meddelande" rows="4" required placeholder="Vad kan vi hjälpa dig med?"></textarea>

    <button type="submit">Skicka Meddelande</button>
  </form>
</body>
</html>`
  },
  {
    id: 'starter-interactive',
    title: 'Interaktiv JS DOM-App',
    category: 'Interaktivitet',
    icon: '⚡',
    description: 'HTML5 med inbyggd JavaScript för klickhändelser, räknare och dynamisk text.',
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interaktiv JavaScript-App</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #080d1a; color: #f8fafc; }
    .box { background: #131d31; padding: 30px; border-radius: 20px; border: 1px solid #1e293b; max-width: 500px; margin: 0 auto; }
    .counter { font-size: 3.5rem; font-weight: bold; color: #38bdf8; margin: 15px 0; font-family: monospace; }
    button { padding: 12px 24px; font-size: 15px; font-weight: bold; border-radius: 10px; border: none; cursor: pointer; margin: 6px; }
    .btn-inc { background: #38bdf8; color: #080d1a; }
    .btn-dec { background: #f59e0b; color: #080d1a; }
    .btn-reset { background: #ef4444; color: #fff; }
  </style>
</head>
<body>
  <div class="box">
    <h1>⚡ Interaktiv Räknare</h1>
    <p>Klicka på knapparna för att interagera med DOM via JavaScript:</p>
    <div class="counter" id="countDisplay">0</div>
    <div>
      <button class="btn-inc" onclick="modify(1)">+1 Öka</button>
      <button class="btn-dec" onclick="modify(-1)">-1 Minska</button>
      <button class="btn-reset" onclick="reset()">Nollställ</button>
    </div>
  </div>

  <script>
    let score = 0;
    function modify(amount) {
      score += amount;
      document.getElementById('countDisplay').textContent = score;
    }
    function reset() {
      score = 0;
      document.getElementById('countDisplay').textContent = score;
    }
  </script>
</body>
</html>`
  }
];

const QUICK_HTML_SNIPPETS = [
  { label: '<!DOCTYPE>', insert: '<!DOCTYPE html>\n<html lang="sv">\n<head>\n  <meta charset="UTF-8">\n  <title></title>\n</head>\n<body>\n  \n</body>\n</html>', offset: 80 },
  { label: '<h1>', insert: '<h1></h1>', offset: 4 },
  { label: '<h2>', insert: '<h2></h2>', offset: 4 },
  { label: '<p>', insert: '<p></p>', offset: 3 },
  { label: '<a>', insert: '<a href=""></a>', offset: 9 },
  { label: '<img>', insert: '<img src="" alt="" />', offset: 10 },
  { label: '<ul>', insert: '<ul>\n  <li></li>\n</ul>', offset: 9 },
  { label: '<li>', insert: '<li></li>', offset: 4 },
  { label: '<strong>', insert: '<strong></strong>', offset: 8 },
  { label: '<em>', insert: '<em></em>', offset: 4 },
  { label: '<form>', insert: '<form>\n  \n</form>', offset: 9 },
  { label: '<input>', insert: '<input type="text" placeholder="" />', offset: 12 },
  { label: '<button>', insert: '<button type="submit"></button>', offset: 23 },
  { label: '<header>', insert: '<header>\n  \n</header>', offset: 10 },
  { label: '<main>', insert: '<main>\n  \n</main>', offset: 8 },
  { label: '<footer>', insert: '<footer>\n  \n</footer>', offset: 10 },
  { label: '<style>', insert: '<style>\n  \n</style>', offset: 10 },
  { label: '<script>', insert: '<script>\n  \n</script>', offset: 11 },
  { label: 'class=""', insert: 'class=""', offset: 7 },
  { label: 'id=""', insert: 'id=""', offset: 4 },
  { label: '<!-- -->', insert: '<!--  -->', offset: 5 },
  { label: 'Tab ⇥', insert: '  ', offset: 2 },
];

export const HtmlCodeEditor: React.FC<HtmlCodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onSubmit,
  onReset,
  onAskAI,
  isRunning = false,
  isSubmitting = false,
  showSubmit = true,
  exerciseTitle,
  initialHeight = 460,
  language = 'sv',
}) => {
  const t = TRANSLATIONS[language];
  const activeBoilerplates = language === 'en' ? EN_BOILERPLATES : HTML_BOILERPLATES;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  const lineNumbersRef = useRef<HTMLDivElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [fontSize, setFontSize] = useState<number>(14);
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [editorHeight, setEditorHeight] = useState<number>(initialHeight);
  const [isDraggingResize, setIsDraggingResize] = useState(false);
  const [isBoilerplateModalOpen, setIsBoilerplateModalOpen] = useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => getSavedEditorTheme());
  const [codeToSaveAsTemplate, setCodeToSaveAsTemplate] = useState('');
  const [userTemplatesCount, setUserTemplatesCount] = useState(0);

  const activeTheme = useMemo(() => getThemeById(currentThemeId), [currentThemeId]);

  // Sync user templates count and active theme
  useEffect(() => {
    const updateCount = () => {
      const tmpls = getSavedUserTemplates();
      setUserTemplatesCount(tmpls.length);
    };
    const updateTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ themeId: string }>;
      if (customEvent.detail?.themeId) {
        setCurrentThemeId(customEvent.detail.themeId);
      }
    };
    updateCount();
    window.addEventListener('kodarena_templates_updated', updateCount);
    window.addEventListener('kodarena_theme_updated', updateTheme);
    return () => {
      window.removeEventListener('kodarena_templates_updated', updateCount);
      window.removeEventListener('kodarena_theme_updated', updateTheme);
    };
  }, []);

  const lines = useMemo(() => code.split('\n'), [code]);
  const lineCount = Math.max(lines.length, 1);

  // Synchronize scrolling between textarea and highlighted code overlay
  const handleScroll = () => {
    if (!textareaRef.current) return;
    const { scrollTop, scrollLeft } = textareaRef.current;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  // Update cursor line & col position
  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const selStart = textareaRef.current.selectionStart;
    const textBefore = code.slice(0, selStart);
    const lineIndex = textBefore.split('\n').length;
    const lastNewline = textBefore.lastIndexOf('\n');
    const colIndex = selStart - lastNewline;
    setCursorPos({ line: lineIndex, col: colIndex });
  };

  // Syntax highlight the code using Prism Markup (HTML)
  const highlightedCodeHtml = useMemo(() => {
    const grammar = Prism.languages.markup || Prism.languages.html || Prism.languages.javascript;
    const codeToHighlight = code.endsWith('\n') ? code + ' ' : code;
    try {
      return Prism.highlight(codeToHighlight, grammar, 'markup');
    } catch {
      return codeToHighlight;
    }
  }, [code]);

  // Drag-to-resize logic
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingResize(true);
    const startY = e.clientY;
    const startHeight = editorHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newHeight = Math.max(260, Math.min(1000, startHeight + deltaY));
      setEditorHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDraggingResize(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStartResize = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    setIsDraggingResize(true);
    const startY = e.touches[0].clientY;
    const startHeight = editorHeight;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!moveEvent.touches[0]) return;
      const deltaY = moveEvent.touches[0].clientY - startY;
      const newHeight = Math.max(260, Math.min(900, startHeight + deltaY));
      setEditorHeight(newHeight);
    };

    const handleTouchEnd = () => {
      setIsDraggingResize(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to run/test
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey && onSubmit) {
        onSubmit();
      } else {
        onRun();
      }
      return;
    }

    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Tab key: Insert 2 spaces for HTML indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
          updateCursorPosition();
        }
      }, 0);
      return;
    }

    // Auto-closing quotes, tags, brackets
    const PAIRS: { [key: string]: string } = {
      '"': '"',
      "'": "'",
      '(': ')',
      '[': ']',
      '{': '}',
    };

    if (PAIRS[e.key] && start === end) {
      const closing = PAIRS[e.key];
      if ((e.key === '"' || e.key === "'") && code[start] === e.key) {
        e.preventDefault();
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        updateCursorPosition();
        return;
      }

      e.preventDefault();
      const newCode = code.substring(0, start) + e.key + closing + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
          updateCursorPosition();
        }
      }, 0);
      return;
    }
  };

  const handleInsertSnippet = (snippet: { insert: string; offset: number }) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(code + snippet.insert);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newCode = code.substring(0, start) + snippet.insert + code.substring(end);
    onChange(newCode);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + snippet.offset;
      updateCursorPosition();
    }, 0);
  };

  // Insert snippet at current cursor position
  const handleInsertAtCursor = (snippetCode: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(code + '\n' + snippetCode);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newCode = code.substring(0, start) + snippetCode + code.substring(end);
    onChange(newCode);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + snippetCode.length;
      updateCursorPosition();
      onRun();
    }, 20);
  };

  // Insert a full boilerplate template (replace whole code)
  const handleInsertFullCode = (newCode: string) => {
    onChange(newCode);
    setTimeout(() => {
      onRun();
    }, 50);
  };

  // Open save template modal with highlighted selection or full code
  const handleOpenSaveTemplate = () => {
    const textarea = textareaRef.current;
    if (textarea && textarea.selectionStart !== textarea.selectionEnd) {
      const selected = code.substring(textarea.selectionStart, textarea.selectionEnd);
      if (selected.trim().length > 0) {
        setCodeToSaveAsTemplate(selected);
        setIsSaveTemplateModalOpen(true);
        return;
      }
    }
    setCodeToSaveAsTemplate(code);
    setIsSaveTemplateModalOpen(true);
  };

  // Format HTML indentation
  const handleFormatHtml = () => {
    let formatted = '';
    let indent = 0;
    const tab = '  ';

    // Simple robust HTML tag formatter
    const tokens = code
      .replace(/>\s*</g, '><')
      .split(/(<[^>]+>)/g)
      .filter(t => t.trim().length > 0);

    tokens.forEach(token => {
      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += '\n' + tab.repeat(indent) + token;
      } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!') && !token.startsWith('<!--') && !['<input', '<img', '<br', '<hr', '<meta', '<link'].some(v => token.toLowerCase().startsWith(v))) {
        formatted += '\n' + tab.repeat(indent) + token;
        indent++;
      } else if (token.startsWith('<')) {
        formatted += '\n' + tab.repeat(indent) + token;
      } else {
        formatted += token.trim();
      }
    });

    onChange(formatted.trim());
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exerciseTitle ? exerciseTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'index'}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      id="html-code-editor-container"
      style={{ 
        height: isFullscreen ? 'calc(100vh - 32px)' : `${editorHeight}px`,
        backgroundColor: activeTheme.bg,
        borderColor: activeTheme.borderColor
      }}
      className={`editor-theme-${activeTheme.id} flex flex-col rounded-2xl border overflow-hidden shadow-2xl transition-all duration-150 relative ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-[0_0_60px_rgba(0,0,0,0.9)]' : 'w-full'
      }`}
    >
      {/* Editor Header Toolbar */}
      <div 
        style={{ backgroundColor: activeTheme.headerBg, borderColor: activeTheme.borderColor }}
        className="flex items-center justify-between px-3 sm:px-4 py-2 border-b backdrop-blur-md shrink-0 flex-wrap gap-1.5"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
          </div>

          <div 
            style={{ 
              backgroundColor: `${activeTheme.accentColor}22`,
              borderColor: `${activeTheme.accentColor}55`,
              color: activeTheme.accentColor
            }}
            className="flex items-center gap-1.5 font-mono text-xs font-bold border px-2.5 py-0.5 rounded-md"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>index.html</span>
          </div>

          {exerciseTitle && (
            <span className="hidden md:inline text-xs text-slate-400 font-sans border-l border-white/10 pl-2.5 truncate max-w-xs">
              {exerciseTitle}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {/* Syntax Highlighting Color Theme Toggle */}
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold transition active:scale-95 shadow-sm"
            title={t.syntaxThemes}
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{activeTheme.name}</span>
          </button>

          {/* Spara som mall button */}
          <button
            onClick={handleOpenSaveTemplate}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold transition active:scale-95 shadow-sm"
            title={t.saveAsTemplate}
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.saveAsTemplate}</span>
          </button>

          {/* Prominent HTML Boilerplate & Custom Templates Button */}
          <button
            onClick={() => setIsBoilerplateModalOpen(true)}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 font-semibold transition active:scale-95 shadow-sm"
            title={t.insertBoilerplate}
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-orange-400" />
            <span>{t.insertBoilerplate}</span>
            {userTemplatesCount > 0 && (
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1 rounded-full font-bold">
                {userTemplatesCount}
              </span>
            )}
          </button>

          {/* Font Size & Zoom Adjuster */}
          <div className="flex items-center bg-white/5 rounded-lg border border-white/5 px-1 py-0.5">
            <button
              onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
              className="p-1 text-slate-400 hover:text-orange-300 transition rounded"
              title="A-"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-semibold text-orange-300 px-1 select-none">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(prev => Math.min(22, prev + 1))}
              className="p-1 text-slate-400 hover:text-orange-300 transition rounded"
              title="A+"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Word Wrap Toggle */}
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`p-1.5 text-xs rounded-lg transition border ${
              wordWrap 
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' 
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5'
            }`}
            title={wordWrap ? 'Wrap: On' : 'Wrap: Off'}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          {onAskAI && (
            <button
              onClick={onAskAI}
              className="flex items-center gap-1 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 transition font-medium"
              title={t.askAI}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{t.aiCoach}</span>
            </button>
          )}

          <button
            onClick={handleFormatHtml}
            className="p-1.5 text-xs text-slate-400 hover:text-orange-300 hover:bg-white/5 rounded-lg transition"
            title={t.formatCode}
          >
            <Wand2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
            title="Download .html"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
              title={t.resetCode}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
            title={copied ? t.copied : t.copyCode}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-orange-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Quick-Action HTML Tag Toolbar */}
      <div 
        style={{ backgroundColor: activeTheme.gutterBg, borderColor: activeTheme.borderColor }}
        className="flex items-center gap-1.5 px-3 py-1.5 border-b overflow-x-auto scrollbar-none select-none shrink-0"
      >
        {/* Quick access to Saved User Templates */}
        <button
          onClick={() => setIsBoilerplateModalOpen(true)}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/15 hover:bg-amber-500/25 active:bg-amber-500/35 border border-amber-500/30 text-[11px] font-sans font-bold text-amber-300 transition whitespace-nowrap shrink-0 shadow-sm"
          title={t.myTemplates}
        >
          <Bookmark className="w-3 h-3 text-amber-400" />
          <span>{t.myTemplates}</span>
          <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1 rounded">
            {userTemplatesCount}
          </span>
        </button>

        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 mx-1 hidden sm:inline">
          HTML Taggar:
        </span>
        {QUICK_HTML_SNIPPETS.map((snip, idx) => (
          <button
            key={idx}
            onClick={() => handleInsertSnippet(snip)}
            className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 active:bg-orange-500/20 active:text-orange-300 border border-white/5 text-[11px] font-mono text-slate-300 transition whitespace-nowrap shrink-0 shadow-sm"
          >
            {snip.label}
          </button>
        ))}
      </div>

      {/* Editor Body: Syntax Highlighted Overlay + Synchronized Textarea */}
      <div className="relative flex-1 flex overflow-hidden font-mono leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
        {/* Line Numbers Column */}
        <div 
          ref={lineNumbersRef}
          style={{ 
            backgroundColor: activeTheme.gutterBg, 
            borderColor: activeTheme.borderColor 
          }}
          className="py-3 pl-2.5 pr-2 select-none text-right border-r font-mono text-xs w-9 sm:w-11 overflow-hidden shrink-0"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const isCurrentLine = cursorPos.line === i + 1;
            return (
              <div 
                key={i} 
                style={{ 
                  height: `${Math.round(fontSize * 1.6)}px`, 
                  lineHeight: `${Math.round(fontSize * 1.6)}px`,
                  color: isCurrentLine ? activeTheme.accentColor : activeTheme.gutterFg,
                  fontWeight: isCurrentLine ? 700 : 400
                }}
                className="transition-colors"
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Code Canvas Container */}
        <div 
          style={{ backgroundColor: activeTheme.bg }}
          className="relative flex-1 h-full overflow-hidden"
        >
          {/* Syntax Highlighted Rendering Layer (Prism Markup) */}
          <pre
            ref={preRef}
            aria-hidden="true"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: `${Math.round(fontSize * 1.6)}px`,
              tabSize: 2,
              color: activeTheme.textColor
            }}
            className={`absolute inset-0 m-0 p-3 sm:p-4 font-mono pointer-events-none overflow-hidden ${
              wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
            }`}
            dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }}
          />

          {/* Interactive Input Layer: Transparent text with visible cursor/caret */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursorPosition();
            }}
            onScroll={handleScroll}
            onClick={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            onSelect={updateCursorPosition}
            onKeyDown={handleKeyDown}
            placeholder="<!-- Skriv din HTML-kod här eller klicka på 'Mallar / Boilerplate' ovan... -->"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${Math.round(fontSize * 1.6)}px`,
              WebkitTextFillColor: 'transparent',
              caretColor: activeTheme.accentColor,
              tabSize: 2,
            }}
            className={`absolute inset-0 w-full h-full m-0 p-3 sm:p-4 bg-transparent font-mono selection:bg-purple-500/30 selection:text-white resize-none outline-none overflow-auto ${
              wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
            }`}
          />
        </div>
      </div>

      {/* Editor Footer / Action Bar & Status */}
      <div 
        style={{ backgroundColor: activeTheme.headerBg, borderColor: activeTheme.borderColor }}
        className="flex items-center justify-between px-3 sm:px-4 py-2 border-t gap-2 shrink-0 flex-wrap"
      >
        {/* Status indicator */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span 
            style={{ color: activeTheme.accentColor }} 
            className="flex items-center gap-1 font-medium"
          >
            <span 
              style={{ backgroundColor: activeTheme.accentColor }}
              className="w-1.5 h-1.5 rounded-full animate-pulse" 
            />
            HTML5, CSS & JS
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-300 font-semibold">
            {language === 'sv' ? `Rad ${cursorPos.line}, Kol ${cursorPos.col}` : `Line ${cursorPos.line}, Col ${cursorPos.col}`}
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-500">
            {code.length} {language === 'sv' ? `tecken (${lines.length} rader)` : `chars (${lines.length} lines)`}
          </span>
        </div>

        {/* Execution Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 text-xs font-semibold border border-white/10 transition shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 fill-current text-orange-400 ${isRunning ? 'animate-spin' : ''}`} />
            {t.runCode}
          </button>

          {showSubmit && onSubmit && (
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:opacity-90 active:scale-95 text-slate-950 text-xs font-bold transition shadow-lg shadow-orange-500/20"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              {isSubmitting ? (language === 'sv' ? 'Testar...' : 'Verifying...') : t.submitSolution}
            </button>
          )}
        </div>
      </div>

      {/* Manual Drag-to-Resize Handle */}
      {!isFullscreen && (
        <div
          onMouseDown={handleMouseDownResize}
          onTouchStart={handleTouchStartResize}
          style={{ backgroundColor: activeTheme.headerBg, borderColor: activeTheme.borderColor }}
          className={`w-full py-1.5 hover:bg-white/5 active:bg-white/10 border-t cursor-row-resize flex items-center justify-center gap-2 transition group select-none ${
            isDraggingResize ? 'ring-1 ring-orange-500/50' : ''
          }`}
          title="Drag to resize height"
        >
          <GripHorizontal className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition" />
          <span className="text-[10px] text-slate-500 group-hover:text-orange-300 font-mono tracking-wider">
            {language === 'sv' ? `DRA FÖR ATT ÄNDRA HÖJD (${editorHeight}px)` : `DRAG TO RESIZE HEIGHT (${editorHeight}px)`}
          </span>
        </div>
      )}

      {/* Syntax Highlighting Color Theme Modal */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeId={currentThemeId}
        onSelectTheme={(themeId) => setCurrentThemeId(themeId)}
        language={language}
      />

      {/* Templates Modal: Custom Saved Templates & Built-in Boilerplates */}
      <TemplatesModal
        isOpen={isBoilerplateModalOpen}
        onClose={() => setIsBoilerplateModalOpen(false)}
        builtInTemplates={activeBoilerplates}
        onInsertFullCode={handleInsertFullCode}
        onInsertAtCursor={handleInsertAtCursor}
        onOpenSaveModal={handleOpenSaveTemplate}
        language={language}
      />

      {/* Save Template Modal */}
      <SaveTemplateModal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => setIsSaveTemplateModalOpen(false)}
        initialCode={codeToSaveAsTemplate}
        defaultTitle={exerciseTitle ? `${exerciseTitle} Mall` : ''}
        language={language}
        onTemplateSaved={() => {
          const tmpls = getSavedUserTemplates();
          setUserTemplatesCount(tmpls.length);
        }}
      />
    </div>
  );
};
