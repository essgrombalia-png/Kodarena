import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
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
  Eye,
  Type
} from 'lucide-react';

interface CodeEditorProps {
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
}

const QUICK_SNIPPETS = [
  { label: 'Tab ⇥', insert: '    ', offset: 4 },
  { label: ':', insert: ':', offset: 1 },
  { label: '( )', insert: '()', offset: 1 },
  { label: '[ ]', insert: '[]', offset: 1 },
  { label: '{ }', insert: '{}', offset: 1 },
  { label: '" "', insert: '""', offset: 1 },
  { label: "' '", insert: "''", offset: 1 },
  { label: 'f"{}"', insert: 'f"{}"', offset: 3 },
  { label: 'def', insert: 'def ():', offset: 4 },
  { label: 'return', insert: 'return ', offset: 7 },
  { label: 'print()', insert: 'print()', offset: 6 },
  { label: 'for in', insert: 'for  in :', offset: 4 },
  { label: 'if', insert: 'if :', offset: 3 },
  { label: 'else:', insert: 'else:\n    ', offset: 10 },
  { label: 'self.', insert: 'self.', offset: 5 },
  { label: '==', insert: ' == ', offset: 4 },
  { label: '!=', insert: ' != ', offset: 4 },
  { label: '#', insert: '# ', offset: 2 },
];

export const CodeEditor: React.FC<CodeEditorProps> = ({
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
  initialHeight = 440,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  const lineNumbersRef = useRef<HTMLDivElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [fontSize, setFontSize] = useState<number>(14); // 12, 14, 16, 18, 20
  const [wordWrap, setWordWrap] = useState<boolean>(false);
  const [editorHeight, setEditorHeight] = useState<number>(initialHeight);
  const [isDraggingResize, setIsDraggingResize] = useState(false);

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

  // Syntax highlight the code using Prism
  const highlightedCodeHtml = useMemo(() => {
    const grammar = Prism.languages.python || Prism.languages.javascript;
    const codeToHighlight = code.endsWith('\n') ? code + ' ' : code;
    try {
      return Prism.highlight(codeToHighlight, grammar, 'python');
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

  // Touch drag resize for mobile / tablet
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
    // Ctrl+Enter or Cmd+Enter to run
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

    // Tab key: Insert 4 spaces or handle block indent
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: Unindent current line
        const textBefore = code.substring(0, start);
        const lastNewline = textBefore.lastIndexOf('\n');
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const currentLine = code.substring(lineStart, end);
        if (currentLine.startsWith('    ')) {
          const newCode = code.substring(0, lineStart) + code.substring(lineStart + 4);
          onChange(newCode);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = Math.max(lineStart, start - 4);
              updateCursorPosition();
            }
          }, 0);
        }
      } else {
        const newCode = code.substring(0, start) + '    ' + code.substring(end);
        onChange(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
            updateCursorPosition();
          }
        }, 0);
      }
      return;
    }

    // Enter key: Auto-indentation in Python
    if (e.key === 'Enter') {
      const textBefore = code.substring(0, start);
      const lastNewline = textBefore.lastIndexOf('\n');
      const currentLine = textBefore.substring(lastNewline + 1);
      
      const matchIndent = currentLine.match(/^(\s*)/);
      let indentSpaces = matchIndent ? matchIndent[1] : '';

      if (currentLine.trim().endsWith(':')) {
        indentSpaces += '    ';
      }

      if (indentSpaces.length > 0) {
        e.preventDefault();
        const insertion = '\n' + indentSpaces;
        const newCode = code.substring(0, start) + insertion + code.substring(end);
        onChange(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + insertion.length;
            updateCursorPosition();
          }
        }, 0);
        return;
      }
    }

    // Auto-closing brackets and quotes
    const PAIRS: { [key: string]: string } = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
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

    // Backspace: Delete 4 spaces if at indentation boundary
    if (e.key === 'Backspace' && start === end && start >= 4) {
      const checkFourSpaces = code.substring(start - 4, start);
      if (checkFourSpaces === '    ') {
        const textBefore = code.substring(0, start);
        const lastNewline = textBefore.lastIndexOf('\n');
        const currentLineBeforeCursor = textBefore.substring(lastNewline + 1);
        if (/^\s+$/.test(currentLineBeforeCursor)) {
          e.preventDefault();
          const newCode = code.substring(0, start - 4) + code.substring(end);
          onChange(newCode);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start - 4;
              updateCursorPosition();
            }
          }, 0);
        }
      }
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

  const handleFormatCode = () => {
    const codeLines = code.split('\n');
    let currentIndent = 0;
    const formatted = codeLines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      
      if (trimmed.startsWith('else:') || trimmed.startsWith('elif ') || trimmed.startsWith('except') || trimmed.startsWith('finally:')) {
        currentIndent = Math.max(0, currentIndent - 4);
      }

      const indentedLine = ' '.repeat(currentIndent) + trimmed;

      if (trimmed.endsWith(':')) {
        currentIndent += 4;
      }
      return indentedLine;
    });

    onChange(formatted.join('\n'));
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exerciseTitle ? exerciseTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'python_script'}.py`;
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
      id="python-code-editor-container"
      style={{ height: isFullscreen ? 'calc(100vh - 32px)' : `${editorHeight}px` }}
      className={`flex flex-col bg-[#070b16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-150 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-[0_0_60px_rgba(0,0,0,0.9)]' : 'w-full'
      }`}
    >
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#050811]/95 border-b border-white/10 backdrop-blur-md shrink-0 flex-wrap gap-1.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded-md">
            <Code2 className="w-3.5 h-3.5" />
            <span>main.py</span>
          </div>

          {exerciseTitle && (
            <span className="hidden md:inline text-xs text-slate-400 font-sans border-l border-white/10 pl-2.5 truncate max-w-xs">
              {exerciseTitle}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {/* Font Size & Zoom Adjuster */}
          <div className="flex items-center bg-white/5 rounded-lg border border-white/5 px-1 py-0.5">
            <button
              onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
              className="p-1 text-slate-400 hover:text-cyan-300 transition rounded"
              title="Minska textstorlek (A-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-semibold text-cyan-300 px-1 select-none">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(prev => Math.min(22, prev + 1))}
              className="p-1 text-slate-400 hover:text-cyan-300 transition rounded"
              title="Öka textstorlek (A+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Word Wrap Toggle */}
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`p-1.5 text-xs rounded-lg transition border ${
              wordWrap 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5'
            }`}
            title={wordWrap ? 'Radbrytning: På' : 'Radbrytning: Av (skrolla horisontellt)'}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          {onAskAI && (
            <button
              onClick={onAskAI}
              className="flex items-center gap-1 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 transition font-medium"
              title="Fråga AI Python-Coachen"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">AI Coach</span>
            </button>
          )}

          <button
            onClick={handleFormatCode}
            className="p-1.5 text-xs text-slate-400 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition"
            title="Auto-formatera Python-kod"
          >
            <Wand2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
            title="Ladda ner som .py-fil"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
              title="Återställ kod"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
            title="Kopiera kod"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
            title={isFullscreen ? 'Avsluta helskärm' : 'Helskärmsläge'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-cyan-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Quick-Action Python Keyboard Bar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#04060d] border-b border-white/5 overflow-x-auto scrollbar-none select-none shrink-0">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Snabbknappar:
        </span>
        {QUICK_SNIPPETS.map((snip, idx) => (
          <button
            key={idx}
            onClick={() => handleInsertSnippet(snip)}
            className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 active:bg-cyan-500/20 active:text-cyan-300 border border-white/5 text-[11px] font-mono text-slate-300 transition whitespace-nowrap shrink-0 shadow-sm"
          >
            {snip.label}
          </button>
        ))}
      </div>

      {/* Editor Body: Syntax Highlighted Overlay + Transparent Sync Textarea */}
      <div className="relative flex-1 flex overflow-hidden font-mono leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
        {/* Line Numbers Column */}
        <div 
          ref={lineNumbersRef}
          className="py-3 pl-2.5 pr-2 select-none text-right text-slate-500 bg-[#04060e] border-r border-white/5 font-mono text-xs w-9 sm:w-11 overflow-hidden shrink-0"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const isCurrentLine = cursorPos.line === i + 1;
            return (
              <div 
                key={i} 
                style={{ height: `${Math.round(fontSize * 1.6)}px`, lineHeight: `${Math.round(fontSize * 1.6)}px` }}
                className={`transition-colors ${
                  isCurrentLine ? 'text-cyan-400 font-bold' : 'text-slate-600'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Code Canvas Container */}
        <div className="relative flex-1 h-full overflow-hidden bg-[#070b16]">
          {/* Syntax Highlighted Rendering Layer (Prism Python) */}
          <pre
            ref={preRef}
            aria-hidden="true"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: `${Math.round(fontSize * 1.6)}px`,
              tabSize: 4,
            }}
            className={`absolute inset-0 m-0 p-3 sm:p-4 font-mono pointer-events-none overflow-hidden text-slate-200 ${
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
            placeholder="# Skriv din Python-kod här..."
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${Math.round(fontSize * 1.6)}px`,
              WebkitTextFillColor: 'transparent',
              tabSize: 4,
            }}
            className={`absolute inset-0 w-full h-full m-0 p-3 sm:p-4 bg-transparent font-mono caret-cyan-400 selection:bg-cyan-500/30 selection:text-white resize-none outline-none overflow-auto ${
              wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
            }`}
          />
        </div>
      </div>

      {/* Editor Footer / Action Bar & Status */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#050811]/95 border-t border-white/10 gap-2 shrink-0 flex-wrap">
        {/* Status indicator */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Python 3.12
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-300 font-semibold">
            Rad {cursorPos.line}, Kol {cursorPos.col}
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-500">
            {code.length} tecken ({lines.length} rader)
          </span>
        </div>

        {/* Execution Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 text-xs font-semibold border border-white/10 transition shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 fill-current text-cyan-400 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Kör...' : 'Kör Kod'}
          </button>

          {showSubmit && onSubmit && (
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:opacity-90 active:scale-95 text-slate-950 text-xs font-bold transition shadow-lg shadow-indigo-500/20"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              {isSubmitting ? 'Testar...' : 'Verifiera & Lämna in'}
            </button>
          )}
        </div>
      </div>

      {/* Manual Drag-to-Resize Handle at the bottom of the editor */}
      {!isFullscreen && (
        <div
          onMouseDown={handleMouseDownResize}
          onTouchStart={handleTouchStartResize}
          className={`w-full py-1.5 bg-[#04060d] hover:bg-cyan-950/40 active:bg-cyan-900/50 border-t border-white/5 cursor-row-resize flex items-center justify-center gap-2 transition group select-none ${
            isDraggingResize ? 'bg-cyan-900/60 ring-1 ring-cyan-500/50' : ''
          }`}
          title="Dra upp/ner för att ändra storlek på kodeditorn manuellt"
        >
          <GripHorizontal className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
          <span className="text-[10px] text-slate-500 group-hover:text-cyan-300 font-mono tracking-wider">
            DRA FÖR ATT ÄNDRA HÖJD ({editorHeight}px)
          </span>
        </div>
      )}
    </div>
  );
};
