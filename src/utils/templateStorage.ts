import { CustomCodeTemplate, WebTrack } from '../types/html';

const TEMPLATES_STORAGE_KEY = 'kodarena_user_templates_v1';

// Default starter custom templates if none exist
export const DEFAULT_USER_TEMPLATES: CustomCodeTemplate[] = [
  {
    id: 'user-tmpl-navbar',
    title: 'Responsiv Flexbox Navbar',
    category: 'HTML & CSS',
    icon: '🧭',
    description: 'En snygg mörk navigationsmeny med logotyp, länkar och hover-effekter.',
    code: `<nav style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 14px 24px; border-radius: 12px; color: #fff; font-family: sans-serif;">
  <div style="font-weight: bold; font-size: 1.1rem; color: #38bdf8;">🌐 MinSajt</div>
  <div style="display: flex; gap: 16px;">
    <a href="#" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Hem</a>
    <a href="#" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Tjänster</a>
    <a href="#" style="color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 600;">Kontakt</a>
  </div>
</nav>`,
    createdAt: new Date().toISOString(),
    tags: ['nav', 'flexbox', 'komponent'],
    track: 'html'
  },
  {
    id: 'user-tmpl-cta-button',
    title: 'Animerad Glödknapp (Glow Button)',
    category: 'CSS Effekter',
    icon: '✨',
    description: 'Knapp med modern gradient, skugga och aktiv tryckeffekt.',
    code: `<button style="background: linear-gradient(135deg, #f97316, #eab308); color: #050811; font-weight: 800; border: none; padding: 12px 28px; border-radius: 9999px; font-size: 15px; cursor: pointer; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4); transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
  🚀 Utforska Nu
</button>`,
    createdAt: new Date().toISOString(),
    tags: ['button', 'css', 'gradient'],
    track: 'css'
  },
  {
    id: 'user-tmpl-js-fetch',
    title: 'Async/Await Datahämtare (API)',
    category: 'JavaScript',
    icon: '⚡',
    description: 'Enkel asynkron funktion för att anropa API och visa resultat i DOM.',
    code: `<script>
  async function loadData() {
    try {
      console.log('🔄 Hämtar data...');
      // Simulera API anrop
      const res = await new Promise(r => setTimeout(() => r({ status: 200, user: 'Anna' }), 500));
      console.log('✅ Mottagen data:', res);
      document.getElementById('statusBox').innerText = 'Inloggad som: ' + res.user;
    } catch (err) {
      console.error('❌ Fel vid hämtning:', err);
    }
  }
</script>
<div id="statusBox" style="padding: 10px; background: #1e293b; color: #38bdf8; border-radius: 8px; font-family: monospace;">Klicka för att ladda</div>
<button onclick="loadData()" style="margin-top: 8px; padding: 8px 16px; border-radius: 6px; background: #38bdf8; color: #0f172a; border: none; font-weight: bold; cursor: pointer;">Kör API Anrop</button>`,
    createdAt: new Date().toISOString(),
    tags: ['js', 'async', 'api', 'dom'],
    track: 'js'
  }
];

export function getSavedUserTemplates(): CustomCodeTemplate[] {
  try {
    const raw = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (!raw) {
      // Initialize with default templates
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(DEFAULT_USER_TEMPLATES));
      return DEFAULT_USER_TEMPLATES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return DEFAULT_USER_TEMPLATES;
  } catch (e) {
    console.warn('Could not read user templates from localStorage:', e);
    return DEFAULT_USER_TEMPLATES;
  }
}

export function saveUserTemplate(template: Omit<CustomCodeTemplate, 'id' | 'createdAt'> & { id?: string }): CustomCodeTemplate {
  const current = getSavedUserTemplates();
  const id = template.id || `tmpl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const existingIndex = current.findIndex(t => t.id === id);
  let savedItem: CustomCodeTemplate;

  if (existingIndex >= 0) {
    savedItem = {
      ...current[existingIndex],
      ...template,
      id,
      updatedAt: now
    };
    current[existingIndex] = savedItem;
  } else {
    savedItem = {
      id,
      title: template.title.trim() || 'Namnlös Mall',
      category: template.category || 'Mina Mallar',
      icon: template.icon || '📝',
      description: template.description || '',
      code: template.code,
      createdAt: now,
      tags: template.tags || [],
      track: template.track || 'html'
    };
    current.unshift(savedItem);
  }

  try {
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('kodarena_templates_updated'));
  } catch (e) {
    console.error('Failed to save template to localStorage:', e);
  }

  return savedItem;
}

export function deleteUserTemplate(id: string): boolean {
  try {
    const current = getSavedUserTemplates();
    const filtered = current.filter(t => t.id !== id);
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('kodarena_templates_updated'));
    return true;
  } catch (e) {
    console.error('Failed to delete template:', e);
    return false;
  }
}

export function exportUserTemplatesAsJson(): string {
  const templates = getSavedUserTemplates();
  return JSON.stringify(templates, null, 2);
}

export function importUserTemplatesFromJson(jsonString: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, count: 0, error: 'Ogiltigt format: JSON måste vara en lista av mallar.' };
    }

    const current = getSavedUserTemplates();
    const existingIds = new Set(current.map(t => t.id));
    let addedCount = 0;

    for (const item of parsed) {
      if (item && typeof item === 'object' && item.title && typeof item.code === 'string') {
        const id = item.id && !existingIds.has(item.id) 
          ? item.id 
          : `imported-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        
        current.unshift({
          id,
          title: String(item.title),
          category: item.category || 'Importerat',
          icon: item.icon || '📦',
          description: item.description || '',
          code: item.code,
          createdAt: item.createdAt || new Date().toISOString(),
          tags: Array.isArray(item.tags) ? item.tags : [],
          track: item.track || 'html'
        });
        existingIds.add(id);
        addedCount++;
      }
    }

    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('kodarena_templates_updated'));
    return { success: true, count: addedCount };
  } catch (e: any) {
    return { success: false, count: 0, error: e?.message || 'Kunde inte tolka JSON-filen.' };
  }
}
