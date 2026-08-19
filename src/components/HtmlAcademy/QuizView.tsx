import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  Zap, 
  Sparkles,
  Check,
  Code2,
  Palette,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, UserHtmlProgress, WebTrack } from '../../types/html';
import { getLocalizedQuizzes } from '../../utils/localizedCurriculum';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface QuizViewProps {
  userProgress: UserHtmlProgress;
  onSolveQuiz: (quizId: string, earnedXp: number) => void;
  language?: Language;
}

export const QuizView: React.FC<QuizViewProps> = ({ userProgress, onSolveQuiz, language = 'sv' }) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'html' | 'css' | 'js'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const allQuizzes: QuizQuestion[] = getLocalizedQuizzes(language);

  const filteredQuizzes = allQuizzes.filter(q => {
    if (activeFilter === 'html') return q.track === 'html';
    if (activeFilter === 'css') return q.track === 'css';
    if (activeFilter === 'js') return q.track === 'js';
    return true;
  });

  const question = filteredQuizzes[currentIdx] || filteredQuizzes[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered || !question) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
      onSolveQuiz(question.id, question.xp || 15);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < filteredQuizzes.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleFilterChange = (filter: 'all' | 'html' | 'css' | 'js') => {
    setActiveFilter(filter);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (!question) {
    return <div className="p-8 text-center text-slate-400">{language === 'sv' ? 'Inga frågor tillgängliga i denna kategori.' : 'No questions available in this category.'}</div>;
  }

  const getQuestionTrackBadge = (track?: WebTrack) => {
    if (track === 'js') {
      return (
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-amber-500/20 text-amber-300 border-amber-500/40">
          JS ES6
        </span>
      );
    }
    if (track === 'css') {
      return (
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-sky-500/20 text-sky-300 border-sky-500/40">
          CSS3
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-orange-500/20 text-orange-300 border-orange-500/40">
        HTML5
      </span>
    );
  };

  const getProgressBarColor = (track?: WebTrack) => {
    if (track === 'js') return 'bg-amber-400';
    if (track === 'css') return 'bg-sky-500';
    return 'bg-orange-500';
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center justify-between bg-[#070b16] p-4 rounded-3xl border border-white/10 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-orange-400" />
          <h2 className="text-base font-bold text-slate-100">{t.tabQuiz}</h2>
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/5 flex-wrap">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-orange-500 via-sky-500 to-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.allTracks} ({allQuizzes.length})
          </button>
          <button
            onClick={() => handleFilterChange('html')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition ${
              activeFilter === 'html'
                ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3 h-3 text-orange-400" />
            <span>HTML ({allQuizzes.filter(q => q.track === 'html').length})</span>
          </button>
          <button
            onClick={() => handleFilterChange('css')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition ${
              activeFilter === 'css'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3 h-3 text-sky-400" />
            <span>CSS ({allQuizzes.filter(q => q.track === 'css').length})</span>
          </button>
          <button
            onClick={() => handleFilterChange('js')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition ${
              activeFilter === 'js'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3 text-amber-400" />
            <span>JS ({allQuizzes.filter(q => q.track === 'js').length})</span>
          </button>
        </div>
      </div>

      {isCompleted ? (
        <div className="bg-[#070b16] rounded-3xl border border-white/10 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-100">{t.quizFinishedTitle}</h2>
            <p className="text-slate-400 text-sm">
              {t.quizResultDesc}: <span className="text-orange-400 font-bold">{score}</span> {language === 'sv' ? 'av' : 'of'}{' '}
              <span className="text-slate-200 font-bold">{filteredQuizzes.length}</span> {language === 'sv' ? 'rätt.' : 'correct.'}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20 transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.retakeQuiz}</span>
          </button>
        </div>
      ) : (
        <div className="bg-[#070b16] rounded-3xl border border-white/10 overflow-hidden shadow-2xl space-y-6">
          {/* Header */}
          <div className="p-5 bg-[#050811] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getQuestionTrackBadge(question.track)}
              <span className="text-xs font-mono text-slate-400">
                {language === 'sv' ? `Fråga ${currentIdx + 1} av ${filteredQuizzes.length}` : `Question ${currentIdx + 1} of ${filteredQuizzes.length}`}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>+{question.xp || 15} XP</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-1.5 px-6">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(question.track)}`}
              style={{ width: `${((currentIdx + 1) / filteredQuizzes.length) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          <div className="px-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 leading-snug">
              {question.question}
            </h3>

            {question.codeSnippet && (
              <pre className="p-4 rounded-2xl bg-[#04060d] border border-white/10 font-mono text-xs text-orange-300 overflow-x-auto">
                {question.codeSnippet}
              </pre>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {question.options.map((option, idx) => {
                let btnStyle = 'bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-white/20';

                if (isAnswered) {
                  if (idx === question.correctIndex) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 shadow-md shadow-rose-500/10';
                  } else {
                    btnStyle = 'opacity-40 border-transparent';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === question.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== question.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="mx-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 animate-fade-in">
              <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'sv' ? 'Förklaring:' : 'Explanation:'}</span>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Footer Action */}
          <div className="p-5 bg-[#050811] border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              {language === 'sv' ? 'Rätt svar:' : 'Correct answers:'} {score}/{currentIdx + (isAnswered ? 1 : 0)}
            </span>

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition active:scale-95"
              >
                <span>{currentIdx < filteredQuizzes.length - 1 ? t.nextQuestion : t.finishQuiz}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
