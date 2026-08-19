export type ThemeMode = 'dark' | 'light';

export interface EditorTheme {
  id: string;
  name: string;
  category: string;
  mode: ThemeMode;
  description: string;
  bg: string;
  headerBg: string;
  gutterBg: string;
  gutterFg: string;
  activeLineBg: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  palette: {
    tag: string;
    attrName: string;
    string: string;
    keyword: string;
    function: string;
    comment: string;
    number: string;
    operator: string;
    punctuation: string;
  };
  previewColors: string[];
}

export const EDITOR_THEMES: EditorTheme[] = [
  {
    id: 'dracula',
    name: 'Dracula',
    category: 'Populär Dark',
    mode: 'dark',
    description: 'Klassiskt mörkt tema med distinkta lila, rosa och cyanfärgade accenter.',
    bg: '#282a36',
    headerBg: '#21222c',
    gutterBg: '#1e1f29',
    gutterFg: '#6272a4',
    activeLineBg: '#44475a33',
    textColor: '#f8f8f2',
    accentColor: '#ff79c6',
    borderColor: '#44475a',
    palette: {
      tag: '#ff79c6',
      attrName: '#50fa7b',
      string: '#f1fa8c',
      keyword: '#ff79c6',
      function: '#50fa7b',
      comment: '#6272a4',
      number: '#bd93f9',
      operator: '#ff79c6',
      punctuation: '#f8f8f2'
    },
    previewColors: ['#282a36', '#ff79c6', '#50fa7b', '#f1fa8c', '#bd93f9']
  },
  {
    id: 'monokai',
    name: 'Monokai Pro',
    category: 'Hög Kontrast',
    mode: 'dark',
    description: 'Legendariskt färgstarkt tema med rosa, lime, gult och cyan på mörk antracit.',
    bg: '#272822',
    headerBg: '#1e1f1c',
    gutterBg: '#191a16',
    gutterFg: '#75715e',
    activeLineBg: '#3e3d3244',
    textColor: '#f8f8f2',
    accentColor: '#f92672',
    borderColor: '#3e3d32',
    palette: {
      tag: '#f92672',
      attrName: '#a6e22e',
      string: '#e6db74',
      keyword: '#f92672',
      function: '#a6e22e',
      comment: '#75715e',
      number: '#ae81ff',
      operator: '#f92672',
      punctuation: '#f8f8f2'
    },
    previewColors: ['#272822', '#f92672', '#a6e22e', '#e6db74', '#66d9ef']
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    category: 'Ergonomisk',
    mode: 'dark',
    description: 'Matematiskt balanserad färgpalett med djupblå/petrol bakgrund som minskar ögontrötthet.',
    bg: '#002b36',
    headerBg: '#073642',
    gutterBg: '#00212b',
    gutterFg: '#586e75',
    activeLineBg: '#07364244',
    textColor: '#839496',
    accentColor: '#2aa198',
    borderColor: '#073642',
    palette: {
      tag: '#268bd2',
      attrName: '#93a1a1',
      string: '#2aa198',
      keyword: '#859900',
      function: '#268bd2',
      comment: '#586e75',
      number: '#d33682',
      operator: '#859900',
      punctuation: '#93a1a1'
    },
    previewColors: ['#002b36', '#268bd2', '#2aa198', '#859900', '#cb4b16']
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    category: 'Ljust Tema',
    mode: 'light',
    description: 'Varmt och behagligt pergament-tema för dagsljus och maximal läsbarhet.',
    bg: '#fdf6e3',
    headerBg: '#eee8d5',
    gutterBg: '#e6dfcb',
    gutterFg: '#93a1a1',
    activeLineBg: '#eee8d588',
    textColor: '#657b83',
    accentColor: '#268bd2',
    borderColor: '#d3368222',
    palette: {
      tag: '#268bd2',
      attrName: '#657b83',
      string: '#2aa198',
      keyword: '#859900',
      function: '#b58900',
      comment: '#93a1a1',
      number: '#d33682',
      operator: '#859900',
      punctuation: '#586e75'
    },
    previewColors: ['#fdf6e3', '#268bd2', '#2aa198', '#859900', '#cb4b16']
  },
  {
    id: 'nord',
    name: 'Nord Frost',
    category: 'Arktisk Elegans',
    mode: 'dark',
    description: 'Avskalad nordisk isblå palett inspirerad av polarnätter och glaciärer.',
    bg: '#2e3440',
    headerBg: '#242933',
    gutterBg: '#1e222a',
    gutterFg: '#4c566a',
    activeLineBg: '#434c5e33',
    textColor: '#d8dee9',
    accentColor: '#88c0d0',
    borderColor: '#434c5e',
    palette: {
      tag: '#81a1c1',
      attrName: '#8fbcbb',
      string: '#a3be8c',
      keyword: '#81a1c1',
      function: '#88c0d0',
      comment: '#616e88',
      number: '#b48ead',
      operator: '#81a1c1',
      punctuation: '#eceff4'
    },
    previewColors: ['#2e3440', '#88c0d0', '#81a1c1', '#a3be8c', '#b48ead']
  },
  {
    id: 'one-dark',
    name: 'One Dark Pro',
    category: 'Modern Studio',
    mode: 'dark',
    description: 'Det populära VS Code & Atom-temat med harmoniska blå, lila och gröna toner.',
    bg: '#1e222a',
    headerBg: '#181a1f',
    gutterBg: '#14161a',
    gutterFg: '#5c6370',
    activeLineBg: '#2c313a44',
    textColor: '#abb2bf',
    accentColor: '#61afef',
    borderColor: '#282c34',
    palette: {
      tag: '#e06c75',
      attrName: '#d19a66',
      string: '#98c379',
      keyword: '#c678dd',
      function: '#61afef',
      comment: '#5c6370',
      number: '#d19a66',
      operator: '#56b6c2',
      punctuation: '#abb2bf'
    },
    previewColors: ['#1e222a', '#61afef', '#c678dd', '#98c379', '#e06c75']
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    category: 'Elektrisk Neon',
    mode: 'dark',
    description: 'Futuristiskt mörkt tema med lysande neoncyan, magenta och elektrisk gul.',
    bg: '#0a0a14',
    headerBg: '#05050b',
    gutterBg: '#020206',
    gutterFg: '#4338ca',
    activeLineBg: '#22d3ee15',
    textColor: '#f0fdf4',
    accentColor: '#ec4899',
    borderColor: '#ec489933',
    palette: {
      tag: '#ec4899',
      attrName: '#22d3ee',
      string: '#4ade80',
      keyword: '#f43f5e',
      function: '#a855f7',
      comment: '#64748b',
      number: '#facc15',
      operator: '#06b6d4',
      punctuation: '#e2e8f0'
    },
    previewColors: ['#0a0a14', '#ec4899', '#22d3ee', '#facc15', '#4ade80']
  },
  {
    id: 'kodarena-default',
    name: 'Kodarena Obsidian',
    category: 'Standard',
    mode: 'dark',
    description: 'Kodarenans signaturtema i djup obsidian med energisk orange och smaragd.',
    bg: '#070b16',
    headerBg: '#050811',
    gutterBg: '#04060e',
    gutterFg: '#64748b',
    activeLineBg: '#f9731615',
    textColor: '#f8fafc',
    accentColor: '#f97316',
    borderColor: '#ffffff15',
    palette: {
      tag: '#fb923c',
      attrName: '#34d399',
      string: '#34d399',
      keyword: '#22d3ee',
      function: '#a78bfa',
      comment: '#64748b',
      number: '#fbbf24',
      operator: '#f472b6',
      punctuation: '#94a3b8'
    },
    previewColors: ['#070b16', '#fb923c', '#34d399', '#22d3ee', '#a78bfa']
  }
];

const THEME_STORAGE_KEY = 'kodarena_editor_theme_v1';

export function getSavedEditorTheme(): string {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && EDITOR_THEMES.some(t => t.id === saved)) {
      return saved;
    }
    return 'kodarena-default';
  } catch (e) {
    return 'kodarena-default';
  }
}

export function saveEditorTheme(themeId: string): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    window.dispatchEvent(new CustomEvent('kodarena_theme_updated', { detail: { themeId } }));
  } catch (e) {
    console.warn('Could not save theme to localStorage:', e);
  }
}

export function getThemeById(themeId: string): EditorTheme {
  return EDITOR_THEMES.find(t => t.id === themeId) || EDITOR_THEMES[7];
}
