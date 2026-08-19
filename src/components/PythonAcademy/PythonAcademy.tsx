import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  BookOpen, 
  Code2, 
  HelpCircle, 
  Award, 
  Sparkles, 
  ArrowLeft, 
  Flame, 
  Layers,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { pythonCurriculum } from '../../data/pythonCurriculum';
import { UserPythonProgress, PythonExercise } from '../../types/python';
import { LessonView } from './LessonView';
import { PlaygroundView } from './PlaygroundView';
import { QuizView } from './QuizView';
import { CheatsheetView } from './CheatsheetView';
import { ProgressDashboard } from './ProgressDashboard';
import { AICoachModal } from './AICoachModal';

const STORAGE_KEY = 'nexus_python_academy_v1';

const DEFAULT_PROGRESS: UserPythonProgress = {
  totalXp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedExerciseIds: [],
  solvedQuizIds: [],
  unlockedBadgeIds: [],
  savedPlaygroundCodes: [],
  activeExerciseId: 'ex-1-1',
};

interface PythonAcademyProps {
  onBackToGame?: () => void;
}

export const PythonAcademy: React.FC<PythonAcademyProps> = ({ onBackToGame }) => {
  const [progress, setProgress] = useState<UserPythonProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved python progress', e);
    }
    return DEFAULT_PROGRESS;
  });

  const [activeTab, setActiveTab] = useState<'learn' | 'playground' | 'quiz' | 'cheatsheet' | 'progress'>('learn');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(progress.activeExerciseId || 'ex-1-1');
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [aiCoachPrompt, setAICoachPrompt] = useState<string | undefined>(undefined);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);

  // Save progress on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  }, [progress]);

  // Find all exercises flat list
  const allExercises: PythonExercise[] = pythonCurriculum.flatMap(lvl => lvl.exercises);
  const currentExerciseIndex = allExercises.findIndex(e => e.id === selectedExerciseId);
  const currentExercise = allExercises[currentExerciseIndex] || allExercises[0];

  const handleCompleteExercise = (exerciseId: string, xpGain: number) => {
    if (progress.completedExerciseIds.includes(exerciseId)) return;

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#29e6d0', '#6a5bff', '#f747c9', '#ffd166']
      });
    } catch (e) {}

    setProgress(prev => {
      const updatedCompleted = [...prev.completedExerciseIds, exerciseId];
      const newTotalXp = prev.totalXp + xpGain;
      const newLevel = Math.floor(newTotalXp / 100) + 1;

      return {
        ...prev,
        completedExerciseIds: updatedCompleted,
        totalXp: newTotalXp,
        level: newLevel,
      };
    });
  };

  const handleSolveQuiz = (quizId: string, xpGain: number) => {
    if (progress.solvedQuizIds.includes(quizId)) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}

    setProgress(prev => {
      const updated = [...prev.solvedQuizIds, quizId];
      const newTotalXp = prev.totalXp + xpGain;
      const newLevel = Math.floor(newTotalXp / 100) + 1;

      return {
        ...prev,
        solvedQuizIds: updated,
        totalXp: newTotalXp,
        level: newLevel,
      };
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Är du säker på att du vill nollställa alla dina Python-framsteg och XP?')) {
      setProgress(DEFAULT_PROGRESS);
      setSelectedExerciseId('ex-1-1');
    }
  };

  const handleOpenAI = (prompt?: string) => {
    setAICoachPrompt(prompt);
    setIsAICoachOpen(true);
  };

  return (
    <div className="app-shell min-h-screen bg-transparent text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-white font-sans">
      {/* Top Navbar */}
      <header className="academy-topbar sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBackToGame && (
            <button
              onClick={onBackToGame}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition border border-white/10"
              title="Tillbaka till Spelhubben"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Spelhubb</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 text-sm">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base font-sans tracking-tight text-white">
                  Python Pro Academy
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  Från 0 till Proffs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats & AI Assistant shortcut */}
        <div className="flex items-center gap-3">
          {/* XP & Level Badge */}
          <div className="flex items-center gap-2 bg-[#080d1a] border border-white/10 px-3 py-1 rounded-full text-xs font-mono">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Nivå {progress.level}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{progress.totalXp} XP</span>
          </div>

          <button
            onClick={() => handleOpenAI()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 text-xs font-bold transition shadow-lg shadow-indigo-500/20 hover:opacity-95 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI-Coach</span>
          </button>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <div className="bg-[#070c18] border-b border-white/5 px-4 lg:px-8 py-2 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'learn'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lektioner & Övningar</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'playground'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Kodlekplats (Sandbox)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quiz & Pussel</span>
          </button>

          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'cheatsheet'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Lathund & Syntax</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'progress'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Märken & Framsteg</span>
          </button>
        </div>

        {/* Quick Level Switcher for 'learn' mode */}
        {activeTab === 'learn' && (
          <div className="relative">
            <button
              onClick={() => setLevelDropdownOpen(!levelDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#0a1020] hover:bg-[#0f172a] border border-white/10 rounded-xl text-xs text-slate-200 transition font-medium"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="max-w-[140px] truncate">{currentExercise.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {levelDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 max-h-96 overflow-y-auto bg-[#080d1a] border border-white/15 rounded-2xl shadow-2xl z-50 p-2 space-y-3 animate-fadeIn">
                {pythonCurriculum.map(lvl => (
                  <div key={lvl.id} className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-2 pt-1 font-mono">
                      {lvl.levelTitle}
                    </div>
                    {lvl.exercises.map(ex => {
                      const isDone = progress.completedExerciseIds.includes(ex.id);
                      const isSelected = ex.id === selectedExerciseId;
                      return (
                        <button
                          key={ex.id}
                          onClick={() => {
                            setSelectedExerciseId(ex.id);
                            setLevelDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          <span className="truncate">{ex.title}</span>
                          {isDone && <span className="text-emerald-400 text-[10px]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 max-w-[1600px] w-full mx-auto">
        {activeTab === 'learn' && (
          <LessonView
            exercise={currentExercise}
            isCompleted={progress.completedExerciseIds.includes(currentExercise.id)}
            onCompleteExercise={handleCompleteExercise}
            onNextExercise={() => {
              if (currentExerciseIndex < allExercises.length - 1) {
                setSelectedExerciseId(allExercises[currentExerciseIndex + 1].id);
              }
            }}
            onPrevExercise={() => {
              if (currentExerciseIndex > 0) {
                setSelectedExerciseId(allExercises[currentExerciseIndex - 1].id);
              }
            }}
            hasNext={currentExerciseIndex < allExercises.length - 1}
            hasPrev={currentExerciseIndex > 0}
            onOpenAICoach={handleOpenAI}
          />
        )}

        {activeTab === 'playground' && <PlaygroundView onOpenAICoach={handleOpenAI} />}

        {activeTab === 'quiz' && (
          <QuizView solvedQuizIds={progress.solvedQuizIds} onSolveQuiz={handleSolveQuiz} />
        )}

        {activeTab === 'cheatsheet' && <CheatsheetView />}

        {activeTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            onResetProgress={handleResetProgress}
            onSelectExercise={(exId) => {
              setSelectedExerciseId(exId);
              setActiveTab('learn');
            }}
          />
        )}
      </main>

      {/* AI Coach Dialog */}
      <AICoachModal
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
        currentExercise={currentExercise}
        currentCode={currentExercise.starterCode}
        initialQuestion={aiCoachPrompt}
      />
    </div>
  );
};
