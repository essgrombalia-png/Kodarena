import React from 'react';
import { Award, Zap, CheckCircle2, Shield, Flame, BookOpen, RotateCcw } from 'lucide-react';
import { UserPythonProgress } from '../../types/python';
import { pythonCurriculum } from '../../data/pythonCurriculum';
import { pythonQuizzes } from '../../data/pythonQuizzes';

interface ProgressDashboardProps {
  progress: UserPythonProgress;
  onResetProgress: () => void;
  onSelectExercise: (exerciseId: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onResetProgress,
  onSelectExercise,
}) => {
  const totalExercises = pythonCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const completedCount = progress.completedExerciseIds.length;
  const progressPercent = Math.round((completedCount / totalExercises) * 100);

  const xpNextLevel = progress.level * 100;
  const xpCurrentLevel = progress.totalXp % 100;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>NIVÅ & ERFARENHET</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">Nivå {progress.level}</div>
          <div className="text-xs text-slate-400 font-mono">{progress.totalXp} Total XP</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${xpCurrentLevel}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>KLARADE ÖVNINGAR</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {completedCount} / {totalExercises}
          </div>
          <div className="text-xs text-slate-400 font-mono">{progressPercent}% avklarat</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>QUIZ & KLURINGAR</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {progress.solvedQuizIds.length} / {pythonQuizzes.length}
          </div>
          <div className="text-xs text-slate-400">Lösta teorifrågor</div>
        </div>

        <div className="p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>AKTIV SVIT</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">{progress.streakDays} dagar</div>
          <div className="text-xs text-slate-400">Håll igång kodandet varje dag!</div>
        </div>
      </div>

      {/* Badges Matrix */}
      <div className="p-6 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-5">
        <div>
          <h3 className="text-lg font-bold font-sans text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span>Prestationsmärken & Utmärkelser</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Lås upp alla märken genom att klara respektive nivå!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {pythonCurriculum.map(lvl => {
            const isLevelUnlocked = lvl.exercises.every(e => progress.completedExerciseIds.includes(e.id));
            const completedInLevel = lvl.exercises.filter(e => progress.completedExerciseIds.includes(e.id)).length;

            return (
              <div
                key={lvl.id}
                className={`p-4 rounded-2xl border transition flex flex-col items-center text-center space-y-2 ${
                  isLevelUnlocked
                    ? 'bg-gradient-to-b from-indigo-950/40 to-[#080d1a] border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-[#050810] border-white/5 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                  isLevelUnlocked ? 'bg-amber-500/20 border border-amber-500/40' : 'bg-slate-800'
                }`}>
                  {isLevelUnlocked ? '🏆' : '🔒'}
                </div>
                <div className="font-bold text-xs text-slate-100">{lvl.badgeName}</div>
                <div className="text-[11px] text-slate-400">{lvl.badgeDesc}</div>
                <div className="text-[10px] font-mono text-cyan-400 pt-1">
                  {completedInLevel}/{lvl.exercises.length} övningar
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Checklist */}
      <div className="p-6 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold font-sans text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Kursöversikt: Från 0 till Proffs</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Klicka på valfri övning för att hoppa direkt till den.</p>
        </div>

        <div className="space-y-4">
          {pythonCurriculum.map(lvl => (
            <div key={lvl.id} className="space-y-2 bg-[#050810] p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-200 font-sans">{lvl.levelTitle}</h4>
                  <p className="text-xs text-slate-400">{lvl.levelSubtitle}</p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {lvl.exercises.filter(e => progress.completedExerciseIds.includes(e.id)).length} / {lvl.exercises.length} klara
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                {lvl.exercises.map(ex => {
                  const done = progress.completedExerciseIds.includes(ex.id);
                  return (
                    <button
                      key={ex.id}
                      onClick={() => onSelectExercise(ex.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition flex items-center justify-between ${
                        done
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-[#080d1a] border-white/10 hover:border-cyan-500/40 text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2">{ex.title}</span>
                      {done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-slate-500 shrink-0">+{ex.xpReward} XP</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone: Reset */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 text-xs text-red-400/80 hover:text-red-300 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Återställ mina Python-framsteg
        </button>
      </div>
    </div>
  );
};
