import React, { useState, useEffect, useMemo } from 'react';
import { 
  Code2, 
  BookOpen, 
  Terminal, 
  Sparkles, 
  Award, 
  Flame, 
  Zap, 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  Globe,
  Layout,
  Type,
  ListTree,
  Image,
  Table,
  FileCheck,
  Sliders,
  Palette,
  Smartphone,
  Cpu,
  Languages,
  Target,
  TrendingUp,
  Rocket,
  User,
  Mail,
  ShieldCheck,
  Github,
  Heart,
  FileText,
  Info,
  ExternalLink,
  Camera,
  MapPin,
  Link as LinkIcon,
  Linkedin
} from 'lucide-react';
import { UserHtmlProgress, HtmlLessonLevel, HtmlExercise, WebTrack } from '../../types/html';
import { getLocalizedCurriculum } from '../../utils/localizedCurriculum';
import { LessonView } from './LessonView';
import { PlaygroundView } from './PlaygroundView';
import { ProgressDashboard } from './ProgressDashboard';
import { CertificateView } from './CertificateView';
import { ProjectHub } from './ProjectHub';
import { PortfolioView } from './PortfolioView';
import { Language, TRANSLATIONS } from '../../i18n/translations';

interface AcademyAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  role?: 'admin' | 'student';
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  avatarUrl?: string;
}

interface HtmlAcademyProps {
  onBackToGame?: () => void;
  language?: Language;
  onToggleLanguage?: () => void;
  currentUser?: AcademyAccount | null;
  onAuthChange?: (account: AcademyAccount | null) => void;
}

const STORAGE_KEY = 'nexus_web_academy_progress_v3';
const LANG_STORAGE_KEY = 'nexus_web_academy_lang_v1';
const ACCOUNTS_STORAGE_KEY = 'nexus_academy_accounts_v1';
const ACTIVE_ACCOUNT_STORAGE_KEY = 'nexus_academy_active_account_v1';

function getStoredAccounts(): AcademyAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) as AcademyAccount[] : [];
  } catch {
    return [];
  }
}

function saveStoredAccounts(accounts: AcademyAccount[]) {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {}
}

function getStoredActiveAccount(): AcademyAccount | null {
  try {
    const raw = localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY);
    return raw ? JSON.parse(raw) as AcademyAccount : null;
  } catch {
    return null;
  }
}

function saveStoredActiveAccount(account: AcademyAccount | null) {
  try {
    if (!account) {
      localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY);
      return;
    }
    localStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, JSON.stringify(account));
  } catch {}
}

const INITIAL_PROGRESS: UserHtmlProgress = {
  totalXp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString(),
  activeTrack: 'html',
  completedExerciseIds: [],
  solvedQuizIds: [],
  unlockedBadgeIds: [],
  savedPlaygroundCodes: [],
  completedProjectIds: [],
  activeExerciseId: 'html-1-1'
};

export const HtmlAcademy: React.FC<HtmlAcademyProps> = ({ 
  onBackToGame, 
  language: propLanguage, 
  onToggleLanguage,
  currentUser: propCurrentUser,
  onAuthChange
}) => {
  const [internalLanguage, setInternalLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' || saved === 'sv') return saved;
    } catch {}
    return 'sv';
  });

  const language = propLanguage || internalLanguage;
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<'curriculum' | 'lesson' | 'playground' | 'progress' | 'projects' | 'profile' | 'admin' | 'certificate'>('curriculum');
  const [activeTrack, setActiveTrack] = useState<'all' | 'html' | 'css' | 'js'>('all');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('html-1-1');
  const [selectedTrack, setSelectedTrack] = useState<WebTrack>('html');
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [authError, setAuthError] = useState('');
  const [footerPanel, setFooterPanel] = useState<'privacy' | 'terms' | 'about' | null>(null);
  const [activeProject, setActiveProject] = useState<{ id: string; title: string; code: string } | undefined>();
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', bio: '', location: '', website: '', github: '', linkedin: '', avatarUrl: '' });
  const [localCurrentUser, setLocalCurrentUser] = useState<AcademyAccount | null>(() => getStoredActiveAccount());

  const currentUser = propCurrentUser ?? localCurrentUser;

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        website: currentUser.website || '',
        github: currentUser.github || '',
        linkedin: currentUser.linkedin || '',
        avatarUrl: currentUser.avatarUrl || ''
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      setIsAuthOpen(true);
    }
  }, [currentUser]);

  const updateCurrentUser = (account: AcademyAccount | null) => {
    setLocalCurrentUser(account);
    saveStoredActiveAccount(account);
    if (onAuthChange) onAuthChange(account);
  };

  // Save language preference
  const handleToggleLanguage = () => {
    if (onToggleLanguage) {
      onToggleLanguage();
    } else {
      const nextLang: Language = language === 'sv' ? 'en' : 'sv';
      setInternalLanguage(nextLang);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, nextLang);
      } catch {}
    }
  };

  const handleAuthFieldChange = (field: keyof typeof authForm, value: string) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
    setAuthError('');
  };

  const handleCreateAccount = () => {
    const name = authForm.name.trim();
    const email = authForm.email.trim();
    const password = authForm.password.trim();

    if (!name || !email || !password) {
      setAuthError(language === 'sv' ? 'Fyll i alla fält för att skapa ett konto.' : 'Please complete all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setAuthError(language === 'sv' ? 'Ange en giltig e-postadress.' : 'Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setAuthError(language === 'sv' ? 'Lösenordet måste vara minst 6 tecken.' : 'Password must be at least 6 characters.');
      return;
    }
    if (authForm.confirmPassword && authForm.confirmPassword !== password) {
      setAuthError(language === 'sv' ? 'Lösenorden matchar inte.' : 'Passwords do not match.');
      return;
    }

    const accounts = getStoredAccounts();
    if (accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase())) {
      setAuthError(language === 'sv' ? 'Ett konto med den e-postadressen finns redan.' : 'An account with that email already exists.');
      return;
    }

    const account: AcademyAccount = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      role: 'student'
    };

    const updatedAccounts = [account, ...accounts];
    saveStoredAccounts(updatedAccounts);
    updateCurrentUser(account);
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    setAuthError('');
    setIsAuthOpen(false);
  };

  const handleLogin = () => {
    const email = authForm.email.trim();
    const password = authForm.password.trim();

    if (!email || !password) {
      setAuthError(language === 'sv' ? 'Skriv in e-post och lösenord.' : 'Enter your email and password.');
      return;
    }

    if (email.toLowerCase() === 'admin' && password === 'admin') {
      const adminAccount: AcademyAccount = {
        id: 'kodarena-admin',
        name: 'Koderarena Admin',
        email: 'admin',
        password: 'admin',
        createdAt: new Date().toISOString(),
        role: 'admin',
        bio: language === 'sv' ? 'Plattformsadministratör' : 'Platform administrator'
      };
      updateCurrentUser(adminAccount);
      setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
      setAuthError('');
      setIsAuthOpen(false);
      return;
    }

    const account = getStoredAccounts().find(
      acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (!account) {
      setAuthError(language === 'sv' ? 'Fel e-post eller lösenord.' : 'Incorrect email or password.');
      return;
    }

    updateCurrentUser(account);
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    setAuthError('');
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    updateCurrentUser(null);
    setIsAuthOpen(false);
  };

  const handleProfileFieldChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 2 * 1024 * 1024) {
      setAuthError(language === 'sv' ? 'Profilbilden måste vara mindre än 2 MB.' : 'Profile image must be smaller than 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => handleProfileFieldChange('avatarUrl', String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    if (!currentUser || !profileForm.name.trim()) {
      setAuthError(language === 'sv' ? 'Namn måste fyllas i.' : 'Name is required.');
      return;
    }
    const updatedAccount: AcademyAccount = { ...currentUser, ...profileForm, name: profileForm.name.trim() };
    const accounts = getStoredAccounts();
    const updatedAccounts = accounts.some(account => account.id === updatedAccount.id)
      ? accounts.map(account => account.id === updatedAccount.id ? updatedAccount : account)
      : updatedAccount.role === 'admin' ? accounts : [updatedAccount, ...accounts];
    saveStoredAccounts(updatedAccounts);
    updateCurrentUser(updatedAccount);
    setAuthError('');
    setIsProfileEditing(false);
  };

  const authGateOpen = !currentUser || isAuthOpen;

  // Load progress from localStorage
  const [userProgress, setUserProgress] = useState<UserHtmlProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_PROGRESS;
  });

  // Save progress on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch {}
  }, [userProgress]);

  const handleCompleteExercise = (exerciseId: string, earnedXp: number) => {
    setUserProgress(prev => {
      if (prev.completedExerciseIds.includes(exerciseId)) {
        return prev;
      }
      return {
        ...prev,
        totalXp: prev.totalXp + earnedXp,
        completedExerciseIds: [...prev.completedExerciseIds, exerciseId]
      };
    });
  };

  const handleSolveQuiz = (quizId: string, earnedXp: number) => {
    setUserProgress(prev => {
      if (prev.solvedQuizIds.includes(quizId)) {
        return prev;
      }
      return {
        ...prev,
        totalXp: prev.totalXp + earnedXp,
        solvedQuizIds: [...prev.solvedQuizIds, quizId]
      };
    });
  };

  const handleCompleteProject = (projectId: string) => {
    setUserProgress(prev => {
      const completedProjectIds = prev.completedProjectIds || [];
      if (completedProjectIds.includes(projectId)) return prev;
      return {
        ...prev,
        totalXp: prev.totalXp + 100,
        completedProjectIds: [...completedProjectIds, projectId]
      };
    });
  };

  const handleStartExercise = (track: WebTrack, levelId: number, exerciseId: string) => {
    setSelectedTrack(track);
    setSelectedLevelId(levelId);
    setSelectedExerciseId(exerciseId);
    setActiveTab('lesson');
  };

  const htmlCurriculum = getLocalizedCurriculum(language, 'html');
  const cssCurriculum = getLocalizedCurriculum(language, 'css');
  const jsCurriculum = getLocalizedCurriculum(language, 'js');

  const allLevels: HtmlLessonLevel[] = [
    ...htmlCurriculum.map(l => ({ ...l, track: 'html' as WebTrack })),
    ...cssCurriculum.map(l => ({ ...l, track: 'css' as WebTrack })),
    ...jsCurriculum.map(l => ({ ...l, track: 'js' as WebTrack }))
  ];

  const totalExercises = useMemo(
    () => allLevels.reduce((sum, level) => sum + level.exercises.length, 0),
    [allLevels]
  );

  const completedExercisesCount = useMemo(
    () => userProgress.completedExerciseIds.length,
    [userProgress.completedExerciseIds]
  );

  const completionRate = totalExercises > 0 ? Math.round((completedExercisesCount / totalExercises) * 100) : 0;

  const nextRecommendedExercise = useMemo(() => {
    for (const level of allLevels) {
      const next = level.exercises.find(e => !userProgress.completedExerciseIds.includes(e.id));
      if (next) {
        return {
          track: level.track || 'html',
          levelId: level.id,
          exerciseId: next.id,
          title: next.title,
          xp: next.xpReward
        };
      }
    }
    return null;
  }, [allLevels, userProgress.completedExerciseIds]);

  const handleOpenRecommendedExercise = () => {
    if (!nextRecommendedExercise) return;
    handleStartExercise(
      nextRecommendedExercise.track,
      nextRecommendedExercise.levelId,
      nextRecommendedExercise.exerciseId
    );
  };

  const getCurriculumForTrack = (track: WebTrack) => {
    if (track === 'css') return cssCurriculum;
    if (track === 'js') return jsCurriculum;
    return htmlCurriculum;
  };

  const currentCurriculum = getCurriculumForTrack(selectedTrack);
  const activeLevel = currentCurriculum.find(l => l.id === selectedLevelId) || currentCurriculum[0];
  const activeExercise = activeLevel.exercises.find(e => e.id === selectedExerciseId) || activeLevel.exercises[0];

  const filteredCurriculumLevels = allLevels.filter(lvl => {
    if (activeTrack === 'html') return lvl.track === 'html';
    if (activeTrack === 'css') return lvl.track === 'css';
    if (activeTrack === 'js') return lvl.track === 'js';
    return true;
  });

  const getLevelIcon = (iconName: string, track?: WebTrack) => {
    let colorClass = 'text-orange-400';
    if (track === 'css') colorClass = 'text-sky-400';
    if (track === 'js') colorClass = 'text-amber-400';

    switch (iconName) {
      case 'Type': return <Type className={`w-5 h-5 ${colorClass}`} />;
      case 'Globe': return <Globe className={`w-5 h-5 ${colorClass}`} />;
      case 'ListTree': return <ListTree className={`w-5 h-5 ${colorClass}`} />;
      case 'Image': return <Image className={`w-5 h-5 ${colorClass}`} />;
      case 'Table': return <Table className={`w-5 h-5 ${colorClass}`} />;
      case 'FileCheck': return <FileCheck className={`w-5 h-5 ${colorClass}`} />;
      case 'Sliders': return <Sliders className={`w-5 h-5 ${colorClass}`} />;
      case 'Layout': return <Layout className={`w-5 h-5 ${colorClass}`} />;
      case 'Palette': return <Palette className={`w-5 h-5 ${colorClass}`} />;
      case 'Zap': return <Zap className={`w-5 h-5 ${colorClass}`} />;
      case 'Sparkles': return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
      case 'Smartphone': return <Smartphone className={`w-5 h-5 ${colorClass}`} />;
      case 'Terminal': return <Terminal className={`w-5 h-5 ${colorClass}`} />;
      case 'Award': return <Award className={`w-5 h-5 ${colorClass}`} />;
      case 'Code2':
      default:
        if (track === 'js') return <Terminal className={`w-5 h-5 ${colorClass}`} />;
        if (track === 'css') return <Palette className={`w-5 h-5 ${colorClass}`} />;
        return <Code2 className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  const getTrackBadge = (track?: WebTrack) => {
    if (track === 'js') {
      return (
        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          JS ES6
        </span>
      );
    }
    if (track === 'css') {
      return (
        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
          CSS3
        </span>
      );
    }
    return (
      <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
        HTML5
      </span>
    );
  };

  return (
    <div className="app-shell w-full min-h-screen bg-transparent text-slate-100 flex flex-col">
      {/* Top Main Navigation Bar */}
      <header className="academy-topbar sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            {onBackToGame && (
              <button
                onClick={onBackToGame}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.backToGame}</span>
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-sky-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20 text-xs tracking-tighter">
                &lt;/&gt;
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-sky-400 to-amber-300">
                    KODARENA
                  </span>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 uppercase font-mono font-bold">
                    HTML5
                  </span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded border border-sky-500/30 uppercase font-mono font-bold">
                    CSS3
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 uppercase font-mono font-bold">
                    JS ES6+
                  </span>
                </h1>
                <p className="text-[10px] text-slate-400 hidden sm:block">
                  {t.academySubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="academy-tab-rail flex items-center gap-1 p-1 rounded-2xl border overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'curriculum'
                  ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.curriculumTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'playground'
                  ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{t.playgroundTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'progress'
                  ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t.progressTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'projects'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'text-emerald-300/80 hover:text-emerald-200 hover:bg-emerald-500/10'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>{language === 'sv' ? 'Projekt' : 'Projects'}</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'certificate'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t.certificateTab}</span>
            </button>
          </div>

          {/* User Stats & Language Switcher */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition active:scale-95 shadow-sm"
              title="Växla språk / Switch language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px] font-bold">
                {language === 'sv' ? '🇸🇪 SV' : '🇬🇧 EN'}
              </span>
            </button>

            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition shadow-sm"
            >
              {currentUser ? (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">{currentUser.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden md:inline">{language === 'sv' ? 'Logga in' : 'Log in'}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{userProgress.totalXp} XP</span>
            </div>

            <div className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1.5 rounded-xl text-rose-300 text-xs font-mono font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>{userProgress.streakDays}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with bottom padding for mobile navigation bar */}
      <main className="flex-1 p-3 sm:p-5 md:p-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
        {/* Tab 1: Curriculum Levels Map */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="premium-panel p-6 sm:p-8 rounded-[28px] relative overflow-hidden">
              <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/20 via-sky-500/20 to-indigo-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500/15 via-fuchsia-500/15 to-transparent blur-3xl" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                  <div className="max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 text-[11px] font-bold uppercase tracking-[0.18em]">
                      <Rocket className="w-3.5 h-3.5" />
                      <span>{language === 'sv' ? 'Learning system' : 'Learning system'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-100 leading-tight">
                      {language === 'sv' ? 'Bygg, styla och tänk som en riktig frontendutvecklare.' : 'Build, style and think like a real frontend developer.'}
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                      {language === 'sv'
                        ? 'Följ en strukturerad utvecklingsväg, arbeta med live-projekt och få en tydlig åtgärdsplan för varje nästa steg.'
                        : 'Follow a structured learning path, work on real live projects and get a clear next-step roadmap for every milestone.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 min-w-[270px]">
                    <div className="glass-card rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-sky-300 mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">XP</span>
                      </div>
                      <div className="text-2xl font-black text-white">{userProgress.totalXp}</div>
                      <div className="text-[11px] text-slate-400">{language === 'sv' ? 'total poäng' : 'total score'}</div>
                    </div>

                    <div className="glass-card rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-emerald-300 mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">%</span>
                      </div>
                      <div className="text-2xl font-black text-white">{completionRate}%</div>
                      <div className="text-[11px] text-slate-400">{language === 'sv' ? 'klar' : 'complete'}</div>
                    </div>

                    <div className="glass-card rounded-2xl p-4 col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-amber-300">
                          <Target className="w-4 h-4" />
                          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{language === 'sv' ? 'Nästa mål' : 'Next goal'}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-amber-300">{completedExercisesCount}/{totalExercises}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-orange-400 via-sky-400 to-amber-300" style={{ width: `${completionRate}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10 flex-wrap shrink-0">
                    <button
                      onClick={() => setActiveTrack('all')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                        activeTrack === 'all'
                          ? 'bg-gradient-to-r from-orange-500 via-sky-500 to-amber-500 text-slate-950 shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.allCourses} ({allLevels.length})
                    </button>

                    <button
                      onClick={() => setActiveTrack('html')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                        activeTrack === 'html'
                          ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{t.htmlTrack} ({htmlCurriculum.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTrack('css')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                        activeTrack === 'css'
                          ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>{t.cssTrack} ({cssCurriculum.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTrack('js')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                        activeTrack === 'js'
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{t.jsTrack} ({jsCurriculum.length})</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleOpenRecommendedExercise}
                      className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-2 text-xs font-bold text-orange-200 hover:bg-orange-500/20 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {language === 'sv' ? 'Fortsätt här' : 'Continue here'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {nextRecommendedExercise && (
              <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 via-sky-500/20 to-amber-500/20 flex items-center justify-center text-orange-200 border border-white/10">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {language === 'sv' ? 'Rekommenderad nästa övning' : 'Recommended next exercise'}
                    </div>
                    <div className="text-base font-bold text-white mt-1">{nextRecommendedExercise.title}</div>
                  </div>
                </div>

                <button
                  onClick={handleOpenRecommendedExercise}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-sky-500 to-amber-400 px-4 py-2 text-xs font-black text-slate-950 shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {language === 'sv' ? 'Starta' : 'Start'}
                </button>
              </div>
            )}

            {/* Level Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCurriculumLevels.map((level) => {
                const totalInLvl = level.exercises.length;
                const doneInLvl = level.exercises.filter(e => userProgress.completedExerciseIds.includes(e.id)).length;
                const isAllDone = totalInLvl > 0 && doneInLvl === totalInLvl;
                const isCss = level.track === 'css';
                const isJs = level.track === 'js';

                return (
                  <div
                    key={`${level.track || 'html'}-${level.id}`}
                    className={`bg-[#070b16] rounded-3xl border transition shadow-xl flex flex-col overflow-hidden ${
                      isAllDone
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : isJs
                        ? 'border-white/10 hover:border-amber-500/40'
                        : isCss
                        ? 'border-white/10 hover:border-sky-500/40'
                        : 'border-white/10 hover:border-orange-500/40'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-5 bg-[#050811] border-b border-white/5 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                          isJs 
                            ? 'bg-amber-500/10 border-amber-500/20' 
                            : isCss 
                            ? 'bg-sky-500/10 border-sky-500/20' 
                            : 'bg-orange-500/10 border-orange-500/20'
                        }`}>
                          {getLevelIcon(level.icon, level.track)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                              isJs ? 'text-amber-400' : isCss ? 'text-sky-400' : 'text-orange-400'
                            }`}>
                              {t.level} {level.id}
                            </span>
                            {getTrackBadge(level.track)}
                          </div>
                          <h3 className="text-sm font-bold text-slate-100">{level.levelTitle}</h3>
                        </div>
                      </div>

                      {isAllDone ? (
                        <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-lg">
                          {doneInLvl}/{totalInLvl}
                        </span>
                      )}
                    </div>

                    {/* Subtitle & Badge */}
                    <div className="p-5 flex-1 space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {level.levelSubtitle}
                      </p>

                      {/* Exercise list */}
                      <div className="space-y-2">
                        {level.exercises.map((exercise) => {
                          const isDone = userProgress.completedExerciseIds.includes(exercise.id);

                          return (
                            <button
                              key={exercise.id}
                              onClick={() => handleStartExercise(level.track || 'html', level.id, exercise.id)}
                              className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between gap-2 ${
                                isDone
                                  ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                                  : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-orange-500/30'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {isDone ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : isJs ? (
                                  <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                ) : isCss ? (
                                  <Palette className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                ) : (
                                  <Code2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                )}
                                <span className="truncate">{exercise.title}</span>
                              </div>
                              <span className="text-[10px] font-mono text-amber-400 shrink-0 font-bold">
                                +{exercise.xpReward} XP
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Button */}
                    <div className="p-4 bg-[#050811] border-t border-white/5">
                      <button
                        onClick={() => handleStartExercise(level.track || 'html', level.id, level.exercises[0].id)}
                        className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition active:scale-98 text-slate-950 ${
                          isJs
                            ? 'bg-amber-400 hover:bg-amber-300 shadow-amber-500/20'
                            : isCss
                            ? 'bg-sky-400 hover:bg-sky-300 shadow-sky-500/20'
                            : 'bg-orange-500 hover:bg-orange-400 shadow-orange-500/20'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{doneInLvl > 0 ? t.continueLevel : t.startLevel}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Lesson View */}
        {activeTab === 'lesson' && (
          <LessonView
            level={activeLevel}
            exercise={activeExercise}
            userProgress={userProgress}
            onSelectExercise={(exId) => {
              const allPossibleLevels = [...htmlCurriculum, ...cssCurriculum, ...jsCurriculum];
              const lvl = allPossibleLevels.find(l => l.exercises.some(e => e.id === exId));
              if (lvl) {
                setSelectedTrack(lvl.track || 'html');
                setSelectedLevelId(lvl.id);
              }
              setSelectedExerciseId(exId);
            }}
            onCompleteExercise={handleCompleteExercise}
            onBackToMap={() => setActiveTab('curriculum')}
            language={language}
          />
        )}

        {/* Tab 3: Sandbox Playground */}
        {activeTab === 'playground' && <PlaygroundView language={language} initialProject={activeProject} />}

        {/* Progress Dashboard */}
        {activeTab === 'progress' && (
          <ProgressDashboard
            userProgress={userProgress}
            onSelectExercise={(track, levelId, exerciseId) => {
              handleStartExercise(track, levelId, exerciseId);
            }}
            onOpenCertificate={() => setActiveTab('certificate')}
            language={language}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectHub
            language={language}
            completedProjectIds={userProgress.completedProjectIds || []}
            onCompleteProject={handleCompleteProject}
            onOpenPlayground={(project) => { setActiveProject(project); setActiveTab('playground'); }}
          />
        )}

        {activeTab === 'profile' && currentUser && (
          <PortfolioView
            account={currentUser}
            progress={userProgress}
            language={language}
            onEditProfile={() => setIsAuthOpen(true)}
            onShareProfile={() => {
              const snapshot = {
                account: {
                  id: currentUser.id,
                  name: currentUser.name,
                  email: currentUser.email,
                  role: currentUser.role,
                  bio: currentUser.bio,
                  location: currentUser.location,
                  website: currentUser.website,
                  github: currentUser.github,
                  linkedin: currentUser.linkedin,
                  avatarUrl: currentUser.avatarUrl
                },
                progress: {
                  totalXp: userProgress.totalXp,
                  streakDays: userProgress.streakDays,
                  completedExerciseIds: userProgress.completedExerciseIds,
                  completedProjectIds: userProgress.completedProjectIds || []
                }
              };
              const encoded = btoa(encodeURIComponent(JSON.stringify(snapshot)));
              const url = `${window.location.origin}${window.location.pathname}?profile=${encoded}`;
              navigator.clipboard?.writeText(url);
            }}
          />
        )}

        {activeTab === 'admin' && currentUser?.role === 'admin' && (
          <div className="mx-auto w-full max-w-7xl space-y-5 pb-12">
            <div className="premium-panel rounded-[28px] p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-300">Admin workspace</div><h2 className="mt-2 text-2xl font-black text-white">{language === 'sv' ? 'Plattformsöversikt' : 'Platform overview'}</h2><p className="mt-2 text-sm text-slate-400">{language === 'sv' ? 'Lokal adminvy för demo- och utvecklingsmiljön.' : 'Local admin view for the demo and development environment.'}</p></div>
            <div className="grid gap-4 sm:grid-cols-3"><div className="glass-card rounded-2xl p-5"><div className="text-xs text-slate-500">Accounts</div><div className="mt-2 text-3xl font-black text-white">{getStoredAccounts().length}</div></div><div className="glass-card rounded-2xl p-5"><div className="text-xs text-slate-500">Active role</div><div className="mt-2 text-3xl font-black text-rose-300">ADMIN</div></div><div className="glass-card rounded-2xl p-5"><div className="text-xs text-slate-500">Storage</div><div className="mt-2 text-3xl font-black text-emerald-300">Local</div></div></div>
            <div className="premium-panel rounded-[24px] p-5"><h3 className="text-sm font-black text-white">{language === 'sv' ? 'Registrerade profiler' : 'Registered profiles'}</h3><div className="mt-4 space-y-2">{getStoredAccounts().map(account => <div key={account.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs"><span className="font-bold text-slate-200">{account.name}</span><span className="text-slate-500">{account.email}</span></div>)}</div></div>
          </div>
        )}

        {/* Certificate & Diploma Generator */}
        {activeTab === 'certificate' && (
          <CertificateView
            userProgress={userProgress}
            language={language}
            currentUser={currentUser}
            onAuthRequired={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      <footer className="mt-auto border-t border-white/10 bg-[#080d18]/90 px-4 pb-28 pt-10 backdrop-blur-xl md:px-6 md:pb-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-sky-400 to-emerald-400 text-xs font-black text-slate-950 shadow-lg shadow-orange-500/20">
                &lt;/&gt;
              </div>
              <div>
                <div className="font-black tracking-[0.14em] text-white">KODARENA</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Web Academy</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {language === 'sv'
                ? 'En fokuserad lärmiljö för modern frontend, byggd för att hjälpa dig från första taggen till professionella projekt.'
                : 'A focused learning environment for modern frontend, built to take you from your first tag to professional projects.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span>{language === 'sv' ? 'Byggd för människor som vill kunna mer.' : 'Built for people who want to know more.'}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">
              {language === 'sv' ? 'Lär dig' : 'Learn'}
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <button onClick={() => setActiveTab('curriculum')} className="block text-left hover:text-orange-300">{language === 'sv' ? 'Kursöversikt' : 'Course overview'}</button>
              <button onClick={() => setActiveTab('playground')} className="block text-left hover:text-sky-300">Sandbox</button>
              <button onClick={() => setActiveTab('projects')} className="block text-left hover:text-emerald-300">{language === 'sv' ? 'Färdiga projekt' : 'Finished projects'}</button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">
              {language === 'sv' ? 'Ditt konto' : 'Your account'}
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <button onClick={() => setActiveTab('progress')} className="block text-left hover:text-orange-300">{language === 'sv' ? 'Framsteg & XP' : 'Progress & XP'}</button>
              <button onClick={() => setActiveTab('certificate')} className="block text-left hover:text-amber-300">{language === 'sv' ? 'Certifikat' : 'Certificate'}</button>
              <button onClick={() => setIsAuthOpen(true)} className="block text-left hover:text-emerald-300">{currentUser ? (language === 'sv' ? 'Kontoinställningar' : 'Account settings') : (language === 'sv' ? 'Logga in' : 'Log in')}</button>
              <button onClick={handleToggleLanguage} className="block text-left hover:text-sky-300">{language === 'sv' ? 'Byt till English' : 'Byt till Svenska'}</button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">{language === 'sv' ? 'Hjälp & kontakt' : 'Help & contact'}</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              {language === 'sv' ? 'Fastnat i en övning? Använd uppdragets ledtrådar och testa koden direkt i arbetsstudion.' : 'Stuck on an exercise? Use the task hints and test your code directly in the work studio.'}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="mailto:support@kodarena.dev" className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-200 transition hover:bg-orange-500/20">
                <Mail className="h-3.5 w-3.5" />
                {language === 'sv' ? 'Kontakta support' : 'Contact support'}
              </a>
            </div>
            <a href="https://github.com/essgrombalia-png/Kodarena" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-white">
              <Github className="h-4 w-4" />
              Open source on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-9 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kodarena Web Academy</span>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setFooterPanel('about')} className="hover:text-white">{language === 'sv' ? 'Om plattformen' : 'About the platform'}</button>
            <button onClick={() => setFooterPanel('privacy')} className="hover:text-white">{language === 'sv' ? 'Integritet' : 'Privacy'}</button>
            <button onClick={() => setFooterPanel('terms')} className="hover:text-white">{language === 'sv' ? 'Villkor' : 'Terms'}</button>
            <span className="inline-flex items-center gap-1.5 text-emerald-400"><ShieldCheck className="h-3.5 w-3.5" /> {language === 'sv' ? 'Din data stannar i webbläsaren' : 'Your data stays in your browser'}</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Smartphones & Small Screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050810]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl safe-area-bottom">
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition min-w-[56px] min-h-[44px] ${
            activeTab === 'curriculum' || activeTab === 'lesson'
              ? 'text-orange-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">{language === 'sv' ? 'Kurser' : 'Courses'}</span>
        </button>

        <button
          onClick={() => setActiveTab('playground')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition min-w-[56px] min-h-[44px] ${
            activeTab === 'playground'
              ? 'text-orange-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">{language === 'sv' ? 'Sandbox' : 'Sandbox'}</span>
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition min-w-[56px] min-h-[44px] ${
            activeTab === 'progress'
              ? 'text-orange-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">{language === 'sv' ? 'Analys' : 'Progress'}</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition min-w-[56px] min-h-[44px] ${
            activeTab === 'projects' ? 'text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">{language === 'sv' ? 'Projekt' : 'Projects'}</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition min-w-[56px] min-h-[44px] ${
            activeTab === 'certificate'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] tracking-tight">{language === 'sv' ? 'Diplom' : 'Diploma'}</span>
        </button>
      </nav>

      {authGateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0b1220] p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  {currentUser ? (language === 'sv' ? 'Konto' : 'Account') : (authMode === 'signup' ? (language === 'sv' ? 'Skapa konto' : 'Create account') : (language === 'sv' ? 'Logga in' : 'Log in'))}
                </h3>
              </div>
              {currentUser && (
                <button
                  onClick={() => setIsAuthOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300"
                >
                  ✕
                </button>
              )}
            </div>

            {!currentUser && (
              <div className="space-y-3">
                <div className="flex gap-2 rounded-2xl bg-white/5 p-1">
                  <button
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
                      authMode === 'signup' ? 'bg-amber-500 text-slate-950' : 'text-slate-300'
                    }`}
                  >
                    {language === 'sv' ? 'Skapa konto' : 'Sign up'}
                  </button>
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
                      authMode === 'login' ? 'bg-sky-500 text-slate-950' : 'text-slate-300'
                    }`}
                  >
                    {language === 'sv' ? 'Logga in' : 'Log in'}
                  </button>
                </div>

                {authMode === 'signup' && (
                  <div className="space-y-3">
                    <label className="block">
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-slate-400">{language === 'sv' ? 'Namn' : 'Name'}</span>
                      <input
                        value={authForm.name}
                        onChange={(e) => handleAuthFieldChange('name', e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
                        placeholder={language === 'sv' ? 'Ditt fulla namn' : 'Your full name'}
                      />
                    </label>
                  </div>
                )}

                <label className="block">
                  <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-slate-400">E-post</span>
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(e) => handleAuthFieldChange('email', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-sky-400"
                    placeholder="name@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-slate-400">{language === 'sv' ? 'Lösenord' : 'Password'}</span>
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={(e) => handleAuthFieldChange('password', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-sky-400"
                    placeholder={language === 'sv' ? 'Minst 6 tecken' : 'At least 6 characters'}
                  />
                </label>

                {authMode === 'signup' && (
                  <label className="block">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-slate-400">{language === 'sv' ? 'Bekräfta lösenord' : 'Confirm password'}</span>
                    <input
                      type="password"
                      value={authForm.confirmPassword}
                      onChange={(e) => handleAuthFieldChange('confirmPassword', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
                      placeholder={language === 'sv' ? 'Upprepa lösenordet' : 'Repeat your password'}
                    />
                  </label>
                )}

                {authError && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                    {authError}
                  </div>
                )}

                <button
                  onClick={authMode === 'signup' ? handleCreateAccount : handleLogin}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-sky-500 px-3 py-2.5 text-xs font-black text-slate-950"
                >
                  {authMode === 'signup'
                    ? (language === 'sv' ? 'Skapa konto' : 'Create account')
                    : (language === 'sv' ? 'Logga in' : 'Log in')}
                </button>
              </div>
            )}

            {currentUser && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                      {currentUser.avatarUrl ? <img src={currentUser.avatarUrl} alt="Profile" className="h-full w-full object-cover" /> : <User className="m-3 h-7 w-7 text-emerald-300" />}
                      {isProfileEditing && (
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-slate-950/70 opacity-0 transition hover:opacity-100">
                          <Camera className="h-5 w-5 text-white" />
                          <input type="file" accept="image/*" className="hidden" onChange={(event) => handleAvatarChange(event.target.files?.[0])} />
                        </label>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="font-bold">{currentUser.role === 'admin' ? 'Admin' : (language === 'sv' ? 'Du är inloggad' : 'You are logged in')}</span>
                      </div>
                      <div className="mt-1 text-base font-bold text-white">{currentUser.name}</div>
                      <div className="mt-0.5 truncate text-xs text-emerald-100/80">{currentUser.email}</div>
                    </div>
                  </div>
                </div>

                {isProfileEditing && (
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {([
                        ['name', language === 'sv' ? 'Namn' : 'Name'],
                        ['location', language === 'sv' ? 'Plats' : 'Location'],
                        ['website', 'Website'],
                        ['github', 'GitHub'],
                        ['linkedin', 'LinkedIn']
                      ] as const).map(([field, label]) => (
                        <label key={field} className="block">
                          <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</span>
                          <input value={profileForm[field]} onChange={(event) => handleProfileFieldChange(field, event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-sky-400" />
                        </label>
                      ))}
                    </div>
                    <label className="block">
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-slate-500">{language === 'sv' ? 'Kort presentation' : 'Short bio'}</span>
                      <textarea value={profileForm.bio} onChange={(event) => handleProfileFieldChange('bio', event.target.value)} rows={3} maxLength={240} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-sky-400" placeholder={language === 'sv' ? 'Berätta kort om dig själv...' : 'Tell people about yourself...'} />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={handleSaveProfile} className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-black text-slate-950">{language === 'sv' ? 'Spara profil' : 'Save profile'}</button>
                      <button onClick={() => setIsProfileEditing(false)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300">{language === 'sv' ? 'Avbryt' : 'Cancel'}</button>
                    </div>
                  </div>
                )}

                {!isProfileEditing && (currentUser.bio || currentUser.location || currentUser.website || currentUser.github || currentUser.linkedin) && (
                  <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-300">
                    {currentUser.bio && <p className="leading-relaxed text-slate-400">{currentUser.bio}</p>}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-slate-400">
                      {currentUser.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-sky-300" />{currentUser.location}</span>}
                      {currentUser.website && <a href={currentUser.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><LinkIcon className="h-3.5 w-3.5" />Website</a>}
                      {currentUser.github && <a href={currentUser.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Github className="h-3.5 w-3.5" />GitHub</a>}
                      {currentUser.linkedin && <a href={currentUser.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Linkedin className="h-3.5 w-3.5" />LinkedIn</a>}
                    </div>
                  </div>
                )}

                <button onClick={() => { setIsProfileEditing(true); setAuthError(''); }} className="w-full rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2.5 text-xs font-bold text-sky-200 hover:bg-sky-500/20">
                  {language === 'sv' ? 'Redigera min profil' : 'Edit my profile'}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-bold text-slate-200"
                >
                  {language === 'sv' ? 'Logga ut från appen' : 'Log out of app'}
                </button>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button onClick={() => { setActiveTab('profile'); setIsAuthOpen(false); }} className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2.5 text-xs font-bold text-sky-200">{language === 'sv' ? 'Öppna portfolio' : 'Open portfolio'}</button>
                  {currentUser.role === 'admin' && <button onClick={() => { setActiveTab('admin'); setIsAuthOpen(false); }} className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-xs font-bold text-rose-200">Adminpanel</button>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {footerPanel && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d1422] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white">
                {footerPanel === 'privacy' ? <ShieldCheck className="h-5 w-5 text-emerald-400" /> : footerPanel === 'terms' ? <FileText className="h-5 w-5 text-amber-400" /> : <Info className="h-5 w-5 text-sky-400" />}
                <h3 className="text-lg font-black">{footerPanel === 'privacy' ? (language === 'sv' ? 'Integritet' : 'Privacy') : footerPanel === 'terms' ? (language === 'sv' ? 'Villkor' : 'Terms') : (language === 'sv' ? 'Om Kodarena' : 'About Kodarena')}</h3>
              </div>
              <button onClick={() => setFooterPanel(null)} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">✕</button>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {footerPanel === 'privacy'
                ? (language === 'sv' ? 'Kodarena sparar konto, framsteg, språk och mallar lokalt i din webbläsare. Ingen av denna information skickas till en extern databas i den nuvarande versionen.' : 'Kodarena stores account, progress, language, and templates locally in your browser. This version does not send that information to an external database.')
                : footerPanel === 'terms'
                ? (language === 'sv' ? 'Kodarena är en utbildningsplattform för övning. Kursinnehåll, poäng och certifikat används för lärande och portfolio; certifikatet är inte en myndighets- eller universitetsackreditering.' : 'Kodarena is an educational practice platform. Course content, scores, and certificates are intended for learning and portfolios; the certificate is not government or university accreditation.')
                : (language === 'sv' ? 'Kodarena kombinerar strukturerade lektioner, kodövningar, live-preview, färdiga projekt och personlig progression i en och samma lärmiljö.' : 'Kodarena combines structured lessons, coding exercises, live preview, finished projects, and personal progress in one focused learning environment.')}
            </p>
            <button onClick={() => setFooterPanel(null)} className="mt-6 w-full rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15">{language === 'sv' ? 'Stäng' : 'Close'}</button>
          </div>
        </div>
      )}

    </div>
  );
};
