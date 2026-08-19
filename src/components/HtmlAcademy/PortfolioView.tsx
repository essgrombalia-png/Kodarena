import React from 'react';
import { Award, Github, Globe, Linkedin, MapPin, User, Zap } from 'lucide-react';
import { Language } from '../../i18n/translations';
import { UserHtmlProgress } from '../../types/html';

interface PortfolioAccount {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  avatarUrl?: string;
}

interface PortfolioViewProps {
  account: PortfolioAccount;
  progress: UserHtmlProgress;
  language: Language;
  onEditProfile: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ account, progress, language, onEditProfile }) => {
  const completedProjects = progress.completedProjectIds?.length || 0;
  const completedLessons = progress.completedExerciseIds.length;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-12 animate-in fade-in duration-300">
      <section className="premium-panel relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[28px] border border-white/15 bg-white/10 text-sky-300 shadow-xl">
            {account.avatarUrl ? <img src={account.avatarUrl} alt={account.name} className="h-full w-full object-cover" /> : <User className="h-10 w-10" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">{language === 'sv' ? 'Student portfolio' : 'Student portfolio'}</div>
            <h1 className="text-3xl font-black text-white">{account.name}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">{account.bio || (language === 'sv' ? 'En frontendutvecklare under utveckling.' : 'A frontend developer in progress.')}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
              {account.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-sky-300" />{account.location}</span>}
              {account.website && <a href={account.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Globe className="h-3.5 w-3.5" />Website</a>}
              {account.github && <a href={account.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Github className="h-3.5 w-3.5" />GitHub</a>}
              {account.linkedin && <a href={account.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Linkedin className="h-3.5 w-3.5" />LinkedIn</a>}
            </div>
          </div>
          <button onClick={onEditProfile} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10">{language === 'sv' ? 'Redigera profil' : 'Edit profile'}</button>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-5"><Zap className="h-5 w-5 text-amber-300" /><div className="mt-3 text-2xl font-black text-white">{progress.totalXp}</div><div className="text-xs text-slate-500">XP</div></div>
        <div className="glass-card rounded-2xl p-5"><Award className="h-5 w-5 text-emerald-300" /><div className="mt-3 text-2xl font-black text-white">{completedLessons}</div><div className="text-xs text-slate-500">{language === 'sv' ? 'lektioner klara' : 'lessons complete'}</div></div>
        <div className="glass-card rounded-2xl p-5"><Github className="h-5 w-5 text-sky-300" /><div className="mt-3 text-2xl font-black text-white">{completedProjects}</div><div className="text-xs text-slate-500">{language === 'sv' ? 'projekt klara' : 'projects complete'}</div></div>
      </div>

      <section className="premium-panel rounded-[24px] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between"><div><div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">KODARENA</div><h2 className="mt-1 text-xl font-black text-white">{language === 'sv' ? 'Färdigheter och framsteg' : 'Skills and progress'}</h2></div><span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">{progress.streakDays}d streak</span></div>
        <div className="flex flex-wrap gap-2"><span className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-200">HTML5</span><span className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-200">CSS3</span><span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-200">JavaScript ES6+</span><span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-200">Responsive UI</span></div>
      </section>
    </div>
  );
};
