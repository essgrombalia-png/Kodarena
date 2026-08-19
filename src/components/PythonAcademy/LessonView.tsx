import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ChevronRight,
  Code2,
  Terminal,
  Database,
  Palette,
  CheckCircle2,
  Volume2,
  Flame,
  FileCode,
  Layers,
  Zap,
  HelpCircle
} from 'lucide-react';
import { PythonExercise, ExecutionResult } from '../../types/python';
import { CodeEditor } from './CodeEditor';
import { TerminalOutput } from './TerminalOutput';
import { VariableInspector } from './VariableInspector';
import { VisualCanvasOutput } from './VisualCanvasOutput';
import { AudioTheoryReader } from './AudioTheoryReader';
import { pythonInterpreter } from '../../utils/pythonInterpreter';

interface LessonViewProps {
  exercise: PythonExercise;
  isCompleted: boolean;
  onCompleteExercise: (exerciseId: string, xp: number) => void;
  onNextExercise?: () => void;
  onPrevExercise?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onOpenAICoach: (customPrompt?: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  exercise,
  isCompleted,
  onCompleteExercise,
  onNextExercise,
  onPrevExercise,
  hasNext,
  hasPrev,
  onOpenAICoach,
}) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'task' | 'theory' | 'hints'>('task');
  
  // Mobile / iPad responsive primary view mode
  const [mobileView, setMobileView] = useState<'theory' | 'editor' | 'output'>('editor');
  
  // Output pane subtabs: terminal, variables, canvas
  const [outputTab, setOutputTab] = useState<'terminal' | 'variables' | 'canvas'>('terminal');

  // Sync starter code when exercise changes
  useEffect(() => {
    setCode(exercise.starterCode);
    setExecutionResult(null);
    setRevealedHints(0);
    setShowSolution(false);
    setActiveTab('task');
    setOutputTab('terminal');
  }, [exercise.id]);

  const handleRunCode = async () => {
    setIsRunning(true);
    const res = await pythonInterpreter.execute(code, []);
    setExecutionResult(res);
    setIsRunning(false);

    // If canvas commands were executed, automatically switch to canvas tab for instant visual gratification!
    if (res.canvasCommands && res.canvasCommands.length > 0) {
      setOutputTab('canvas');
    }
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    const res = await pythonInterpreter.execute(code, exercise.testCases);
    setExecutionResult(res);
    setIsSubmitting(false);

    if (res.allTestsPassed) {
      onCompleteExercise(exercise.id, exercise.xpReward);
    }
  };

  const handleResetCode = () => {
    setCode(exercise.starterCode);
    setExecutionResult(null);
  };

  const handleAskAIDebug = (errorMsg: string) => {
    onOpenAICoach(`Jag fick det här felet på övningen "${exercise.title}": ${errorMsg}. Vad betyder det och hur fixar jag det steg för steg?`);
  };

  const handleAskBigO = () => {
    onOpenAICoach(`Analysera tidskomplexitet (Big-O) och minnesanvändning för min Python-lösning i övningen "${exercise.title}":\n\n\`\`\`python\n${code}\n\`\`\``);
  };

  const handleAskCustomChallenge = () => {
    onOpenAICoach(`Ge mig en ny bonusutmaning baserad på samma koncept som övningen "${exercise.title}" så att jag kan öva mer!`);
  };

  return (
    <div className="flex flex-col space-y-4 pb-12">
      {/* Mobile & iPad Top Switcher */}
      <div className="flex lg:hidden items-center justify-between p-1 bg-[#080d1a] rounded-2xl border border-white/10 shadow-lg">
        <button
          onClick={() => setMobileView('theory')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            mobileView === 'theory'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Uppgift & Teori</span>
        </button>
        <button
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            mobileView === 'editor'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Kod-Editor</span>
        </button>
        <button
          onClick={() => setMobileView('output')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            mobileView === 'output'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Resultat</span>
          {executionResult && (
            <span className={`w-2 h-2 rounded-full ${executionResult.success ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          )}
        </button>
      </div>

      {/* Main Grid Layout: Adaptive 12 cols on desktop, responsive stack on tablets/phones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Theory & Instructions (Visible if desktop OR mobileView === 'theory') */}
        <div className={`lg:col-span-5 flex flex-col space-y-4 ${
          mobileView !== 'theory' ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Header & Meta Card */}
          <div className="p-4 sm:p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                  exercise.difficulty === 'nyborjare' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  exercise.difficulty === 'medel' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                  exercise.difficulty === 'avancerad' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                }`}>
                  {exercise.difficulty.toUpperCase()}
                </span>

                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Award className="w-3.5 h-3.5" />
                  +{exercise.xpReward} XP
                </span>
              </div>

              <div className="flex items-center gap-2">
                <AudioTheoryReader text={`${exercise.title}. ${exercise.shortDesc}. Din uppgift: ${exercise.task}. Teori: ${exercise.theory}`} />

                {isCompleted && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle className="w-3.5 h-3.5" /> Klarad
                  </span>
                )}
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold font-sans text-slate-100">{exercise.title}</h2>
            <p className="text-xs text-slate-400">{exercise.shortDesc}</p>

            {/* Subtabs for Task / Theory / Hints */}
            <div className="flex p-1 bg-[#050810] rounded-xl border border-white/5 gap-1">
              <button
                onClick={() => setActiveTab('task')}
                className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition ${
                  activeTab === 'task'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Uppgift & Mål
              </button>
              <button
                onClick={() => setActiveTab('theory')}
                className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition ${
                  activeTab === 'theory'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Teori & Exempel
              </button>
              <button
                onClick={() => setActiveTab('hints')}
                className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition ${
                  activeTab === 'hints'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tips & Svar
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-6 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-5 text-sm leading-relaxed text-slate-200 max-h-[500px] lg:max-h-[58vh] overflow-y-auto">
            {activeTab === 'task' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Code2 className="w-4 h-4" /> Din uppgift:
                  </h3>
                  <div className="p-3.5 sm:p-4 bg-[#0a1020] rounded-xl border border-cyan-500/20 text-slate-100 font-sans text-sm">
                    {exercise.task}
                  </div>
                </div>

                {/* Criteria */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Förväntade kriterier:</h4>
                  <div className="space-y-2">
                    {exercise.testCases.map((tc, i) => (
                      <div key={tc.id || i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-white/5">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{tc.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro AI Coaching Buttons */}
                <div className="p-3.5 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-cyan-950/30 rounded-xl border border-indigo-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-indigo-200">AI Python Coach</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => onOpenAICoach(`Förklara konceptet "${exercise.title}" pedagogiskt och enkelt med vardagliga liknelser.`)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 text-left border border-white/5 transition flex items-center gap-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">Pedagogisk förklaring</span>
                    </button>
                    <button
                      onClick={handleAskBigO}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 text-left border border-white/5 transition flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Big-O & Prestanda</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theory' && (
              <div className="space-y-4">
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
                  {exercise.theory}
                </div>

                {exercise.examples.map((ex, idx) => (
                  <div key={idx} className="space-y-1.5 p-4 bg-[#050810] rounded-xl border border-white/10">
                    <div className="text-xs font-bold text-cyan-400">{ex.title}</div>
                    <pre className="p-3 bg-[#080d1a] rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto">
                      {ex.code}
                    </pre>
                    <p className="text-xs text-slate-400">{ex.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" /> Stegvisa Ledtrådar
                  </h3>

                  {exercise.hints.map((hint, index) => (
                    <div key={index} className="p-3 bg-[#050810] rounded-xl border border-white/5">
                      {revealedHints > index ? (
                        <div className="space-y-1 text-xs text-slate-200">
                          <div className="font-semibold text-amber-400">Tips {index + 1}:</div>
                          <div>{hint}</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRevealedHints(index + 1)}
                          className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition"
                        >
                          <span>🔒 Lås upp Tips {index + 1}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Solution Reveal */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
                  >
                    {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showSolution ? 'Dölj Lösningsförslag' : 'Visa Lösningsförslag'}
                  </button>

                  {showSolution && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-white/10 space-y-2 animate-fadeIn">
                      <div className="text-xs font-bold text-emerald-400">Lösningskod:</div>
                      <pre className="p-3 bg-[#050810] rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto">
                        {exercise.solutionCode}
                      </pre>
                      <p className="text-xs text-slate-400">{exercise.solutionExplanation}</p>
                      <button
                        onClick={() => setCode(exercise.solutionCode)}
                        className="text-xs text-cyan-400 hover:underline pt-1"
                      >
                        Kopiera in lösningen till editorn
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Prev / Next Exercise Bar */}
          <div className="flex items-center justify-between p-3 bg-[#080d1a] rounded-2xl border border-white/10">
            <button
              onClick={onPrevExercise}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Föregående
            </button>

            <button
              onClick={onNextExercise}
              disabled={!hasNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition rounded-xl shadow-md"
            >
              Nästa Övning <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Code Editor & Multi-Tab Output */}
        <div className={`lg:col-span-7 flex flex-col space-y-4 ${
          mobileView === 'theory' ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Editor Area (Visible if desktop OR mobileView === 'editor') */}
          <div className={`${
            mobileView === 'output' ? 'hidden lg:block' : 'block'
          }`}>
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onSubmit={handleSubmitCode}
              onReset={handleResetCode}
              onAskAI={() => onOpenAICoach()}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              showSubmit={true}
              exerciseTitle={exercise.title}
              initialHeight={460}
            />
          </div>

          {/* Multi-Tab Output Area (Visible if desktop OR mobileView === 'output') */}
          <div className={`flex flex-col space-y-2 ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Output Subtab Switcher */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#080d1a] rounded-xl border border-white/10 text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOutputTab('terminal')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition flex items-center gap-1.5 ${
                    outputTab === 'terminal'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal</span>
                </button>

                <button
                  onClick={() => setOutputTab('variables')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition flex items-center gap-1.5 ${
                    outputTab === 'variables'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Variabler</span>
                  {executionResult?.variables && executionResult.variables.length > 0 && (
                    <span className="text-[10px] px-1 bg-indigo-400/20 text-indigo-300 rounded">
                      {executionResult.variables.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setOutputTab('canvas')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition flex items-center gap-1.5 ${
                    outputTab === 'canvas'
                      ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Canvas / Grafik</span>
                  {executionResult?.canvasCommands && executionResult.canvasCommands.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
                  )}
                </button>
              </div>

              {executionResult && (
                <div className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                  {executionResult.executionTimeMs} ms
                </div>
              )}
            </div>

            {/* Subtab Content Panels */}
            <div className="h-[270px] sm:h-[300px]">
              {outputTab === 'terminal' && (
                <TerminalOutput
                  result={executionResult}
                  onClear={() => setExecutionResult(null)}
                  onAskAIDebug={handleAskAIDebug}
                />
              )}

              {outputTab === 'variables' && (
                <VariableInspector variables={executionResult?.variables || []} />
              )}

              {outputTab === 'canvas' && (
                <VisualCanvasOutput commands={executionResult?.canvasCommands || []} onClear={() => setExecutionResult(null)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
