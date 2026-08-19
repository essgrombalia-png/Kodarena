import { HtmlLessonLevel, QuizQuestion, CheatsheetCategory } from '../types/html';

export const CSS_CURRICULUM: HtmlLessonLevel[] = [
  {
    id: 1,
    track: 'css',
    levelTitle: 'Nivå 1: CSS Grunder & Selektorer',
    levelSubtitle: 'Lär dig hur CSS kopplas till HTML och hur du stylar färger, element och klasser.',
    icon: 'Palette',
    badgeName: 'CSS Novis',
    badgeDesc: 'Har bemästrat grundläggande syntax, färger och selektorer.',
    requiredXp: 0,
    exercises: [
      {
        id: 'css-1-1',
        track: 'css',
        title: 'Färger och Bakgrunder (color & background-color)',
        shortDesc: 'Ändra text- och bakgrundsfärg på element med CSS.',
        difficulty: 'nyborjare',
        xpReward: 25,
        theory: `CSS (Cascading Style Sheets) är språket som bestämmer hur HTML-element ska se ut.\n\nDu kan skriva CSS inuti en <style>-tagg i <head> eller toppen av ditt dokument.\n\nEn CSS-regel består av en selektor och ett deklarationsblock:\n\nh1 {\n  color: #38bdf8; /* Ändrar textfärg */\n  background-color: #1e293b; /* Ändrar bakgrundsfärg */\n}`,
        examples: [
          {
            title: 'Färger på rubrik och stycke',
            code: `<style>\n  h1 { color: #f59e0b; }\n  p { color: #94a3b8; background-color: #0f172a; }\n</style>`,
            explanation: 'Sätter gult på alla <h1> och mörkgrå bakgrund med ljusgrå text på alla <p>.'
          }
        ],
        task: 'Ändra i <style>-taggen så att <h1> får textfärgen "#38bdf8" och klassen .kort får bakgrundsfärgen "#1e293b".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>CSS Färger</title>
  <style>
    /* Skriv din CSS här nedan */
    h1 {
      
    }
    .kort {
      
    }
  </style>
</head>
<body>
  <div class="kort">
    <h1>Min Första CSS-sida</h1>
    <p>CSS gör webben färgstark och levande!</p>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>CSS Färger</title>
  <style>
    h1 {
      color: #38bdf8;
    }
    .kort {
      background-color: #1e293b;
    }
  </style>
</head>
<body>
  <div class="kort">
    <h1>Min Första CSS-sida</h1>
    <p>CSS gör webben färgstark och levande!</p>
  </div>
</body>
</html>`,
        solutionExplanation: 'Vi använde "color: #38bdf8;" för <h1> och "background-color: #1e293b;" för .kort.',
        hints: [
          'För <h1> ska du använda: color: #38bdf8;',
          'För .kort ska du använda: background-color: #1e293b;'
        ],
        testCases: [
          {
            id: 'tc-css-color',
            description: 'h1 ska ha textfärgen #38bdf8',
            cssCheck: { selector: 'h1', property: 'color' }
          },
          {
            id: 'tc-css-bg',
            description: '.kort ska ha bakgrundsfärgen #1e293b',
            cssCheck: { selector: '.kort', property: 'background-color' }
          }
        ]
      },
      {
        id: 'css-1-2',
        track: 'css',
        title: 'Klass- och ID-selektorer (.klass och #id)',
        shortDesc: 'Styla specifika element med punkt (.) för klasser och brädgård (#) för ID.',
        difficulty: 'nyborjare',
        xpReward: 30,
        theory: `I CSS kan du rikta in dig på specifika element:\n\n1. Element-selektor: 'p { ... }' påverkar alla paragrafer.\n2. Klass-selektor (punkt): '.knapp { ... }' påverkar alla element med class="knapp". Flera element kan dela samma klass.\n3. ID-selektor (hashtag): '#huvudrubrik { ... }' påverkar det unika elementet med id="huvudrubrik".`,
        examples: [
          {
            title: 'Exempel på selektorer',
            code: `<style>\n  .accent { color: #10b981; }\n  #special { background: #3b82f6; }\n</style>`,
            explanation: '.accent matchar <span class="accent"> och #special matchar <div id="special">.'
          }
        ],
        task: 'Skapa en CSS-regel för klassen ".viktig" som ger textfärgen "#ef4444", och en regel för ID:t "#banner" med bakgrundsfärgen "#0f172a".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    /* Skriv dina regler för .viktig och #banner här */
    
  </style>
</head>
<body>
  <div id="banner">
    <h2>Nyhetsbrev</h2>
    <p class="viktig">Detta är ett viktigt meddelande!</p>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .viktig {
      color: #ef4444;
    }
    #banner {
      background-color: #0f172a;
    }
  </style>
</head>
<body>
  <div id="banner">
    <h2>Nyhetsbrev</h2>
    <p class="viktig">Detta är ett viktigt meddelande!</p>
  </div>
</body>
</html>`,
        solutionExplanation: 'Klasser inleds med punkt (.viktig) och IDs med brädgård (#banner).',
        hints: [
          'Skriv .viktig { color: #ef4444; }',
          'Skriv #banner { background-color: #0f172a; }'
        ],
        testCases: [
          {
            id: 'tc-class',
            description: '.viktig ska ha textfärg #ef4444',
            cssCheck: { selector: '.viktig', property: 'color' }
          },
          {
            id: 'tc-id',
            description: '#banner ska ha bakgrundsfärg #0f172a',
            cssCheck: { selector: '#banner', property: 'background' }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    track: 'css',
    levelTitle: 'Nivå 2: Typografi & Teckensnitt',
    levelSubtitle: 'Formge text med typsnitt, textstorlek, radavstånd och textjustering.',
    icon: 'Type',
    badgeName: 'Typografi Mästare',
    badgeDesc: 'Formger professionell och lättläst text med CSS.',
    requiredXp: 55,
    exercises: [
      {
        id: 'css-2-1',
        track: 'css',
        title: 'Font-family, Font-size och Font-weight',
        shortDesc: 'Ställ in snygga moderna typsnitt och justera textens tjocklek.',
        difficulty: 'nyborjare',
        xpReward: 30,
        theory: `CSS låter dig styra typografin i detalj:\n\n• 'font-family': Sätter typsnitt, t.ex. sans-serif eller system-ui.\n• 'font-size': Textstorlek i px, rem eller em (t.ex. 24px eller 1.5rem).\n• 'font-weight': Tjocklek (normal, bold, 400, 700).\n• 'text-align': Justering (left, center, right, justify).\n• 'line-height': Radavstånd (t.ex. 1.6).`,
        examples: [
          {
            title: 'Modern typografiregel',
            code: `body {\n  font-family: system-ui, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n}`,
            explanation: 'Ger en ren, lättläst grund för hela sidan.'
          }
        ],
        task: 'Styla body med "font-family: sans-serif", sätt "font-size: 28px" på <h1> och centrera texten i <h1> med "text-align: center".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      /* Sätt font-family här */
    }
    h1 {
      /* Sätt font-size och text-align här */
    }
  </style>
</head>
<body>
  <h1>Välkommen till Webbkursen</h1>
  <p>Lättläst typografi gör all skillnad för användarupplevelsen.</p>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: sans-serif;
    }
    h1 {
      font-size: 28px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Välkommen till Webbkursen</h1>
  <p>Lättläst typografi gör all skillnad för användarupplevelsen.</p>
</body>
</html>`,
        solutionExplanation: 'Vi lade till font-family: sans-serif på body, samt font-size: 28px och text-align: center på h1.',
        hints: [
          'Skriv font-family: sans-serif; inuti body-blocket.',
          'Skriv font-size: 28px; och text-align: center; inuti h1-blocket.'
        ],
        testCases: [
          {
            id: 'tc-font-family',
            description: 'body ska använda font-family: sans-serif',
            cssCheck: { selector: 'body', property: 'font-family' }
          },
          {
            id: 'tc-font-size',
            description: 'h1 ska ha font-size: 28px',
            cssCheck: { selector: 'h1', property: 'font-size' }
          },
          {
            id: 'tc-text-align',
            description: 'h1 ska vara centrerad (text-align: center)',
            cssCheck: { selector: 'h1', property: 'text-align' }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    track: 'css',
    levelTitle: 'Nivå 3: Box-modellen (Padding, Margin, Border)',
    levelSubtitle: 'Förstå marginaler, utfyllnad och ramar – kärnan i CSS-layout.',
    icon: 'Layout',
    badgeName: 'Box Model Expert',
    badgeDesc: 'Bygger balanserade layouter med perfekt marginal och ramkontroll.',
    requiredXp: 115,
    exercises: [
      {
        id: 'css-3-1',
        track: 'css',
        title: 'Padding, Margin och Border-radius',
        shortDesc: 'Skapa ett snyggt kort med inre och yttre marginaler samt runda hörn.',
        difficulty: 'nyborjare',
        xpReward: 35,
        theory: `Box-modellen består av fyra delar från insidan och ut:\n\n1. Content: Själva texten eller bilden.\n2. Padding: Inre marginal (mellan innehållet och kanten).\n3. Border: Kanten/ramen runt elementet.\n4. Margin: Yttre marginal (avståndet till andra element).\n\n• 'border-radius': Gör hörnen runda (t.ex. 16px).\n• 'box-sizing: border-box': Säkerställer att padding och border räknas in i elementets totala bredd.`,
        examples: [
          {
            title: 'Stilrent kort',
            code: `.box {\n  padding: 20px;\n  margin: 15px 0;\n  border: 1px solid #334155;\n  border-radius: 12px;\n}`,
            explanation: 'Ger 20px inre luft, 15px yttre mellanrum och 12px runda hörn.'
          }
        ],
        task: 'Styla .kort med "padding: 24px", "margin: 20px", "border: 1px solid #38bdf8" och "border-radius: 16px".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .kort {
      background-color: #1e293b;
      color: #fff;
      /* Lägg till padding, margin, border och border-radius här */
    }
  </style>
</head>
<body>
  <div class="kort">
    <h2>Interaktivt Box-kort</h2>
    <p>Detta kort har luftigt innehåll och mjuka hörn.</p>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .kort {
      background-color: #1e293b;
      color: #fff;
      padding: 24px;
      margin: 20px;
      border: 1px solid #38bdf8;
      border-radius: 16px;
    }
  </style>
</head>
<body>
  <div class="kort">
    <h2>Interaktivt Box-kort</h2>
    <p>Detta kort har luftigt innehåll och mjuka hörn.</p>
  </div>
</body>
</html>`,
        solutionExplanation: 'Vi applicerade padding, margin, border och border-radius på .kort.',
        hints: [
          'Skriv padding: 24px; inuti .kort',
          'Skriv margin: 20px; inuti .kort',
          'Skriv border: 1px solid #38bdf8; och border-radius: 16px;'
        ],
        testCases: [
          {
            id: 'tc-padding',
            description: '.kort ska ha padding: 24px',
            cssCheck: { selector: '.kort', property: 'padding' }
          },
          {
            id: 'tc-margin',
            description: '.kort ska ha margin: 20px',
            cssCheck: { selector: '.kort', property: 'margin' }
          },
          {
            id: 'tc-border-radius',
            description: '.kort ska ha border-radius: 16px',
            cssCheck: { selector: '.kort', property: 'border-radius' }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    track: 'css',
    levelTitle: 'Nivå 4: Färgeffekter, Skuggor & Gradients',
    levelSubtitle: 'Skapa visuellt djup med box-shadow, linear-gradient och transparens.',
    icon: 'Sparkles',
    badgeName: 'Skugg- och Gradientmästare',
    badgeDesc: 'Skapar moderna 3D-effekter och eleganta färgövergångar.',
    requiredXp: 180,
    exercises: [
      {
        id: 'css-4-1',
        track: 'css',
        title: 'Box-shadow och Linear-gradient',
        shortDesc: 'Ge kort och knappar ett lyft med mjuka skuggor och färgtoningar.',
        difficulty: 'medel',
        xpReward: 35,
        theory: `Med CSS gradients och skuggor skapar du modern design:\n\n• 'background: linear-gradient(135deg, #1e1b4b, #0f172a);' skapar en diagonal färgövergång.\n• 'box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);' skapar en mjuk skugga med X-förskjutning, Y-förskjutning, oskärpa (blur) och färg.`,
        examples: [
          {
            title: 'Svävande knapp',
            code: `.knapp {\n  background: linear-gradient(to right, #38bdf8, #818cf8);\n  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);\n}`,
            explanation: 'Skapar en neonaktig gradientknapp med en matchande glödande skugga.'
          }
        ],
        task: 'Styla .hero med en linjär gradient "background: linear-gradient(135deg, #1e1b4b, #0f172a)" och en skugga "box-shadow: 0 10px 30px rgba(0,0,0,0.5)".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .hero {
      padding: 30px;
      border-radius: 20px;
      color: #fff;
      /* Lägg till linear-gradient och box-shadow här */
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Futuristisk Hero-sektion</h1>
    <p>Skapad med CSS linear-gradient och box-shadow.</p>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .hero {
      padding: 30px;
      border-radius: 20px;
      color: #fff;
      background: linear-gradient(135deg, #1e1b4b, #0f172a);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Futuristisk Hero-sektion</h1>
    <p>Skapad med CSS linear-gradient och box-shadow.</p>
  </div>
</body>
</html>`,
        solutionExplanation: 'Vi lade till linear-gradient och box-shadow för att skapa djup och stil.',
        hints: [
          'Skriv background: linear-gradient(135deg, #1e1b4b, #0f172a);',
          'Skriv box-shadow: 0 10px 30px rgba(0,0,0,0.5);'
        ],
        testCases: [
          {
            id: 'tc-gradient',
            description: '.hero ska ha en linear-gradient bakgrund',
            cssCheck: { selector: '.hero', property: 'linear-gradient' }
          },
          {
            id: 'tc-shadow',
            description: '.hero ska ha box-shadow',
            cssCheck: { selector: '.hero', property: 'box-shadow' }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    track: 'css',
    levelTitle: 'Nivå 5: Flexbox – Grund & Centrerad Layout',
    levelSubtitle: 'Bemästra display: flex, justify-content och align-items.',
    icon: 'Layers',
    badgeName: 'Flexbox Arkitekt',
    badgeDesc: 'Positionerar och centrerar element med Flexbox.',
    requiredXp: 250,
    exercises: [
      {
        id: 'css-5-1',
        track: 'css',
        title: 'Perfekt Centrerat Innehåll med Flexbox',
        shortDesc: 'Centrera element både horisontellt och vertikalt med 3 rader CSS.',
        difficulty: 'medel',
        xpReward: 40,
        theory: `Flexbox är det modernaste och enklaste sättet att arrangera element i en dimension (rader eller kolumner).\n\nFör att centrera ett element i mitten av en behållare:\n\n.container {\n  display: flex;\n  justify-content: center; /* Horisontell centrering */\n  align-items: center;     /* Vertikal centrering */\n  gap: 15px;               /* Mellanrum mellan barn-elementen */\n}`,
        examples: [
          {
            title: 'Centrerad meny i rad',
            code: `.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}`,
            explanation: 'Placerar logotypen till vänster och länkarna till höger med automatiskt avstånd emellan.'
          }
        ],
        task: 'Styla .meny med "display: flex", "justify-content: space-between", "align-items: center" och "gap: 20px".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .meny {
      background: #1e293b;
      padding: 16px 24px;
      border-radius: 12px;
      /* Lägg till Flexbox-egenskaper här */
    }
    .lankar a {
      color: #38bdf8;
      margin-left: 15px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <nav class="meny">
    <div class="logo">🚀 NexusWeb</div>
    <div class="lankar">
      <a href="#hem">Hem</a>
      <a href="#kurser">Kurser</a>
      <a href="#kontakt">Kontakt</a>
    </div>
  </nav>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .meny {
      background: #1e293b;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .lankar a {
      color: #38bdf8;
      margin-left: 15px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <nav class="meny">
    <div class="logo">🚀 NexusWeb</div>
    <div class="lankar">
      <a href="#hem">Hem</a>
      <a href="#kurser">Kurser</a>
      <a href="#kontakt">Kontakt</a>
    </div>
  </nav>
</body>
</html>`,
        solutionExplanation: 'Vi lade till display: flex, justify-content: space-between, align-items: center och gap: 20px.',
        hints: [
          'Skriv display: flex; inuti .meny',
          'Skriv justify-content: space-between; och align-items: center;'
        ],
        testCases: [
          {
            id: 'tc-flex',
            description: '.meny ska ha display: flex',
            cssCheck: { selector: '.meny', property: 'display' }
          },
          {
            id: 'tc-justify',
            description: '.meny ska ha justify-content: space-between',
            cssCheck: { selector: '.meny', property: 'justify-content' }
          },
          {
            id: 'tc-align',
            description: '.meny ska ha align-items: center',
            cssCheck: { selector: '.meny', property: 'align-items' }
          }
        ]
      }
    ]
  },
  {
    id: 6,
    track: 'css',
    levelTitle: 'Nivå 6: CSS Grid – Tvådimensionell Layout',
    levelSubtitle: 'Skapa responsiva rutnät med grid-template-columns och repeat(auto-fit).',
    icon: 'Layout',
    badgeName: 'CSS Grid Specialist',
    badgeDesc: 'Bygger kraftfulla rutnätslayouter för gallerier och dashboards.',
    requiredXp: 330,
    exercises: [
      {
        id: 'css-6-1',
        track: 'css',
        title: '3-Kolumners Kortrutnät med CSS Grid',
        shortDesc: 'Dela upp dina kort i 3 jämna kolumner med repeat(3, 1fr) och gap.',
        difficulty: 'medel',
        xpReward: 40,
        theory: `Medan Flexbox är bra för 1 dimension (rad ELLER kolumn), är CSS Grid bäst för 2 dimensioner (rader OCH kolumner samtidigt).\n\n• 'display: grid;'\n• 'grid-template-columns: repeat(3, 1fr);' (3 lika breda kolumner)\n• 'gap: 20px;' (Mellanrum mellan cellerna)`,
        examples: [
          {
            title: 'Responsivt galleri',
            code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}`,
            explanation: 'Anpassar antalet kolumner automatiskt beroende på skärmbredd!'
          }
        ],
        task: 'Styla .kort-grid med "display: grid", "grid-template-columns: repeat(3, 1fr)" och "gap: 20px".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .kort-grid {
      /* Lägg till CSS Grid här */
    }
    .kort {
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="kort-grid">
    <div class="kort"><h3>Kort 1</h3><p>Innehåll för första kortet.</p></div>
    <div class="kort"><h3>Kort 2</h3><p>Innehåll för andra kortet.</p></div>
    <div class="kort"><h3>Kort 3</h3><p>Innehåll för tredje kortet.</p></div>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .kort-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .kort {
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="kort-grid">
    <div class="kort"><h3>Kort 1</h3><p>Innehåll för första kortet.</p></div>
    <div class="kort"><h3>Kort 2</h3><p>Innehåll för andra kortet.</p></div>
    <div class="kort"><h3>Kort 3</h3><p>Innehåll för tredje kortet.</p></div>
  </div>
</body>
</html>`,
        solutionExplanation: 'CSS Grid delar upp behållaren i 3 lika stora kolumner med 20px mellanrum.',
        hints: [
          'Skriv display: grid; inuti .kort-grid',
          'Skriv grid-template-columns: repeat(3, 1fr); och gap: 20px;'
        ],
        testCases: [
          {
            id: 'tc-grid-disp',
            description: '.kort-grid ska ha display: grid',
            cssCheck: { selector: '.kort-grid', property: 'grid' }
          },
          {
            id: 'tc-grid-cols',
            description: '.kort-grid ska ha grid-template-columns med repeat eller 1fr',
            cssCheck: { selector: '.kort-grid', property: 'grid-template-columns' }
          },
          {
            id: 'tc-grid-gap',
            description: '.kort-grid ska ha gap: 20px',
            cssCheck: { selector: '.kort-grid', property: 'gap' }
          }
        ]
      }
    ]
  },
  {
    id: 7,
    track: 'css',
    levelTitle: 'Nivå 7: Hover-effekter & Övergångar (Transitions)',
    levelSubtitle: 'Gör knappar och kort interaktiva med :hover, transform och transition.',
    icon: 'Zap',
    badgeName: 'Interaktivitets Pro',
    badgeDesc: 'Skapar silkeslena mikrografik-animationer och hover-effekter.',
    requiredXp: 410,
    exercises: [
      {
        id: 'css-7-1',
        track: 'css',
        title: 'Svävande knapp med transition & transform',
        shortDesc: 'Animera knappens lyft och glöd vid mushovring.',
        difficulty: 'medel',
        xpReward: 40,
        theory: `Med pseudo-klassen ':hover' och 'transition' skapar du smidiga animationer:\n\n• 'transition: all 0.3s ease;' gör alla ändringar mjuka över 0.3 sekunder.\n• 'transform: translateY(-4px);' lyfter upp elementet 4 pixlar vid hover.\n• 'cursor: pointer;' visar hand-pekaren.`,
        examples: [
          {
            title: 'Interaktiv hover-knapp',
            code: `.knapp {\n  transition: transform 0.2s, background-color 0.2s;\n}\n.knapp:hover {\n  transform: scale(1.05);\n  background-color: #0284c7;\n}`,
            explanation: 'Gör knappen 5% större och lite mörkare blå när musen dras över.'
          }
        ],
        task: 'Lägg till "transition: transform 0.3s ease" på .knapp, och i .knapp:hover lägger du till "transform: translateY(-4px)" och "background-color: #0284c7".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .knapp {
      background-color: #38bdf8;
      color: #0f172a;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      /* Lägg till transition här */
    }
    .knapp:hover {
      /* Lägg till transform och background-color här */
    }
  </style>
</head>
<body>
  <div style="padding: 40px; text-align: center;">
    <button class="knapp">Håll musen över mig!</button>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .knapp {
      background-color: #38bdf8;
      color: #0f172a;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .knapp:hover {
      transform: translateY(-4px);
      background-color: #0284c7;
    }
  </style>
</head>
<body>
  <div style="padding: 40px; text-align: center;">
    <button class="knapp">Håll musen över mig!</button>
  </div>
</body>
</html>`,
        solutionExplanation: 'Transition gör transform-effekten mjuk och responsiv.',
        hints: [
          'Skriv transition: transform 0.3s ease; inuti .knapp',
          'Skriv transform: translateY(-4px); och background-color: #0284c7; inuti .knapp:hover'
        ],
        testCases: [
          {
            id: 'tc-trans',
            description: '.knapp ska ha transition',
            cssCheck: { selector: '.knapp', property: 'transition' }
          },
          {
            id: 'tc-hover',
            description: '.knapp:hover ska ha transform med translateY(-4px)',
            cssCheck: { selector: '.knapp:hover', property: 'transform' }
          }
        ]
      }
    ]
  },
  {
    id: 8,
    track: 'css',
    levelTitle: 'Nivå 8: Responsivitet med Media Queries (@media)',
    levelSubtitle: 'Anpassa layouten för mobiler, surfplattor och stora skärmar.',
    icon: 'Smartphone',
    badgeName: 'Mobilresponsiv Mästare',
    badgeDesc: 'Bygger webbplatser som ser fantastiska ut på alla enheter.',
    requiredXp: 490,
    exercises: [
      {
        id: 'css-8-1',
        track: 'css',
        title: 'Mobilanpassning med @media (max-width: 600px)',
        shortDesc: 'Byt layout från 2 kolumner till 1 kolumn på mobila skärmar.',
        difficulty: 'avancerad',
        xpReward: 45,
        theory: `Media Queries låter dig applicera CSS-regler endast när skärmen har en viss bredd:\n\n@media (max-width: 600px) {\n  .container {\n    flex-direction: column; /* Staplar elementen vertikalt på mobilen */\n  }\n}`,
        examples: [
          {
            title: 'Responsiv text och stapling',
            code: `@media (max-width: 768px) {\n  h1 { font-size: 20px; }\n  .kolumner { flex-direction: column; }\n}`,
            explanation: 'Minskar rubrikstorleken och staplar kolumnerna när skärmen är under 768px.'
          }
        ],
        task: 'Skapa en media query "@media (max-width: 600px)" och sätt "flex-direction: column" på ".container" när skärmen är mobilanpassad.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .container {
      display: flex;
      gap: 20px;
    }
    .box {
      flex: 1;
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      color: #fff;
    }
    /* Lägg till din @media (max-width: 600px) här under */
    
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Vänster Kolumn</div>
    <div class="box">Höger Kolumn</div>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .container {
      display: flex;
      gap: 20px;
    }
    .box {
      flex: 1;
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      color: #fff;
    }
    @media (max-width: 600px) {
      .container {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Vänster Kolumn</div>
    <div class="box">Höger Kolumn</div>
  </div>
</body>
</html>`,
        solutionExplanation: 'När fönstret är smalare än 600px ändras flex-direction till column.',
        hints: [
          'Skriv @media (max-width: 600px) { .container { flex-direction: column; } }'
        ],
        testCases: [
          {
            id: 'tc-media',
            description: 'Koden ska innehålla en @media (max-width: 600px) regel',
            cssCheck: { selector: '@media', property: 'max-width' }
          },
          {
            id: 'tc-flex-col',
            description: '.container ska få flex-direction: column inuti media queryn',
            cssCheck: { selector: '.container', property: 'flex-direction' }
          }
        ]
      }
    ]
  },
  {
    id: 9,
    track: 'css',
    levelTitle: 'Nivå 9: CSS Positionering (relative, absolute, fixed, sticky)',
    levelSubtitle: 'Positionera element med millimeterprecision och z-index.',
    icon: 'Sliders',
    badgeName: 'Positioneringsarkitekt',
    badgeDesc: 'Mästrar precision och överlappande lager med CSS position.',
    requiredXp: 575,
    exercises: [
      {
        id: 'css-9-1',
        track: 'css',
        title: 'Badge och Overlay med position: absolute',
        shortDesc: 'Placera en "NYHET"-badge i övre högra hörnet på ett relativt kort.',
        difficulty: 'avancerad',
        xpReward: 45,
        theory: `Positionering i CSS:\n\n• 'position: relative;' fungerar som referenspunkt för inre absoluta element.\n• 'position: absolute;' placerar elementet exakt relativt till sin närmaste positionerade förälder med top, right, bottom, left.\n• 'position: sticky;' fastnar när man skrollar.\n• 'z-index: 10;' bestämmer vilket lager som syns överst.`,
        examples: [
          {
            title: 'Hörn-badge',
            code: `.kort { position: relative; }\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}`,
            explanation: 'Placerar badgen 10px från övre högra kanten.'
          }
        ],
        task: 'Sätt "position: relative" på .kort och "position: absolute; top: 12px; right: 12px;" på .badge.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .kort {
      background: #1e293b;
      padding: 30px;
      border-radius: 16px;
      color: #fff;
      /* Sätt position relative här */
    }
    .badge {
      background: #ef4444;
      color: #fff;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      /* Sätt position absolute, top och right här */
    }
  </style>
</head>
<body>
  <div class="kort">
    <span class="badge">HOT</span>
    <h2>Premium Kursmodul</h2>
    <p>Exklusivt innehåll för webbutvecklare.</p>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    .kort {
      background: #1e293b;
      padding: 30px;
      border-radius: 16px;
      color: #fff;
      position: relative;
    }
    .badge {
      background: #ef4444;
      color: #fff;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      position: absolute;
      top: 12px;
      right: 12px;
    }
  </style>
</head>
<body>
  <div class="kort">
    <span class="badge">HOT</span>
    <h2>Premium Kursmodul</h2>
    <p>Exklusivt innehåll för webbutvecklare.</p>
  </div>
</body>
</html>`,
        solutionExplanation: 'Position relative skapar koordinatsystemet för position absolute.',
        hints: [
          'Skriv position: relative; på .kort',
          'Skriv position: absolute; top: 12px; right: 12px; på .badge'
        ],
        testCases: [
          {
            id: 'tc-pos-rel',
            description: '.kort ska ha position: relative',
            cssCheck: { selector: '.kort', property: 'relative' }
          },
          {
            id: 'tc-pos-abs',
            description: '.badge ska ha position: absolute',
            cssCheck: { selector: '.badge', property: 'absolute' }
          }
        ]
      }
    ]
  },
  {
    id: 10,
    track: 'css',
    levelTitle: 'Nivå 10: Pseudo-klasser & Element (:nth-child, ::before, ::after)',
    levelSubtitle: 'Skapa dekorativa ikoner och randiga listor utan extra HTML.',
    icon: 'Sparkles',
    badgeName: 'Pseudo-element Trollkarl',
    badgeDesc: 'Skapar grafiska element och mikrostyling med ::before och :nth-child.',
    requiredXp: 665,
    exercises: [
      {
        id: 'css-10-1',
        track: 'css',
        title: 'Randiga tabeller och dekorativa citat',
        shortDesc: 'Använd :nth-child(even) för att ge varannan rad en mörkare ton.',
        difficulty: 'avancerad',
        xpReward: 45,
        theory: `Pseudo-klasser och element låter dig styla utan extra klasser:\n\n• 'li:nth-child(even)': matchar varannan rad (2, 4, 6...).\n• 'li:hover': när muspekaren är över.\n• 'h2::before': lägger till grafiskt innehåll ('content: "✦ ";') före texten.`,
        examples: [
          {
            title: 'Zebra-rader',
            code: `li:nth-child(even) {\n  background-color: #1e293b;\n}`,
            explanation: 'Skapar snygga kontrastfyllda rader i en lista.'
          }
        ],
        task: 'Styla "li:nth-child(even)" med "background-color: #1e293b" och lägg till "content: \'⚡ \'" i "h2::before".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    ul { list-style: none; padding: 0; }
    li { padding: 12px; border-radius: 8px; margin-bottom: 4px; }
    /* Lägg till li:nth-child(even) och h2::before här */
    
  </style>
</head>
<body>
  <h2>Webbens Superkrafter</h2>
  <ul>
    <li>HTML5 Semantik</li>
    <li>CSS3 Grid & Flexbox</li>
    <li>Modern JavaScript ES6+</li>
    <li>Responsiv Design</li>
  </ul>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    ul { list-style: none; padding: 0; }
    li { padding: 12px; border-radius: 8px; margin-bottom: 4px; }
    li:nth-child(even) {
      background-color: #1e293b;
    }
    h2::before {
      content: '⚡ ';
    }
  </style>
</head>
<body>
  <h2>Webbens Superkrafter</h2>
  <ul>
    <li>HTML5 Semantik</li>
    <li>CSS3 Grid & Flexbox</li>
    <li>Modern JavaScript ES6+</li>
    <li>Responsiv Design</li>
  </ul>
</body>
</html>`,
        solutionExplanation: 'Vi använde :nth-child(even) för randiga rader och h2::before för en dekorativ ikon.',
        hints: [
          'Skriv li:nth-child(even) { background-color: #1e293b; }',
          'Skriv h2::before { content: \'⚡ \'; }'
        ],
        testCases: [
          {
            id: 'tc-nth',
            description: 'Koden ska använda :nth-child(even)',
            cssCheck: { selector: 'li', property: 'nth-child' }
          },
          {
            id: 'tc-before',
            description: 'Koden ska använda ::before med content',
            cssCheck: { selector: 'h2', property: 'content' }
          }
        ]
      }
    ]
  },
  {
    id: 11,
    track: 'css',
    levelTitle: 'Nivå 11: CSS Variabler (:root & var()) & Teman',
    levelSubtitle: 'Skapa dynamiska temasystem och återanvändbara färger.',
    icon: 'Sliders',
    badgeName: 'CSS Temapro',
    badgeDesc: 'Bygger modulära temasystem med CSS Custom Properties.',
    requiredXp: 755,
    exercises: [
      {
        id: 'css-11-1',
        track: 'css',
        title: 'Skapa ett temasystem med CSS Custom Properties',
        shortDesc: 'Definiera --primar-farg i :root och återanvänd den med var().',
        difficulty: 'avancerad',
        xpReward: 45,
        theory: `CSS-variabler (Custom Properties) definieras med två bindestreck (--) i :root och hämtas med 'var()':\n\n:root {\n  --huvudfarg: #38bdf8;\n  --bakgrund: #0b0f19;\n}\n\nh1 {\n  color: var(--huvudfarg);\n}`,
        examples: [
          {
            title: 'Mörkt tema med variabler',
            code: `:root {\n  --accent: #10b981;\n}\n.btn {\n  background: var(--accent);\n}`,
            explanation: 'Om du ändrar --accent i :root uppdateras alla element på hela webbplatsen direkt!'
          }
        ],
        task: 'Definiera "--primar-farg: #38bdf8;" inuti :root, och använd den med "color: var(--primar-farg)" på h1 och som bakgrundsfärg på .knapp.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      /* Definiera --primar-farg här */
    }
    body {
      background: #0f172a;
      color: #fff;
      font-family: sans-serif;
      padding: 30px;
    }
    h1 {
      /* Använd var(--primar-farg) som color */
    }
    .knapp {
      /* Använd var(--primar-farg) som background */
      color: #0f172a;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>CSS Variabler i Praktiken</h1>
  <button class="knapp">Temaknapp</button>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --primar-farg: #38bdf8;
    }
    body {
      background: #0f172a;
      color: #fff;
      font-family: sans-serif;
      padding: 30px;
    }
    h1 {
      color: var(--primar-farg);
    }
    .knapp {
      background-color: var(--primar-farg);
      color: #0f172a;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>CSS Variabler i Praktiken</h1>
  <button class="knapp">Temaknapp</button>
</body>
</html>`,
        solutionExplanation: 'CSS-variabler gör det enkelt att hantera färger på ett och samma ställe.',
        hints: [
          'Skriv --primar-farg: #38bdf8; inuti :root',
          'Skriv color: var(--primar-farg); på h1 och background-color: var(--primar-farg); på .knapp'
        ],
        testCases: [
          {
            id: 'tc-var-def',
            description: ':root ska definiera --primar-farg',
            cssCheck: { selector: ':root', property: '--primar-farg' }
          },
          {
            id: 'tc-var-use',
            description: 'Koden ska använda var(--primar-farg)',
            cssCheck: { selector: '*', property: 'var(--primar-farg)' }
          }
        ]
      }
    ]
  },
  {
    id: 12,
    track: 'css',
    levelTitle: 'Nivå 12: Animationer med Keyframes (@keyframes)',
    levelSubtitle: 'Skapa levande pulserande och roterande CSS-animationer.',
    icon: 'Sparkles',
    badgeName: 'CSS Animatör',
    badgeDesc: 'Skapar pulserande och kontinuerliga CSS keyframe-animationer.',
    requiredXp: 850,
    exercises: [
      {
        id: 'css-12-1',
        track: 'css',
        title: 'Skapa en pulserande glödanimation (@keyframes pulse)',
        shortDesc: 'Definiera @keyframes pulse och koppla den till ett glödande element.',
        difficulty: 'proffs',
        xpReward: 50,
        theory: `Med '@keyframes' kan du bygga animationer från 0% till 100%:\n\n@keyframes pulse {\n  0% { transform: scale(1); opacity: 1; }\n  50% { transform: scale(1.1); opacity: 0.7; }\n  100% { transform: scale(1); opacity: 1; }\n}\n\n.glod {\n  animation: pulse 2s infinite ease-in-out;\n}`,
        examples: [
          {
            title: 'Roterande laddare',
            code: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.loader {\n  animation: spin 1s linear infinite;\n}`,
            explanation: 'Roterar elementet 360 grader i en oändlig loop.'
          }
        ],
        task: 'Definiera animationen "@keyframes pulse" och sätt "animation: pulse 2s infinite" på klassen .glod.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    /* Definiera @keyframes pulse här */
    
    .glod {
      display: inline-block;
      padding: 16px 32px;
      background: #8b5cf6;
      color: #fff;
      border-radius: 50px;
      font-weight: bold;
      /* Lägg till animation: pulse 2s infinite här */
    }
  </style>
</head>
<body>
  <div style="padding: 50px; text-align: center;">
    <div class="glod">⚡ Pulserande Neon Element</div>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.08);
      }
    }
    .glod {
      display: inline-block;
      padding: 16px 32px;
      background: #8b5cf6;
      color: #fff;
      border-radius: 50px;
      font-weight: bold;
      animation: pulse 2s infinite ease-in-out;
    }
  </style>
</head>
<body>
  <div style="padding: 50px; text-align: center;">
    <div class="glod">⚡ Pulserande Neon Element</div>
  </div>
</body>
</html>`,
        solutionExplanation: 'Keyframes styr hur elementet transformeras över tid i en jämn loop.',
        hints: [
          'Skriv @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }',
          'Sätt animation: pulse 2s infinite; på .glod'
        ],
        testCases: [
          {
            id: 'tc-keyframes',
            description: 'Koden ska innehålla @keyframes pulse',
            cssCheck: { selector: '@keyframes', property: 'pulse' }
          },
          {
            id: 'tc-anim-prop',
            description: '.glod ska ha animation som refererar pulse',
            cssCheck: { selector: '.glod', property: 'animation' }
          }
        ]
      }
    ]
  }
];

export const CSS_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-css-1',
    track: 'css',
    levelId: 1,
    title: 'CSS Selektor-syntax',
    question: 'Hur väljer du ett element med klassen "kort" i CSS?',
    options: ['#kort', '.kort', '<kort>', 'kort::class'],
    correctIndex: 1,
    explanation: 'Klass-selektorer inleds alltid med en punkt (.kort), medan ID inleds med en brädgård (#kort).',
    xp: 25
  },
  {
    id: 'quiz-css-2',
    track: 'css',
    levelId: 2,
    title: 'Box-modellens delar',
    question: 'Vilken CSS-egenskap styr det inre avståndet mellan innehållet och elementets kant?',
    options: ['margin', 'padding', 'border', 'spacing'],
    correctIndex: 1,
    explanation: 'Padding är den inre marginalen (utfyllnad), medan margin är det yttre avståndet till andra element.',
    xp: 25
  },
  {
    id: 'quiz-css-3',
    track: 'css',
    levelId: 5,
    title: 'Centrering med Flexbox',
    question: 'Vilken egenskap i Flexbox används för att centrera element horisontellt längs huvudaxeln?',
    options: ['align-items', 'justify-content', 'flex-direction', 'text-align'],
    correctIndex: 1,
    explanation: 'justify-content styr placeringen längs huvudaxeln (horisontellt när flex-direction är row).',
    xp: 30
  },
  {
    id: 'quiz-css-4',
    track: 'css',
    levelId: 6,
    title: 'CSS Grid Kolumner',
    question: 'Vad innebär "grid-template-columns: repeat(3, 1fr)"?',
    options: [
      'Skapar 3 kolumner som är 1 pixel breda',
      'Skapar 3 lika stora, flexibla kolumner som delar på utrymmet',
      'Upprepar 3 rader',
      'Centrerar 3 knappar'
    ],
    correctIndex: 1,
    explanation: '1fr står för 1 fraction (bråkdel) av det tillgängliga utrymmet, så repeat(3, 1fr) delar bredden i 3 lika delar.',
    xp: 30
  },
  {
    id: 'quiz-css-5',
    track: 'css',
    levelId: 9,
    title: 'CSS Positionering',
    question: 'Vilket position-värde gör att ett element hålls kvar på skärmen när användaren skrollar?',
    options: ['position: relative;', 'position: static;', 'position: fixed;', 'position: inherit;'],
    correctIndex: 2,
    explanation: 'position: fixed fäster elementet i förhållande till webbläsarfönstret så det inte rör sig vid skrollning.',
    xp: 30
  },
  {
    id: 'quiz-css-6',
    track: 'css',
    levelId: 11,
    title: 'CSS Variabler',
    question: 'Hur anropar och använder man en CSS-variabel som heter "--main-color"?',
    options: ['$main-color', 'var(--main-color)', '@main-color', 'get(--main-color)'],
    correctIndex: 1,
    explanation: 'CSS Custom Properties anropas med funktionen var(--namn).',
    xp: 30
  }
];

export const CSS_CHEATSHEET: CheatsheetCategory[] = [
  {
    id: 'css-selectors',
    track: 'css',
    title: 'Selektorer & Prioritet',
    icon: '🎯',
    items: [
      { name: 'Element', syntax: 'p { color: white; }', description: 'Matchar alla <p>-taggar.', example: 'h1, h2 { ... }' },
      { name: 'Klass', syntax: '.kort { padding: 20px; }', description: 'Matchar alla element med class="kort".', example: '<div class="kort">' },
      { name: 'ID', syntax: '#huvud { background: #000; }', description: 'Matchar det unika elementet med id="huvud".', example: '<div id="huvud">' },
      { name: 'Hover', syntax: 'button:hover { opacity: 0.8; }', description: 'Triggas när muspekaren hålls över elementet.', example: 'a:hover' }
    ]
  },
  {
    id: 'css-box-model',
    track: 'css',
    title: 'Box-modellen & Dimensioner',
    icon: '📦',
    items: [
      { name: 'padding', syntax: 'padding: 16px 24px;', description: 'Inre marginal (Topp/botten 16px, Vänster/höger 24px).', example: 'padding: 20px;' },
      { name: 'margin', syntax: 'margin: 0 auto;', description: 'Yttre marginal. 0 auto centrerar ett block-element horisontellt.', example: 'margin-bottom: 24px;' },
      { name: 'border-radius', syntax: 'border-radius: 12px;', description: 'Gör elementets hörn rundade.', example: 'border-radius: 9999px; (Piller-form)' },
      { name: 'box-sizing', syntax: 'box-sizing: border-box;', description: 'Inkluderar padding och border i elementets totala bredd.', example: '* { box-sizing: border-box; }' }
    ]
  },
  {
    id: 'css-flexbox',
    track: 'css',
    title: 'Flexbox Layout',
    icon: '⚡',
    items: [
      { name: 'display: flex', syntax: 'display: flex;', description: 'Aktiverar flex-layout för behållarens barn-element.', example: 'display: flex;' },
      { name: 'justify-content', syntax: 'justify-content: center | space-between;', description: 'Justerar element längs huvudaxeln (horisontellt som standard).', example: 'justify-content: space-between;' },
      { name: 'align-items', syntax: 'align-items: center;', description: 'Justerar element längs tväraxeln (vertikalt som standard).', example: 'align-items: center;' },
      { name: 'gap', syntax: 'gap: 16px;', description: 'Skapar snygga jämna mellanrum mellan flex-element.', example: 'gap: 20px;' }
    ]
  },
  {
    id: 'css-grid',
    track: 'css',
    title: 'CSS Grid',
    icon: '📐',
    items: [
      { name: 'display: grid', syntax: 'display: grid;', description: 'Aktiverar 2D-rutnätslayout.', example: 'display: grid;' },
      { name: 'grid-template-columns', syntax: 'grid-template-columns: repeat(3, 1fr);', description: 'Skapar 3 lika breda kolumner.', example: 'repeat(auto-fit, minmax(200px, 1fr))' },
      { name: 'grid-column', syntax: 'grid-column: span 2;', description: 'Låter ett kort spänna över 2 kolumner.', example: 'grid-column: 1 / -1;' }
    ]
  },
  {
    id: 'css-position',
    track: 'css',
    title: 'Positionering & Lager',
    icon: '📌',
    items: [
      { name: 'relative', syntax: 'position: relative;', description: 'Fungerar som ankare för absoluta barn.', example: 'position: relative;' },
      { name: 'absolute', syntax: 'position: absolute; top: 0; right: 0;', description: 'Placerar elementet exakt i förhållande till närmaste relativa förälder.', example: 'top: 10px; right: 10px;' },
      { name: 'sticky', syntax: 'position: sticky; top: 0;', description: 'Fastnar i toppen vid skrollning.', example: 'position: sticky; top: 0;' },
      { name: 'z-index', syntax: 'z-index: 100;', description: 'Styr staplingsordningen av överlappande element.', example: 'z-index: 99;' }
    ]
  }
];
