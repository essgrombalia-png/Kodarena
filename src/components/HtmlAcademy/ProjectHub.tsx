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
  Target,
  Clock3,
  Layers3,
  BadgeCheck,
  ArrowUpRight
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
    level: 'Foundation',
    duration: '2-3 h',
    outcomeSv: 'En portfolio-startsida som fungerar på mobil, tablet och desktop.',
    outcomeEn: 'A portfolio landing page that works across mobile, tablet, and desktop.',
    steps: ['Wireframe the page', 'Build semantic sections', 'Polish responsive states', 'Publish the result']
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
    level: 'Applied',
    duration: '3-4 h',
    outcomeSv: 'Ett dashboard där användaren kan filtrera, förstå och agera på data.',
    outcomeEn: 'A dashboard where users can filter, understand, and act on data.',
    steps: ['Model the data', 'Design the dashboard shell', 'Add filters and states', 'Test the user flow']
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
    level: 'Capstone',
    duration: '4-5 h',
    outcomeSv: 'En komplett lanseringssida med validerat formulär och tydlig konverteringsväg.',
    outcomeEn: 'A complete launch page with validated forms and a clear conversion path.',
    steps: ['Shape the product story', 'Build the responsive layout', 'Validate the form', 'Ship a polished release']
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
    level: 'Portfolio',
    duration: '5-6 h',
    outcomeSv: 'En premium utbildningsstartsida med navigation, kurskort och tydliga CTA-flöden.',
    outcomeEn: 'A premium academy home with navigation, course cards, and clear CTA flows.',
    steps: ['Map the learning journey', 'Build reusable card patterns', 'Create responsive navigation', 'Document the design system']
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
  const selectedCompleted = completedProjectIds.includes(selectedProject.id);
  const selectedIndex = PROJECTS.findIndex(project => project.id === selectedProject.id);
  const accentGlow = selectedProject.color === 'sky'
    ? 'bg-sky-400/15'
    : selectedProject.color === 'amber'
    ? 'bg-amber-400/15'
    : selectedProject.color === 'emerald'
    ? 'bg-emerald-400/15'
    : 'bg-orange-400/15';

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-12 animate-in fade-in duration-300">
      <section className="premium-panel relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div className={`absolute -right-20 -top-24 h-72 w-72 rounded-full ${accentGlow} blur-3xl`} />
        <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-orange-200">
              <Rocket className="h-3.5 w-3.5" />
              {language === 'sv' ? 'Färdiga projekt' : 'Finished projects'}
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {language === 'sv' ? 'Bygg som en produktutvecklare.' : 'Build like a product developer.'}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              {language === 'sv' ? 'Välj ett brief, följ milstolparna och lämna studion med något som faktiskt kan visas upp.' : 'Choose a brief, follow the milestones, and leave the studio with something worth showing.'}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5"><Layers3 className="h-3.5 w-3.5 text-sky-300" /> {PROJECTS.length} briefs</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5"><BadgeCheck className="h-3.5 w-3.5 text-emerald-300" /> Portfolio-ready</span>
            </div>
          </div>
          <div className="glass-card min-w-[230px] rounded-2xl p-4">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
              <span>{language === 'sv' ? 'Portfolio readiness' : 'Portfolio readiness'}</span>
              <Target className="h-4 w-4 text-emerald-300" />
            </div>
            <div className="text-2xl font-black text-white">{completedCount}/{PROJECTS.length}</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400" style={{ width: `${(completedCount / PROJECTS.length) * 100}%` }} />
            </div>
            <div className="mt-2 text-[10px] text-slate-500">{language === 'sv' ? 'projekt publicerade' : 'projects shipped'}</div>
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
              <button key={project.id} onClick={() => setSelectedProjectId(project.id)} className={`group w-full rounded-2xl border p-4 text-left transition ${selected ? `${colorClass} bg-white/[0.07] shadow-lg` : 'border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'}`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-orange-300">
                    {completed ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <FolderKanban className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{project.level}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{project.track}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><Clock3 className="h-3 w-3" />{project.duration}</span>
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
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300"><Sparkles className="h-3.5 w-3.5" /> {selectedProject.level} · {selectedIndex + 1}/{PROJECTS.length}</div>
              <h3 className="text-xl font-black text-white">{language === 'sv' ? selectedProject.titleSv : selectedProject.titleEn}</h3>
            </div>
            {selectedCompleted ? <BadgeCheck className="h-5 w-5 text-emerald-300" /> : <Code2 className="h-5 w-5 text-sky-300" />}
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="font-bold text-slate-200">{language === 'sv' ? 'Lär dig genom projektet' : 'Learn through the project'}</p>
            <p className="text-xs leading-relaxed text-slate-400">{language === 'sv' ? selectedProject.outcomeSv : selectedProject.outcomeEn}</p>
            <div className="space-y-2">
              {selectedProject.steps.map((step, index) => <div key={step} className="flex items-center gap-2 text-xs text-slate-400"><span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-[10px] text-slate-500">{index + 1}</span>{step}</div>)}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.skills.map(skill => <span key={skill} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-300">{skill}</span>)}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={onOpenPlayground} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 px-4 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-orange-500/20"><Code2 className="h-3.5 w-3.5" />{language === 'sv' ? 'Starta projektet' : 'Start project'}<ArrowUpRight className="h-3.5 w-3.5" /></button>
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
