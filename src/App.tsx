/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HtmlAcademy } from './components/HtmlAcademy/HtmlAcademy';
import { AppErrorBoundary } from './components/AppErrorBoundary';
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


