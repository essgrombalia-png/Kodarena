import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Code2, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Award,
  Zap,
  RotateCcw,
  Palette,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HtmlLessonLevel, HtmlExercise, HtmlExecutionResult, UserHtmlProgress } from '../../types/html';
import { HtmlCodeEditor } from './HtmlCodeEditor';
import { HtmlPreviewOutput } from './HtmlPreviewOutput';
import { executeAndValidateHtml } from '../../services/htmlRunner';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface LessonViewProps {
  level: HtmlLessonLevel;
  exercise: HtmlExercise;
  userProgress: UserHtmlProgress;
  onSelectExercise: (exerciseId: string) => void;
  onCompleteExercise: (exerciseId: string, earnedXp: number) => void;
  onBackToMap: () => void;
  onOpenAICoach: (context: string) => void;
  language?: Language;
}

export const LessonView: React.FC<LessonViewProps> = ({
  level,
  exercise,
  userProgress,
  onSelectExercise,
  onCompleteExercise,
  onBackToMap,
  onOpenAICoach,
  language = 'sv'
}) => {
  const t = TRANSLATIONS[language];
  const [code, setCode] = useState<string>(exercise.starterCode);
  const [result, setResult] = useState<HtmlExecutionResult | null>(null);
  const [activeTheoryTab, setActiveTheoryTab] = useState<'theory' | 'examples' | 'task' | 'hints'>('task');
  const [showSolution, setShowSolution] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [revealedHintCount, setRevealedHintCount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [mobileView, setMobileView] = useState<'theory' | 'editor' | 'output'>('editor');
  const [isRealTime, setIsRealTime] = useState(true);

  const isAlreadyCompleted = userProgress.completedExerciseIds.includes(exercise.id);

  // When exercise changes, load starter code & reset state
  useEffect(() => {
    setCode(exercise.starterCode);
    const initialRes = executeAndValidateHtml(exercise.starterCode, exercise.testCases);
    setResult(initialRes);
    setShowSolution(false);
    setRevealedHintCount(0);
    setShowSuccessBanner(false);
    setActiveTheoryTab('task');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [exercise.id]);

  // Real-time live execution with 200ms debounce
  useEffect(() => {
    if (!isRealTime) return;

    const timer = setTimeout(() => {
      const res = executeAndValidateHtml(code, exercise.testCases);
      setResult(res);
    }, 200);

    return () => clearTimeout(timer);
  }, [code, isRealTime, exercise.testCases]);

  // Audio reader for theory
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = activeTheoryTab === 'theory' 
      ? exercise.theory 
      : activeTheoryTab === 'task' 
      ? exercise.task 
      : exercise.shortDesc;

    const cleanText = textToSpeak.replace(/[#*`_<>]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'sv' ? 'sv-SE' : 'en-US';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleRunCode = () => {
    const res = executeAndValidateHtml(code, exercise.testCases);
    setResult(res);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    const res = executeAndValidateHtml(code, exercise.testCases);
    setResult(res);
    setIsSubmitting(false);

    if (res.allTestsPassed) {
      setShowSuccessBanner(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCompleteExercise(exercise.id, exercise.xpReward);
    }
  };

  const handleResetCode = () => {
    setCode(exercise.starterCode);
    const res = executeAndValidateHtml(exercise.starterCode, exercise.testCases);
    setResult(res);
    setShowSolution(false);
  };

  // Find next and previous exercise in level
  const currentIndex = level.exercises.findIndex((e) => e.id === exercise.id);
  const prevExercise = currentIndex > 0 ? level.exercises[currentIndex - 1] : null;
  const nextExercise = currentIndex < level.exercises.length - 1 ? level.exercises[currentIndex + 1] : null;

  const isJs = level.track === 'js';
  const isCss = level.track === 'css';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Top Header & Breadcrumbs */}
      <div className="flex items-center justify-between bg-[#070b16] p-3 sm:p-4 rounded-2xl border border-white/10 flex-wrap gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToMap}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToMap}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
              isJs
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : isCss
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
            }`}>
              {isJs ? 'JS ES6' : isCss ? 'CSS3' : 'HTML5'} • {t.level} {level.id}
            </span>
            <h2 className="text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md">
              {exercise.title}
            </h2>
          </div>
        </div>

        {/* Navigation Between Exercises in Level */}
        <div className="flex items-center gap-2">
          {prevExercise && (
            <button
              onClick={() => onSelectExercise(prevExercise.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'sv' ? 'Föregående' : 'Previous'}</span>
            </button>
          )}

          {nextExercise && (
            <button
              onClick={() => onSelectExercise(nextExercise.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 text-xs font-semibold transition"
            >
              <span>{t.nextExercise}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Success Completion Alert Banner */}
      {showSuccessBanner && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-3 animate-fade-in shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-200">
                {language === 'sv' ? 'Bra jobbat! Övningen är godkänd!' : 'Great job! Exercise passed!'} (+{exercise.xpReward} XP)
              </h3>
              <p className="text-xs text-emerald-300/80">
                {language === 'sv' ? 'Alla testfall uppfyllda. Fortsätt till nästa utmaning.' : 'All tests passed. Continue to the next challenge.'}
              </p>
            </div>
          </div>

          {nextExercise ? (
            <button
              onClick={() => onSelectExercise(nextExercise.id)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 flex items-center gap-1.5"
            >
              <span>{t.nextExercise}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToMap}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              <span>{t.backToMap}</span>
            </button>
          )}
        </div>
      )}

      {/* Mobile & Tablet Segmented View Switcher (Only on screens < lg) */}
      <div className="flex lg:hidden items-center bg-[#070b16] p-1.5 rounded-2xl border border-white/10 shadow-lg">
        <button
          onClick={() => setMobileView('theory')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            mobileView === 'theory'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.theory}</span>
        </button>
        <button
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            mobileView === 'editor'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>{t.codeEditor}</span>
        </button>
        <button
          onClick={() => setMobileView('output')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] ${
            mobileView === 'output'
              ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{t.webPreviewTab}</span>
          {result?.allTestsPassed && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </button>
      </div>

      {/* Mobile Floating Quick Switch Action when on Editor view */}
      {mobileView === 'editor' && (
        <div className="lg:hidden flex items-center justify-between p-2.5 rounded-2xl bg-[#070b16] border border-white/10 text-xs gap-2">
          <span className="text-slate-400 truncate text-[11px] font-mono">
            {exercise.title}
          </span>
          <button
            onClick={() => setMobileView('output')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-500/30 font-bold transition shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === 'sv' ? 'Se Resultat' : 'View Preview'}</span>
          </button>
        </div>
      )}

      {/* Mobile Floating Quick Switch Action when on Output view */}
      {mobileView === 'output' && (
        <div className="lg:hidden flex items-center justify-between p-2.5 rounded-2xl bg-[#070b16] border border-white/10 text-xs gap-2">
          <span className="text-slate-400 truncate text-[11px] font-mono">
            {result?.allTestsPassed ? (language === 'sv' ? 'Alla tester gröna!' : 'All tests passed!') : (language === 'sv' ? 'Förhandsgranskning live' : 'Live preview')}
          </span>
          <button
            onClick={() => setMobileView('editor')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-500/30 font-bold transition shrink-0"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{language === 'sv' ? 'Tillbaka till Koden' : 'Back to Editor'}</span>
          </button>
        </div>
      )}

      {/* Main 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Theory, Instructions & Hints */}
        <div className={`lg:col-span-4 bg-[#070b16] rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl ${
          mobileView === 'theory' ? 'block' : 'hidden lg:flex'
        }`}>
          {/* Tab Selection */}
          <div className="p-2 bg-[#050811] border-b border-white/10 flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTheoryTab('task')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTheoryTab === 'task'
                    ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.task}
              </button>
              <button
                onClick={() => setActiveTheoryTab('theory')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  activeTheoryTab === 'theory'
                    ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.theory}
              </button>
              <button
                onClick={() => setActiveTheoryTab('hints')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                  activeTheoryTab === 'hints'
                    ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{t.hints}</span>
                {exercise.hints.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-white/10 rounded-full font-mono">
                    {exercise.hints.length}
                  </span>
                )}
              </button>
            </div>

            {/* Audio Reader */}
            <button
              onClick={handleToggleSpeech}
              className={`p-1.5 rounded-lg border transition ${
                isSpeaking 
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/40 animate-pulse' 
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
              title={isSpeaking ? (language === 'sv' ? 'Stoppa röstuppläsning' : 'Stop voice narration') : (language === 'sv' ? 'Läs upp texten' : 'Read text aloud')}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Theory Panel Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[600px] text-xs">
            {activeTheoryTab === 'task' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-1.5">
                  <h3 className="font-bold text-orange-300 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'sv' ? 'Ditt Uppdrag:' : 'Your Task:'}</span>
                  </h3>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {exercise.task}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-300 text-xs">{t.testCasesTab}:</h4>
                  {exercise.testCases.map((tc) => (
                    <div key={tc.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400 font-bold select-none">•</span>
                      <span>{tc.description}</span>
                    </div>
                  ))}
                </div>

                {/* Solution Toggle */}
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold transition"
                  >
                    <span className="flex items-center gap-1.5">
                      {showSolution ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{showSolution ? t.hideSolution : t.showSolution}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">{language === 'sv' ? 'Facit' : 'Answer'}</span>
                  </button>

                  {showSolution && (
                    <div className="p-3.5 rounded-xl bg-[#03060f] border border-amber-500/30 space-y-2 animate-fade-in">
                      <p className="text-[11px] text-slate-400 italic">
                        {exercise.solutionExplanation}
                      </p>
                      <pre className="p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-amber-300 overflow-x-auto">
                        {exercise.solutionCode}
                      </pre>
                      <button
                        onClick={() => setCode(exercise.solutionCode)}
                        className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
                      >
                        {language === 'sv' ? 'Klistra in lösningen i editorn' : 'Paste solution into editor'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTheoryTab === 'theory' && (
              <div className="space-y-4 animate-fade-in leading-relaxed text-slate-300">
                <div className="prose prose-invert prose-xs">
                  {exercise.theory.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-3 whitespace-pre-wrap">
                      {para}
                    </p>
                  ))}
                </div>

                {exercise.examples.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>{t.examples}:</span>
                    </h4>
                    {exercise.examples.map((ex, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                        <p className="font-bold text-slate-200 text-[11px]">{ex.title}</p>
                        <pre className="p-2 rounded-lg bg-[#04060d] border border-white/10 font-mono text-[11px] text-orange-300 overflow-x-auto">
                          {ex.code}
                        </pre>
                        <p className="text-[11px] text-slate-400">{ex.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTheoryTab === 'hints' && (
              <div className="space-y-3 animate-fade-in">
                {exercise.hints.map((hint, idx) => {
                  const isRevealed = idx < revealedHintCount;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-xs">
                          {t.hints} {idx + 1}
                        </span>
                        {!isRevealed && (
                          <button
                            onClick={() => setRevealedHintCount(idx + 1)}
                            className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition font-mono font-bold"
                          >
                            {language === 'sv' ? 'Visa ledtråd' : 'Show hint'}
                          </button>
                        )}
                      </div>
                      {isRevealed ? (
                        <p className="text-slate-300 leading-relaxed text-xs">{hint}</p>
                      ) : (
                        <p className="text-slate-500 italic text-[11px]">{language === 'sv' ? 'Klicka på knappen för att låsa upp denna ledtråd.' : 'Click the button to unlock this hint.'}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Help Trigger */}
          <div className="p-3 bg-[#050811] border-t border-white/10">
            <button
              onClick={() => onOpenAICoach(language === 'sv' ? `Jag arbetar på övningen "${exercise.title}". Min nuvarande kod är:\n\`\`\`html\n${code}\n\`\`\`\nUppgiften är: ${exercise.task}` : `I'm working on the exercise "${exercise.title}". My current code is:\n\`\`\`html\n${code}\n\`\`\`\nThe task is: ${exercise.task}`)}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.askAI}</span>
            </button>
          </div>
        </div>

        {/* Middle Column: Code Editor */}
        <div className={`lg:col-span-4 ${mobileView === 'editor' ? 'block' : 'hidden lg:flex flex-col'}`}>
          <HtmlCodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRunCode}
            onSubmit={handleSubmitCode}
            onReset={handleResetCode}
            onAskAI={() => onOpenAICoach(language === 'sv' ? `Jag behöver hjälp med min kod för "${exercise.title}":\n\`\`\`html\n${code}\n\`\`\`` : `I need help with my code for "${exercise.title}":\n\`\`\`html\n${code}\n\`\`\``)}
            isSubmitting={isSubmitting}
            showSubmit={true}
            exerciseTitle={exercise.title}
            language={language}
          />
        </div>

        {/* Right Column: Live Web Preview & Validation Tests */}
        <div className={`lg:col-span-4 ${mobileView === 'output' ? 'block' : 'hidden lg:flex flex-col'}`}>
          <HtmlPreviewOutput
            result={result}
            rawHtml={code}
            onRefresh={handleRunCode}
            language={language}
            isRealTime={isRealTime}
          />
        </div>
      </div>
    </div>
  );
};
