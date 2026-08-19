import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { pythonQuizzes } from '../../data/pythonQuizzes';
import { QuizQuestion } from '../../types/python';

interface QuizViewProps {
  solvedQuizIds: string[];
  onSolveQuiz: (quizId: string, xp: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ solvedQuizIds, onSolveQuiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [id: string]: number }>({});
  const [submitted, setSubmitted] = useState<{ [id: string]: boolean }>({});

  const handleSelect = (quizId: string, optIndex: number) => {
    if (submitted[quizId]) return;
    setSelectedAnswers(prev => ({ ...prev, [quizId]: optIndex }));
  };

  const handleSubmitQuestion = (q: QuizQuestion) => {
    const chosen = selectedAnswers[q.id];
    if (chosen === undefined) return;

    setSubmitted(prev => ({ ...prev, [q.id]: true }));

    if (chosen === q.correctIndex && !solvedQuizIds.includes(q.id)) {
      onSolveQuiz(q.id, q.xp);
    }
  };

  const handleResetQuestion = (quizId: string) => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
    setSubmitted(prev => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans">Python Kunskapsquiz & Kluringar</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Testa din förståelse och tjäna extra XP genom att svara rätt på frågorna!
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Klarade frågor</div>
          <div className="text-xl font-bold font-mono text-cyan-400">
            {solvedQuizIds.length} / {pythonQuizzes.length}
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {pythonQuizzes.map((q, qIndex) => {
          const isAnswered = submitted[q.id];
          const chosenIdx = selectedAnswers[q.id];
          const isCorrect = chosenIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">
                  Fråga {qIndex + 1}: {q.title}
                </span>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <Award className="w-3.5 h-3.5" /> +{q.xp} XP
                  </span>

                  {solvedQuizIds.includes(q.id) && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> Löst
                    </span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <h3 className="text-base font-semibold text-slate-100 font-sans">{q.question}</h3>

              {/* Code Snippet if applicable */}
              {q.codeSnippet && (
                <pre className="p-3.5 bg-[#050810] rounded-xl border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((opt, optIdx) => {
                  let style = 'bg-[#050810] border-white/10 hover:border-cyan-500/40 text-slate-200';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                    } else if (optIdx === chosenIdx) {
                      style = 'bg-red-950/40 border-red-500 text-red-200';
                    } else {
                      style = 'bg-[#050810] border-white/5 opacity-50 text-slate-400';
                    }
                  } else if (chosenIdx === optIdx) {
                    style = 'bg-cyan-950/50 border-cyan-400 text-cyan-200 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`p-3.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && optIdx === chosenIdx && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Reset Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  {isAnswered && (
                    <div
                      className={`text-xs p-3 rounded-xl border leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                          : 'bg-red-950/30 border-red-500/30 text-red-300'
                      }`}
                    >
                      <div className="font-bold mb-0.5">{isCorrect ? '✅ Rätt svar!' : '❌ Inte riktigt rätt.'}</div>
                      <div>{q.explanation}</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {isAnswered ? (
                    <button
                      onClick={() => handleResetQuestion(q.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Försök igen
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmitQuestion(q)}
                      disabled={chosenIdx === undefined}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 disabled:opacity-40 hover:opacity-90 active:scale-95 text-slate-950 text-xs font-bold transition shadow"
                    >
                      Svara & Rätta
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
