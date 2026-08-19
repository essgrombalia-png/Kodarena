import { HtmlLessonLevel, QuizQuestion, CheatsheetCategory, WebTrack } from '../types/html';
import { HTML_CURRICULUM, HTML_QUIZZES, HTML_CHEATSHEET } from '../data/htmlCurriculum';
import { CSS_CURRICULUM, CSS_QUIZZES, CSS_CHEATSHEET } from '../data/cssCurriculum';
import { JS_CURRICULUM, JS_QUIZZES, JS_CHEATSHEET } from '../data/jsCurriculum';
import { Language } from './translations';
import { HtmlBoilerplate } from '../components/HtmlAcademy/HtmlCodeEditor';

// English translations dictionary keyed by Level ID and Exercise ID
const EN_CURRICULUM_TRANSLATIONS: Record<string, {
  levelTitle?: string;
  levelSubtitle?: string;
  badgeName?: string;
  badgeDesc?: string;
  title?: string;
  shortDesc?: string;
  theory?: string;
  task?: string;
  solutionExplanation?: string;
  hints?: string[];
  testCaseDescriptions?: Record<string, string>;
  exampleTitles?: Record<number, { title: string; explanation: string }>;
}> = {
  // HTML Tracks
  'html-lvl-1': {
    levelTitle: 'Level 1: HTML Fundamentals',
    levelSubtitle: 'Document structure, tags, headings and paragraphs',
    badgeName: 'HTML Novice',
    badgeDesc: 'Mastered core HTML tags and page structure'
  },
  'html-1-1': {
    title: 'Your First Heading & Paragraph',
    shortDesc: 'Learn the difference between <h1> and <p>',
    theory: `Welcome to HTML! HTML stands for **HyperText Markup Language** and forms the backbone of every website on the internet.

An HTML element typically consists of:
1. An **opening tag** (e.g. \`<h1>\`)
2. Content
3. A **closing tag** with a slash (e.g. \`</h1>\`)

Example:
\`\`\`html
<h1>This is a major heading</h1>
<p>This is a standard text paragraph with body text.</p>
\`\`\`

- \`<h1>\` is the most important and largest heading on a webpage.
- \`<p>\` (paragraph) is used for standard text passages.`,
    task: "Create a primary heading with the <h1> tag containing 'Welcome to HTML' and below it a paragraph with the <p> tag containing 'I am learning to build websites!'.",
    solutionExplanation: "We used <h1> for the page's primary title and <p> for the following text paragraph.",
    hints: [
      "Start with <h1> and close with </h1>.",
      "Then write <p>I am learning to build websites!</p> on the next line."
    ],
    testCaseDescriptions: {
      'tc-1': "Contains an <h1> tag with the text 'Welcome to HTML' (or Swedish equivalent)",
      'tc-2': "Contains a <p> tag with the text 'I am learning to build websites!' (or Swedish equivalent)"
    }
  },
  'html-1-2': {
    title: 'Complete HTML5 Document Structure',
    shortDesc: 'Build a professional HTML5 skeleton',
    theory: `All real-world web pages follow a standardized structure so browsers can properly parse and render the document.

Standard HTML5 structure:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Web Page</title>
</head>
<body>
  <h1>Content visible on screen</h1>
</body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` declares modern HTML5.
- \`<html>\` wraps the entire document.
- \`<head>\` contains metadata (invisible in the browser window, like page \`<title>\`).
- \`<body>\` contains all visible content (headings, images, text, buttons).`,
    task: "Create a complete HTML5 document with <!DOCTYPE html>, <html lang='en'>, a <head> containing <meta charset='UTF-8'> and <title>My First Website</title>, and a <body> containing an <h1> with 'Hello World'.",
    solutionExplanation: "We structured a complete HTML5 document with doctype, head metadata, and a body with a heading.",
    hints: [
      "Remember to include <!DOCTYPE html> on the very first line.",
      "Inside <head>, add <meta charset='UTF-8'> and <title>My First Website</title>."
    ]
  },
  'html-lvl-2': {
    levelTitle: 'Level 2: Links, Navigation & Anchors',
    levelSubtitle: '<a> tags, target="_blank", bookmarks and internal links',
    badgeName: 'Link Architect',
    badgeDesc: 'Mastered hyperlinks and navigation'
  },
  'html-lvl-3': {
    levelTitle: 'Level 3: Images & Rich Media',
    levelSubtitle: '<img>, src, alt attributes, video and audio tags',
    badgeName: 'Media Maestro',
    badgeDesc: 'Mastered web media elements'
  },
  'html-lvl-4': {
    levelTitle: 'Level 4: Ordered & Unordered Lists',
    levelSubtitle: '<ul>, <ol>, <li> and nested list trees',
    badgeName: 'List Master',
    badgeDesc: 'Mastered list hierarchies'
  },
  'html-lvl-5': {
    levelTitle: 'Level 5: Data Tables & Matrixes',
    levelSubtitle: '<table>, <thead>, <tbody>, <tr>, <th>, <td>',
    badgeName: 'Table Wizard',
    badgeDesc: 'Mastered structured data tables'
  },
  'html-lvl-6': {
    levelTitle: 'Level 6: Interactive Forms & Inputs',
    levelSubtitle: '<form>, <input>, <label>, <select>, <textarea>, and submit buttons',
    badgeName: 'Form Engineer',
    badgeDesc: 'Mastered web forms and validation'
  },
  'html-lvl-7': {
    levelTitle: 'Level 7: Semantic HTML5 Layouts',
    levelSubtitle: '<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>',
    badgeName: 'Semantic Pro',
    badgeDesc: 'Mastered modern accessible HTML5 markup'
  },
  'html-lvl-8': {
    levelTitle: 'Level 8: Head Metadata & SEO',
    levelSubtitle: '<meta> tags, Open Graph, favicons and viewport settings',
    badgeName: 'SEO Specialist',
    badgeDesc: 'Mastered head metadata and search optimization'
  },
  'html-lvl-9': {
    levelTitle: 'Level 9: Multimedia & Embeds',
    levelSubtitle: '<video>, <audio>, <source>, and <iframe> embedding',
    badgeName: 'Streaming Pro',
    badgeDesc: 'Mastered audio/video streaming tags'
  },
  'html-lvl-10': {
    levelTitle: 'Level 10: Accessibility (a11y) & ARIA',
    levelSubtitle: 'Accessible web standards, aria-labels, and screen reader markup',
    badgeName: 'A11y Champion',
    badgeDesc: 'Mastered web accessibility and ARIA'
  },
  'html-lvl-11': {
    levelTitle: 'Level 11: SVG & Vector Graphics',
    levelSubtitle: '<svg>, <circle>, <rect>, <path> and vector icons',
    badgeName: 'Vector Virtuoso',
    badgeDesc: 'Mastered scalable vector graphics in HTML'
  },
  'html-lvl-12': {
    levelTitle: 'Level 12: Full Web Project Capstone',
    levelSubtitle: 'Complete semantic multi-section responsive web portal',
    badgeName: 'HTML Master',
    badgeDesc: 'Completed the full HTML5 mastery track'
  },

  // CSS Tracks
  'css-lvl-1': {
    levelTitle: 'Level 1: CSS Fundamentals & Selectors',
    levelSubtitle: 'Selectors, color, background-color, and typography',
    badgeName: 'CSS Apprentice',
    badgeDesc: 'Mastered core CSS selectors and colors'
  },
  'css-lvl-2': {
    levelTitle: 'Level 2: The CSS Box Model',
    levelSubtitle: 'Margin, border, padding, width, and box-sizing',
    badgeName: 'Box Model Master',
    badgeDesc: 'Mastered dimensions and the CSS box model'
  },
  'css-lvl-3': {
    levelTitle: 'Level 3: Typography & Web Fonts',
    levelSubtitle: 'font-family, font-size, line-height, letter-spacing, and text styling',
    badgeName: 'Type Stylist',
    badgeDesc: 'Mastered typography and readable layouts'
  },
  'css-lvl-4': {
    levelTitle: 'Level 4: Flexbox 1 - Rows, Columns & Alignment',
    levelSubtitle: 'display: flex, justify-content, align-items, flex-direction',
    badgeName: 'Flexbox Champion',
    badgeDesc: 'Mastered 1D flexbox alignment'
  },
  'css-lvl-5': {
    levelTitle: 'Level 5: Flexbox 2 - Wrap, Grow & Shrink',
    levelSubtitle: 'flex-wrap, gap, flex-grow, flex-shrink, and order',
    badgeName: 'Flex Layout Pro',
    badgeDesc: 'Mastered dynamic flexible components'
  },
  'css-lvl-6': {
    levelTitle: 'Level 6: CSS Grid 1 - Templates & Fr Units',
    levelSubtitle: 'display: grid, grid-template-columns, fr units, gap',
    badgeName: 'Grid Architect',
    badgeDesc: 'Mastered 2D grid systems'
  },
  'css-lvl-7': {
    levelTitle: 'Level 7: CSS Grid 2 - Areas & Alignment',
    levelSubtitle: 'grid-template-areas, grid-column, grid-row spans',
    badgeName: 'Grid Master',
    badgeDesc: 'Mastered full-page grid layout areas'
  },
  'css-lvl-8': {
    levelTitle: 'Level 8: Responsive Design & Media Queries',
    levelSubtitle: '@media (max-width / min-width), fluid breakpoints for mobile/tablet',
    badgeName: 'Responsive Hero',
    badgeDesc: 'Mastered responsive cross-device styling'
  },
  'css-lvl-9': {
    levelTitle: 'Level 9: Transitions, Hover & Transforms',
    levelSubtitle: 'transition, hover states, transform: scale/rotate/translate',
    badgeName: 'Motion Designer',
    badgeDesc: 'Mastered interactive hover effects and CSS transitions'
  },
  'css-lvl-10': {
    levelTitle: 'Level 10: Positioning & Z-Index Layers',
    levelSubtitle: 'position: relative, absolute, fixed, sticky, and z-index',
    badgeName: 'Layer Commander',
    badgeDesc: 'Mastered coordinate positioning and layering'
  },
  'css-lvl-11': {
    levelTitle: 'Level 11: CSS Variables & Dynamic Themes',
    levelSubtitle: ':root, --custom-variables, var() functions for dark/light themes',
    badgeName: 'Theme Architect',
    badgeDesc: 'Mastered CSS variables and design tokens'
  },
  'css-lvl-12': {
    levelTitle: 'Level 12: Keyframe Animations & Micro-Interactions',
    levelSubtitle: '@keyframes, animation-duration, iteration-count, and glowing micro-effects',
    badgeName: 'CSS Grandmaster',
    badgeDesc: 'Mastered keyframes and cinematic CSS effects'
  },

  // JS Tracks
  'js-lvl-1': {
    levelTitle: 'Level 1: JS Basics, Console & Variables',
    levelSubtitle: 'console.log(), const, let, and string literals',
    badgeName: 'JS Pioneer',
    badgeDesc: 'Mastered console debugging and variables'
  },
  'js-lvl-2': {
    levelTitle: 'Level 2: Data Types & Template Literals',
    levelSubtitle: 'Strings, numbers, booleans, and backticks `${dynamic}`',
    badgeName: 'Syntax Master',
    badgeDesc: 'Mastered data types and template strings'
  },
  'js-lvl-3': {
    levelTitle: 'Level 3: Conditions & Logic Branching',
    levelSubtitle: 'if, else if, else, strict equality ===, &&, and ||',
    badgeName: 'Logic Solver',
    badgeDesc: 'Mastered control flow and conditional logic'
  },
  'js-lvl-4': {
    levelTitle: 'Level 4: Functions & Arrow Functions',
    levelSubtitle: 'Function declarations, parameters, return, and ES6 arrow functions',
    badgeName: 'Function Virtuoso',
    badgeDesc: 'Mastered reusable functions and arrow syntax'
  },
  'js-lvl-5': {
    levelTitle: 'Level 5: Arrays & Lists',
    levelSubtitle: 'Arrays [0], .push(), .pop(), .length, and indexing',
    badgeName: 'Array Ace',
    badgeDesc: 'Mastered array collections'
  },
  'js-lvl-6': {
    levelTitle: 'Level 6: Array Iteration Methods',
    levelSubtitle: '.map(), .filter(), .forEach(), and immutable transformations',
    badgeName: 'Iteration Expert',
    badgeDesc: 'Mastered functional array methods'
  },
  'js-lvl-7': {
    levelTitle: 'Level 7: Objects & Key-Value Stores',
    levelSubtitle: 'Object literals { name: value }, dot notation, and methods',
    badgeName: 'Object Specialist',
    badgeDesc: 'Mastered JavaScript object modeling'
  },
  'js-lvl-8': {
    levelTitle: 'Level 8: DOM Selection & Manipulation',
    levelSubtitle: 'document.getElementById, querySelector, textContent, and style',
    badgeName: 'DOM Manipulator',
    badgeDesc: 'Mastered dynamic DOM modifications'
  },
  'js-lvl-9': {
    levelTitle: 'Level 9: Event Listeners & User Interaction',
    levelSubtitle: 'addEventListener("click"), event handlers, and input events',
    badgeName: 'Event Master',
    badgeDesc: 'Mastered interactive event dispatching'
  },
  'js-lvl-10': {
    levelTitle: 'Level 10: Async JavaScript & Promises',
    levelSubtitle: 'async, await, Promises, and asynchronous control flow',
    badgeName: 'Async Champion',
    badgeDesc: 'Mastered async/await and promises'
  },
  'js-lvl-11': {
    levelTitle: 'Level 11: Dynamic Element Creation',
    levelSubtitle: 'document.createElement(), appendChild(), and dynamic list generation',
    badgeName: 'UI Generator',
    badgeDesc: 'Mastered runtime element generation'
  },
  'js-lvl-12': {
    levelTitle: 'Level 12: Fullstack Frontend Mini App',
    levelSubtitle: 'Complete interactive Web Application with HTML + CSS + JS',
    badgeName: 'Fullstack JavaScript Hero',
    badgeDesc: 'Completed the full JavaScript ES6+ frontend track'
  }
};

// Localized Boilerplates
export const EN_BOILERPLATES: HtmlBoilerplate[] = [
  {
    id: 'starter-basic',
    title: 'Standard HTML5 Starter',
    category: 'Beginner',
    icon: '🌐',
    description: 'Classic clean HTML5 starter with <!DOCTYPE html>, head, title, and body.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My New Webpage</title>
</head>
<body>
  <h1>Welcome to my website!</h1>
  <p>This is a paragraph with content.</p>
</body>
</html>`
  },
  {
    id: 'starter-styled',
    title: 'Modern Page with Embedded CSS',
    category: 'Styling',
    icon: '🎨',
    description: 'Dark theme profile card with embedded <style> tag, responsive card, and button.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Webpage</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #0b0f19;
      color: #f8fafc;
      padding: 30px;
      margin: 0;
      line-height: 1.6;
    }
    .card {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      padding: 28px;
      border-radius: 16px;
      border: 1px solid #38bdf8;
      max-width: 600px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    h1 { color: #38bdf8; margin-top: 0; font-size: 1.8rem; }
    p { color: #cbd5e1; font-size: 1.05rem; }
    button {
      background: #38bdf8;
      color: #0b0f19;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 Welcome to the Modern Web</h1>
    <p>This is a responsive, modern HTML5 starter ready to build upon.</p>
    <button onclick="alert('Button clicked successfully!')">Click Here!</button>
  </div>
</body>
</html>`
  },
  {
    id: 'starter-interactive',
    title: 'Interactive JS DOM App',
    category: 'Interactivity',
    icon: '⚡',
    description: 'HTML5 with built-in JavaScript for click events, state counters, and dynamic DOM updates.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive JavaScript App</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #080d1a; color: #f8fafc; }
    .box { background: #131d31; padding: 30px; border-radius: 20px; border: 1px solid #1e293b; max-width: 500px; margin: 0 auto; }
    .counter { font-size: 3.5rem; font-weight: bold; color: #38bdf8; margin: 15px 0; font-family: monospace; }
    button { padding: 12px 24px; font-size: 15px; font-weight: bold; border-radius: 10px; border: none; cursor: pointer; margin: 6px; }
    .btn-inc { background: #38bdf8; color: #080d1a; }
    .btn-dec { background: #f59e0b; color: #080d1a; }
    .btn-reset { background: #ef4444; color: #fff; }
  </style>
</head>
<body>
  <div class="box">
    <h1>⚡ Interactive Counter</h1>
    <p>Click the buttons to interact with the DOM using JavaScript:</p>
    <div id="display" class="counter">0</div>
    <div>
      <button class="btn-dec" id="btn-dec">- 1</button>
      <button class="btn-reset" id="btn-reset">Reset</button>
      <button class="btn-inc" id="btn-inc">+ 1</button>
    </div>
  </div>

  <script>
    let value = 0;
    const display = document.getElementById('display');
    document.getElementById('btn-inc').addEventListener('click', () => {
      value++;
      display.textContent = value;
    });
    document.getElementById('btn-dec').addEventListener('click', () => {
      value--;
      display.textContent = value;
    });
    document.getElementById('btn-reset').addEventListener('click', () => {
      value = 0;
      display.textContent = value;
    });
  </script>
</body>
</html>`
  }
];

export function getLocalizedCurriculum(track: WebTrack, lang: Language): HtmlLessonLevel[] {
  let base: HtmlLessonLevel[];
  if (track === 'css') base = CSS_CURRICULUM;
  else if (track === 'js') base = JS_CURRICULUM;
  else base = HTML_CURRICULUM;

  if (lang === 'sv') {
    return base.map(l => ({ ...l, track }));
  }

  // English mapping
  return base.map(level => {
    const lvlKey = `${track}-lvl-${level.id}`;
    const lvlTrans = EN_CURRICULUM_TRANSLATIONS[lvlKey] || {};

    const translatedExercises = level.exercises.map(exercise => {
      const exTrans = EN_CURRICULUM_TRANSLATIONS[exercise.id] || {};

      return {
        ...exercise,
        track,
        title: exTrans.title || exercise.title,
        shortDesc: exTrans.shortDesc || exercise.shortDesc,
        theory: exTrans.theory || exercise.theory,
        task: exTrans.task || exercise.task,
        solutionExplanation: exTrans.solutionExplanation || exercise.solutionExplanation,
        hints: exTrans.hints || exercise.hints,
        testCases: exercise.testCases.map(tc => ({
          ...tc,
          description: exTrans.testCaseDescriptions?.[tc.id] || tc.description
        }))
      };
    });

    return {
      ...level,
      track,
      levelTitle: lvlTrans.levelTitle || level.levelTitle,
      levelSubtitle: lvlTrans.levelSubtitle || level.levelSubtitle,
      badgeName: lvlTrans.badgeName || level.badgeName,
      badgeDesc: lvlTrans.badgeDesc || level.badgeDesc,
      exercises: translatedExercises
    };
  });
}

export function getLocalizedQuizzes(lang: Language): QuizQuestion[] {
  const allQuizzes = [
    ...HTML_QUIZZES.map(q => ({ ...q, track: 'html' as WebTrack })),
    ...CSS_QUIZZES.map(q => ({ ...q, track: 'css' as WebTrack })),
    ...JS_QUIZZES.map(q => ({ ...q, track: 'js' as WebTrack }))
  ];

  if (lang === 'sv') return allQuizzes;

  // Provide English translation for quizzes
  return allQuizzes.map(q => {
    // English version adapt
    let question = q.question;
    let explanation = q.explanation;
    let options = [...q.options];

    if (q.id === 'html-q-1') {
      question = "What does the HTML acronym stand for?";
      options = [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyperlinks and Text Markup Logic",
        "Home Tool Markup Language"
      ];
      explanation = "HTML stands for HyperText Markup Language and is the standard markup language for creating web pages.";
    } else if (q.id === 'html-q-2') {
      question = "Which HTML tag is used to create a clickable link (anchor)?";
      options = ["<a>", "<link>", "<href>", "<url>"];
      explanation = "The <a> (anchor) tag with the 'href' attribute creates links to other pages.";
    } else if (q.id === 'html-q-3') {
      question = "What is the purpose of the 'alt' attribute on an <img> tag?";
      options = [
        "Alternative text for screen readers and if the image fails to load",
        "Defines the image height in pixels",
        "Defines the image border color",
        "Makes the image alternate between two pictures"
      ];
      explanation = "The alt attribute provides descriptive text for accessibility and screen readers.";
    } else if (q.id === 'css-q-1') {
      question = "Which CSS property is used to change the background color of an element?";
      options = ["background-color", "color", "bgcolor", "background-image"];
      explanation = "background-color sets the background color, while color sets text color.";
    } else if (q.id === 'css-q-2') {
      question = "In the CSS Box Model, what is the space between the content and the border?";
      options = ["padding", "margin", "gap", "outline"];
      explanation = "Padding is the internal spacing between content and border.";
    } else if (q.id === 'js-q-1') {
      question = "Which keyword declares a variable that cannot be reassigned in JavaScript?";
      options = ["const", "let", "var", "static"];
      explanation = "const declares block-scoped constants that cannot be reassigned.";
    } else if (q.id === 'js-q-2') {
      question = "What is the result of typeof [1, 2, 3] in JavaScript?";
      options = ["'object'", "'array'", "'list'", "'undefined'"];
      explanation = "In JavaScript, arrays are technically objects, so typeof returns 'object'.";
    }

    return {
      ...q,
      question,
      options,
      explanation
    };
  });
}

export function getLocalizedCheatsheet(lang: Language): CheatsheetCategory[] {
  const allCategories = [
    ...HTML_CHEATSHEET.map(c => ({ ...c, track: 'html' as WebTrack })),
    ...CSS_CHEATSHEET.map(c => ({ ...c, track: 'css' as WebTrack })),
    ...JS_CHEATSHEET.map(c => ({ ...c, track: 'js' as WebTrack }))
  ];

  if (lang === 'sv') return allCategories;

  return allCategories.map(cat => {
    let title = cat.title;
    if (cat.id === 'html-basics') title = 'HTML5 Core Tags';
    if (cat.id === 'html-text') title = 'Text & Formatting';
    if (cat.id === 'html-media') title = 'Media & Links';
    if (cat.id === 'html-structure') title = 'Semantic Layouts';
    if (cat.id === 'css-selectors') title = 'CSS Selectors';
    if (cat.id === 'css-boxmodel') title = 'Box Model & Layout';
    if (cat.id === 'css-flexbox') title = 'Flexbox Properties';
    if (cat.id === 'css-grid') title = 'CSS Grid System';
    if (cat.id === 'js-basics') title = 'Variables & Console';
    if (cat.id === 'js-arrays') title = 'Array Methods';
    if (cat.id === 'js-dom') title = 'DOM Manipulation';

    return {
      ...cat,
      title
    };
  });
}
