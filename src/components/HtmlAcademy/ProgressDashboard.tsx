import React, { useState } from 'react';
import { 
  Award, 
  Zap, 
  Code2, 
  BookOpen, 
  Trophy, 
  Palette, 
  Terminal,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  BarChart3,
  Radar as RadarIcon,
  PieChart as PieChartIcon,
  Flame,
  ArrowUpRight,
  FolderKanban
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area
} from 'recharts';
import { UserHtmlProgress, WebTrack } from '../../types/html';
import { getLocalizedCurriculum } from '../../utils/localizedCurriculum';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface ProgressDashboardProps {
  userProgress: UserHtmlProgress;
  onSelectExercise: (track: WebTrack, levelId: number, exerciseId: string) => void;
  onOpenCertificate?: () => void;
  language?: Language;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  language?: Language;
}

const CustomBarTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, language }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b1120] p-3.5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-md text-xs space-y-1.5 min-w-[170px]">
        <p className="font-bold text-slate-100 border-b border-white/10 pb-1 flex items-center justify-between">
          <span>{label}</span>
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-mono font-bold text-slate-100">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomRadarTooltip: React.FC<CustomTooltipProps> = ({ active, payload, language }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0b1120] p-3.5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-md text-xs space-y-1 min-w-[160px]">
        <p className="font-bold text-slate-100 border-b border-white/10 pb-1">{data.skill}</p>
        <div className="flex justify-between items-center pt-0.5">
          <span className="text-slate-400">{language === 'sv' ? 'Mästerskap:' : 'Mastery:'}</span>
          <span className="font-mono font-bold text-amber-400">{data.score}%</span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-400">
          <span>{language === 'sv' ? 'Klara övningar:' : 'Completed:'}</span>
          <span className="font-mono text-slate-200">{data.completed}/{data.total}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  userProgress,
  onSelectExercise,
  onOpenCertificate,
  language = 'sv'
}) => {
  const t = TRANSLATIONS[language];
  const [chartView, setChartView] = useState<'levels' | 'skills' | 'overview'>('overview');

  const htmlCurriculum = getLocalizedCurriculum(language, 'html');
  const cssCurriculum = getLocalizedCurriculum(language, 'css');
  const jsCurriculum = getLocalizedCurriculum(language, 'js');

  const totalHtmlExercises = htmlCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const totalCssExercises = cssCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const totalJsExercises = jsCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const totalAllExercises = totalHtmlExercises + totalCssExercises + totalJsExercises;

  const htmlDoneCount = htmlCurriculum.flatMap(l => l.exercises).filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
  const cssDoneCount = cssCurriculum.flatMap(l => l.exercises).filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
  const jsDoneCount = jsCurriculum.flatMap(l => l.exercises).filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
  const completedTotal = htmlDoneCount + cssDoneCount + jsDoneCount;

  const htmlPercent = Math.round((htmlDoneCount / (totalHtmlExercises || 1)) * 100);
  const cssPercent = Math.round((cssDoneCount / (totalCssExercises || 1)) * 100);
  const jsPercent = Math.round((jsDoneCount / (totalJsExercises || 1)) * 100);
  const totalPercent = Math.round((completedTotal / (totalAllExercises || 1)) * 100);

  const isFullyCompleted = completedTotal >= totalAllExercises;

  // Recharts Data 1: Track Breakdown Pie/Donut Data
  const pieData = [
    { name: 'HTML5', value: htmlDoneCount, total: totalHtmlExercises, percent: htmlPercent, color: '#f97316' },
    { name: 'CSS3', value: cssDoneCount, total: totalCssExercises, percent: cssPercent, color: '#0ea5e9' },
    { name: 'JS ES6+', value: jsDoneCount, total: totalJsExercises, percent: jsPercent, color: '#f59e0b' }
  ];

  // Recharts Data 2: Level-by-Level BarChart Data
  const levelBarData = [
    ...htmlCurriculum.map(lvl => {
      const done = lvl.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
      return {
        name: `HTML L${lvl.id}`,
        track: 'html',
        levelId: lvl.id,
        levelTitle: lvl.levelTitle,
        Klara: done,
        Kvar: lvl.exercises.length - done,
        Total: lvl.exercises.length,
        Procent: Math.round((done / lvl.exercises.length) * 100),
        firstExerciseId: lvl.exercises[0]?.id || 'html-1-1'
      };
    }),
    ...cssCurriculum.map(lvl => {
      const done = lvl.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
      return {
        name: `CSS L${lvl.id}`,
        track: 'css',
        levelId: lvl.id,
        levelTitle: lvl.levelTitle,
        Klara: done,
        Kvar: lvl.exercises.length - done,
        Total: lvl.exercises.length,
        Procent: Math.round((done / lvl.exercises.length) * 100),
        firstExerciseId: lvl.exercises[0]?.id || 'css-1-1'
      };
    }),
    ...jsCurriculum.map(lvl => {
      const done = lvl.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
      return {
        name: `JS L${lvl.id}`,
        track: 'js',
        levelId: lvl.id,
        levelTitle: lvl.levelTitle,
        Klara: done,
        Kvar: lvl.exercises.length - done,
        Total: lvl.exercises.length,
        Procent: Math.round((done / lvl.exercises.length) * 100),
        firstExerciseId: lvl.exercises[0]?.id || 'js-1-1'
      };
    })
  ];

  // Recharts Data 3: Skills Domain Radar Matrix
  const skillsData = [
    {
      skill: language === 'sv' ? 'Semantisk HTML' : 'Semantic HTML',
      score: Math.min(100, Math.round(((htmlCurriculum[0]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + 
             (htmlCurriculum[1]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0)) / 4 * 100)),
      completed: (htmlCurriculum[0]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + (htmlCurriculum[1]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0),
      total: (htmlCurriculum[0]?.exercises.length || 2) + (htmlCurriculum[1]?.exercises.length || 2),
      fullMark: 100
    },
    {
      skill: language === 'sv' ? 'Formulär & Tabeller' : 'Forms & Tables',
      score: Math.min(100, Math.round(((htmlCurriculum[2]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + 
             (htmlCurriculum[3]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0)) / 4 * 100)),
      completed: (htmlCurriculum[2]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + (htmlCurriculum[3]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0),
      total: (htmlCurriculum[2]?.exercises.length || 2) + (htmlCurriculum[3]?.exercises.length || 2),
      fullMark: 100
    },
    {
      skill: language === 'sv' ? 'Flexbox & Grid' : 'Flexbox & Grid',
      score: Math.min(100, Math.round(((cssCurriculum[0]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + 
             (cssCurriculum[1]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0)) / 4 * 100)),
      completed: (cssCurriculum[0]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + (cssCurriculum[1]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0),
      total: (cssCurriculum[0]?.exercises.length || 2) + (cssCurriculum[1]?.exercises.length || 2),
      fullMark: 100
    },
    {
      skill: language === 'sv' ? 'Responsiv Design' : 'Responsive UI',
      score: Math.min(100, Math.round(((cssCurriculum[2]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + 
             (cssCurriculum[3]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0)) / 4 * 100)),
      completed: (cssCurriculum[2]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + (cssCurriculum[3]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0),
      total: (cssCurriculum[2]?.exercises.length || 2) + (cssCurriculum[3]?.exercises.length || 2),
      fullMark: 100
    },
    {
      skill: language === 'sv' ? 'DOM & Händelser' : 'DOM & Events',
      score: Math.min(100, Math.round(((jsCurriculum[0]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + 
             (jsCurriculum[1]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0)) / 4 * 100)),
      completed: (jsCurriculum[0]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + (jsCurriculum[1]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0),
      total: (jsCurriculum[0]?.exercises.length || 2) + (jsCurriculum[1]?.exercises.length || 2),
      fullMark: 100
    },
    {
      skill: language === 'sv' ? 'Async & ES6+ Logik' : 'Async & ES6 Logic',
      score: Math.min(100, Math.round(((jsCurriculum[2]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + 
             (jsCurriculum[3]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0)) / 4 * 100)),
      completed: (jsCurriculum[2]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0) + (jsCurriculum[3]?.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length || 0),
      total: (jsCurriculum[2]?.exercises.length || 2) + (jsCurriculum[3]?.exercises.length || 2),
      fullMark: 100
    }
  ];

  // Helper to find the next incomplete exercise for a track
  const getNextIncompleteExercise = (track: WebTrack) => {
    const curriculum = track === 'css' ? cssCurriculum : track === 'js' ? jsCurriculum : htmlCurriculum;
    for (const lvl of curriculum) {
      for (const ex of lvl.exercises) {
        if (!userProgress.completedExerciseIds.includes(ex.id)) {
          return { track, levelId: lvl.id, exerciseId: ex.id, title: ex.title };
        }
      }
    }
    const firstLevel = curriculum[0];
    return { track, levelId: firstLevel.id, exerciseId: firstLevel.exercises[0].id, title: firstLevel.exercises[0].title };
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Overview & XP Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP */}
        <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition" />
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'sv' ? 'Samlade Poäng' : 'Total XP Earned'}
            </p>
            <h3 className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{userProgress.totalXp} XP</h3>
            <span className="text-[10px] text-amber-400 font-semibold font-mono">
              {userProgress.totalXp > 500 ? 'Level 3 Dev' : userProgress.totalXp > 200 ? 'Level 2 Dev' : 'Junior Dev'}
            </span>
          </div>
        </div>

        {/* HTML Progress */}
        <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/10 transition" />
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30 shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">HTML5 Mastery</p>
            <h3 className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{htmlPercent}%</h3>
            <span className="text-[10px] text-orange-300 font-semibold font-mono">
              {htmlDoneCount} / {totalHtmlExercises} {language === 'sv' ? 'klara' : 'done'}
            </span>
          </div>
        </div>

        {/* CSS Progress */}
        <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/10 transition" />
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 border border-sky-500/30 shrink-0">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">CSS3 Styling</p>
            <h3 className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{cssPercent}%</h3>
            <span className="text-[10px] text-sky-300 font-semibold font-mono">
              {cssDoneCount} / {totalCssExercises} {language === 'sv' ? 'klara' : 'done'}
            </span>
          </div>
        </div>

        {/* JS Progress */}
        <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition" />
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">JS ES6+ Logic</p>
            <h3 className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{jsPercent}%</h3>
            <span className="text-[10px] text-amber-300 font-semibold font-mono">
              {jsDoneCount} / {totalJsExercises} {language === 'sv' ? 'klara' : 'done'}
            </span>
          </div>
        </div>

        {/* Portfolio Projects */}
        <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition" />
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{language === 'sv' ? 'Portfolio-projekt' : 'Portfolio projects'}</p>
            <h3 className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{userProgress.completedProjectIds?.length || 0} / 3</h3>
            <span className="text-[10px] text-emerald-300 font-semibold font-mono">{language === 'sv' ? 'projekt klara' : 'projects complete'}</span>
          </div>
        </div>
      </div>

      {/* 2. Official Certificate Hero Banner */}
      <div className="bg-gradient-to-r from-[#17132a] via-[#101b33] to-[#1f160e] p-6 sm:p-7 rounded-3xl border border-[#d4af37]/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {language === 'sv' ? 'OFFICIELLT DIPLOM' : 'OFFICIAL DIPLOMA'}
              </span>
              {isFullyCompleted ? (
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse">
                  {language === 'sv' ? 'LÅST UPP 🎉' : 'UNLOCKED 🎉'}
                </span>
              ) : (
                <span className="text-[10px] font-mono font-medium text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {completedTotal}/{totalAllExercises} {language === 'sv' ? 'moment klara' : 'modules completed'}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-1">
              {language === 'sv' ? 'Fullstack Frontend Certifikat & PDF Diplom' : 'Fullstack Frontend Certificate & PDF Diploma'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
              {language === 'sv' 
                ? 'Generera, signera och exportera ditt officiella akademiska certifikat i A4-landskap eller högupplöst PNG.' 
                : 'Generate, sign, and export your official academic certificate in landscape A4 PDF or high-res PNG.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCertificate}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center gap-2 shrink-0 relative z-10"
        >
          <Award className="w-4 h-4" />
          <span>{isFullyCompleted ? t.claimCertificate : t.previewCertificate}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Recharts Visual Analytics Section */}
      <div className="bg-[#070b16] p-6 rounded-3xl border border-white/10 shadow-xl space-y-6">
        {/* Section Header with View Toggles */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-400" />
              <span>{language === 'sv' ? 'Visuell Framstegsanalys (Recharts)' : 'Visual Learning Analytics (Recharts)'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'sv' 
                ? 'Realtidsgrafik över genomförda moduler, nivåer och tekniska färdigheter' 
                : 'Real-time interactive metrics across tracks, levels, and core web skills'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => setChartView('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                chartView === 'overview'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? 'Översikt' : 'Overview'}</span>
            </button>
            <button
              onClick={() => setChartView('levels')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                chartView === 'levels'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? 'Nivåer' : 'Levels'}</span>
            </button>
            <button
              onClick={() => setChartView('skills')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                chartView === 'skills'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? 'Kompetensradar' : 'Skills Radar'}</span>
            </button>
          </div>
        </div>

        {/* View 1: Overview Donut & Linear Mastery */}
        {chartView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Recharts Donut Pie Chart */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                {language === 'sv' ? 'Modulfördelning' : 'Module Completion'}
              </h4>
              <div className="w-full h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#070b16" strokeWidth={3} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0b1120] p-3 rounded-xl border border-white/15 text-xs space-y-1 shadow-2xl">
                              <p className="font-bold text-slate-100 flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
                                {data.name}
                              </p>
                              <p className="text-slate-400">
                                {data.value} / {data.total} {language === 'sv' ? 'klara' : 'done'} ({data.percent}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold font-mono text-slate-100">{totalPercent}%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{language === 'sv' ? 'Totalt' : 'Total'}</span>
                </div>
              </div>

              {/* Legend row */}
              <div className="flex items-center justify-center gap-4 text-xs mt-2">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>HTML ({htmlPercent}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>CSS ({cssPercent}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>JS ({jsPercent}%)</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Track Progress Bars & Quick Jump */}
            <div className="lg:col-span-7 space-y-4">
              {/* HTML Track */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:border-orange-500/30 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">HTML5 Semantic Web Architecture</h4>
                      <p className="text-[11px] text-slate-400">
                        {htmlDoneCount} av {totalHtmlExercises} övningar slutförda
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-orange-400">{htmlPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${htmlPercent}%` }}
                  />
                </div>
              </div>

              {/* CSS Track */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:border-sky-500/30 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">CSS3 Flexbox, Grid & Responsive Layouts</h4>
                      <p className="text-[11px] text-slate-400">
                        {cssDoneCount} av {totalCssExercises} övningar slutförda
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-sky-400">{cssPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${cssPercent}%` }}
                  />
                </div>
              </div>

              {/* JS Track */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:border-amber-500/30 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">JavaScript ES6+ & DOM Interactivity</h4>
                      <p className="text-[11px] text-slate-400">
                        {jsDoneCount} av {totalJsExercises} övningar slutförda
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-amber-400">{jsPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${jsPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Recharts Level-by-Level BarChart */}
        {chartView === 'levels' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>{language === 'sv' ? 'Slutförda övningar per kursnivå:' : 'Completed exercises per curriculum level:'}</span>
              <span className="font-mono text-sky-400">12 {language === 'sv' ? 'nivåer totalt' : 'total levels'}</span>
            </div>

            <div className="w-full h-72 bg-white/5 p-3 rounded-2xl border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelBarData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#334155' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                    axisLine={{ stroke: '#334155' }}
                    tickLine={false}
                    domain={[0, 4]}
                  />
                  <Tooltip content={<CustomBarTooltip language={language} />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px', fontSize: '11px', color: '#94a3b8' }} 
                  />
                  <Bar dataKey="Klara" name={language === 'sv' ? 'Klara' : 'Completed'} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Kvar" name={language === 'sv' ? 'Kvar' : 'Remaining'} fill="#334155" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* View 3: Recharts Radar Skills Matrix */}
        {chartView === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 w-full h-80 bg-white/5 p-2 rounded-2xl border border-white/5 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillsData}>
                  <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#64748b', fontSize: 9 }}
                  />
                  <Radar
                    name={language === 'sv' ? 'Mästerskap %' : 'Mastery %'}
                    dataKey="score"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.4}
                  />
                  <Tooltip content={<CustomRadarTooltip language={language} />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                {language === 'sv' ? 'Färdighetsanalys' : 'Proficiency Analysis'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'sv'
                  ? 'Kompetensradarn mäter din praktiska förståelse baserat på godkända testfall och lösta övningar inom respektive teknologidomän.'
                  : 'The skills radar maps your hands-on mastery based on passing automated test cases across key frontend engineering domains.'}
              </p>

              <div className="space-y-2 pt-2">
                {skillsData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-300 font-medium">{item.skill}</span>
                    <span className={`font-mono font-bold ${item.score === 100 ? 'text-emerald-400' : item.score > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                      {item.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Continue Learning Quick-Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* HTML Resume Card */}
        {(() => {
          const next = getNextIncompleteExercise('html');
          return (
            <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-orange-500/40 transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    HTML5
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{htmlPercent}%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-orange-300 transition">
                  {htmlPercent === 100 ? (language === 'sv' ? '✓ Alla HTML-övningar klara!' : '✓ HTML Track Mastered!') : next.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {htmlPercent === 100 
                    ? (language === 'sv' ? 'Du har bemästrat all semantisk webb.' : 'You have mastered all HTML concepts.') 
                    : (language === 'sv' ? `Nivå ${next.levelId} • Fortsätt öva` : `Level ${next.levelId} • Keep going`)}
                </p>
              </div>

              <button
                onClick={() => onSelectExercise(next.track, next.levelId, next.exerciseId)}
                className="w-full py-2.5 rounded-xl bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-slate-950 border border-orange-500/30 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>{htmlPercent === 100 ? (language === 'sv' ? 'Repetera HTML' : 'Review HTML') : (language === 'sv' ? 'Fortsätt HTML' : 'Resume HTML')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })()}

        {/* CSS Resume Card */}
        {(() => {
          const next = getNextIncompleteExercise('css');
          return (
            <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    CSS3
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{cssPercent}%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition">
                  {cssPercent === 100 ? (language === 'sv' ? '✓ Alla CSS-övningar klara!' : '✓ CSS Track Mastered!') : next.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {cssPercent === 100 
                    ? (language === 'sv' ? 'Du behärskar flexbox, grid och animationer.' : 'Master of layout and styling.') 
                    : (language === 'sv' ? `Nivå ${next.levelId} • Fortsätt öva` : `Level ${next.levelId} • Keep going`)}
                </p>
              </div>

              <button
                onClick={() => onSelectExercise(next.track, next.levelId, next.exerciseId)}
                className="w-full py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 border border-sky-500/30 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>{cssPercent === 100 ? (language === 'sv' ? 'Repetera CSS' : 'Review CSS') : (language === 'sv' ? 'Fortsätt CSS' : 'Resume CSS')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })()}

        {/* JS Resume Card */}
        {(() => {
          const next = getNextIncompleteExercise('js');
          return (
            <div className="bg-[#070b16] p-5 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    JS ES6+
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{jsPercent}%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition">
                  {jsPercent === 100 ? (language === 'sv' ? '✓ Alla JS-övningar klara!' : '✓ JS Track Mastered!') : next.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {jsPercent === 100 
                    ? (language === 'sv' ? 'Du behärskar DOM, event listeners och async.' : 'Master of JS and async logic.') 
                    : (language === 'sv' ? `Nivå ${next.levelId} • Fortsätt öva` : `Level ${next.levelId} • Keep going`)}
                </p>
              </div>

              <button
                onClick={() => onSelectExercise(next.track, next.levelId, next.exerciseId)}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>{jsPercent === 100 ? (language === 'sv' ? 'Repetera JS' : 'Review JS') : (language === 'sv' ? 'Fortsätt JS' : 'Resume JS')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })()}
      </div>

      {/* 5. Badges & Academic Honors Grid */}
      <div className="bg-[#070b16] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>{language === 'sv' ? 'Utmärkelser & Kursmärken' : 'Badges & Course Honors'}</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {[...htmlCurriculum, ...cssCurriculum, ...jsCurriculum].filter(lvl => 
              lvl.exercises.every(e => userProgress.completedExerciseIds.includes(e.id))
            ).length} / 12 {language === 'sv' ? 'upplåsta' : 'unlocked'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...htmlCurriculum, ...cssCurriculum, ...jsCurriculum].map((lvl) => {
            const isUnlocked = lvl.exercises.every(e => userProgress.completedExerciseIds.includes(e.id));
            const isCss = lvl.track === 'css';
            const isJs = lvl.track === 'js';

            let badgeCardStyle = 'bg-white/5 border-white/5 opacity-40 text-slate-400';
            let emoji = '🔒';

            if (isUnlocked) {
              if (isJs) {
                badgeCardStyle = 'bg-amber-950/30 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/20';
                emoji = '⚡';
              } else if (isCss) {
                badgeCardStyle = 'bg-sky-950/30 border-sky-500/40 text-sky-300 ring-1 ring-sky-500/20';
                emoji = '🎨';
              } else {
                badgeCardStyle = 'bg-orange-950/30 border-orange-500/40 text-orange-300 ring-1 ring-orange-500/20';
                emoji = '🏆';
              }
            }

            return (
              <div
                key={`${lvl.track || 'html'}-${lvl.id}`}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition ${badgeCardStyle}`}
              >
                <div className="text-2xl">
                  {emoji}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold truncate max-w-[120px]">{lvl.badgeName}</h4>
                  <p className="text-[9px] text-slate-400 uppercase font-mono mt-0.5">
                    {isJs ? 'JS' : isCss ? 'CSS' : 'HTML'} {language === 'sv' ? 'N' : 'L'}{lvl.id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
