import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  FolderKanban,
  Github,
  Lock,
  Rocket,
  Sparkles,
  Target
} from 'lucide-react';
import { Language } from '../../i18n/translations';

interface ProjectHubProps {
  language: Language;
  completedProjectIds: string[];
  onCompleteProject: (projectId: string) => void;
  onOpenPlayground: () => void;
}

const PROJECTS = [
  {
    id: 'portfolio-studio',
    track: 'HTML5 + CSS3',
    titleSv: 'Portfolio Studio',
    titleEn: 'Portfolio Studio',
    descSv: 'Bygg en responsiv portfolio med semantisk struktur, projektkort och tydliga kontaktvägar.',
    descEn: 'Build a responsive portfolio with semantic structure, project cards, and clear contact paths.',
    skills: ['Semantic HTML', 'CSS Grid', 'Responsive UI'],
    color: 'orange',
    level: 'Foundation'
  },
  {
    id: 'dashboard-lab',
    track: 'CSS3 + JavaScript',
    titleSv: 'Dashboard Lab',
    titleEn: 'Dashboard Lab',
    descSv: 'Skapa ett interaktivt dashboard med filter, statistik och visuella states för riktiga användarflöden.',
    descEn: 'Create an interactive dashboard with filters, metrics, and visual states for real user workflows.',
    skills: ['Flexbox', 'DOM Events', 'Data UI'],
    color: 'sky',
    level: 'Applied'
  },
  {
    id: 'launch-page',
    track: 'HTML5 + CSS3 + JS ES6+',
    titleSv: 'Launch Page',
    titleEn: 'Launch Page',
    descSv: 'Leverera en komplett produktlansering med formulärvalidering, mobil layout och micro-interactions.',
    descEn: 'Ship a complete product launch page with form validation, mobile layout, and micro-interactions.',
    skills: ['Forms', 'Validation', 'ES6+'],
    color: 'amber',
    level: 'Capstone'
  },
  {
    id: 'academy-home',
    track: 'HTML5 + CSS3 + JS ES6+',
    titleSv: 'Academy Home',
    titleEn: 'Academy Home',
    descSv: 'Återskapa en premium startsida för en utbildningsplattform med navigation, kurskort och tydliga CTA-flöden.',
    descEn: 'Recreate a premium education platform home with navigation, course cards, and clear CTA flows.',
    skills: ['Component UI', 'Responsive Layout', 'UI States'],
    color: 'emerald',
    level: 'Portfolio'
  }
];

export const ProjectHub: React.FC<ProjectHubProps> = ({
  language,
  completedProjectIds,
  onCompleteProject,
  onOpenPlayground
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const selectedProject = PROJECTS.find(project => project.id === selectedProjectId) || PROJECTS[0];
  const completedCount = PROJECTS.filter(project => completedProjectIds.includes(project.id)).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-12 animate-in fade-in duration-300">
      <section className="premium-panel relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-orange-200">
              <Rocket className="h-3.5 w-3.5" />
              {language === 'sv' ? 'Färdiga projekt' : 'Finished projects'}
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {language === 'sv' ? 'Gör något som kan visas upp.' : 'Build something worth showing.'}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              {language === 'sv' ? 'Projekt är nästa steg efter lektionerna: tydliga mål, riktiga produktbeslut och en färdig yta för din portfolio.' : 'Projects are the step after lessons: clear goals, real product decisions, and a finished surface for your portfolio.'}
            </p>
          </div>
          <div className="glass-card min-w-[210px] rounded-2xl p-4">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
              <span>{language === 'sv' ? 'Portfolio readiness' : 'Portfolio readiness'}</span>
              <Target className="h-4 w-4 text-emerald-300" />
            </div>
            <div className="text-2xl font-black text-white">{completedCount}/{PROJECTS.length}</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400" style={{ width: `${(completedCount / PROJECTS.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-3">
          {PROJECTS.map(project => {
            const completed = completedProjectIds.includes(project.id);
            const selected = selectedProject.id === project.id;
            const colorClass = project.color === 'sky' ? 'border-sky-400/40' : project.color === 'amber' ? 'border-amber-400/40' : 'border-orange-400/40';
            return (
              <button key={project.id} onClick={() => setSelectedProjectId(project.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selected ? `${colorClass} bg-white/[0.07] shadow-lg` : 'border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'}`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-orange-300">
                    {completed ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <FolderKanban className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{project.level}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{project.track}</span>
                    </div>
                    <h3 className="font-bold text-white">{language === 'sv' ? project.titleSv : project.titleEn}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{language === 'sv' ? project.descSv : project.descEn}</p>
                  </div>
                  <ArrowRight className={`mt-1 h-4 w-4 shrink-0 ${selected ? 'text-orange-300' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        <aside className="premium-panel rounded-[24px] p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300"><Sparkles className="h-3.5 w-3.5" /> {selectedProject.level}</div>
              <h3 className="text-xl font-black text-white">{language === 'sv' ? selectedProject.titleSv : selectedProject.titleEn}</h3>
            </div>
            <Code2 className="h-5 w-5 text-sky-300" />
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="font-bold text-slate-200">{language === 'sv' ? 'Lär dig genom projektet' : 'Learn through the project'}</p>
            <p className="text-xs leading-relaxed text-slate-400">{language === 'sv' ? 'Följ stegen från struktur till publicering och bygg varje del i arbetsstudion.' : 'Follow the steps from structure to publishing and build each part in the work studio.'}</p>
            <div className="space-y-2">
              {[
                language === 'sv' ? 'Strukturera en tydlig användarresa' : 'Define a clear user journey',
                language === 'sv' ? 'Bygg responsivt från mobil och uppåt' : 'Build responsively from mobile up',
                language === 'sv' ? 'Testa states och interaktioner' : 'Test states and interactions',
                language === 'sv' ? 'Publicera och dokumentera projektet' : 'Publish and document the project'
              ].map(item => <div key={item} className="flex items-center gap-2 text-xs text-slate-400"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />{item}</div>)}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.skills.map(skill => <span key={skill} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-300">{skill}</span>)}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={onOpenPlayground} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 px-4 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-orange-500/20"><Code2 className="h-3.5 w-3.5" />{language === 'sv' ? 'Öppna arbetsyta' : 'Open workspace'}</button>
            <button onClick={() => onCompleteProject(selectedProject.id)} className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-200 hover:bg-emerald-500/20"><CheckCircle2 className="h-3.5 w-3.5" />{completedProjectIds.includes(selectedProject.id) ? (language === 'sv' ? 'Projekt klart' : 'Project complete') : (language === 'sv' ? 'Markera klart' : 'Mark complete')}</button>
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] text-slate-500"><Github className="h-3.5 w-3.5" /> {language === 'sv' ? 'Redo för portfolio och GitHub' : 'Ready for portfolio and GitHub'} <ExternalLink className="ml-auto h-3 w-3" /></div>
        </aside>
      </div>

      <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs leading-relaxed text-sky-100/80">
        <Lock className="mr-2 inline h-3.5 w-3.5 text-sky-300" />
        {language === 'sv' ? 'Projektstatus sparas lokalt i din profil. Nästa steg är att koppla projekten till en backend och riktig inlämning.' : 'Project status is stored locally in your profile. The next step is connecting projects to a backend and real submissions.'}
      </div>
    </div>
  );
};
