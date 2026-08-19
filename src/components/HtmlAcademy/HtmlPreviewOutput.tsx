import React, { useState } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  Tablet, 
  Monitor, 
  RotateCw, 
  ExternalLink, 
  Layers, 
  Terminal, 
  Check, 
  AlertTriangle,
  Code,
  Tag,
  Zap,
  Maximize2,
  Trash2
} from 'lucide-react';
import { HtmlExecutionResult, DomNodeInfo } from '../../types/html';
import { generatePreviewDocument } from '../../services/htmlRunner';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface HtmlPreviewOutputProps {
  result: HtmlExecutionResult | null;
  rawHtml: string;
  onRefresh?: () => void;
  language?: Language;
  isRealTime?: boolean;
}

export const HtmlPreviewOutput: React.FC<HtmlPreviewOutputProps> = ({
  result,
  rawHtml,
  onRefresh,
  language = 'sv',
  isRealTime = true
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'preview' | 'tests' | 'console' | 'dom'>('preview');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customConsoleLogs, setCustomConsoleLogs] = useState<string[]>([]);

  const previewDoc = generatePreviewDocument(rawHtml || '<p style="color:#94a3b8">Skriv kod för att se webbsidan live...</p>');

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[620px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([previewDoc], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const allLogs = [
    ...(result?.consoleLogs || []),
    ...customConsoleLogs
  ];

  return (
    <div className="flex flex-col bg-[#070b16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl h-full">
      {/* Top Header Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#050811] border-b border-white/10 shrink-0 flex-wrap gap-2">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === 'preview'
                ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.webPreviewTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === 'tests'
                ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.testCasesTab}</span>
            {result?.testResults && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                result.allTestsPassed 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-amber-950 text-amber-300 border border-amber-500/30'
              }`}>
                {result.testResults.filter(t => t.passed).length}/{result.testResults.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === 'console'
                ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.consoleTab}</span>
            {allLogs.length > 0 && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-full font-mono font-bold">
                {allLogs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dom')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === 'dom'
                ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.domTreeTab}</span>
          </button>
        </div>

        {/* Viewport Device Switcher (when in preview mode) */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-1">
            <div className="flex items-center bg-white/5 rounded-lg border border-white/5 p-0.5">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded transition ${
                  viewportMode === 'desktop' ? 'bg-orange-500/20 text-orange-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded transition ${
                  viewportMode === 'tablet' ? 'bg-orange-500/20 text-orange-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tablet View (620px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded transition ${
                  viewportMode === 'mobile' ? 'bg-orange-500/20 text-orange-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1.5 text-slate-400 hover:text-orange-400 bg-white/5 hover:bg-white/10 rounded-lg transition"
                title={t.refreshPreview}
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleOpenInNewTab}
              className="p-1.5 text-slate-400 hover:text-orange-400 bg-white/5 hover:bg-white/10 rounded-lg transition"
              title={t.openNewTab}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 bg-[#040711] overflow-auto min-h-[320px] relative">
        {/* Tab 1: Live Web Preview iframe */}
        {activeTab === 'preview' && (
          <div className="w-full h-full flex flex-col items-center justify-start p-3 bg-[#03060f]/80 overflow-auto">
            <div className={`w-full ${getViewportWidth()} h-[440px] sm:h-[480px] bg-[#070c18] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-200`}>
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a101f] border-b border-white/5 shrink-0 select-none">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 bg-black/40 text-[11px] font-mono text-slate-400 px-3 py-0.5 rounded-md border border-white/5 truncate flex items-center justify-between">
                  <span>https://preview.nexus-academy.local</span>
                  <div className="flex items-center gap-1.5">
                    {isRealTime && (
                      <span className="text-[9px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 uppercase">{viewportMode}</span>
                  </div>
                </div>
              </div>

              {/* Sandboxed iframe */}
              <iframe
                title="Live HTML, CSS & JS Preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts allow-modals"
                className="w-full flex-1 border-none bg-slate-950"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Test Cases and Verification */}
        {activeTab === 'tests' && (
          <div className="p-4 sm:p-5 space-y-3">
            {result?.testResults && result.testResults.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 px-4 py-2.5 rounded-xl border border-white/5">
                  <span className="text-xs font-semibold text-slate-300">
                    {language === 'sv' ? 'Övningens Valideringstest' : 'Exercise Validation Tests'}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                    result.allTestsPassed 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {result.allTestsPassed ? t.allTestsPassed : t.someTestsRemain}
                  </span>
                </div>

                {result.testResults.map((tItem, idx) => (
                  <div 
                    key={tItem.testId || idx}
                    className={`p-3.5 rounded-xl border transition ${
                      tItem.passed
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                        : 'bg-red-950/20 border-red-500/30 text-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {tItem.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 text-xs">
                        <p className="font-semibold text-slate-200">
                          {tItem.description}
                        </p>
                        <p className={`mt-1 font-mono text-[11px] ${tItem.passed ? 'text-emerald-400/80' : 'text-rose-300'}`}>
                          Status: {tItem.actual}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-sans">
                <Code className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p>{language === 'sv' ? 'Kör koden för att validera testfall.' : 'Run the code to validate test cases.'}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Console Logs Tab */}
        {activeTab === 'console' && (
          <div className="p-4 sm:p-5 font-mono text-xs space-y-2">
            <div className="text-slate-400 text-xs font-sans mb-3 flex items-center justify-between border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>JavaScript Console Output:</span>
              </span>
              {allLogs.length > 0 && (
                <button
                  onClick={() => setCustomConsoleLogs([])}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Rensa</span>
                </button>
              )}
            </div>

            {allLogs.length > 0 ? (
              <div className="space-y-1.5">
                {allLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 font-mono text-xs flex items-start gap-2 text-slate-200"
                  >
                    <span className="text-amber-400 font-bold select-none">&gt;</span>
                    <span className="break-all whitespace-pre-wrap">{log}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-sans">
                <Terminal className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p>{t.consoleEmpty}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: DOM Node Inspector */}
        {activeTab === 'dom' && (
          <div className="p-4 sm:p-5 font-mono text-xs space-y-2">
            <div className="text-slate-400 text-xs font-sans mb-3 flex items-center justify-between border-b border-white/5 pb-2">
              <span>HTML DOM Hierarki:</span>
              <span className="text-[11px] text-orange-400">
                {result?.domTree?.length || 0} {language === 'sv' ? 'noder analyserade' : 'nodes analyzed'}
              </span>
            </div>

            {result?.domTree && result.domTree.length > 0 ? (
              <div className="space-y-1.5">
                {result.domTree.map((node, i) => (
                  <div
                    key={i}
                    style={{ marginLeft: `${node.depth * 16}px` }}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 flex-wrap"
                  >
                    <div className="flex items-center gap-1 text-orange-400 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>&lt;{node.tag}&gt;</span>
                    </div>

                    {Object.entries(node.attributes).map(([k, v]) => (
                      <span key={k} className="text-[11px] bg-slate-900 px-1.5 py-0.5 rounded border border-white/10 text-cyan-300">
                        {k}=<span className="text-yellow-300">"{v}"</span>
                      </span>
                    ))}

                    {node.textPreview && (
                      <span className="text-[11px] text-slate-400 italic truncate max-w-xs">
                        "{node.textPreview}"
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs italic">
                {language === 'sv' ? 'Skriv HTML-kod och kör den för att inspektera DOM-trädet.' : 'Write HTML code and run it to inspect the DOM tree.'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#050811] border-t border-white/10 text-[11px] text-slate-400 shrink-0 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isRealTime ? t.livePreviewActive : t.manualRunMode}</span>
        </span>
        {result?.executionTimeMs !== undefined && (
          <span>{language === 'sv' ? 'Validering' : 'Exec'}: {result.executionTimeMs}ms</span>
        )}
      </div>
    </div>
  );
};
