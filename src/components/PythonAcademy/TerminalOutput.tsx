import React from 'react';
import { Terminal, CheckCircle, XCircle, Clock, Trash2, AlertTriangle } from 'lucide-react';
import { ExecutionResult } from '../../types/python';

interface TerminalOutputProps {
  result: ExecutionResult | null;
  onClear: () => void;
  onAskAIDebug?: (errorMsg: string) => void;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ result, onClear, onAskAIDebug }) => {
  return (
    <div className="flex flex-col h-full bg-[#050810] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#080d1a] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-200">Terminal & Testresultat</span>
          {result && (
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
              <Clock className="w-3 h-3" />
              {result.executionTimeMs} ms
            </span>
          )}
        </div>

        <button
          onClick={onClear}
          className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
          title="Rensa terminal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed space-y-4">
        {!result && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center select-none py-8">
            <Terminal className="w-8 h-8 text-slate-700 mb-2" />
            <p>Tryck på "Kör Kod" eller "Verifiera & Lämna in" för att se output här.</p>
          </div>
        )}

        {result && (
          <>
            {/* Standard Output */}
            {result.output && result.output.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                  Utskrift (stdout):
                </div>
                <div className="p-3 bg-[#0a1020] rounded-xl border border-white/5 text-emerald-300 font-mono whitespace-pre-wrap">
                  {result.output.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Output */}
            {result.error && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    Fel inträffade:
                  </div>
                  {onAskAIDebug && (
                    <button
                      onClick={() => onAskAIDebug(result.error || 'SyntaxError')}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition font-sans"
                    >
                      🤖 Be AI förklara felet
                    </button>
                  )}
                </div>
                <div className="p-3 bg-red-950/30 rounded-xl border border-red-500/20 text-red-300 font-mono whitespace-pre-wrap">
                  {result.error}
                </div>
              </div>
            )}

            {/* Test Cases Results */}
            {result.testResults && result.testResults.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Testfall ({result.testResults.filter(t => t.passed).length}/{result.testResults.length} godkända)
                </div>

                <div className="space-y-2">
                  {result.testResults.map((test, index) => (
                    <div
                      key={test.testId || index}
                      className={`p-3 rounded-xl border transition ${
                        test.passed
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-red-950/20 border-red-500/30 text-red-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-1">
                        <div className="flex items-center gap-2">
                          {test.passed ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                          <span>Test {index + 1}: {test.description}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          test.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {test.passed ? 'GODKÄND' : 'EJ GODKÄND'}
                        </span>
                      </div>

                      {!test.passed && (
                        <div className="mt-2 text-[11px] space-y-1 bg-black/40 p-2 rounded-lg text-slate-300">
                          <div>
                            <span className="text-slate-500">Förväntat:</span>{' '}
                            <code className="text-emerald-400">{test.expected}</code>
                          </div>
                          <div>
                            <span className="text-slate-500">Faktiskt resultat:</span>{' '}
                            <code className="text-red-400">{test.actual || '(Inget)'}</code>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
