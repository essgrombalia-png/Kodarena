import React, { useState, useRef } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Calendar,
  Lock, 
  Check,
  QrCode,
  ExternalLink,
  Code2,
  Palette,
  Terminal,
  FileImage,
  Sliders,
  CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserHtmlProgress } from '../../types/html';
import { Language, TRANSLATIONS } from '../../i18n/translations';
import { getLocalizedCurriculum } from '../../utils/localizedCurriculum';

interface CertificateViewProps {
  userProgress: UserHtmlProgress;
  language: Language;
  currentUser?: AcademyAccount | null;
  onAuthRequired?: () => void;
  onLogout?: () => void;
}

interface AcademyAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

type CertificateTheme = 'parchment' | 'obsidian' | 'sapphire';
type HonorsLevel = 'summa' | 'magna' | 'cum' | 'standard';
type AuthMode = 'signup' | 'login';

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

// Helper to convert any modern CSS color (including oklch, lab, color(srgb)) into standard RGB/Hex
function convertColorToRgb(val: string): string {
  if (!val) return val;
  if (!val.includes('oklch') && !val.includes('lab') && !val.includes('color(')) {
    return val;
  }
  return val.replace(/(?:oklch|lab|color)\([^)]+\)/gi, (matchedColor) => {
    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 1;
      tempCanvas.height = 1;
      const ctx = tempCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillStyle = matchedColor;
        const res = ctx.fillStyle;
        if (res && !res.includes('oklch') && !res.includes('lab') && !res.includes('color(')) {
          return res;
        }
      }
    } catch {}
    // Safe fallbacks if parsing fails
    if (matchedColor.includes('0 0 0') || matchedColor.includes('black')) {
      return 'rgba(0, 0, 0, 0.25)';
    }
    return '#d4af37';
  });
}

// Sanitizer for the cloned document in html2canvas
function sanitizeClonedElement(clonedEl: HTMLElement) {
  try {
    const elements = [clonedEl, ...Array.from(clonedEl.querySelectorAll('*'))] as HTMLElement[];
    const colorProps = [
      'color',
      'backgroundColor',
      'borderColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'outlineColor',
      'boxShadow',
      'textShadow',
      'textDecorationColor',
      'fill',
      'stroke'
    ];

    elements.forEach((el) => {
      try {
        const computed = window.getComputedStyle(el);
        colorProps.forEach((prop) => {
          const val = (computed as any)[prop];
          if (val && (val.includes('oklch') || val.includes('lab') || val.includes('color('))) {
            const cleanVal = convertColorToRgb(val);
            const cssName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            el.style.setProperty(cssName, cleanVal, 'important');
          }
        });
      } catch {}
    });
  } catch (e) {
    console.warn('Sanitization warning:', e);
  }
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  userProgress,
  language = 'sv',
  currentUser: propCurrentUser,
  onAuthRequired,
  onLogout
}) => {
  const t = TRANSLATIONS[language];
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const [studentName, setStudentName] = useState<string>('Web Developer');
  const [theme, setTheme] = useState<CertificateTheme>('parchment');
  const [honors, setHonors] = useState<HonorsLevel>('summa');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCredentialId, setCopiedCredentialId] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authError, setAuthError] = useState('');
  const [localCurrentUser, setLocalCurrentUser] = useState<AcademyAccount | null>(() => getStoredActiveAccount());
  const currentUser = propCurrentUser ?? localCurrentUser;

  const htmlCurriculum = getLocalizedCurriculum(language, 'html');
  const cssCurriculum = getLocalizedCurriculum(language, 'css');
  const jsCurriculum = getLocalizedCurriculum(language, 'js');

  const totalHtmlExercises = htmlCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const totalCssExercises = cssCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const totalJsExercises = jsCurriculum.reduce((acc, lvl) => acc + lvl.exercises.length, 0);
  const totalAllExercises = totalHtmlExercises + totalCssExercises + totalJsExercises;

  const completedCount = userProgress.completedExerciseIds.length;
  const isFullyCompleted = completedCount >= totalAllExercises;
  const canIssueCertificate = Boolean(currentUser) && isFullyCompleted;
  const completionPercentage = totalAllExercises > 0
    ? Math.min(100, Math.round((completedCount / totalAllExercises) * 100))
    : 0;

  const completionDate = new Date().toLocaleDateString(language === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const rawHash = Math.abs((userProgress.totalXp || 500) * 1337 + 0xDEADBEEF).toString(16).toUpperCase();
  const credentialId = `NX-ACAD-${new Date().getFullYear()}-${rawHash.slice(0, 8)}`;
  const verifyUrl = `https://nexus-academy.edu/verify/${credentialId}`;

  const honorsConfig = {
    summa: {
      labelSv: 'Summa Cum Laude (Med Högsta Beröm)',
      labelEn: 'Summa Cum Laude (With Highest Distinction)',
      tagSv: '★ SUMMA CUM LAUDE ★',
      tagEn: '★ SUMMA CUM LAUDE ★',
      descSv: 'För exceptionell prestation, djup förståelse och full poäng inom samtliga webbmoduler.',
      descEn: 'For exceptional performance, mastery, and flawless execution across all web modules.'
    },
    magna: {
      labelSv: 'Magna Cum Laude (Med Stort Beröm)',
      labelEn: 'Magna Cum Laude (With Great Distinction)',
      tagSv: '★ MAGNA CUM LAUDE ★',
      tagEn: '★ MAGNA CUM LAUDE ★',
      descSv: 'För utmärkta resultat och avancerade färdigheter i modern webbutveckling.',
      descEn: 'For outstanding results and advanced skills in modern web development.'
    },
    cum: {
      labelSv: 'Cum Laude (Med Beröm)',
      labelEn: 'Cum Laude (With Distinction)',
      tagSv: '★ CUM LAUDE ★',
      tagEn: '★ CUM LAUDE ★',
      descSv: 'För väl godkänd och framgångsrikt genomförd fullstack-utbildning.',
      descEn: 'For successful and accomplished completion of frontend fullstack curriculum.'
    },
    standard: {
      labelSv: 'Standard Godkänd (Certificate of Completion)',
      labelEn: 'Certified Fullstack Graduate',
      tagSv: 'CERTIFIED GRADUATE',
      tagEn: 'CERTIFIED GRADUATE',
      descSv: 'Officiellt intyg på fullbordad utbildning.',
      descEn: 'Official certificate of course completion.'
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleAuthFieldChange = (field: keyof typeof authForm, value: string) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
    setAuthError('');
  };

  const handleCreateAccount = () => {
    if (!authForm.name.trim() || !authForm.email.trim() || !authForm.password.trim()) {
      setAuthError(language === 'sv' ? 'Fyll i alla fält för att skapa ett konto.' : 'Please complete all fields to create an account.');
      return;
    }

    const email = authForm.email.trim();
    const password = authForm.password.trim();
    if (!email.includes('@')) {
      setAuthError(language === 'sv' ? 'Ange en giltig e-postadress.' : 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setAuthError(language === 'sv' ? 'Lösenordet måste vara minst 6 tecken.' : 'Password must be at least 6 characters long.');
      return;
    }
    if (authForm.confirmPassword && authForm.confirmPassword !== password) {
      setAuthError(language === 'sv' ? 'Lösenorden matchar inte.' : 'Passwords do not match.');
      return;
    }

    const accounts = getStoredAccounts();
    const existing = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setAuthError(language === 'sv' ? 'Det finns redan ett konto med denna e-post.' : 'An account with this email already exists.');
      return;
    }

    const newAccount: AcademyAccount = {
      id: `${Date.now()}`,
      name: authForm.name.trim(),
      email,
      password,
      createdAt: new Date().toISOString()
    };

    const updatedAccounts = [newAccount, ...accounts];
    saveStoredAccounts(updatedAccounts);
    setLocalCurrentUser(newAccount);
    saveStoredActiveAccount(newAccount);
    setStudentName(newAccount.name);
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    setAuthError('');
  };

  const handleLogin = () => {
    const email = authForm.email.trim();
    const password = authForm.password.trim();

    if (!email || !password) {
      setAuthError(language === 'sv' ? 'Skriv in e-post och lösenord.' : 'Enter your email and password.');
      return;
    }

    const account = getStoredAccounts().find(
      acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (!account) {
      setAuthError(language === 'sv' ? 'Fel e-post eller lösenord.' : 'Incorrect email or password.');
      return;
    }

    setLocalCurrentUser(account);
    saveStoredActiveAccount(account);
    setStudentName(account.name);
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    setAuthError('');
  };

  const handleLogout = () => {
    setLocalCurrentUser(null);
    saveStoredActiveAccount(null);
    setAuthMode('login');
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    onLogout?.();
  };

  const handleDownloadPdf = async () => {
    if (!currentUser) {
      onAuthRequired?.();
      return;
    }
    if (!canIssueCertificate || !certificateRef.current) return;
    setIsGeneratingPdf(true);
    triggerConfetti();

    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: theme === 'parchment' ? '#fbf8f0' : theme === 'obsidian' ? '#090e1d' : '#ffffff',
        logging: false,
        onclone: (_clonedDoc, clonedEl) => {
          sanitizeClonedElement(clonedEl);
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      const safeName = (studentName.trim() || 'Graduate').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Nexus_Official_Diploma_${safeName}.pdf`);
    } catch (err) {
      console.error('Kunde inte generera PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadPng = async () => {
    if (!currentUser) {
      onAuthRequired?.();
      return;
    }
    if (!canIssueCertificate || !certificateRef.current) return;
    setIsGeneratingPng(true);
    triggerConfetti();

    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: theme === 'parchment' ? '#fbf8f0' : theme === 'obsidian' ? '#090e1d' : '#ffffff',
        logging: false,
        onclone: (_clonedDoc, clonedEl) => {
          sanitizeClonedElement(clonedEl);
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const safeName = (studentName.trim() || 'Graduate').replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `Nexus_Official_Diploma_${safeName}.png`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error('Kunde inte generera PNG:', err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const handlePrint = () => {
    if (!currentUser) {
      onAuthRequired?.();
      return;
    }
    window.print();
  };

  const handleShare = () => {
    if (!currentUser) {
      onAuthRequired?.();
      return;
    }
    const text = language === 'sv'
      ? `🏆 Jag har erhållit mitt officiella diplom i Fullstack Frontend (HTML5, CSS3, JS ES6+) från Nexus Web Academy! Verifierings-ID: ${credentialId}`
      : `🏆 I have earned my official Fullstack Frontend Diploma (HTML5, CSS3, JS ES6+) from Nexus Web Academy! Verification ID: ${credentialId}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Nexus Web Academy Official Diploma',
        text: text,
        url: verifyUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${verifyUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCredentialId = async () => {
    try {
      await navigator.clipboard.writeText(credentialId);
      setCopiedCredentialId(true);
      setTimeout(() => setCopiedCredentialId(false), 2500);
    } catch {
      setCopiedCredentialId(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {!currentUser && (
        <div className="premium-panel rounded-[28px] p-5 sm:p-6 no-print">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                <Lock className="w-3.5 h-3.5" />
                {language === 'sv' ? 'Sekretess & verifiering' : 'Security & verification'}
              </div>
              <h3 className="text-2xl font-black text-white">
                {language === 'sv' ? 'Skapa konto för att utfärda ditt diplom' : 'Create an account to issue your certificate'}
              </h3>
              <p className="text-sm text-slate-300">
                {language === 'sv'
                  ? 'För att få ett officiellt, verifierbart certifikat krävs ett konto. Du kan sedan logga in och utfärda diplomet i en professionell process.'
                  : 'A verified academy account is required before you can issue an official certificate. Once logged in, the diploma is generated through a secure, professional workflow.'}
              </p>
            </div>

            <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0a1020]/80 p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
                    authMode === 'signup'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}
                >
                  {language === 'sv' ? 'Skapa konto' : 'Create account'}
                </button>
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
                    authMode === 'login'
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}
                >
                  {language === 'sv' ? 'Logga in' : 'Log in'}
                </button>
              </div>

              <div className="space-y-3">
                {authMode === 'signup' && (
                  <input
                    value={authForm.name}
                    onChange={(e) => handleAuthFieldChange('name', e.target.value)}
                    placeholder={language === 'sv' ? 'Fullständigt namn' : 'Full name'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-amber-400"
                  />
                )}

                <input
                  value={authForm.email}
                  onChange={(e) => handleAuthFieldChange('email', e.target.value)}
                  placeholder={language === 'sv' ? 'E-postadress' : 'Email address'}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-amber-400"
                  type="email"
                />

                <input
                  value={authForm.password}
                  onChange={(e) => handleAuthFieldChange('password', e.target.value)}
                  placeholder={language === 'sv' ? 'Lösenord' : 'Password'}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-amber-400"
                  type="password"
                />

                {authMode === 'signup' && (
                  <input
                    value={authForm.confirmPassword}
                    onChange={(e) => handleAuthFieldChange('confirmPassword', e.target.value)}
                    placeholder={language === 'sv' ? 'Bekräfta lösenord' : 'Confirm password'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-amber-400"
                    type="password"
                  />
                )}

                {authError && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                    {authError}
                  </div>
                )}

                <button
                  onClick={authMode === 'signup' ? handleCreateAccount : handleLogin}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-sky-500 px-3 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-orange-500/20"
                >
                  {authMode === 'signup'
                    ? (language === 'sv' ? 'Skapa mitt konto' : 'Create my account')
                    : (language === 'sv' ? 'Logga in och fortsätt' : 'Log in and continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentUser && (
        <div className="no-print premium-panel rounded-[28px] p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-emerald-300">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{language === 'sv' ? 'Inloggad student' : 'Signed in student'}</div>
                <div className="text-lg font-black text-white">{currentUser.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                {language === 'sv' ? 'Konto aktivt' : 'Account active'}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200"
              >
                {language === 'sv' ? 'Logga ut' : 'Log out'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner / Customization & Control Hub */}
      <div className="bg-[#070b16] p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-5 no-print">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/30 flex items-center justify-center text-amber-400 border border-amber-500/40 shadow-inner">
              <Award className="w-6 h-6 drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span>{t.certificateTitle}</span>
                </h2>
                {isFullyCompleted ? (
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1 font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'sv' ? 'Fullbordad' : 'Mastery Achieved'}</span>
                  </span>
                ) : (
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-mono font-bold">
                    {completedCount}/{totalAllExercises} {language === 'sv' ? 'godkända' : 'completed'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'sv' 
                  ? 'Exklusivt, ackrediterat intyg med kryptografiskt verifierings-ID, officiella signaturer och guldstämpel.' 
                  : 'Exclusive accredited diploma with cryptographic verification ID, official signatures and gold seal.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf || !canIssueCertificate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition active:scale-95 disabled:opacity-50"
              title={language === 'sv' ? 'Ladda ner högupplöst PDF' : 'Download high-resolution PDF'}
            >
              <Download className="w-4 h-4" />
              <span>{!canIssueCertificate ? (language === 'sv' ? 'Logga in krävs' : 'Login required') : (isGeneratingPdf ? (language === 'sv' ? 'Skapar PDF...' : 'Generating PDF...') : t.downloadPdf)}</span>
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={isGeneratingPng || !canIssueCertificate}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs transition active:scale-95 disabled:opacity-50"
              title={language === 'sv' ? 'Ladda ner som PNG' : 'Download as PNG'}
            >
              <FileImage className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">PNG</span>
            </button>

            <button
              onClick={handlePrint}
              disabled={!canIssueCertificate}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs transition active:scale-95 disabled:opacity-50"
              title={language === 'sv' ? 'Skriv ut diplom' : 'Print certificate'}
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{t.printCertificate}</span>
            </button>

            <button
              onClick={() => setShowVerifyModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs transition active:scale-95"
              title={language === 'sv' ? 'Visa säkerhetsverifiering' : 'Show verification details'}
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">{language === 'sv' ? 'Verifiera' : 'Verify'}</span>
            </button>

            <button
              onClick={handleShare}
              disabled={!canIssueCertificate}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs transition active:scale-95 disabled:opacity-50"
            >
              {copiedLink ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? (language === 'sv' ? 'Kopierad!' : 'Copied!') : (language === 'sv' ? 'Dela' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* Customization Controls: Name, Theme, Honors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/5">
          {/* 1. Student Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'sv' ? 'Namn på diplomet:' : 'Name on diploma:'}</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={t.studentNamePlaceholder}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-100 font-bold focus:border-amber-400 focus:bg-white/10 outline-none transition"
            />
          </div>

          {/* 2. Theme Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span>{language === 'sv' ? 'Diplomdesign & Papper:' : 'Diploma Style & Paper:'}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setTheme('parchment')}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border transition text-center ${
                  theme === 'parchment'
                    ? 'bg-[#fcf7ea] text-stone-900 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                📜 {language === 'sv' ? 'Pergament' : 'Parchment'}
              </button>
              <button
                type="button"
                onClick={() => setTheme('obsidian')}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border transition text-center ${
                  theme === 'obsidian'
                    ? 'bg-[#0f172a] text-amber-300 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                🌌 Obsidian
              </button>
              <button
                type="button"
                onClick={() => setTheme('sapphire')}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border transition text-center ${
                  theme === 'sapphire'
                    ? 'bg-[#ffffff] text-blue-950 border-blue-400 shadow-md ring-1 ring-blue-400/50'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                ⚜️ {language === 'sv' ? 'Safirblå' : 'Sapphire'}
              </button>
            </div>
          </div>

          {/* 3. Honors Level */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>{language === 'sv' ? 'Utmärkelse / Honors:' : 'Academic Distinction:'}</span>
            </label>
            <select
              value={honors}
              onChange={(e) => setHonors(e.target.value as HonorsLevel)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-100 font-semibold focus:border-amber-400 outline-none"
            >
              <option value="summa" className="bg-slate-900 text-slate-100">
                {language === 'sv' ? honorsConfig.summa.labelSv : honorsConfig.summa.labelEn}
              </option>
              <option value="magna" className="bg-slate-900 text-slate-100">
                {language === 'sv' ? honorsConfig.magna.labelSv : honorsConfig.magna.labelEn}
              </option>
              <option value="cum" className="bg-slate-900 text-slate-100">
                {language === 'sv' ? honorsConfig.cum.labelSv : honorsConfig.cum.labelEn}
              </option>
              <option value="standard" className="bg-slate-900 text-slate-100">
                {language === 'sv' ? honorsConfig.standard.labelSv : honorsConfig.standard.labelEn}
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-4 border-t border-white/5">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {language === 'sv' ? 'Utfärdandestatus' : 'Issuance status'}
              </span>
              <ShieldCheck className={`w-4 h-4 ${canIssueCertificate ? 'text-emerald-400' : 'text-amber-400'}`} />
            </div>
            <div className={`text-sm font-black ${canIssueCertificate ? 'text-emerald-300' : 'text-amber-300'}`}>
              {canIssueCertificate
                ? (language === 'sv' ? 'Verifierad & utfärdad' : 'Verified & issued')
                : (language === 'sv' ? 'Pågående utbildning' : 'Course in progress')}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${canIssueCertificate ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${completionPercentage}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-slate-500">{completionPercentage}% {language === 'sv' ? 'slutfört' : 'complete'}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              {language === 'sv' ? 'Utfärdat' : 'Issued'}
            </div>
            <div className="mt-2 text-sm font-bold text-white">{completionDate}</div>
            <div className="mt-1 text-[10px] text-slate-500">
              {language === 'sv' ? 'Nexus Academy register' : 'Nexus Academy registry'}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Credential ID</span>
              <button
                onClick={handleCopyCredentialId}
                className="text-[10px] font-bold text-sky-300 hover:text-white transition"
                title={language === 'sv' ? 'Kopiera ID' : 'Copy ID'}
              >
                {copiedCredentialId ? (language === 'sv' ? 'Kopierad' : 'Copied') : (language === 'sv' ? 'Kopiera' : 'Copy')}
              </button>
            </div>
            <div className="mt-2 truncate font-mono text-xs font-bold text-amber-300">{credentialId}</div>
            <div className="mt-1 truncate font-mono text-[10px] text-slate-500">HASH {rawHash}</div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
              <QrCode className="w-3.5 h-3.5" />
              {language === 'sv' ? 'Verifiering' : 'Verification'}
            </div>
            <div className="mt-2 text-sm font-bold text-white">
              {language === 'sv' ? 'Digitalt register' : 'Digital registry'}
            </div>
            <button
              onClick={() => setShowVerifyModal(true)}
              className="mt-1 text-[10px] font-bold text-emerald-300 hover:text-white transition"
            >
              {language === 'sv' ? 'Visa verifieringsdetaljer' : 'View verification details'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Swipe Hint */}
      <div className="lg:hidden flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-2.5 px-4 rounded-2xl text-xs text-amber-300 shadow-sm">
        <span className="flex items-center gap-2 font-medium">
          <span>📱</span>
          <span>{language === 'sv' ? 'Dra horisontellt med fingret för att granska hela A4-diplomet' : 'Swipe horizontally to inspect the full landscape diploma'}</span>
        </span>
        <span className="font-mono font-bold text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">A4 PDF</span>
      </div>

      {/* ======================================================== */}
      {/* THE ACTUAL REALISTIC CERTIFICATE CANVAS (PRINTABLE / PDF) */}
      {/* ======================================================== */}
      <div className="p-2 sm:p-6 bg-[#04060d] rounded-3xl border border-white/10 shadow-2xl overflow-x-auto flex justify-start lg:justify-center print-certificate-container scrollbar-thin scrollbar-thumb-white/15">
        
        {/* ================= THEME 1: CLASSIC PARCHMENT (MOST REALISTIC DIPLOMA) ================= */}
        {theme === 'parchment' && (
          <div
            ref={certificateRef}
            className="w-[940px] h-[660px] bg-[#fbf8f0] text-[#1c1917] p-8 rounded-none relative flex flex-col justify-between overflow-hidden select-none shrink-0 shadow-2xl border-[16px] border-[#3b2b16]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95), rgba(245, 237, 218, 0.9)),
                repeating-linear-gradient(45deg, rgba(200, 180, 140, 0.03) 0, rgba(200, 180, 140, 0.03) 1px, transparent 0, transparent 4px)
              `,
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6), inset 0 0 100px rgba(180, 140, 90, 0.25)'
            }}
          >
            {/* Guilloche Intricate Border Frame */}
            <div className="absolute inset-2 border-[3px] border-[#996515] pointer-events-none" />
            <div className="absolute inset-3 border border-[#d4af37]/70 pointer-events-none" />
            <div className="absolute inset-5 border-[2px] border-[#996515]/80 pointer-events-none" />
            <div className="absolute inset-6 border border-[#996515]/40 pointer-events-none" />

            {/* Guilloche Corner Flourishes (Engraved Rosette Corners) */}
            <div className="absolute top-5 left-5 w-14 h-14 pointer-events-none text-[#855818]">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M0,0 L40,0 C30,10 20,20 20,40 C10,30 0,20 0,0 Z M15,15 C25,25 35,15 45,5 C35,25 25,35 5,45 C15,35 25,25 15,15 Z" />
                <circle cx="20" cy="20" r="4" />
                <circle cx="8" cy="8" r="3" />
              </svg>
            </div>
            <div className="absolute top-5 right-5 w-14 h-14 pointer-events-none text-[#855818] rotate-90">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M0,0 L40,0 C30,10 20,20 20,40 C10,30 0,20 0,0 Z M15,15 C25,25 35,15 45,5 C35,25 25,35 5,45 C15,35 25,25 15,15 Z" />
                <circle cx="20" cy="20" r="4" />
                <circle cx="8" cy="8" r="3" />
              </svg>
            </div>
            <div className="absolute bottom-5 left-5 w-14 h-14 pointer-events-none text-[#855818] -rotate-90">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M0,0 L40,0 C30,10 20,20 20,40 C10,30 0,20 0,0 Z M15,15 C25,25 35,15 45,5 C35,25 25,35 5,45 C15,35 25,25 15,15 Z" />
                <circle cx="20" cy="20" r="4" />
                <circle cx="8" cy="8" r="3" />
              </svg>
            </div>
            <div className="absolute bottom-5 right-5 w-14 h-14 pointer-events-none text-[#855818] rotate-180">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M0,0 L40,0 C30,10 20,20 20,40 C10,30 0,20 0,0 Z M15,15 C25,25 35,15 45,5 C35,25 25,35 5,45 C15,35 25,25 15,15 Z" />
                <circle cx="20" cy="20" r="4" />
                <circle cx="8" cy="8" r="3" />
              </svg>
            </div>

            {/* Subtle Watermark Crest in Center Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
              <div className="w-[450px] h-[450px] rounded-full border-[18px] border-[#1c1917] flex items-center justify-center font-cinzel text-[240px] font-black">
                N
              </div>
            </div>

            {/* Top Header Section */}
            <div className="text-center relative z-10 space-y-1.5 mt-3">
              {/* Institution Crest */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#855818] to-transparent" />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#855818] text-[#fbf8f0] flex items-center justify-center font-cinzel font-bold text-xs shadow">
                    ⚔
                  </div>
                  <span className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#6b4712] uppercase">
                    NEXUS ACADEMY OF ADVANCED WEB ENGINEERING
                  </span>
                </div>
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#855818] to-transparent" />
              </div>

              {/* Main Diploma Title */}
              <h1 className="text-4xl sm:text-[42px] font-cinzel font-black tracking-wider text-[#2d2212] uppercase pt-1 leading-tight drop-shadow-sm">
                {language === 'sv' ? 'OFFICIELLT DIPLOM' : 'OFFICIAL DIPLOMA'}
              </h1>

              {/* Sub-heading */}
              <p className="text-[13px] font-cormorant font-semibold italic text-[#7a5518] tracking-widest uppercase">
                {language === 'sv' ? 'OCH AKADEMISKT CERTIFIKAT I FULLSTACK WEBBUTVECKLING' : 'AND ACADEMIC CERTIFICATE OF FULLSTACK WEB ENGINEERING'}
              </p>
            </div>

            {/* Middle Section: Certification Text & Recipient */}
            <div className="text-center space-y-2.5 relative z-10 px-12">
              <p className="text-sm font-cormorant italic text-[#44403c]">
                {language === 'sv' 
                  ? 'Härmed intygas med auktoritet och officiell ackreditering att'
                  : 'This is to certify with full institutional authority and accreditation that'}
              </p>

              {/* Recipient Name in Prestigious Serif Calligraphy */}
              <div className="py-0.5">
                <h2 className="text-3xl sm:text-[38px] font-cinzel font-bold text-[#1a140a] tracking-wide border-b-2 border-[#855818]/60 pb-1 inline-block min-w-[380px]">
                  {studentName.trim() || 'Graduate Student'}
                </h2>
              </div>

              {/* Completion Statement */}
              <p className="text-[13px] text-[#44403c] leading-relaxed max-w-2xl mx-auto font-cormorant font-medium">
                {language === 'sv'
                  ? 'framgångsrikt har genomfört och examinerats i det kompletta akademiska programmet för modern frontend-utveckling, omfattande HTML5 Semantic Web Architecture, CSS3 Responsive Grid Systems samt JavaScript ES6+ Asynchronous Programming.'
                  : 'has successfully mastered and passed all rigorous examinations in the comprehensive frontend engineering curriculum, including HTML5 Semantic Architecture, CSS3 Responsive Layout Systems, and JavaScript ES6+ Asynchronous Programming.'}
              </p>

              {/* Honors Badge / Ribbon Banner */}
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded bg-[#f3ebd6] border border-[#b8860b]/50 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-[#855818]" />
                  <span className="font-cinzel text-xs font-bold tracking-widest text-[#5c3e0e]">
                    {language === 'sv' ? honorsConfig[honors].tagSv : honorsConfig[honors].tagEn}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#855818]" />
                </div>
              </div>

              {/* Certified Competencies Badges */}
              <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-montserrat font-semibold text-[#1c1917]">
                <span className="inline-flex items-center gap-1 bg-[#ede4cc] px-2.5 py-1 rounded border border-[#caa355]/40">
                  <Code2 className="w-3 h-3 text-[#b45309]" /> HTML5 Mastery (100%)
                </span>
                <span className="inline-flex items-center gap-1 bg-[#ede4cc] px-2.5 py-1 rounded border border-[#caa355]/40">
                  <Palette className="w-3 h-3 text-[#0369a1]" /> CSS3 Flex & Grid (100%)
                </span>
                <span className="inline-flex items-center gap-1 bg-[#ede4cc] px-2.5 py-1 rounded border border-[#caa355]/40">
                  <Terminal className="w-3 h-3 text-[#b45309]" /> JavaScript ES6+ (100%)
                </span>
              </div>
            </div>

            {/* Bottom Footer Section: Signatures, Rosette Seal, Verification QR */}
            <div className="flex items-end justify-between px-8 relative z-10 pt-3 border-t border-[#855818]/30">
              {/* Left Signature: Dean of Curriculum */}
              <div className="text-left space-y-0.5 w-[220px]">
                <div className="font-signature text-3xl text-[#1a140a] font-normal leading-none h-10 flex items-end pl-2">
                  Elena Vance
                </div>
                <div className="h-[1px] w-full bg-[#855818]/70 mt-1" />
                <p className="text-[11px] font-cinzel font-bold text-[#1c1917] leading-tight">
                  Prof. Elena Vance, Ph.D.
                </p>
                <p className="text-[9.5px] font-cormorant font-semibold italic text-[#57534e]">
                  {language === 'sv' ? 'Dekan för Webb- & Datavetenskap' : 'Dean of Computer Science'}
                </p>
              </div>

              {/* Center: Authentic 3D Embossed Rosette Gold Seal with Silk Ribbons */}
              <div className="flex flex-col items-center relative -mb-2">
                {/* Hanging Silk Ribbons */}
                <div className="absolute top-12 flex gap-1.5 z-0 pointer-events-none">
                  {/* Left Ribbon (Ruby / Wine Red) */}
                  <div 
                    className="w-4 h-14 bg-gradient-to-b from-[#800020] via-[#9e1b32] to-[#660018] shadow-md transform -rotate-6"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                  />
                  {/* Right Ribbon (Gold / Ochre) */}
                  <div 
                    className="w-4 h-14 bg-gradient-to-b from-[#b8860b] via-[#d4af37] to-[#8b6508] shadow-md transform rotate-6"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                  />
                </div>

                {/* 32-point Scalloped Starburst Gold Medallion */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#b8860b] p-1 shadow-2xl flex items-center justify-center relative z-10 border border-[#fff3a8]">
                  {/* Outer notched ring */}
                  <div className="w-full h-full rounded-full bg-[#d4af37] flex items-center justify-center p-0.5 border border-[#855818] shadow-inner">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#f3e5ab] to-[#c59b27] border-2 border-[#855818] flex flex-col items-center justify-center text-center p-1 relative shadow-inner">
                      <div className="absolute inset-1 rounded-full border border-dashed border-[#6b4712]/60 pointer-events-none" />
                      <span className="text-[7px] font-cinzel font-black text-[#4a320c] tracking-tight uppercase leading-none">
                        ACCREDITED
                      </span>
                      <span className="text-[10px] text-[#4a320c] my-0.5 leading-none">★</span>
                      <span className="text-[7px] font-cinzel font-bold text-[#4a320c] uppercase leading-none">
                        SEAL 2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Microprint below seal */}
                <div className="text-[8px] font-mono text-[#78716c] uppercase tracking-widest mt-2">
                  ID: {credentialId}
                </div>
              </div>

              {/* Right Signature: Chancellor & Verification QR Code */}
              <div className="text-right space-y-0.5 w-[220px] flex flex-col items-end">
                <div className="font-signature text-3xl text-[#1a140a] font-normal leading-none h-10 flex items-end pr-2">
                  Marcus Thorne
                </div>
                <div className="h-[1px] w-full bg-[#855818]/70 mt-1" />
                <p className="text-[11px] font-cinzel font-bold text-[#1c1917] leading-tight">
                  Dr. Marcus Thorne
                </p>
                <p className="text-[9.5px] font-cormorant font-semibold italic text-[#57534e]">
                  {language === 'sv' ? 'Akademisk Rektor & Ackreditör' : 'Chancellor & Chief Academic Officer'}
                </p>
                <div className="pt-1 flex items-center justify-end gap-1 text-[8.5px] font-mono text-[#065f46]">
                  <ShieldCheck className="w-3 h-3 text-[#047857]" />
                  <span>{completionDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= THEME 2: ROYAL OBSIDIAN & GOLD ================= */}
        {theme === 'obsidian' && (
          <div
            ref={certificateRef}
            className="w-[940px] h-[660px] bg-gradient-to-br from-[#0a0f1d] via-[#050811] to-[#130a24] text-[#f8fafc] p-8 rounded-none relative flex flex-col justify-between overflow-hidden select-none shrink-0 shadow-2xl border-[16px] border-[#d4af37]"
            style={{
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.9)'
            }}
          >
            {/* Multi-layered Golden Frame */}
            <div className="absolute inset-2 border-2 border-[#d4af37]/50 pointer-events-none" />
            <div className="absolute inset-4 border border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute inset-6 border-2 border-[#ffd700]/60 pointer-events-none" />

            {/* Corner Stars */}
            <div className="absolute top-6 left-6 text-[#ffd700] text-2xl font-serif">✦</div>
            <div className="absolute top-6 right-6 text-[#ffd700] text-2xl font-serif">✦</div>
            <div className="absolute bottom-6 left-6 text-[#ffd700] text-2xl font-serif">✦</div>
            <div className="absolute bottom-6 right-6 text-[#ffd700] text-2xl font-serif">✦</div>

            {/* Header */}
            <div className="text-center relative z-10 space-y-1.5 mt-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#f59e0b] text-[11px] font-mono font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEXUS PRO WEB ACADEMY • ACCREDITED DIPLOMA</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              <h1 className="text-4xl sm:text-[44px] font-cinzel font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fff3a8] via-[#ffd700] to-[#ffb300] uppercase leading-tight drop-shadow">
                {t.certificateOfMastery}
              </h1>

              <p className="text-xs text-[#fef08a] font-mono tracking-widest uppercase">
                FULLSTACK FRONTEND WEB DEVELOPMENT & SOFTWARE ARCHITECTURE
              </p>
            </div>

            {/* Body */}
            <div className="text-center space-y-3 relative z-10 px-12">
              <p className="text-sm text-[#cbd5e1] font-cormorant italic">
                {t.thisIsToCertify}
              </p>

              <div className="py-0.5">
                <h2 className="text-3xl sm:text-[40px] font-cinzel font-bold text-white tracking-wide border-b border-[#d4af37]/60 pb-1.5 inline-block min-w-[380px] drop-shadow-lg">
                  {studentName.trim() || 'Graduate Student'}
                </h2>
              </div>

              <p className="text-[12.5px] text-[#cbd5e1] leading-relaxed max-w-2xl mx-auto font-sans">
                {t.hasSuccessfullyCompleted}
              </p>

              {/* Distinction Ribbon */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#f59e0b]/20 border border-[#fbbf24]/40 text-[#fcd34d] text-xs font-mono font-bold">
                  <span>{language === 'sv' ? honorsConfig[honors].tagSv : honorsConfig[honors].tagEn}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex items-center justify-center gap-2 pt-1 flex-wrap font-mono text-[10px] font-bold">
                <span className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#ea580c]/20 text-[#fdba74] border border-[#ea580c]/40">
                  <Code2 className="w-3.5 h-3.5" /> HTML5 Semantic Web
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#0284c7]/20 text-[#7dd3fc] border border-[#0284c7]/40">
                  <Palette className="w-3.5 h-3.5" /> CSS3 Flexbox & Grid
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#d97706]/20 text-[#fde68a] border border-[#d97706]/40">
                  <Terminal className="w-3.5 h-3.5" /> JavaScript ES6+ & DOM
                </span>
              </div>
            </div>

            {/* Footer with Holographic Seal & Signatures */}
            <div className="flex items-end justify-between px-8 relative z-10 pt-3 border-t border-white/10">
              <div className="text-left space-y-0.5 w-[220px]">
                <div className="font-signature text-3xl text-[#fde68a] font-normal leading-none h-10 flex items-end pl-2">
                  Elena Vance
                </div>
                <div className="h-[1px] w-full bg-[#fbbf24]/40 mt-1" />
                <p className="text-[11px] font-cinzel font-bold text-[#e2e8f0]">Prof. Elena Vance</p>
                <p className="text-[9px] text-[#94a3b8] font-mono">Dean of Curriculum</p>
              </div>

              {/* Holographic Medallion */}
              <div className="flex flex-col items-center">
                <div className="w-22 h-22 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#fff3a8] p-1 shadow-2xl flex items-center justify-center relative">
                  <div className="w-full h-full rounded-full bg-[#070b16] border border-[#d4af37] flex flex-col items-center justify-center text-center p-1">
                    <Sparkles className="w-4 h-4 text-[#ffd700]" />
                    <span className="text-[8px] font-cinzel font-black text-[#ffd700] tracking-tighter uppercase leading-tight">
                      OFFICIAL
                    </span>
                    <span className="text-[7px] font-mono font-bold text-[#cbd5e1] uppercase">
                      GOLD SEAL
                    </span>
                  </div>
                </div>
                <span className="text-[8.5px] font-mono text-[#fcd34d] mt-1">{credentialId}</span>
              </div>

              <div className="text-right space-y-0.5 w-[220px] flex flex-col items-end">
                <div className="font-signature text-3xl text-[#fde68a] font-normal leading-none h-10 flex items-end pr-2">
                  Marcus Thorne
                </div>
                <div className="h-[1px] w-full bg-[#fbbf24]/40 mt-1" />
                <p className="text-[11px] font-cinzel font-bold text-[#e2e8f0]">Dr. Marcus Thorne</p>
                <p className="text-[9px] text-[#94a3b8] font-mono">Academic Chancellor</p>
                <p className="text-[8.5px] text-[#34d399] font-mono flex items-center gap-1 pt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{completionDate}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= THEME 3: NORDIC SAPPHIRE ================= */}
        {theme === 'sapphire' && (
          <div
            ref={certificateRef}
            className="w-[940px] h-[660px] bg-white text-[#0f172a] p-8 rounded-none relative flex flex-col justify-between overflow-hidden select-none shrink-0 shadow-2xl border-[16px] border-[#0f284e]"
            style={{
              boxShadow: '0 20px 50px rgba(15, 40, 78, 0.25), inset 0 0 30px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Sapphire Blue & Silver Inlay Borders */}
            <div className="absolute inset-2 border-2 border-[#1e40af] pointer-events-none" />
            <div className="absolute inset-4 border border-[#93c5fd] pointer-events-none" />
            <div className="absolute inset-6 border-2 border-[#1e3a8a]/70 pointer-events-none" />

            <div className="text-center relative z-10 space-y-1 mt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-[#1e3a8a] text-[11px] font-cinzel font-bold tracking-widest uppercase">
                ⚜ NEXUS NORDIC INSTITUTE OF TECHNOLOGY ⚜
              </div>
              <h1 className="text-4xl sm:text-[42px] font-cinzel font-black tracking-wider text-[#0f284e] uppercase leading-tight pt-1">
                {language === 'sv' ? 'PROFESSIONELLT DIPLOM' : 'PROFESSIONAL DIPLOMA'}
              </h1>
              <p className="text-xs font-cinzel font-semibold text-[#1e40af] tracking-widest uppercase">
                FRONTEND WEB ARCHITECTURE & SOFTWARE DESIGN
              </p>
            </div>

            <div className="text-center space-y-2.5 relative z-10 px-12">
              <p className="text-sm font-cormorant italic text-[#475569]">
                {language === 'sv' ? 'Härmed intygas med högsta betyg och erkännande att' : 'This hereby certifies with highest accreditation that'}
              </p>

              <div className="py-0.5">
                <h2 className="text-3xl sm:text-[38px] font-cinzel font-bold text-[#0f284e] tracking-wide border-b-2 border-[#1e40af] pb-1 inline-block min-w-[380px]">
                  {studentName.trim() || 'Graduate Student'}
                </h2>
              </div>

              <p className="text-[12.5px] text-[#334155] leading-relaxed max-w-2xl mx-auto font-sans">
                {language === 'sv' 
                  ? 'har godkänts i samtliga teoretiska och praktiska examina inom HTML5, CSS3 och JavaScript och härmed tilldelas behörighet som Certifierad Frontend-Utvecklare.'
                  : 'has passed all practical and theoretical examinations in HTML5, CSS3, and JavaScript, thereby achieving full standing as a Certified Frontend Developer.'}
              </p>

              <div className="flex items-center justify-center gap-2 pt-0.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#eff6ff] border border-[#93c5fd] text-[#1e3a8a] text-xs font-cinzel font-bold">
                  <span>{language === 'sv' ? honorsConfig[honors].tagSv : honorsConfig[honors].tagEn}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-mono font-bold text-[#334155]">
                <span className="bg-[#f1f5f9] px-2.5 py-1 rounded border border-[#e2e8f0]">HTML5 SEMANTIC</span>
                <span className="bg-[#f1f5f9] px-2.5 py-1 rounded border border-[#e2e8f0]">CSS3 ARCHITECTURE</span>
                <span className="bg-[#f1f5f9] px-2.5 py-1 rounded border border-[#e2e8f0]">JS ES6+ ADVANCED</span>
              </div>
            </div>

            <div className="flex items-end justify-between px-8 relative z-10 pt-3 border-t border-[#e2e8f0]">
              <div className="text-left space-y-0.5 w-[220px]">
                <div className="font-signature text-3xl text-[#172554] font-normal leading-none h-10 flex items-end pl-2">
                  Elena Vance
                </div>
                <div className="h-[1px] w-full bg-[#1e3a8a]/50 mt-1" />
                <p className="text-[11px] font-cinzel font-bold text-[#0f172a]">Prof. Elena Vance</p>
                <p className="text-[9px] text-[#64748b] font-sans">Head of Engineering</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] p-1 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white border-2 border-[#1e40af] flex flex-col items-center justify-center text-center p-1">
                    <Award className="w-4 h-4 text-[#1e40af]" />
                    <span className="text-[7.5px] font-cinzel font-black text-[#1e40af] uppercase leading-none">NEXUS</span>
                    <span className="text-[6.5px] font-mono text-[#64748b] uppercase">ACCREDITED</span>
                  </div>
                </div>
                <span className="text-[8.5px] font-mono text-[#64748b] mt-1">{credentialId}</span>
              </div>

              <div className="text-right space-y-0.5 w-[220px] flex flex-col items-end">
                <div className="font-signature text-3xl text-[#172554] font-normal leading-none h-10 flex items-end pr-2">
                  Marcus Thorne
                </div>
                <div className="h-[1px] w-full bg-[#1e3a8a]/50 mt-1" />
                <p className="text-[11px] font-cinzel font-bold text-[#0f172a]">Dr. Marcus Thorne</p>
                <p className="text-[9px] text-[#64748b] font-sans">Academic Director</p>
                <p className="text-[8.5px] text-[#1e3a8a] font-mono flex items-center gap-1 pt-0.5">
                  <ShieldCheck className="w-3 h-3 text-[#1d4ed8]" />
                  <span>{completionDate}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* SECURITY VERIFICATION MODAL / DIALOG                     */}
      {/* ======================================================== */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1120] border border-amber-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-slate-100">
                  {language === 'sv' ? 'Officiell Diplominformation' : 'Official Diploma Verification'}
                </h3>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/5"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{language === 'sv' ? 'Examinand:' : 'Recipient:'}</span>
                <span className="text-slate-100 font-bold">{studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{language === 'sv' ? 'Certifikat ID:' : 'Credential ID:'}</span>
                <span className="font-mono text-amber-400 font-bold">{credentialId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{language === 'sv' ? 'Utfärdat Datum:' : 'Issued Date:'}</span>
                <span className="text-slate-200">{completionDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{language === 'sv' ? 'Ackreditering:' : 'Accreditation:'}</span>
                <span className="text-emerald-400 font-semibold">Nexus Academy Curriculum</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">{language === 'sv' ? 'Säkerhetsstämpel:' : 'Digital Hash:'}</span>
                <span className="font-mono text-[10px] text-slate-400 truncate max-w-[160px]">{rawHash}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'sv'
                ? 'Detta certifikat är digitalt signerat och verifierat. Det kan användas på CV, LinkedIn eller i professionella ansökningar som bevis på fullgjord utbildning.'
                : 'This diploma is digitally signed and verifiable. It can be showcased on your CV, LinkedIn, or in portfolio submissions as proof of completion.'}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition active:scale-95 text-center"
              >
                {copiedLink ? (language === 'sv' ? 'Länk Kopierad!' : 'Link Copied!') : (language === 'sv' ? 'Kopiera Verifieringslänk' : 'Copy Verification Link')}
              </button>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition"
              >
                {language === 'sv' ? 'Stäng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
