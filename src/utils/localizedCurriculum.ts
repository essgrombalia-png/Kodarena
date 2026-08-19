import { HTML_CURRICULUM, HTML_QUIZZES, HTML_CHEATSHEET } from '../data/htmlCurriculum';
import { CSS_CURRICULUM, CSS_QUIZZES, CSS_CHEATSHEET } from '../data/cssCurriculum';
import { JS_CURRICULUM, JS_QUIZZES, JS_CHEATSHEET } from '../data/jsCurriculum';
import { HtmlLessonLevel, HtmlExercise, QuizQuestion, CheatsheetCategory, WebTrack } from '../types/html';
import { Language } from '../i18n/translations';

// English translations mapping for curriculum levels and exercises
export const EN_LEVEL_TRANSLATIONS: Record<string, { title: string; subtitle: string; badgeName: string; badgeDesc: string }> = {
  // HTML Levels
  'html-1': {
    title: 'Level 1: HTML Fundamentals',
    subtitle: 'Document structure, tags, headings, and paragraphs',
    badgeName: 'HTML Novice',
    badgeDesc: 'Mastered fundamental HTML tags and page structure'
  },
  'html-2': {
    title: 'Level 2: Text Formatting & Hyperlinks',
    subtitle: 'Links, anchors, formatting, bold, italics, and line breaks',
    badgeName: 'Link Architect',
    badgeDesc: 'Mastered navigation, anchors, and inline typography'
  },
  'html-3': {
    title: 'Level 3: Lists & Tables',
    subtitle: 'Ordered & unordered lists, nested structures, and tabular data',
    badgeName: 'Data Organizer',
    badgeDesc: 'Mastered lists, nested navigation, and HTML tables'
  },
  'html-4': {
    title: 'Level 4: Images & Media',
    subtitle: 'Image tags, responsive attributes, audio, video, and figures',
    badgeName: 'Media Specialist',
    badgeDesc: 'Mastered embedding images, audio, and video elements'
  },
  'html-5': {
    title: 'Level 5: Forms & Inputs',
    subtitle: 'Interactive forms, validation, checkboxes, radios, and buttons',
    badgeName: 'Form Master',
    badgeDesc: 'Mastered building interactive, validated input forms'
  },
  'html-6': {
    title: 'Level 6: Semantic HTML5 & Layout',
    subtitle: 'Header, nav, main, section, article, aside, and footer elements',
    badgeName: 'Semantic Pro',
    badgeDesc: 'Mastered accessible, modern HTML5 document architecture'
  },
  'html-7': {
    title: 'Level 7: Accessibility & SEO',
    subtitle: 'ARIA attributes, screen readers, meta tags, and open graph',
    badgeName: 'A11y & SEO Lead',
    badgeDesc: 'Mastered web accessibility and search engine optimization'
  },

  // CSS Levels
  'css-1': {
    title: 'Level 1: CSS Basics & Selectors',
    subtitle: 'Learn how CSS connects to HTML and style colors, elements, and classes.',
    badgeName: 'CSS Novice',
    badgeDesc: 'Mastered basic syntax, colors, and selectors.'
  },
  'css-2': {
    title: 'Level 2: Box Model & Spacing',
    subtitle: 'Master padding, margin, borders, width, and height.',
    badgeName: 'Box Master',
    badgeDesc: 'Mastered padding, margins, borders, and box-sizing.'
  },
  'css-3': {
    title: 'Level 3: Flexbox 1D Layout',
    subtitle: 'Flex container, flex-direction, justify-content, align-items, and gaps.',
    badgeName: 'Flexbox Wizard',
    badgeDesc: 'Mastered modern 1D flexbox alignment and layouts.'
  },
  'css-4': {
    title: 'Level 4: CSS Grid 2D Layout',
    subtitle: 'Grid template columns, rows, grid-gap, and responsive areas.',
    badgeName: 'Grid Architect',
    badgeDesc: 'Mastered 2D grid matrix layouts and auto-fit.'
  },
  'css-5': {
    title: 'Level 5: Responsive Design & Media Queries',
    subtitle: 'Mobile-first breakpoints, viewport units, and responsive components.',
    badgeName: 'Responsive Engineer',
    badgeDesc: 'Mastered mobile-first media queries and responsive styling.'
  },
  'css-6': {
    title: 'Level 6: CSS Transitions & Animations',
    subtitle: 'Smooth transitions, keyframe animations, hover effects, and transforms.',
    badgeName: 'Animation Artist',
    badgeDesc: 'Mastered keyframes, transitions, and transform effects.'
  },

  // JS Levels
  'js-1': {
    title: 'Level 1: JS Basics, Console & Variables (let & const)',
    subtitle: 'Discover the programming language of the web. Learn console logging and storing data in variables.',
    badgeName: 'JS Pioneer',
    badgeDesc: 'Wrote first lines of JavaScript and understands variables.'
  },
  'js-2': {
    title: 'Level 2: Functions, Parameters & Conditionals (if/else)',
    subtitle: 'Create reusable logic blocks and conditional decision branches.',
    badgeName: 'Logic Builder',
    badgeDesc: 'Mastered functions, return values, and conditional branching.'
  },
  'js-3': {
    title: 'Level 3: DOM Manipulation (querySelector & textContent)',
    subtitle: 'Select HTML elements, modify live text, change styles, and update classes.',
    badgeName: 'DOM Manipulator',
    badgeDesc: 'Can dynamically select and modify live HTML elements with JavaScript.'
  },
  'js-4': {
    title: 'Level 4: Event Listeners (addEventListener & click events)',
    subtitle: 'Capture user clicks, keyboard presses, inputs, and toggle UI states.',
    badgeName: 'Interactive Pro',
    badgeDesc: 'Mastered click events, input listeners, and interactive UI states.'
  },
  'js-5': {
    title: 'Level 5: Arrays & Modern ES6 Methods (map, filter, forEach)',
    subtitle: 'Store lists of data and transform them with modern declarative array methods.',
    badgeName: 'Array Master',
    badgeDesc: 'Mastered map, filter, forEach, and template literals.'
  },
  'js-6': {
    title: 'Level 6: Async JS, Promises & Fetch API',
    subtitle: 'Fetch external JSON data, handle async/await promises, and render live API results.',
    badgeName: 'Async Fullstacker',
    badgeDesc: 'Mastered fetch API, async/await, and real-time data handling.'
  }
};

// English translations mapping for exercises
export const EN_EXERCISE_TRANSLATIONS: Record<string, {
  title: string;
  shortDesc: string;
  theory: string;
  task: string;
  solutionExplanation: string;
  hints: string[];
  examples?: Array<{ title: string; explanation: string }>;
  testDescriptions?: Record<string, string>;
}> = {
  'html-1-1': {
    title: 'Your First Heading & Paragraph',
    shortDesc: 'Learn the difference between <h1> and <p>',
    theory: `Welcome to HTML! HTML stands for **HyperText Markup Language** and is the fundamental skeleton of every web page on the internet.\n\nAn HTML element typically consists of:\n1. An **opening tag** (e.g. \`<h1>\`)\n2. The content\n3. A **closing tag** with a slash (e.g. \`</h1>\`)\n\nExample:\n\`\`\`html\n<h1>This is a main heading</h1>\n<p>This is a standard text paragraph.</p>\n\`\`\`\n\n- \`<h1>\` represents the most important and primary heading on a page.\n- \`<p>\` (paragraph) is used for regular blocks of body text.`,
    task: 'Create a primary heading with the <h1> tag containing the text "Välkommen till HTML" and below it a paragraph with the <p> tag containing "Jag lär mig bygga webbsidor!".',
    solutionExplanation: 'We used <h1> for the page title and <p> for the subsequent paragraph.',
    hints: [
      'Start with <h1> and close with </h1>.',
      'Then write <p>Jag lär mig bygga webbsidor!</p> on the next line.'
    ],
    testDescriptions: {
      'tc-1': 'Contains an <h1> tag with text "Välkommen till HTML"',
      'tc-2': 'Contains a <p> tag with text "Jag lär mig bygga webbsidor!"'
    }
  },
  'html-1-2': {
    title: 'Complete HTML5 Document Structure',
    shortDesc: 'Build a standard HTML5 skeleton',
    theory: `All production web pages have a standardized structure so browsers can interpret the document correctly.\n\nStructure:\n\`\`\`html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Webpage</title>\n</head>\n<body>\n  <h1>Visible Content</h1>\n</body>\n</html>\n\`\`\`\n\n- \`<!DOCTYPE html>\` declares modern HTML5.\n- \`<html>\` wraps the entire document.\n- \`<head>\` holds metadata (title, charset, styles).\n- \`<body>\` contains all visible elements.`,
    task: 'Build a complete HTML5 document structure with <!DOCTYPE html>, <html>, <head> containing a <title>Min Första Sida</title>, and <body> containing an <h1> with text "Hej Världen!".',
    solutionExplanation: 'We created the full boilerplate skeleton with doctype, head, title, and body.',
    hints: [
      'Ensure <!DOCTYPE html> is at the very top.',
      'Place <title>Min Första Sida</title> inside <head>.',
      'Place <h1>Hej Världen!</h1> inside <body>.'
    ]
  },
  'html-1-3': {
    title: 'Heading Hierarchy (h1 through h6)',
    shortDesc: 'Structure text using semantic heading levels',
    theory: `HTML provides 6 levels of headings: \`<h1>\` to \`<h6>\`.\n\n- \`<h1>\` is the primary title (use once per page).\n- \`<h2>\` represents major sections.\n- \`<h3>\` represents subsections.\n- \`<h4>\` to \`<h6>\` provide deeper granularity.`,
    task: 'Create an <h1> with "Huvudrubrik", an <h2> with "Undersektion", and an <h3> with "Detaljerad Punkt".',
    solutionExplanation: 'Used <h1>, <h2>, and <h3> to establish a clear typographic hierarchy.',
    hints: ['Create <h1>, <h2>, and <h3> in top-to-bottom order.']
  },
  'html-1-4': {
    title: 'Comments & Clean Code',
    shortDesc: 'Add helpful code comments that browsers ignore',
    theory: `HTML comments allow developers to write internal notes without displaying them in the browser window.\n\nSyntax: \`<!-- Note here -->\``,
    task: 'Add an HTML comment <!-- Detta är en kommentar --> and below it an <h1> with "Synlig Text".',
    solutionExplanation: 'Comments are wrapped inside <!-- and -->.',
    hints: ['Wrap the comment inside <!-- and -->.']
  },
  'html-2-1': {
    title: 'Hyperlinks with the <a> Tag',
    shortDesc: 'Connect web pages using links and the href attribute',
    theory: `The \`<a>\` tag (anchor) creates links to external websites, internal pages, or email addresses.\n\nSyntax: \`<a href="https://example.com">Visit Website</a>\``,
    task: 'Create a link <a href="https://google.com">Sök på Google</a>.',
    solutionExplanation: 'The href attribute specifies the destination URL.',
    hints: ['Set href to "https://google.com" and link text to "Sök på Google".']
  },
  'html-2-2': {
    title: 'Open Links in New Tab (target="_blank")',
    shortDesc: 'Use target="_blank" and rel="noopener noreferrer"',
    theory: `To open links in a new browser tab, add \`target="_blank"\`.\nFor security and performance, also include \`rel="noopener noreferrer"\`.`,
    task: 'Create a link pointing to "https://developer.mozilla.org" with target="_blank" and rel="noopener noreferrer", with text "MDN Web Docs".',
    solutionExplanation: 'target="_blank" launches the page in a fresh tab.',
    hints: ['Include target="_blank" and rel="noopener noreferrer".']
  },
  'html-2-3': {
    title: 'Text Emphasis: <strong> and <em>',
    shortDesc: 'Bold and italicize semantic text',
    theory: `Use \`<strong>\` for strong importance (rendered bold) and \`<em>\` for emphasized text (rendered italics).`,
    task: 'Create a paragraph with text containing <strong>Viktigt:</strong> and <em>Observera noga</em>.',
    solutionExplanation: '<strong> gives strong semantic emphasis and <em> provides stress emphasis.',
    hints: ['Use <strong> and <em> inside a <p> tag.']
  },
  'html-2-4': {
    title: 'Line Breaks & Horizontal Rules (<br> & <hr>)',
    shortDesc: 'Self-closing divider tags',
    theory: `\`<br>\` inserts a line break without creating a new paragraph.\n\`<hr>\` creates a horizontal thematic divider rule. Both are void/self-closing elements.`,
    task: 'Create two lines of text separated by a <br> and divide the section with an <hr>.',
    solutionExplanation: 'Used <br> for break and <hr> for horizontal rule.',
    hints: ['Insert <br> between text and <hr> below.']
  },
  'html-3-1': {
    title: 'Unordered Lists (<ul> & <li>)',
    shortDesc: 'Build bulleted feature and item lists',
    theory: `\`<ul>\` defines an unordered bullet list. Each item is wrapped in an \`<li>\` (list item) tag.`,
    task: 'Create an unordered list <ul> with 3 list items (<li>): "HTML5", "CSS3", and "JavaScript".',
    solutionExplanation: 'Wrapped three <li> elements inside a parent <ul>.',
    hints: ['Put <li> elements inside <ul>...</ul>.']
  },
  'html-3-2': {
    title: 'Ordered Lists (<ol> & <li>)',
    shortDesc: 'Build numbered step-by-step lists',
    theory: `\`<ol>\` creates an ordered numbered list (1, 2, 3...).`,
    task: 'Create an ordered list <ol> with 3 steps: "Skriv kod", "Testa i webbläsaren", and "Publicera".',
    solutionExplanation: 'Used <ol> with three <li> steps.',
    hints: ['Wrap list items inside <ol>... </ol>.']
  },
  'html-3-3': {
    title: 'HTML Tables (<table>, <tr>, <th>, <td>)',
    shortDesc: 'Structure data in grid rows and columns',
    theory: `Tables are defined with \`<table>\`.\n- \`<tr>\` = table row\n- \`<th>\` = table header cell (bold, centered)\n- \`<td>\` = standard data cell`,
    task: 'Create a <table> with a header row (<tr>) containing <th>Namn</th> and <th>Språk</th>, followed by a data row with <td>Nexus</td> and <td>HTML5</td>.',
    solutionExplanation: 'Structured table with <tr>, <th> for headers and <td> for content.',
    hints: ['Use <table><tr><th>...</th></tr><tr><td>...</td></tr></table>.']
  },
  'html-3-4': {
    title: 'Semantic Tables (<thead>, <tbody>, <tfoot>)',
    shortDesc: 'Build accessible, well-structured data tables',
    theory: `Modern tables use \`<thead>\` for header rows, \`<tbody>\` for body data, and \`<tfoot>\` for summaries.`,
    task: 'Create a table containing <thead> with header cells and <tbody> with data cells.',
    solutionExplanation: 'Separated table header and body with thead and tbody.',
    hints: ['Place header <tr> inside <thead> and data <tr> inside <tbody>.']
  },
  'html-4-1': {
    title: 'Embedding Images (<img> & alt)',
    shortDesc: 'Display images with required alt descriptions',
    theory: `The \`<img>\` tag embeds images via \`src\` and requires an \`alt\` text for screen readers and SEO.\n\nSyntax: \`<img src="image.jpg" alt="Description">\``,
    task: 'Create an <img> tag with src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" and alt="Kod på en datorskärm".',
    solutionExplanation: 'Added <img> with src and descriptive alt text.',
    hints: ['Provide both src and alt attributes.']
  },
  'html-4-2': {
    title: 'Image Dimensions (width & height)',
    shortDesc: 'Prevent layout shift using width and height attributes',
    theory: `Providing explicit \`width\` and \`height\` attributes helps browsers allocate space before images finish downloading, preventing Cumulative Layout Shift (CLS).`,
    task: 'Create an image with src="https://via.placeholder.com/300x200", alt="Platshållare", width="300", and height="200".',
    solutionExplanation: 'Explicit width and height preserve layout proportions.',
    hints: ['Add width="300" and height="200" to the <img>.']
  },
  'html-4-3': {
    title: 'Figures & Captions (<figure> & <figcaption>)',
    shortDesc: 'Semantic media blocks with descriptive captions',
    theory: `Wrap visual assets in a \`<figure>\` tag and attach an explanatory caption with \`<figcaption>\`.`,
    task: 'Create a <figure> containing an <img> and a <figcaption>Bildbeskrivning</figcaption>.',
    solutionExplanation: 'figure and figcaption group images with their captions semantically.',
    hints: ['Wrap <img> and <figcaption> inside <figure>.']
  },
  'html-4-4': {
    title: 'Audio & Video Elements (<audio> & <video>)',
    shortDesc: 'Native media playback with controls',
    theory: `HTML5 supports native media with \`<audio controls>\` and \`<video controls width="400">\`.`,
    task: 'Create a <video controls width="320"><source src="movie.mp4" type="video/mp4"></video>.',
    solutionExplanation: 'Added video player with controls attribute.',
    hints: ['Include controls attribute on the video tag.']
  },
  'html-5-1': {
    title: 'Form Basics & Text Inputs (<form> & <input>)',
    shortDesc: 'Collect user text and submit data',
    theory: `A \`<form>\` contains interactive input controls such as \`<input type="text">\` and submission buttons.`,
    task: 'Create a <form> containing an <input type="text" placeholder="Ditt namn"> and a <button type="submit">Skicka</button>.',
    solutionExplanation: 'Wrapped text input and submit button inside a form.',
    hints: ['Place input and button inside <form>.']
  },
  'html-5-2': {
    title: 'Labels & Input Connections (<label for="...">)',
    shortDesc: 'Link labels to inputs with matching id attributes',
    theory: `Always attach a \`<label for="myId">\` matching the input's \`id="myId"\` for accessibility and easy clicking.`,
    task: 'Create a <label for="epost">E-postadress:</label> and an <input type="email" id="epost" name="epost">.',
    solutionExplanation: 'Connected label to input via matching for and id attributes.',
    hints: ['Ensure the label "for" attribute matches the input "id".']
  },
  'html-5-3': {
    title: 'Required Fields & Input Types (email, number, required)',
    shortDesc: 'Browser-native validation and constraints',
    theory: `HTML5 provides built-in validation attributes like \`required\`, \`type="email"\`, \`min\`, and \`max\`.`,
    task: 'Create an input with type="email", id="mail", and the required attribute.',
    solutionExplanation: 'Used type="email" and required for browser validation.',
    hints: ['Add type="email" and required to the input.']
  },
  'html-5-4': {
    title: 'Select Dropdowns & Textareas (<select> & <textarea>)',
    shortDesc: 'Multi-line inputs and dropdown selection menus',
    theory: `Use \`<select>\` with \`<option>\` for dropdown choices and \`<textarea>\` for multi-line user feedback.`,
    task: 'Create a <select> with options "HTML", "CSS", "JS" and a <textarea placeholder="Meddelande"></textarea>.',
    solutionExplanation: 'Created select dropdown and textarea input.',
    hints: ['Wrap options inside select and add textarea.']
  },
  'html-6-1': {
    title: 'Semantic Structure (<header>, <nav>, <main>, <footer>)',
    shortDesc: 'Architect modern, accessible web layouts',
    theory: `Semantic tags convey document structure directly to search engines and accessibility tools:\n- \`<header>\` = banner and intro\n- \`<nav>\` = navigation links\n- \`<main>\` = unique main body content\n- \`<footer>\` = copyrights and footer links`,
    task: 'Build a page layout using <header>, <nav>, <main>, and <footer> tags.',
    solutionExplanation: 'Structured full page using core semantic HTML5 landmarks.',
    hints: ['Include <header>, <nav>, <main>, and <footer> in standard order.']
  },
  'html-6-2': {
    title: 'Articles & Sections (<article> & <section>)',
    shortDesc: 'Independent content blocks vs thematic groupings',
    theory: `\`<article>\` represents self-contained syndicatable content (e.g. blog post, card).\n\`<section>\` groups thematic content with its own heading.`,
    task: 'Create a <section> containing an <h2> and an <article> with its own <h3> and <p>.',
    solutionExplanation: 'Used section for grouping and article for standalone content.',
    hints: ['Place article inside section with proper headings.']
  },
  'html-6-3': {
    title: 'Sidebar & Supplemental Content (<aside>)',
    shortDesc: 'Secondary navigation, author bio, or related links',
    theory: `The \`<aside>\` tag represents content tangentially related to the content around it (e.g. sidebar, callout box).`,
    task: 'Create an <aside> containing an <h3>Relaterade Länkar</h3> and a list.',
    solutionExplanation: 'aside denotes supplementary peripheral content.',
    hints: ['Wrap related links inside <aside>.']
  },
  'html-6-4': {
    title: 'Interactive Accordions (<details> & <summary>)',
    shortDesc: 'Native collapsible disclosure widgets without JavaScript',
    theory: `HTML5 has native accordion widgets! \`<details>\` wraps the collapsible block, and \`<summary>\` defines the clickable title heading.`,
    task: 'Create a <details> widget with a <summary>Klicka för att läsa mer</summary> and a hidden <p>Hemligt innehåll!</p>.',
    solutionExplanation: 'Native disclosure created with details and summary.',
    hints: ['Place summary and paragraph inside details.']
  },
  'html-7-1': {
    title: 'Meta Tags & Character Encoding (<meta>)',
    shortDesc: 'Charset, viewport, and SEO description',
    theory: `Meta tags in \`<head>\` configure encoding, mobile responsive scaling, and search engine snippets.`,
    task: 'Add <meta charset="UTF-8"> and <meta name="viewport" content="width=device-width, initial-scale=1.0"> in <head>.',
    solutionExplanation: 'Charset and responsive viewport meta tags configured.',
    hints: ['Add meta tags inside <head>.']
  },
  'html-7-2': {
    title: 'ARIA Roles & Screen Reader Labels (aria-label)',
    shortDesc: 'Enhance accessibility for assistive technologies',
    theory: `When an element lacks visible text (e.g. icon button), provide \`aria-label="Close dialog"\` so screen readers describe the action clearly.`,
    task: 'Create a <button aria-label="Stäng dialogruta">X</button>.',
    solutionExplanation: 'aria-label provides accessible naming.',
    hints: ['Add aria-label attribute to button.']
  },
  'html-7-3': {
    title: 'Social Sharing Meta (Open Graph & Twitter Cards)',
    shortDesc: 'Customize previews on Twitter, Facebook, and Discord',
    theory: `Open Graph meta tags (\`og:title\`, \`og:image\`, \`og:description\`) control preview cards on social networks.`,
    task: 'Add <meta property="og:title" content="Nexus Web Academy"> to <head>.',
    solutionExplanation: 'Open Graph meta property added for social previews.',
    hints: ['Add meta property="og:title" in head.']
  },
  'html-7-4': {
    title: 'Favicon & Page Icons (<link rel="icon">)',
    shortDesc: 'Set browser tab icons and web manifest',
    theory: `Link your brand icon via \`<link rel="icon" type="image/png" href="favicon.png">\`.`,
    task: 'Add a <link rel="icon" type="image/x-icon" href="favicon.ico"> inside <head>.',
    solutionExplanation: 'Linked browser tab favicon icon.',
    hints: ['Place link tag inside head with rel="icon".']
  },

  // CSS Exercises
  'css-1-1': {
    title: 'Colors & Backgrounds (color & background-color)',
    shortDesc: 'Modify element text and background colors with CSS.',
    theory: `CSS (Cascading Style Sheets) determines how HTML elements look.\n\nYou write CSS inside a <style> tag or external stylesheet.\n\nA CSS rule consists of a selector and a declaration block:\n\nh1 {\n  color: #38bdf8; /* Text color */\n  background-color: #1e293b; /* Background color */\n}`,
    task: 'Update the <style> tag so <h1> has text color "#38bdf8" and class .kort has background-color "#1e293b".',
    solutionExplanation: 'Set color on h1 and background-color on .kort class.',
    hints: ['Set h1 { color: #38bdf8; } and .kort { background-color: #1e293b; }']
  },
  'css-1-2': {
    title: 'Font Styles & Typography (font-family & font-size)',
    shortDesc: 'Control font size, line-height, and font weight.',
    theory: `Typography properties:\n• font-size: e.g. 24px, 1.5rem\n• font-weight: bold, 600, normal\n• font-family: 'Inter', sans-serif\n• text-align: center, left, right`,
    task: 'Style .titel with font-size: 28px, font-weight: bold, and text-align: center.',
    solutionExplanation: 'Configured font-size, font-weight, and text-align.',
    hints: ['Add font-size, font-weight, and text-align properties inside .titel { ... }']
  },
  'css-1-3': {
    title: 'CSS Classes & IDs (.class vs #id)',
    shortDesc: 'Target multiple elements with classes or unique elements with IDs.',
    theory: `• Class selector (.kort) matches any element with class="kort" (reusable).\n• ID selector (#huvud) matches the single element with id="huvud" (unique).`,
    task: 'Style class .framhavd with color: #f59e0b and ID #special-knapp with background-color: #6366f1.',
    solutionExplanation: 'Targeted class with dot (.) and ID with hash (#).',
    hints: ['Use .framhavd for class and #special-knapp for ID.']
  },
  'css-1-4': {
    title: 'Pseudo-classes & Hover Effects (:hover & :focus)',
    shortDesc: 'Add interactive hover and active states to buttons and links.',
    theory: `Pseudo-classes style elements during interaction:\n• :hover - when cursor hovers over element\n• :active - when element is being clicked\n• :focus - when input is focused`,
    task: 'Add a :hover state to .knapp that changes background-color to "#3b82f6" and cursor to "pointer".',
    solutionExplanation: 'Created .knapp:hover selector with custom background and cursor.',
    hints: ['Add .knapp:hover { background-color: #3b82f6; cursor: pointer; }']
  },
  'css-2-1': {
    title: 'The CSS Box Model (Padding, Border, Margin)',
    shortDesc: 'Understand the core layout model of every web element.',
    theory: `Every element on the web is a rectangular box composed of:\n1. Content\n2. Padding (inner space)\n3. Border (frame)\n4. Margin (outer spacing)`,
    task: 'Add padding: 20px, border: 2px solid #38bdf8, and margin: 15px to .box.',
    solutionExplanation: 'Applied padding, border, and margin to form the complete box model.',
    hints: ['Include padding, border, and margin inside .box.']
  },
  'css-2-2': {
    title: 'box-sizing: border-box',
    shortDesc: 'Include padding and borders within element dimensions.',
    theory: `By default (content-box), padding adds extra width. \`box-sizing: border-box\` ensures width includes padding and borders, avoiding unexpected layout overflows.`,
    task: 'Add box-sizing: border-box and width: 100% to .kort.',
    solutionExplanation: 'border-box makes sizing predictable.',
    hints: ['Add box-sizing: border-box to .kort.']
  },
  'css-2-3': {
    title: 'Borders & Rounded Corners (border-radius)',
    shortDesc: 'Create circular avatars and smooth rounded cards.',
    theory: `\`border-radius: 12px\` rounds card corners. \`border-radius: 50%\` creates perfect circles when width and height are equal.`,
    task: 'Style .kort with border-radius: 16px and .avatar with border-radius: 50%.',
    solutionExplanation: 'Set border-radius on card and circular avatar.',
    hints: ['Use border-radius: 16px and border-radius: 50%.']
  },
  'css-2-4': {
    title: 'Box Shadows & Glow (box-shadow)',
    shortDesc: 'Add depth, elevation, and glowing neon drop shadows.',
    theory: `Syntax: \`box-shadow: offset-x offset-y blur spread color\`\nExample: \`box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5)\``,
    task: 'Add box-shadow: 0 10px 30px rgba(56, 189, 248, 0.3) to .neon-kort.',
    solutionExplanation: 'Added glowing cyan drop shadow to .neon-kort.',
    hints: ['Add box-shadow property to .neon-kort.']
  },
  'css-3-1': {
    title: 'Flexbox Basics (display: flex & flex-direction)',
    shortDesc: 'Create 1D horizontal rows and vertical columns.',
    theory: `\`display: flex\` turns a parent container into a flexbox context. \`flex-direction: row\` (default) or \`column\` arranges child items.`,
    task: 'Set display: flex and flex-direction: row on .flex-container.',
    solutionExplanation: 'Enabled flexbox container with row direction.',
    hints: ['Add display: flex and flex-direction: row.']
  },
  'css-3-2': {
    title: 'Main Axis Alignment (justify-content)',
    shortDesc: 'Distribute items along the primary horizontal axis.',
    theory: `\`justify-content\` controls horizontal spacing:\n• center\n• space-between\n• space-around\n• flex-start / flex-end`,
    task: 'Set justify-content: space-between on .meny-container.',
    solutionExplanation: 'Evenly distributed items with space-between.',
    hints: ['Add justify-content: space-between.']
  },
  'css-3-3': {
    title: 'Cross Axis Alignment (align-items: center)',
    shortDesc: 'Perfect vertical centering with flexbox.',
    theory: `\`align-items\` aligns flex items vertically across the cross-axis. \`align-items: center\` achieves perfect vertical alignment.`,
    task: 'Set align-items: center and justify-content: center on .hero-banner.',
    solutionExplanation: 'Centered content perfectly both horizontally and vertically.',
    hints: ['Add justify-content: center and align-items: center.']
  },
  'css-3-4': {
    title: 'Flex Gap & Responsive Wrapping (gap & flex-wrap)',
    shortDesc: 'Modern spacing between items and auto-wrapping.',
    theory: `\`gap: 16px\` adds clean spacing between flex items without tricky margins. \`flex-wrap: wrap\` allows items to wrap naturally on small screens.`,
    task: 'Add gap: 20px and flex-wrap: wrap to .grid-kort.',
    solutionExplanation: 'Enabled flex-wrap and gap spacing.',
    hints: ['Add gap: 20px and flex-wrap: wrap.']
  },
  'css-4-1': {
    title: 'CSS Grid Matrix (display: grid & grid-template-columns)',
    shortDesc: 'Create 2D responsive column matrices.',
    theory: `\`display: grid\` creates a two-dimensional grid layout.\n\`grid-template-columns: repeat(3, 1fr)\` creates 3 equal flexible columns.`,
    task: 'Set display: grid, grid-template-columns: repeat(3, 1fr), and gap: 16px on .dashboard-grid.',
    solutionExplanation: 'Configured 3-column CSS Grid with gap.',
    hints: ['Add display: grid, grid-template-columns: repeat(3, 1fr), and gap: 16px.']
  },
  'css-4-2': {
    title: 'Grid Gap & Spacing (gap, row-gap, column-gap)',
    shortDesc: 'Control gutter spacing between grid rows and columns.',
    theory: `Use \`gap: 24px\` or separate \`row-gap: 20px\` and \`column-gap: 30px\`.`,
    task: 'Set row-gap: 20px and column-gap: 30px on .galleri.',
    solutionExplanation: 'Configured distinct row and column gaps.',
    hints: ['Add row-gap: 20px and column-gap: 30px.']
  },
  'css-4-3': {
    title: 'Auto-Fit & Responsive Grid (minmax)',
    shortDesc: 'Build fluid responsive grids without media queries.',
    theory: `\`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))\` automatically adapts column counts based on available screen width.`,
    task: 'Set grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) on .responsiv-grid.',
    solutionExplanation: 'Created auto-fitting responsive grid columns.',
    hints: ['Use repeat(auto-fit, minmax(200px, 1fr)).']
  },
  'css-4-4': {
    title: 'Grid Item Spanning (grid-column & grid-row)',
    shortDesc: 'Span featured hero items across multiple columns or rows.',
    theory: `\`grid-column: span 2\` makes a cell span across two columns. \`grid-row: span 2\` spans two rows.`,
    task: 'Make .hero-card span across 2 columns with grid-column: span 2.',
    solutionExplanation: 'Expanded hero item across 2 columns.',
    hints: ['Add grid-column: span 2 to .hero-card.']
  },
  'css-5-1': {
    title: 'Media Queries & Breakpoints (@media)',
    shortDesc: 'Adapt styles for mobile, tablet, and desktop viewports.',
    theory: `Media queries apply CSS rules only when screen criteria are met:\n\`\`\`css\n@media (max-width: 768px) {\n  .meny { flex-direction: column; }\n}\n\`\`\``,
    task: 'Add a media query @media (max-width: 600px) that sets flex-direction: column on .container.',
    solutionExplanation: 'Added responsive mobile breakpoint query.',
    hints: ['Wrap .container { flex-direction: column; } inside @media (max-width: 600px) { ... }']
  },
  'css-5-2': {
    title: 'Mobile-First Layout Strategy (@media min-width)',
    shortDesc: 'Design for mobile by default and expand on desktop.',
    theory: `Mobile-first writes clean single-column mobile styles by default, then uses \`@media (min-width: 768px)\` to enhance layout for tablets and desktops.`,
    task: 'Add @media (min-width: 768px) that changes grid-template-columns to repeat(3, 1fr).',
    solutionExplanation: 'Applied desktop expansion breakpoint with min-width.',
    hints: ['Add @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }']
  },
  'css-5-3': {
    title: 'Responsive Units (rem, vw, vh, clamp)',
    shortDesc: 'Fluid typography and dynamic viewport dimensions.',
    theory: `• 1rem = 16px (relative to root html font-size)\n• 100vw = full viewport width\n• 100vh = full viewport height\n• clamp(1rem, 2.5vw, 2rem) = fluid scaling text`,
    task: 'Set font-size: clamp(1.2rem, 3vw, 2.5rem) on .fluid-titel.',
    solutionExplanation: 'Configured fluid clamp scaling typography.',
    hints: ['Add font-size: clamp(1.2rem, 3vw, 2.5rem) to .fluid-titel.']
  },
  'css-5-4': {
    title: 'Responsive Images (max-width: 100% & object-fit)',
    shortDesc: 'Prevent images from overflowing mobile screens.',
    theory: `\`img { max-width: 100%; height: auto; }\` ensures images never overflow containers. \`object-fit: cover\` crops images cleanly without distortion.`,
    task: 'Style img with max-width: 100%, height: auto, and object-fit: cover.',
    solutionExplanation: 'Configured fluid responsive image styles.',
    hints: ['Set max-width: 100%, height: auto, and object-fit: cover.']
  },
  'css-6-1': {
    title: 'CSS Transitions (transition: all 0.3s ease)',
    shortDesc: 'Animate smooth color and size transitions.',
    theory: `Transitions interpolate style changes over time.\nSyntax: \`transition: property duration timing-function\`\nExample: \`transition: all 0.3s ease\``,
    task: 'Add transition: all 0.3s ease to .knapp and change background-color on .knapp:hover.',
    solutionExplanation: 'Smooth hover transition added to button.',
    hints: ['Add transition: all 0.3s ease to .knapp.']
  },
  'css-6-2': {
    title: 'CSS Transforms (scale, rotate, translate)',
    shortDesc: 'Scale up cards, rotate icons, and shift positions.',
    theory: `Transform properties:\n• transform: scale(1.05) - zoom in\n• transform: translateY(-5px) - float up\n• transform: rotate(45deg) - rotate`,
    task: 'Add transform: translateY(-8px) and transform: scale(1.03) to .kort:hover.',
    solutionExplanation: 'Added hover elevation transform.',
    hints: ['Add transform: translateY(-8px) scale(1.03) inside .kort:hover.']
  },
  'css-6-3': {
    title: 'Keyframe Animations (@keyframes & animation)',
    shortDesc: 'Create multi-step continuous keyframe animations.',
    theory: `Define animation timeline with @keyframes:\n\`\`\`css\n@keyframes pulsera {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n  100% { transform: scale(1); }\n}\n.puls { animation: pulsera 2s infinite ease-in-out; }\n\`\`\``,
    task: 'Create @keyframes pulsera and apply animation: pulsera 2s infinite to .glodande-cirkel.',
    solutionExplanation: 'Defined keyframes timeline and applied animation property.',
    hints: ['Define @keyframes pulsera and apply to .glodande-cirkel.']
  },
  'css-6-4': {
    title: 'Glassmorphism & Backdrop Filters (backdrop-filter: blur)',
    shortDesc: 'Create frosted glass surfaces and modern UI cards.',
    theory: `Frosted glass styling uses semi-transparent backgrounds combined with \`backdrop-filter: blur(12px)\` and subtle white border highlights.`,
    task: 'Add background: rgba(255, 255, 255, 0.05), backdrop-filter: blur(12px), and border: 1px solid rgba(255, 255, 255, 0.1) to .glas-kort.',
    solutionExplanation: 'Constructed modern glassmorphism frosted card.',
    hints: ['Add backdrop-filter: blur(12px) and translucent background.']
  },

  // JS Exercises
  'js-1-1': {
    title: 'console.log & Variables (let and const)',
    shortDesc: 'Print a welcome message to the console using console.log().',
    theory: `JavaScript (JS) is the programming language that makes web pages dynamic and interactive.\n\n• 'console.log("Hello!");' outputs messages to the browser developer console.\n• 'const' is used for variables whose value will not be reassigned.\n• 'let' is used for variables that can change later.\n\nExample:\nconst name = "Nexus";\nconsole.log("Welcome to " + name);`,
    task: 'Create a variable "const appNamn = \'Nexus\';" and log "Välkommen till Nexus" to the console using console.log("Välkommen till " + appNamn).',
    solutionExplanation: 'Defined constant appNamn and used console.log to print the message.',
    hints: ['Write: const appNamn = \'Nexus\';', 'Then write: console.log(\'Välkommen till \' + appNamn);']
  },
  'js-1-2': {
    title: 'Data Types: Strings, Numbers & Booleans',
    shortDesc: 'Work with text strings, numbers, and boolean true/false values.',
    theory: `JavaScript data types:\n• String: "Hello World"\n• Number: 42, 3.14\n• Boolean: true, false\n• typeof operator returns the type of a value`,
    task: 'Create "const poang = 100;", "const anvandare = \'Alice\';", and log their types using console.log(typeof poang).',
    solutionExplanation: 'Declared number and string variables and logged their types.',
    hints: ['Declare variables and call console.log(typeof poang).']
  },
  'js-1-3': {
    title: 'Template Literals & String Interpolation (`${...}`)',
    shortDesc: 'Format dynamic strings using backticks and placeholders.',
    theory: `Template literals use backticks (\`\`) and \`\${variable}\` to embed values cleanly without messy string concatenation.\n\nExample: \`console.log(\`Score: \${score} pts\`);\``,
    task: 'Create "const namn = \'Nexus\';" and "const version = 3;", then log using backticks: `App: ${namn} v${version}`.',
    solutionExplanation: 'Used backticks and template expression interpolation.',
    hints: ['Use backticks: `App: ${namn} v${version}`']
  },
  'js-1-4': {
    title: 'Arithmetic Operators (+, -, *, /, %)',
    shortDesc: 'Perform mathematical calculations and modulus remainder.',
    theory: `Math operators:\n• + (addition), - (subtraction), * (multiplication), / (division)\n• % (modulus/remainder, e.g. 10 % 3 is 1)`,
    task: 'Calculate the sum of 25 and 15 in a variable "const total = 25 + 15;" and log it.',
    solutionExplanation: 'Performed addition calculation and logged result.',
    hints: ['const total = 25 + 15; console.log(total);']
  },
  'js-2-1': {
    title: 'Functions & Return Values (function & return)',
    shortDesc: 'Build reusable logic blocks with input parameters and return values.',
    theory: `Functions group reusable commands:\n\`\`\`js\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\nconst msg = greet("Nexus");\nconsole.log(msg);\n\`\`\``,
    task: 'Create a function "function addera(a, b) { return a + b; }" and log addera(10, 20).',
    solutionExplanation: 'Defined addition function and logged its return value.',
    hints: ['Define function addera(a, b) { return a + b; }']
  },
  'js-2-2': {
    title: 'Arrow Functions (const fn = () => ...)',
    shortDesc: 'Modern concise ES6 arrow function syntax.',
    theory: `Arrow functions provide a clean, modern shorthand:\n\`\`\`js\nconst multiply = (x, y) => x * y;\n\`\`\``,
    task: 'Create an arrow function "const dubbla = (n) => n * 2;" and log dubbla(5).',
    solutionExplanation: 'Used ES6 arrow function syntax.',
    hints: ['const dubbla = (n) => n * 2;']
  },
  'js-2-3': {
    title: 'Conditionals (if, else if, else)',
    shortDesc: 'Control execution flow based on boolean conditions.',
    theory: `Conditionals evaluate logic:\n\`\`\`js\nif (score >= 100) {\n  console.log("Master!");\n} else {\n  console.log("Keep practicing!");\n}\n\`\`\``,
    task: 'Write an if-statement: if poang >= 50 log "Godkänd" else log "Underkänd".',
    solutionExplanation: 'Created conditional decision branch.',
    hints: ['Use if (poang >= 50) { ... } else { ... }']
  },
  'js-2-4': {
    title: 'Ternary Operator (condition ? a : b)',
    shortDesc: 'Compact one-line conditional expressions.',
    theory: `Syntax: \`const status = score >= 50 ? "Passed" : "Failed";\``,
    task: 'Use a ternary operator to assign "Online" or "Offline" based on isOnline boolean and log it.',
    solutionExplanation: 'Used ternary conditional operator.',
    hints: ['const status = isOnline ? "Online" : "Offline";']
  },
  'js-3-1': {
    title: 'Selecting Elements (document.querySelector)',
    shortDesc: 'Find HTML elements in the page DOM using CSS selectors.',
    theory: `\`document.querySelector("#myId")\` or \`document.querySelector(".myClass")\` selects live elements from the DOM.`,
    task: 'Select the heading with document.querySelector("#titel") and change its text with titel.textContent = "Ny Rubrik!";.',
    solutionExplanation: 'Selected DOM node and updated its textContent.',
    hints: ['const titel = document.querySelector("#titel"); titel.textContent = "Ny Rubrik!";']
  },
  'js-3-2': {
    title: 'Updating Live HTML (textContent & innerHTML)',
    shortDesc: 'Modify element text and inject HTML elements dynamically.',
    theory: `• textContent: safe, modifies text only.\n• innerHTML: parses and injects HTML markup tags.`,
    task: 'Select "#resultat" and set its innerHTML to "<strong>Framgång!</strong>".',
    solutionExplanation: 'Injected HTML tags dynamically via innerHTML.',
    hints: ['document.querySelector("#resultat").innerHTML = "<strong>Framgång!</strong>";']
  },
  'js-3-3': {
    title: 'Modifying CSS Styles with JavaScript (style.property)',
    shortDesc: 'Change background colors and font sizes in real time.',
    theory: `Access inline styles via \`element.style.color = "#38bdf8";\` or \`element.style.display = "none";\`.`,
    task: 'Select "#box" and set its style.backgroundColor to "#38bdf8" and style.borderRadius to "16px".',
    solutionExplanation: 'Updated inline CSS styles dynamically with JS.',
    hints: ['const box = document.querySelector("#box"); box.style.backgroundColor = "#38bdf8";']
  },
  'js-3-4': {
    title: 'Managing CSS Classes (classList.add & toggle)',
    shortDesc: 'Add, remove, and toggle styling classes dynamically.',
    theory: `\`classList\` methods:\n• element.classList.add("aktiv")\n• element.classList.remove("dold")\n• element.classList.toggle("morkt-tema")`,
    task: 'Select "#kort" and call kort.classList.add("aktiv").',
    solutionExplanation: 'Added CSS class dynamically using classList.add.',
    hints: ['document.querySelector("#kort").classList.add("aktiv");']
  },
  'js-4-1': {
    title: 'Click Events (addEventListener("click", ...))',
    shortDesc: 'Trigger actions when the user clicks a button.',
    theory: `Attach event listeners to user interactions:\n\`\`\`js\nconst btn = document.querySelector("#btn");\nbtn.addEventListener("click", () => {\n  console.log("Clicked!");\n});\n\`\`\``,
    task: 'Attach a click event listener to "#klick-knapp" that updates "#meddelande".textContent to "Knappen klickades!".',
    solutionExplanation: 'Registered click event listener to update DOM text.',
    hints: ['btn.addEventListener("click", () => { ... });']
  },
  'js-4-2': {
    title: 'Interactive Counter (State & Click Increment)',
    shortDesc: 'Build a live counter that increments on click.',
    theory: `Store counter state in a variable and update the DOM whenever the count changes.`,
    task: 'Create count variable starting at 0, increment count++ on button click and display in #rakknare.',
    solutionExplanation: 'Implemented interactive click counter application.',
    hints: ['let count = 0; btn.addEventListener("click", () => { count++; span.textContent = count; });']
  },
  'js-4-3': {
    title: 'Input Events & Live Search (input & change)',
    shortDesc: 'Listen to keystrokes and update text in real time.',
    theory: `\`input\` events fire on every keystroke in a text field:\n\`\`\`js\ninput.addEventListener("input", (e) => {\n  console.log(e.target.value);\n});\n\`\`\``,
    task: 'Listen to input on "#namn-input" and update "#forhandsgranskning".textContent = e.target.value.',
    solutionExplanation: 'Bound live keystroke input event to preview.',
    hints: ['input.addEventListener("input", (e) => { preview.textContent = e.target.value; });']
  },
  'js-4-4': {
    title: 'Form Submission Handling (e.preventDefault())',
    shortDesc: 'Prevent browser reload on form submission.',
    theory: `Forms reload the page by default. Use \`e.preventDefault()\` inside the form submit listener to handle validation with JavaScript instead.`,
    task: 'Add a submit event listener to "#formular" that calls e.preventDefault() and logs "Formulär skickat!".',
    solutionExplanation: 'Prevented page reload and processed submission.',
    hints: ['form.addEventListener("submit", (e) => { e.preventDefault(); console.log("Formulär skickat!"); });']
  },
  'js-5-1': {
    title: 'Array Basics & Looping (push, length, forEach)',
    shortDesc: 'Store lists of items and iterate through them.',
    theory: `Arrays hold ordered lists:\n\`\`\`js\nconst items = ["HTML", "CSS", "JS"];\nitems.forEach((item) => console.log(item));\n\`\`\``,
    task: 'Create an array const farger = ["Röd", "Grön", "Blå"] and log each color using farger.forEach(f => console.log(f)).',
    solutionExplanation: 'Iterated through array with forEach.',
    hints: ['farger.forEach(f => console.log(f));']
  },
  'js-5-2': {
    title: 'Transforming Arrays (Array.prototype.map)',
    shortDesc: 'Transform data into new arrays with the map() method.',
    theory: `\`map()\` returns a new array with transformed items:\n\`\`\`js\nconst numbers = [1, 2, 3];\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6]\n\`\`\``,
    task: 'Use tal.map(n => n * 10) on [1, 2, 3] and log the resulting array.',
    solutionExplanation: 'Transformed numeric array with map.',
    hints: ['const resultat = tal.map(n => n * 10); console.log(resultat);']
  },
  'js-5-3': {
    title: 'Filtering Arrays (Array.prototype.filter)',
    shortDesc: 'Extract matching items from a list with filter().',
    theory: `\`filter()\` extracts only elements that satisfy a boolean test condition.`,
    task: 'Filter array [10, 45, 80, 20, 95] to only keep numbers >= 50 and log the result.',
    solutionExplanation: 'Filtered array with comparison predicate.',
    hints: ['const godkanda = poang.filter(p => p >= 50);']
  },
  'js-5-4': {
    title: 'Array of Objects & Rendering (render list to DOM)',
    shortDesc: 'Render structured JSON objects into HTML list items.',
    theory: `Map objects into HTML strings and join them into the DOM:\n\`\`\`js\nconst users = [{ name: "Alice" }, { name: "Bob" }];\nlist.innerHTML = users.map(u => \`<li>\${u.name}</li>\`).join("");\n\`\`\``,
    task: 'Map kurser array into <li> elements and assign to #kurs-lista.innerHTML.',
    solutionExplanation: 'Rendered list of objects into DOM elements.',
    hints: ['lista.innerHTML = kurser.map(k => `<li>${k}</li>`).join("");']
  },
  'js-6-1': {
    title: 'Async/Await & Promises (Modern Asynchronous JS)',
    shortDesc: 'Execute asynchronous code without blocking the browser.',
    theory: `\`async\` functions return Promises, and \`await\` pauses execution until the promise resolves cleanly without callback hell.`,
    task: 'Create an async function "async function hamtaData()" that awaits a promise and logs "Data hämtad!".',
    solutionExplanation: 'Created async function with await.',
    hints: ['async function hamtaData() { ... }']
  },
  'js-6-2': {
    title: 'Fetch API (GET JSON Data)',
    shortDesc: 'Fetch live data from external REST APIs using fetch().',
    theory: `\`\`\`js\nconst res = await fetch("https://api.example.com/data");\nconst data = await res.json();\nconsole.log(data);\n\`\`\``,
    task: 'Call fetch and parse json with const data = await res.json(); then log data.',
    solutionExplanation: 'Fetched external JSON resource using fetch API.',
    hints: ['const res = await fetch(...); const data = await res.json();']
  },
  'js-6-3': {
    title: 'Error Handling (try...catch)',
    shortDesc: 'Handle network failures and exceptions gracefully.',
    theory: `Wrap network calls in \`try { ... } catch (error) { ... }\` to catch unexpected errors without crashing your app.`,
    task: 'Wrap fetch call in a try/catch block and log error in catch block.',
    solutionExplanation: 'Added resilient error boundary with try/catch.',
    hints: ['try { ... } catch (err) { console.error(err); }']
  },
  'js-6-4': {
    title: 'localStorage (Persistent Browser Storage)',
    shortDesc: 'Save user preferences and state across sessions.',
    theory: `\`localStorage.setItem("key", "value")\` stores data persistently in the user\'s browser even after closing the tab.`,
    task: 'Save "morkt" to localStorage using localStorage.setItem("tema", "morkt"); and read it back with getItem.',
    solutionExplanation: 'Stored and retrieved persistent data with localStorage.',
    hints: ['localStorage.setItem("tema", "morkt"); const tema = localStorage.getItem("tema");']
  }
};

// English translations for Quiz Questions
export const EN_QUIZZES: QuizQuestion[] = [
  {
    id: "q-html-1",
    track: 'html',
    levelId: 1,
    title: "HTML Fundamentals",
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighTech Modern Language",
      "HyperTransfer Mode Layout",
      "Home Tool Management Line"
    ],
    correctIndex: 0,
    explanation: "HTML stands for HyperText Markup Language and is the standard markup language for creating web pages.",
    xp: 20
  },
  {
    id: "q-html-2",
    track: 'html',
    levelId: 1,
    title: "Doctype Declaration",
    question: "Why must <!DOCTYPE html> be placed at the very top of an HTML document?",
    options: [
      "To load CSS styles",
      "To inform the browser that the document uses modern HTML5 standard rendering",
      "To encrypt the webpage",
      "To connect to JavaScript engines"
    ],
    correctIndex: 1,
    explanation: "<!DOCTYPE html> tells web browsers to render the document in standards mode according to HTML5 specifications.",
    xp: 20
  },
  {
    id: "q-html-3",
    track: 'html',
    levelId: 2,
    title: "Hyperlinks",
    question: "Which attribute in an <a> tag specifies the destination web address?",
    options: [
      "src",
      "href",
      "link",
      "url"
    ],
    correctIndex: 1,
    explanation: "The 'href' (Hypertext REFerence) attribute specifies the target URL for links.",
    xp: 20
  },
  {
    id: "q-html-4",
    track: 'html',
    levelId: 3,
    title: "Unordered Lists",
    question: "Which tag is used to create an unordered bullet list in HTML?",
    options: [
      "<ol>",
      "<ul>",
      "<list>",
      "<dl>"
    ],
    correctIndex: 1,
    explanation: "<ul> (Unordered List) creates a bulleted list, whereas <ol> creates a numbered list.",
    xp: 20
  },
  {
    id: "q-html-5",
    track: 'html',
    levelId: 4,
    title: "Images & Accessibility",
    question: "Why is the 'alt' attribute on <img> tags critical for accessibility?",
    options: [
      "It compresses image file sizes",
      "It describes the image for screen readers used by visually impaired users and if the image fails to load",
      "It changes image borders",
      "It aligns the image automatically"
    ],
    correctIndex: 1,
    explanation: "The alt attribute provides accessible text descriptions for screen readers and search engines.",
    xp: 20
  },
  {
    id: "q-html-6",
    track: 'html',
    levelId: 5,
    title: "Forms & Required Inputs",
    question: "How do you enforce that an input field must be filled in before form submission?",
    options: [
      "validate='true'",
      "required",
      "mandatory",
      "check='required'"
    ],
    correctIndex: 1,
    explanation: "Adding the 'required' boolean attribute prevents submission if the field is empty.",
    xp: 20
  },
  {
    id: "q-html-7",
    track: 'html',
    levelId: 6,
    title: "Semantic HTML5",
    question: "Which semantic tag represents the unique primary content of a document?",
    options: [
      "<section>",
      "<main>",
      "<article>",
      "<div>"
    ],
    correctIndex: 1,
    explanation: "<main> represents the dominant, unique body content of the document.",
    xp: 20
  },
  {
    id: "q-css-1",
    track: 'css',
    levelId: 1,
    title: "CSS Class Selectors",
    question: "How do you target an element with class='card' in CSS?",
    options: [
      "#card",
      ".card",
      "card",
      "*card"
    ],
    correctIndex: 1,
    explanation: "Classes are selected using a dot (.) prefix, while IDs use a hash (#) prefix.",
    xp: 20
  },
  {
    id: "q-css-2",
    track: 'css',
    levelId: 2,
    title: "The Box Model",
    question: "Which CSS property defines the inner spacing between an element's content and its border?",
    options: [
      "margin",
      "padding",
      "gap",
      "border-spacing"
    ],
    correctIndex: 1,
    explanation: "Padding is the inner space inside the border, whereas margin is outer space around the element.",
    xp: 20
  },
  {
    id: "q-css-3",
    track: 'css',
    levelId: 3,
    title: "Flexbox Main Axis",
    question: "Which flexbox property aligns items along the primary horizontal main axis?",
    options: [
      "align-items",
      "justify-content",
      "flex-direction",
      "align-content"
    ],
    correctIndex: 1,
    explanation: "justify-content aligns items along the main axis, while align-items aligns along the cross axis.",
    xp: 20
  },
  {
    id: "q-css-4",
    track: 'css',
    levelId: 4,
    title: "CSS Grid Columns",
    question: "How do you create 3 equal flexible columns in CSS Grid?",
    options: [
      "grid-template-columns: repeat(3, 1fr);",
      "grid-columns: 33% 33% 33%;",
      "display: 3-column;",
      "columns: 3;"
    ],
    correctIndex: 0,
    explanation: "repeat(3, 1fr) creates three equal columns using fractional unit sizing.",
    xp: 20
  },
  {
    id: "q-js-1",
    track: 'js',
    levelId: 1,
    title: "JavaScript Constants",
    question: "Which keyword should be used for variables whose reference should never be reassigned?",
    options: [
      "var",
      "let",
      "const",
      "static"
    ],
    correctIndex: 2,
    explanation: "'const' creates immutable block-scoped variable bindings.",
    xp: 20
  },
  {
    id: "q-js-2",
    track: 'js',
    levelId: 3,
    title: "DOM Element Selection",
    question: "Which method selects the first matching element using a standard CSS selector in JavaScript?",
    options: [
      "document.getElementById()",
      "document.querySelector()",
      "document.select()",
      "document.findFirst()"
    ],
    correctIndex: 1,
    explanation: "document.querySelector() selects any DOM element using standard CSS selector syntax.",
    xp: 20
  },
  {
    id: "q-js-3",
    track: 'js',
    levelId: 5,
    title: "Array Transformation",
    question: "Which modern array method returns a brand new array containing transformed elements?",
    options: [
      "forEach()",
      "map()",
      "filter()",
      "push()"
    ],
    correctIndex: 1,
    explanation: ".map() iterates through an array and returns a new array with the mapped values.",
    xp: 20
  }
];

// English translations for Cheatsheets
export const EN_CHEATSHEET: CheatsheetCategory[] = [
  {
    id: 'html-struct',
    track: 'html',
    title: 'HTML Structure & Boilerplate',
    icon: 'Code',
    items: [
      {
        name: '<!DOCTYPE html>',
        syntax: '<!DOCTYPE html>',
        description: 'Tells the browser to render the document according to modern HTML5 standards.',
        example: '<!DOCTYPE html>\n<html>...</html>'
      },
      {
        name: '<html>',
        syntax: '<html lang="en">...</html>',
        description: 'The root container element for all HTML web pages.',
        example: '<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>'
      },
      {
        name: '<head>',
        syntax: '<head>...</head>',
        description: 'Container for metadata, character set, title, styles, and links.',
        example: '<head>\n  <meta charset="UTF-8">\n  <title>App</title>\n</head>'
      },
      {
        name: '<body>',
        syntax: '<body>...</body>',
        description: 'Contains all visible document content rendered on screen.',
        example: '<body>\n  <h1>Welcome</h1>\n</body>'
      }
    ]
  },
  {
    id: 'css-layout',
    track: 'css',
    title: 'CSS Flexbox & Grid Layout',
    icon: 'Layers',
    items: [
      {
        name: 'display: flex',
        syntax: 'display: flex;\njustify-content: center;\nalign-items: center;',
        description: 'Enables 1D flexbox container with horizontal and vertical alignment.',
        example: '.container { display: flex; justify-content: space-between; gap: 16px; }'
      },
      {
        name: 'display: grid',
        syntax: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 20px;',
        description: 'Enables 2D matrix grid layout with flexible fractional unit columns.',
        example: '.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }'
      }
    ]
  },
  {
    id: 'js-methods',
    track: 'js',
    title: 'Modern JavaScript ES6+ Methods',
    icon: 'Terminal',
    items: [
      {
        name: 'document.querySelector',
        syntax: 'const el = document.querySelector(".btn");',
        description: 'Selects the first matching element using CSS selectors.',
        example: 'const btn = document.querySelector("#submit");\nbtn.textContent = "Saved!";'
      },
      {
        name: 'addEventListener',
        syntax: 'el.addEventListener("click", (e) => { ... });',
        description: 'Attaches an event handler for clicks, inputs, submits, or keyboard events.',
        example: 'btn.addEventListener("click", () => console.log("Clicked!"));'
      },
      {
        name: 'Array.prototype.map',
        syntax: 'const result = arr.map(item => item * 2);',
        description: 'Creates a new array populated with the results of calling a provided function.',
        example: 'const names = users.map(u => u.name);'
      },
      {
        name: 'Fetch API & async/await',
        syntax: 'const res = await fetch(url);\nconst data = await res.json();',
        description: 'Fetches asynchronous JSON resources over HTTP.',
        example: 'async function load() {\n  const res = await fetch("/api");\n  return res.json();\n}'
      }
    ]
  }
];

// Helper to resolve localized curriculum
export function getLocalizedCurriculum(language: Language | string = 'sv', track: WebTrack): HtmlLessonLevel[] {
  let sourceCurriculum: HtmlLessonLevel[];
  if (track === 'css') {
    sourceCurriculum = CSS_CURRICULUM;
  } else if (track === 'js') {
    sourceCurriculum = JS_CURRICULUM;
  } else {
    sourceCurriculum = HTML_CURRICULUM;
  }

  if (language === 'sv') {
    return sourceCurriculum;
  }

  // Map to English localized versions
  return sourceCurriculum.map((lvl) => {
    const levelKey = `${lvl.track || 'html'}-${lvl.id}`;
    const levelTrans = EN_LEVEL_TRANSLATIONS[levelKey];

    const translatedExercises: HtmlExercise[] = lvl.exercises.map((ex) => {
      const exTrans = EN_EXERCISE_TRANSLATIONS[ex.id];
      if (!exTrans) return ex;

      return {
        ...ex,
        title: exTrans.title || ex.title,
        shortDesc: exTrans.shortDesc || ex.shortDesc,
        theory: exTrans.theory || ex.theory,
        task: exTrans.task || ex.task,
        solutionExplanation: exTrans.solutionExplanation || ex.solutionExplanation,
        hints: exTrans.hints && exTrans.hints.length > 0 ? exTrans.hints : ex.hints,
        testCases: ex.testCases.map((tc) => {
          const transDesc = exTrans.testDescriptions?.[tc.id];
          return transDesc ? { ...tc, description: transDesc } : tc;
        })
      };
    });

    return {
      ...lvl,
      levelTitle: levelTrans?.title || lvl.levelTitle,
      levelSubtitle: levelTrans?.subtitle || lvl.levelSubtitle,
      badgeName: levelTrans?.badgeName || lvl.badgeName,
      badgeDesc: levelTrans?.badgeDesc || lvl.badgeDesc,
      exercises: translatedExercises
    };
  });
}

// Helper to resolve localized quizzes
export function getLocalizedQuizzes(language: Language | string = 'sv'): QuizQuestion[] {
  if (language === 'sv') {
    return [
      ...HTML_QUIZZES.map(q => ({ ...q, track: 'html' as WebTrack })),
      ...CSS_QUIZZES.map(q => ({ ...q, track: 'css' as WebTrack })),
      ...JS_QUIZZES.map(q => ({ ...q, track: 'js' as WebTrack }))
    ];
  }
  return EN_QUIZZES;
}

// Helper to resolve localized cheatsheet
export function getLocalizedCheatsheet(language: Language | string = 'sv'): CheatsheetCategory[] {
  if (language === 'sv') {
    return [
      ...HTML_CHEATSHEET.map(c => ({ ...c, track: 'html' as WebTrack })),
      ...CSS_CHEATSHEET.map(c => ({ ...c, track: 'css' as WebTrack })),
      ...JS_CHEATSHEET.map(c => ({ ...c, track: 'js' as WebTrack }))
    ];
  }
  return EN_CHEATSHEET;
}
