/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HtmlAcademy } from './components/HtmlAcademy/HtmlAcademy';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { PortfolioView } from './components/HtmlAcademy/PortfolioView';
import { UserHtmlProgress } from './types/html';
import { Language } from './i18n/translations';

const LANG_STORAGE_KEY = 'nexus_web_academy_lang_v1';
const ACTIVE_ACCOUNT_STORAGE_KEY = 'nexus_academy_active_account_v1';

export interface AcademyAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface SharedPortfolio {
  account: Omit<AcademyAccount, 'password' | 'createdAt'>;
  progress: Pick<UserHtmlProgress, 'totalXp' | 'streakDays' | 'completedExerciseIds' | 'completedProjectIds'>;
}

function getSharedPortfolio(): SharedPortfolio | null {
  try {
    const encoded = new URLSearchParams(window.location.search).get('profile');
    if (!encoded) return null;
    const decoded = JSON.parse(decodeURIComponent(atob(encoded))) as SharedPortfolio;
    if (!decoded.account?.name || !decoded.progress) return null;
    return decoded;
  } catch {
    return null;
  }
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

export default function App() {
  const [sharedPortfolio] = useState<SharedPortfolio | null>(() => getSharedPortfolio());
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' || saved === 'sv') return saved;
    } catch {}
    return 'sv';
  });

  const [currentUser, setCurrentUser] = useState<AcademyAccount | null>(() => getStoredActiveAccount());

  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'sv' ? 'en' : 'sv';
    setLanguage(nextLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    } catch {}
  };

  const handleAuthChange = (account: AcademyAccount | null) => {
    setCurrentUser(account);
    saveStoredActiveAccount(account);
  };

  if (sharedPortfolio) {
    return (
      <AppErrorBoundary>
        <div className="app-shell min-h-screen bg-transparent text-slate-100">
          <PortfolioView
            account={sharedPortfolio.account}
            progress={{
              ...sharedPortfolio.progress,
              level: 1,
              lastActiveDate: new Date().toISOString(),
              activeTrack: 'html',
              solvedQuizIds: [],
              unlockedBadgeIds: [],
              savedPlaygroundCodes: [],
              activeExerciseId: 'html-1-1'
            }}
            language={language}
            onEditProfile={() => window.history.back()}
            onShareProfile={() => navigator.clipboard?.writeText(window.location.href)}
          />
        </div>
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
      <div className="app-shell w-full min-h-screen bg-transparent text-slate-100">
        <HtmlAcademy
          language={language}
          onToggleLanguage={handleToggleLanguage}
          currentUser={currentUser}
          onAuthChange={handleAuthChange}
        />
      </div>
    </AppErrorBoundary>
  );
}


