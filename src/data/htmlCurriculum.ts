import { HtmlLessonLevel, QuizQuestion, CheatsheetCategory } from '../types/html';

export const HTML_CURRICULUM: HtmlLessonLevel[] = [
  {
    id: 1,
    levelTitle: "Nivå 1: Grunderna i HTML",
    levelSubtitle: "Dokumentstruktur, taggar, rubriker och stycken",
    icon: "Code2",
    badgeName: "HTML Novis",
    badgeDesc: "Bemästrade grundläggande HTML-taggar och sidstruktur",
    requiredXp: 0,
    exercises: [
      {
        id: "html-1-1",
        title: "Din Första Rubrik & Stycke",
        shortDesc: "Lär dig skillnaden mellan <h1> och <p>",
        difficulty: "nyborjare",
        xpReward: 30,
        theory: `Välkommen till HTML! HTML står för **HyperText Markup Language** och är skelettet för varenda webbsida på internet.

Ett HTML-element består vanligtvis av:
1. En **starttagg** (t.ex. \`<h1>\`)
2. Innehållet
3. En **sluttagg** med snedstreck (t.ex. \`</h1>\`)

Exempel:
\`\`\`html
<h1>Detta är en stor rubrik</h1>
<p>Detta är ett vanligt textstycke med löpande text.</p>
\`\`\`

- \`<h1>\` är den viktigaste och största rubriken på en sida.
- \`<p>\` (paragraph) används för vanliga textstycken.`,
        examples: [
          {
            title: "Rubrik och brödtext",
            code: "<h1>Välkommen till min webbplats!</h1>\n<p>Här kan du läsa om mina favoritintressen och projekt.</p>",
            explanation: "Webbläsaren gör rubriken stor och fetstilt och ger stycket ett naturligt radavstånd."
          }
        ],
        task: "Skapa en huvudsaklig rubrik med taggen <h1> som innehåller texten 'Välkommen till HTML' och under den ett stycke med taggen <p> som innehåller texten 'Jag lär mig bygga webbsidor!'.",
        starterCode: `<!-- Skriv din HTML-kod nedan -->
`,
        solutionCode: `<h1>Välkommen till HTML</h1>
<p>Jag lär mig bygga webbsidor!</p>`,
        solutionExplanation: "Vi använde <h1> för sidans huvudtitel och <p> för det efterföljande textstycket.",
        hints: [
          "Börja med <h1> och avsluta med </h1>.",
          "Skriv sedan <p>Jag lär mig bygga webbsidor!</p> på nästa rad."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller en <h1>-tagg med texten 'Välkommen till HTML'",
            selector: "h1",
            containsText: "Välkommen till HTML"
          },
          {
            id: "tc-2",
            description: "Innehåller en <p>-tagg med texten 'Jag lär mig bygga webbsidor!'",
            selector: "p",
            containsText: "Jag lär mig bygga webbsidor!"
          }
        ]
      },
      {
        id: "html-1-2",
        title: "Komplett HTML5 Dokumentstruktur",
        shortDesc: "Bygg ett professionellt HTML5-skelett",
        difficulty: "nyborjare",
        xpReward: 40,
        theory: `Alla riktiga webbsidor har en standardiserad struktur så att webbläsare vet hur dokumentet ska tolkas.

Strukturen ser ut så här:
\`\`\`html
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Min Webbsida</title>
</head>
<body>
  <h1>Innehåll som syns på skärmen</h1>
</body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` talar om att detta är modernt HTML5.
- \`<html>\` omsluter hela dokumentet.
- \`<head>\` innehåller metadata (information som inte syns direkt i webbläsarfönstret, t.ex. sidtitel \`<title>\`).
- \`<body>\` innehåller allt synligt innehåll (rubriker, bilder, text, knappar).`,
        examples: [
          {
            title: "Standard HTML5-dokument",
            code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Mitt Projekt</title>
</head>
<body>
  <h1>Hej Världen!</h1>
</body>
</html>`,
            explanation: "Titeln 'Mitt Projekt' visas i webbläsarens flik, medan h1 visas i själva fönstret."
          }
        ],
        task: "Skapa ett komplett HTML5-dokument med <!DOCTYPE html>, <html>, <head> med en <title>Min Första Webbplats</title>, samt <body> som innehåller ett <h1>-element med texten 'Mitt Första Dokument'.",
        starterCode: `<!DOCTYPE html>
<html lang="sv">
  <!-- Fyll i head med title och body med h1 -->
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <title>Min Första Webbplats</title>
</head>
<body>
  <h1>Mitt Första Dokument</h1>
</body>
</html>`,
        solutionExplanation: "Vi placerade <title> inuti <head> och <h1> inuti <body>.",
        hints: [
          "Placera <head><title>Min Första Webbplats</title></head> inuti <html>.",
          "Placera <body><h1>Mitt Första Dokument</h1></body> efter <head>."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Dokumentet har en <title> med texten 'Min Första Webbplats'",
            selector: "title",
            containsText: "Min Första Webbplats"
          },
          {
            id: "tc-2",
            description: "Dokumentets <body> innehåller en <h1> med texten 'Mitt Första Dokument'",
            selector: "body h1",
            containsText: "Mitt Första Dokument"
          }
        ]
      },
      {
        id: "html-1-3",
        title: "Rubrikhierarki (h1 till h3)",
        shortDesc: "Strukturera information med rubriknivåer",
        difficulty: "nyborjare",
        xpReward: 35,
        theory: `HTML har 6 nivåer av rubriker: \`<h1>\` till \`<h6>\`.

- \`<h1>\` - Huvudrubrik (bör finnas 1 per sida för god sökmotoroptimering/SEO)
- \`<h2>\` - Sektionsrubriker
- \`<h3>\` - Underrubriker till sektioner
- \`<h4>\` till \`<h6>\` - Mindre detaljrubriker

Exempel:
\`\`\`html
<h1>Tekniknyheter</h1>
<h2>Artificiell Intelligens</h2>
<h3>Språkmodeller i Webbutveckling</h3>
\`\`\``,
        examples: [
          {
            title: "Hierarkisk struktur",
            code: "<h1>Receptbloggen</h1>\n<h2>Italiensk Mat</h2>\n<h3>Klassisk Pasta Carbonara</h3>",
            explanation: "Visar tydligt relationen mellan huvudämne, kategori och specifikt recept."
          }
        ],
        task: "Skapa en <h1> med 'Rymdfart', en <h2> med 'Vårt Solsystem' och en <h3> med 'Planeten Mars'.",
        starterCode: `<!-- Skapa de tre rubrikerna nedan -->
`,
        solutionCode: `<h1>Rymdfart</h1>
<h2>Vårt Solsystem</h2>
<h3>Planeten Mars</h3>`,
        solutionExplanation: "Tre rubriknivåer skapades i korrekt fallande ordning.",
        hints: [
          "Skriv <h1>Rymdfart</h1> först.",
          "Fortsätt med <h2>Vårt Solsystem</h2> och sedan <h3>Planeten Mars</h3>."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller <h1>Rymdfart</h1>",
            selector: "h1",
            containsText: "Rymdfart"
          },
          {
            id: "tc-2",
            description: "Innehåller <h2>Vårt Solsystem</h2>",
            selector: "h2",
            containsText: "Vårt Solsystem"
          },
          {
            id: "tc-3",
            description: "Innehåller <h3>Planeten Mars</h3>",
            selector: "h3",
            containsText: "Planeten Mars"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    levelTitle: "Nivå 2: Textformatering & Typografi",
    levelSubtitle: "Fetstil, kursivering, citat, kodblock och linjer",
    icon: "Type",
    badgeName: "Typografimästare",
    badgeDesc: "Bemästrade textformatering och semantisk typografi i HTML",
    requiredXp: 100,
    exercises: [
      {
        id: "html-2-1",
        title: "Fetstil & Kursiv text",
        shortDesc: "Använd <strong> och <em> för att betona text",
        difficulty: "nyborjare",
        xpReward: 35,
        theory: `I modern HTML använder vi semantiska taggar för textbetoning:

- \`<strong>\`: Betyder stark vikt/betydelse och renderas som **fetstil**.
- \`<em>\` (emphasis): Betyder betonat uttryck och renderas som *kursiv*.

Exempel:
\`\`\`html
<p>Det är <strong>mycket viktigt</strong> att du sparar ditt arbete.</p>
<p>Jag tycker <em>verkligen</em> om webbdesign!</p>
\`\`\`

Dessa är mycket bättre för skärmläsare och tillgänglighet än gamla \`<b>\` och \`<i>\`.`,
        examples: [
          {
            title: "Betonad text",
            code: "<p>Koden är <strong>redo för produktion</strong> och körs <em>blixtsnabbt</em>.</p>",
            explanation: "Stryker under viktiga delar i meningen."
          }
        ],
        task: "Skapa ett <p>-stycke där orden 'HTML är fantastiskt' är omslutna av <strong> och ordet 'enkelt' är omslutet av <em>. Texten kan t.ex. vara: '<p><strong>HTML är fantastiskt</strong> och väldigt <em>enkelt</em> att lära sig.</p>'.",
        starterCode: `<p>HTML är fantastiskt och väldigt enkelt att lära sig.</p>`,
        solutionCode: `<p><strong>HTML är fantastiskt</strong> och väldigt <em>enkelt</em> att lära sig.</p>`,
        solutionExplanation: "Vi lade till <strong> runt 'HTML är fantastiskt' och <em> runt 'enkelt'.",
        hints: [
          "Sätt <strong> framför 'HTML är fantastiskt' och </strong> efteråt.",
          "Gör samma sak med <em> och </em> runt 'enkelt'."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller <strong> med texten 'HTML är fantastiskt'",
            selector: "strong",
            containsText: "HTML är fantastiskt"
          },
          {
            id: "tc-2",
            description: "Innehåller <em> med texten 'enkelt'",
            selector: "em",
            containsText: "enkelt"
          }
        ]
      },
      {
        id: "html-2-2",
        title: "Citat & Kodblock",
        shortDesc: "Använd <blockquote> och <code>",
        difficulty: "nyborjare",
        xpReward: 40,
        theory: `När du vill visa citat eller programmeringskod på en webbsida:

- \`<blockquote>\`: Skapar ett indraget citatblock för längre citat.
- \`<code>\`: Används för inline-kodavsnitt (t.ex. ett funktionsnamn).
- \`<pre>\`: Bevarar blanksteg och radbrytningar exakt som de är skrivna.

Exempel:
\`\`\`html
<blockquote>
  "Enkelhet är förutsättningen för pålitlighet."
</blockquote>
<p>Använd kommandot <code>console.log()</code> för felsökning.</p>
\`\`\``,
        examples: [
          {
            title: "Citat och kod",
            code: "<blockquote>Stay hungry, stay foolish.</blockquote>\n<p>Skriv <code>npm start</code> i terminalen.</p>",
            explanation: "Ger webbsidan professionell typografi för citat och kod."
          }
        ],
        task: "Skapa ett <blockquote>-element med texten 'Kunskap är makt.' och efteråt ett <p>-element som innehåller ett <code>-element med texten 'let x = 10;'.",
        starterCode: `<!-- Skapa <blockquote> och <p> med <code> här -->
`,
        solutionCode: `<blockquote>Kunskap är makt.</blockquote>
<p>Koden: <code>let x = 10;</code></p>`,
        solutionExplanation: "Vi använde <blockquote> för citatet och <code> inuti stycket.",
        hints: [
          "Skriv <blockquote>Kunskap är makt.</blockquote>",
          "Skapa ett <p> och lägg <code>let x = 10;</code> inuti det."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller <blockquote> med 'Kunskap är makt.'",
            selector: "blockquote",
            containsText: "Kunskap är makt."
          },
          {
            id: "tc-2",
            description: "Innehåller <code> med 'let x = 10;'",
            selector: "code",
            containsText: "let x = 10;"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    levelTitle: "Nivå 3: Länkar, Navigation & Attribut",
    levelSubtitle: "Hyperlänkar, target-attribut och navigationsmenyer",
    icon: "Globe",
    badgeName: "Webbnavigatör",
    badgeDesc: "Skapade hyperlänkar och semantisk webbplatsnavigation",
    requiredXp: 180,
    exercises: [
      {
        id: "html-3-1",
        title: "Hyperlänkar & target=_blank",
        shortDesc: "Koppla ihop webben med <a>-taggen",
        difficulty: "nyborjare",
        xpReward: 40,
        theory: `Det som gör webben till just en *webb* är hyperlänkar!

Taggen \`<a>\` (anchor) används för att skapa länkar med hjälp av attributet \`href\` (hypertext reference):

\`\`\`html
<a href="https://google.se">Gå till Google</a>
\`\`\`

För att öppna länken i en ny webbläsarflik lägger vi till attributet \`target="_blank"\`:
\`\`\`html
<a href="https://developer.mozilla.org" target="_blank">Läs MDN Docs</a>
\`\`\``,
        examples: [
          {
            title: "Extern länk i ny flik",
            code: '<a href="https://wikipedia.org" target="_blank">Besök Wikipedia</a>',
            explanation: "Öppnar Wikipedia i en separat flik."
          }
        ],
        task: "Skapa en länk med taggen <a> som har href='https://developer.mozilla.org', target='_blank' och länktexten 'Besök MDN Web Docs'.",
        starterCode: `<!-- Skapa din länk här -->
`,
        solutionCode: `<a href="https://developer.mozilla.org" target="_blank">Besök MDN Web Docs</a>`,
        solutionExplanation: "Vi använde href för URL och target='_blank' för att öppna i en ny flik.",
        hints: [
          "Börja med <a href=\"https://developer.mozilla.org\" target=\"_blank\">",
          "Avsluta med texten och </a>."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller <a> med href='https://developer.mozilla.org'",
            selector: "a[href='https://developer.mozilla.org']",
            containsText: "Besök MDN Web Docs"
          },
          {
            id: "tc-2",
            description: "Länken har attributet target='_blank'",
            selector: "a[target='_blank']"
          }
        ]
      },
      {
        id: "html-3-2",
        title: "Semantisk Navigationsmeny",
        shortDesc: "Strukturera menylänkar i en <nav>-tagg",
        difficulty: "nyborjare",
        xpReward: 45,
        theory: `I modern webbutveckling omsluter vi alltid huvudmenylänkar med taggen \`<nav>\`. Det hjälper sökmotorer och skärmläsare att förstå att detta är webbplatsens navigering.

Vanligtvis kombineras \`<nav>\` med en oordnad lista \`<ul>\` eller direkt med länkar \`<a>\`.

Exempel:
\`\`\`html
<nav>
  <a href="#hem">Hem</a>
  <a href="#om-oss">Om Oss</a>
  <a href="#kontakt">Kontakt</a>
</nav>
\`\`\``,
        examples: [
          {
            title: "Navigationsfält",
            code: "<nav>\n  <a href=\"#start\">Start</a>\n  <a href=\"#portfolio\">Portfolio</a>\n  <a href=\"#kontakt\">Kontakt</a>\n</nav>",
            explanation: "Tre interna ankar-länkar inuti ett semantiskt nav-element."
          }
        ],
        task: "Skapa ett <nav>-element som innehåller tre länkar (<a>): en med href='#hem' och texten 'Hem', en med href='#tjanster' och texten 'Tjänster', samt en med href='#kontakt' och texten 'Kontakt'.",
        starterCode: `<!-- Skapa din <nav>-meny nedan -->
`,
        solutionCode: `<nav>
  <a href="#hem">Hem</a>
  <a href="#tjanster">Tjänster</a>
  <a href="#kontakt">Kontakt</a>
</nav>`,
        solutionExplanation: "Vi grupperade tre <a> länkar inuti <nav>.",
        hints: [
          "Öppna med <nav> och stäng med </nav>.",
          "Placera de tre <a href=\"...\"> länkarna mellan dem."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller ett <nav>-element",
            selector: "nav"
          },
          {
            id: "tc-2",
            description: "Innehåller 3 st <a> länkar inuti <nav>",
            selector: "nav a",
            minCount: 3
          }
        ]
      }
    ]
  },
  {
    id: 4,
    levelTitle: "Nivå 4: Listor & Struktur",
    levelSubtitle: "Punktlistor, numrerade listor och beskrivningslistor",
    icon: "ListTree",
    badgeName: "Listarkitekt",
    badgeDesc: "Strukturerade data med ordnade, oordnade och nästlade listor",
    requiredXp: 270,
    exercises: [
      {
        id: "html-4-1",
        title: "Punktlistor (ul & li)",
        shortDesc: "Skapa punktlistor med unordered list",
        difficulty: "nyborjare",
        xpReward: 35,
        theory: `När ordningen på sakerna i en lista inte spelar roll använder vi en **Unordered List** (\`<ul>\`).

Varje sak i listan är ett **List Item** (\`<li>\`):

\`\`\`html
<ul>
  <li>Äpplen</li>
  <li>Bananer</li>
  <li>Apelsiner</li>
</ul>
\`\`\`

Detta renderas som en snygg punktlista med "bullets".`,
        examples: [
          {
            title: "Inköpslista",
            code: "<ul>\n  <li>Mjölk</li>\n  <li>Bröd</li>\n  <li>Kaffe</li>\n</ul>",
            explanation: "Tre punkter i en oordnad lista."
          }
        ],
        task: "Skapa en punktlista med <ul> som innehåller tre <li>-element: 'HTML', 'CSS' och 'JavaScript'.",
        starterCode: `<!-- Skapa din lista nedan -->
`,
        solutionCode: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
        solutionExplanation: "Vi skapade en <ul> med tre <li>-punkter.",
        hints: [
          "Öppna med <ul> och stäng med </ul>.",
          "Skriv <li>HTML</li>, <li>CSS</li> och <li>JavaScript</li> inuti."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller ett <ul>-element",
            selector: "ul"
          },
          {
            id: "tc-2",
            description: "Innehåller minst 3 st <li>-element inuti <ul>",
            selector: "ul li",
            minCount: 3
          }
        ]
      },
      {
        id: "html-4-2",
        title: "Numrerade Listor (ol & li)",
        shortDesc: "Skapa stegvisa instruktionslistor",
        difficulty: "nyborjare",
        xpReward: 40,
        theory: `När ordningen är viktig (t.ex. ett matlagningsrecept eller en topplista) använder vi en **Ordered List** (\`<ol>\`).

Webbläsaren numrerar automatiskt listpunkterna med 1, 2, 3...

\`\`\`html
<ol>
  <li>Sätt på ugnen på 200°C</li>
  <li>Blanda ingredienserna</li>
  <li>Grädda i 25 minuter</li>
</ol>
\`\`\``,
        examples: [
          {
            title: "Steg-för-steg instruktion",
            code: "<ol>\n  <li>Ladda ner editorn</li>\n  <li>Skriv din kod</li>\n  <li>Publicera webbsidan</li>\n</ol>",
            explanation: "Skapar automatiskt en 1, 2, 3 numrering."
          }
        ],
        task: "Skapa en numrerad lista med <ol> som innehåller tre steg: <li>Planera designen</li>, <li>Skriv HTML-strukturen</li>, och <li>Styla med CSS</li>.",
        starterCode: `<!-- Skapa din numrerade lista här -->
`,
        solutionCode: `<ol>
  <li>Planera designen</li>
  <li>Skriv HTML-strukturen</li>
  <li>Styla med CSS</li>
</ol>`,
        solutionExplanation: "Vi använde <ol> för att automatiskt få en numrerad sekvens.",
        hints: [
          "Använd <ol>...</ol> istället för <ul>.",
          "Lägg till de tre <li>-elementen inuti."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller ett <ol>-element",
            selector: "ol"
          },
          {
            id: "tc-2",
            description: "Har 3 st <li>-element inuti <ol>",
            selector: "ol li",
            minCount: 3
          }
        ]
      }
    ]
  },
  {
    id: 5,
    levelTitle: "Nivå 5: Bilder & Multimedia",
    levelSubtitle: "Bilder, alt-text, figure, figcaption och video",
    icon: "Image",
    badgeName: "Multimedia Wizard",
    badgeDesc: "Bemästrade visuell media och responsiva bilder i HTML",
    requiredXp: 360,
    exercises: [
      {
        id: "html-5-1",
        title: "Bilder & Tillgänglig alt-text",
        shortDesc: "Infoga bilder med <img> och alt-attribut",
        difficulty: "nyborjare",
        xpReward: 40,
        theory: `Taggen \`<img>\` är ett **självstängande element** (void element) som inte behöver någon sluttagg.

Två attribut är obligatoriska för god praxis:
- \`src\`: Sökvägen eller webbadressen till bilden.
- \`alt\`: Alternativ text som beskriver bildens motiv för skärmläsare och om bilden inte kan laddas.

Exempel:
\`\`\`html
<img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Teknologiskt kretskort med blått neonljus" width="300">
\`\`\``,
        examples: [
          {
            title: "Bild med alt-text",
            code: '<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Planet Jorden fotograferad från rymden" width="400">',
            explanation: "Bilden har en beskrivande alt-text."
          }
        ],
        task: "Skapa en <img>-tagg med src='https://images.unsplash.com/photo-1451187580459-43490279c0fa', alt='Planet Jorden sedd från rymden' och width='350'.",
        starterCode: `<!-- Infoga <img>-taggen nedan -->
`,
        solutionCode: `<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Planet Jorden sedd från rymden" width="350">`,
        solutionExplanation: "Vi använde <img> med src, alt och width attribut.",
        hints: [
          "Skriv <img src=\"...\" alt=\"Planet Jorden sedd från rymden\" width=\"350\">",
          "Kom ihåg att <img> inte behöver en </img> tagg."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller en <img>-tagg",
            selector: "img"
          },
          {
            id: "tc-2",
            description: "Har alt-attribut med texten 'Planet Jorden sedd från rymden'",
            selector: "img[alt='Planet Jorden sedd från rymden']"
          }
        ]
      },
      {
        id: "html-5-2",
        title: "Bild med bildtext (figure & figcaption)",
        shortDesc: "Semantisk bildram med beskrivande text",
        difficulty: "medel",
        xpReward: 50,
        theory: `När en bild hör ihop med en förklarande bildtext använder vi HTML5-taggarna \`<figure>\` och \`<figcaption>\`.

Detta ger en semantisk koppling mellan bilden och dess förklaring:

\`\`\`html
<figure>
  <img src="foto.jpg" alt="Norrsken över Tromsø">
  <figcaption>Figur 1: Norrsken fångat under en klar vinternatt i Norge.</figcaption>
</figure>
\`\`\``,
        examples: [
          {
            title: "Semantisk bild med caption",
            code: `<figure>
  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Rymden" width="300">
  <figcaption>Foto från satellit.</figcaption>
</figure>`,
            explanation: "figure omsluter bilden och figcaption texten."
          }
        ],
        task: "Skapa ett <figure>-element som omsluter en <img> med alt='Norrsken' och ett <figcaption>-element med texten 'Figur 1: Norrsken över polcirkeln.'.",
        starterCode: `<!-- Skapa din <figure> här -->
`,
        solutionCode: `<figure>
  <img src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7" alt="Norrsken" width="350">
  <figcaption>Figur 1: Norrsken över polcirkeln.</figcaption>
</figure>`,
        solutionExplanation: "Vi använde <figure> med en inbäddad <img> och en <figcaption>.",
        hints: [
          "Öppna <figure> och lägg <img> inuti.",
          "Lägg till <figcaption>Figur 1: Norrsken över polcirkeln.</figcaption> under bilden och stäng med </figure>."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller ett <figure>-element",
            selector: "figure"
          },
          {
            id: "tc-2",
            description: "Innehåller en <figcaption> med 'Figur 1: Norrsken över polcirkeln.'",
            selector: "figure figcaption",
            containsText: "Figur 1: Norrsken över polcirkeln."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    levelTitle: "Nivå 6: Tabeller & Datapresentation",
    levelSubtitle: "Tabeller, thead, tbody, tr, th och td",
    icon: "Table",
    badgeName: "Tabellmästare",
    badgeDesc: "Konstruerade komplexa datatabeller med thead och tbody",
    requiredXp: 460,
    exercises: [
      {
        id: "html-6-1",
        title: "Strukturerad Datatabell",
        shortDesc: "Bygg en tabell med thead, tbody, th och td",
        difficulty: "medel",
        xpReward: 50,
        theory: `Tabeller används för tabulära data (t.ex. priser, statistik eller scheman):

- \`<table>\`: Själva tabellen.
- \`<thead>\`: Tabellens rubrikhuvud.
- \`<tbody>\`: Tabellens datakropp.
- \`<tr>\` (Table Row): En rad i tabellen.
- \`<th>\` (Table Header): En rubrikcell (fet och centrerad).
- \`<td>\` (Table Data): En vanlig datacell.

Exempel:
\`\`\`html
<table border="1">
  <thead>
    <tr>
      <th>Kurs</th>
      <th>Nivå</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML Grund</td>
      <td>Nybörjare</td>
    </tr>
    <tr>
      <td>CSS Flexbox</td>
      <td>Medel</td>
    </tr>
  </tbody>
</table>
\`\`\``,
        examples: [
          {
            title: "Enkel pristabell",
            code: `<table border="1">
  <thead>
    <tr><th>Plan</th><th>Pris</th></tr>
  </thead>
  <tbody>
    <tr><td>Gratis</td><td>0 kr</td></tr>
    <tr><td>Pro</td><td>99 kr</td></tr>
  </tbody>
</table>`,
            explanation: "Visar en tabell med 2 kolumner och 2 datarader."
          }
        ],
        task: "Skapa en <table> med <thead> innehållande rubrikerna <th>Språk</th> och <th>Typ</th>, samt en <tbody> med två rader: 'HTML'/'Märkspråk' och 'JavaScript'/'Programmering'.",
        starterCode: `<!-- Skapa din tabell nedan -->
`,
        solutionCode: `<table border="1">
  <thead>
    <tr>
      <th>Språk</th>
      <th>Typ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Märkspråk</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>Programmering</td>
    </tr>
  </tbody>
</table>`,
        solutionExplanation: "Vi använde <table>, <thead>, <tbody>, <tr>, <th> och <td>.",
        hints: [
          "Bygg <thead><tr><th>Språk</th><th>Typ</th></tr></thead>",
          "Bygg <tbody> med de två raderna med <td> celler."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller en <table> med <thead> och <tbody>",
            selector: "table thead"
          },
          {
            id: "tc-2",
            description: "Innehåller minst 2 st <th> celler",
            selector: "table thead th",
            minCount: 2
          },
          {
            id: "tc-3",
            description: "Innehåller <td> celler med 'HTML' och 'JavaScript'",
            selector: "table tbody td",
            containsText: "HTML"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    levelTitle: "Nivå 7: Formulär & Input-fält",
    levelSubtitle: "Formulär, etiketter, textfält, lösenord och knappar",
    icon: "FileCheck",
    badgeName: "Formulärexpert",
    badgeDesc: "Skapade interaktiva användarformulär och inmatningsfält",
    requiredXp: 570,
    exercises: [
      {
        id: "html-7-1",
        title: "Interaktivt Kontaktformulär",
        shortDesc: "Koppla <label> med <input> och en skicka-knapp",
        difficulty: "medel",
        xpReward: 50,
        theory: `Formulär låter besökare skicka information till en server.

- \`<form>\`: Behållaren för alla inmatningsfält.
- \`<label for="id">\`: En etikett som kopplas till input-fältets \`id\`.
- \`<input type="text">\`: Enradigt textfält.
- \`<input type="email">\`: Validerar automatiskt e-postadresser.
- \`<button type="submit">\`: Skickar formuläret.

Exempel:
\`\`\`html
<form>
  <label for="namn">Ditt Namn:</label>
  <input type="text" id="namn" name="namn" placeholder="Anna Andersson" required>

  <label for="epost">E-postadress:</label>
  <input type="email" id="epost" name="epost" placeholder="anna@exempel.se" required>

  <button type="submit">Skicka Meddelande</button>
</form>
\`\`\``,
        examples: [
          {
            title: "Inloggningsformulär",
            code: `<form>
  <label for="user">Användarnamn:</label>
  <input type="text" id="user" name="user">
  <button type="submit">Logga In</button>
</form>`,
            explanation: "Ett grundläggande inloggningsformulär."
          }
        ],
        task: "Skapa ett <form>-element som innehåller: ett <label for='epost'> med texten 'E-post:', ett <input type='email' id='epost' required>, samt en <button type='submit'> med texten 'Prenumerera'.",
        starterCode: `<!-- Skapa ditt formulär här -->
`,
        solutionCode: `<form>
  <label for="epost">E-post:</label>
  <input type="email" id="epost" name="epost" required placeholder="namn@epost.se">
  <button type="submit">Prenumerera</button>
</form>`,
        solutionExplanation: "Vi skapade formuläret med en e-postinput och submit-knapp.",
        hints: [
          "Använd <label for=\"epost\">E-post:</label>",
          "Använd <input type=\"email\" id=\"epost\" required>",
          "Lägg till <button type=\"submit\">Prenumerera</button>"
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller ett <form>-element",
            selector: "form"
          },
          {
            id: "tc-2",
            description: "Innehåller en <input type='email'> med id='epost'",
            selector: "input[type='email']#epost"
          },
          {
            id: "tc-3",
            description: "Innehåller en <button type='submit'> med texten 'Prenumerera'",
            selector: "button[type='submit']",
            containsText: "Prenumerera"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    levelTitle: "Nivå 8: Avancerade Formulär & Val",
    levelSubtitle: "Dropdowns, kryssrutor, radioknappar och textområden",
    icon: "Sliders",
    badgeName: "Input Arkitekt",
    badgeDesc: "Bemästrade select-menyer, checkboxes och radioknappar",
    requiredXp: 690,
    exercises: [
      {
        id: "html-8-1",
        title: "Dropdown-menyer (<select> & <option>)",
        shortDesc: "Låt användaren välja ur en rullgardinsmeny",
        difficulty: "medel",
        xpReward: 50,
        theory: `När du vill erbjuda flera fasta alternativ använder du \`<select>\` och \`<option>\`.

Exempel:
\`\`\`html
<label for="land">Välj ditt land:</label>
<select id="land" name="land">
  <option value="se">Sverige</option>
  <option value="no">Norge</option>
  <option value="dk">Danmark</option>
  <option value="fi">Finland</option>
</select>
\`\`\``,
        examples: [
          {
            title: "Språkväljare",
            code: `<select name="sprak">
  <option value="sv">Svenska</option>
  <option value="en">Engelska</option>
</select>`,
            explanation: "Ger användaren två val i en stilren dropdown."
          }
        ],
        task: "Skapa ett <select id='kurs'> med minst tre <option>-element: 'HTML Grund', 'CSS Styling' och 'JavaScript Pro'.",
        starterCode: `<!-- Skapa din select-meny här -->
`,
        solutionCode: `<select id="kurs" name="kurs">
  <option value="html">HTML Grund</option>
  <option value="css">CSS Styling</option>
  <option value="js">JavaScript Pro</option>
</select>`,
        solutionExplanation: "Vi skapade en select med 3 alternativ.",
        hints: [
          "Öppna <select id=\"kurs\">",
          "Lägg till tre <option>...</option> taggar och stäng med </select>."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller en <select>-tagg med id='kurs'",
            selector: "select#kurs"
          },
          {
            id: "tc-2",
            description: "Innehåller minst 3 st <option>-element",
            selector: "select#kurs option",
            minCount: 3
          }
        ]
      }
    ]
  },
  {
    id: 9,
    levelTitle: "Nivå 9: Semantisk HTML5 & a11y",
    levelSubtitle: "header, main, section, article, aside och footer",
    icon: "Layout",
    badgeName: "Semantik-Guru",
    badgeDesc: "Strukturerade webbsidor med moderna semantiska HTML5-taggar",
    requiredXp: 820,
    exercises: [
      {
        id: "html-9-1",
        title: "Komplett Semantisk Sidlayout",
        shortDesc: "Strukturera med header, main, section och footer",
        difficulty: "avancerad",
        xpReward: 60,
        theory: `Istället för att använda massor av anonyma \`<div>\`-taggar introducerade HTML5 semantiska element som beskriver sidans olika delar:

- \`<header>\`: Sidhuvud / toppen med logotyp och titel.
- \`<main>\`: Det unika huvudinnehållet på sidan (ska bara finnas en per sida!).
- \`<section>\`: Ett tematiskt avsnitt med eget rubrikämne.
- \`<article>\`: Ett fristående innehållsblock (t.ex. en artikel eller produkt).
- \`<aside>\`: Sidopanel för relaterat sidomaterial.
- \`<footer>\`: Sidfot längst ner med copyright och länkar.`,
        examples: [
          {
            title: "Modern semantisk layout",
            code: `<header><h1>Min Webbplats</h1></header>
<main>
  <section><h2>Nyheter</h2><p>Välkommen!</p></section>
</main>
<footer><p>© 2026 Min Webbplats</p></footer>`,
            explanation: "Korrekt och tillgänglig layoutstruktur."
          }
        ],
        task: "Skapa en komplett semantisk struktur med: <header> innehållande <h1>Webbyrån</h1>, <main> innehållande en <section> med <h2>Våra Tjänster</h2> och <p>Vi bygger moderna webbplatser.</p>, samt <footer> med <p>© 2026 Webbyrån</p>.",
        starterCode: `<!-- Skapa den semantiska strukturen här -->
`,
        solutionCode: `<header>
  <h1>Webbyrån</h1>
</header>
<main>
  <section>
    <h2>Våra Tjänster</h2>
    <p>Vi bygger moderna webbplatser.</p>
  </section>
</main>
<footer>
  <p>© 2026 Webbyrån</p>
</footer>`,
        solutionExplanation: "Vi använde <header>, <main>, <section> och <footer>.",
        hints: [
          "Börja med <header><h1>Webbyrån</h1></header>",
          "Skapa <main><section>...</section></main>",
          "Avsluta med <footer>...</footer>"
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller <header> med <h1>Webbyrån</h1>",
            selector: "header h1",
            containsText: "Webbyrån"
          },
          {
            id: "tc-2",
            description: "Innehåller <main> med en <section>",
            selector: "main section"
          },
          {
            id: "tc-3",
            description: "Innehåller <footer> med texten '© 2026 Webbyrån'",
            selector: "footer",
            containsText: "2026 Webbyrån"
          }
        ]
      }
    ]
  },
  {
    id: 10,
    levelTitle: "Nivå 10: Inbäddad CSS i HTML",
    levelSubtitle: "style-taggen, färger, bakgrunder och flexbox i HTML",
    icon: "Palette",
    badgeName: "Stilmästare",
    badgeDesc: "Stylade HTML-element med inbäddad CSS och Flexbox",
    requiredXp: 960,
    exercises: [
      {
        id: "html-10-1",
        title: "Styling med <style>-taggen",
        shortDesc: "Ge din HTML färg, marginaler och runda hörn",
        difficulty: "avancerad",
        xpReward: 60,
        theory: `HTML definierar strukturen, men CSS gör den vacker!

Du kan bädda in CSS direkt i din HTML med hjälp av \`<style>\`-taggen inuti \`<head>\` eller toppen av dokumentet:

\`\`\`html
<style>
  .hero-card {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: #38bdf8;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #38bdf8;
    font-family: sans-serif;
  }
</style>

<div class="hero-card">
  <h2>Cyberpunk Web Development</h2>
  <p>Stylat direkt med inbäddad CSS!</p>
</div>
\`\`\``,
        examples: [
          {
            title: "Stilad knapp",
            code: `<style>
  .neon-btn {
    background-color: #22d3ee;
    color: #0f172a;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
<button class="neon-btn">Klicka Här</button>`,
            explanation: "Ger knappen en modern neonblå look med runda hörn."
          }
        ],
        task: "Skapa en <style>-tagg med en klass '.kort' som har 'background: #0f172a', 'color: #38bdf8', 'padding: 20px' och 'border-radius: 12px'. Skapa sedan en <div class='kort'> med en <h2> och en <p> inuti.",
        starterCode: `<!-- Lägg till <style> och <div class="kort"> här -->
`,
        solutionCode: `<style>
  .kort {
    background: #0f172a;
    color: #38bdf8;
    padding: 20px;
    border-radius: 12px;
    font-family: sans-serif;
  }
</style>

<div class="kort">
  <h2>Futuristiskt Kort</h2>
  <p>Detta element är stylat med intern CSS.</p>
</div>`,
        solutionExplanation: "Vi definierade stilen inuti <style> och applicerade den via class='kort'.",
        hints: [
          "Skriv <style>.kort { background: #0f172a; color: #38bdf8; padding: 20px; border-radius: 12px; }</style>",
          "Skapa <div class=\"kort\"><h2>...</h2><p>...</p></div>"
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller en <style>-tagg",
            selector: "style"
          },
          {
            id: "tc-2",
            description: "Innehåller en <div class='kort'>",
            selector: "div.kort"
          }
        ]
      }
    ]
  },
  {
    id: 11,
    levelTitle: "Nivå 11: Interaktivitet med <script> & DOM",
    levelSubtitle: "JavaScript i HTML, onclick och dynamiska uppdateringar",
    icon: "Zap",
    badgeName: "DOM Trollkarl",
    badgeDesc: "Skapade interaktiva webbsidor med knappar och JavaScript",
    requiredXp: 1120,
    exercises: [
      {
        id: "html-11-1",
        title: "Interaktiv Knapp med JavaScript",
        shortDesc: "Ändra text vid klick med onclick och DOM",
        difficulty: "avancerad",
        xpReward: 70,
        theory: `Med taggen \`<script>\` kan vi väcka vår HTML till liv med **JavaScript**!

Vi kan använda \`document.getElementById()\` för att hitta ett HTML-element via dess \`id\` och ändra dess innehåll med \`.textContent\`:

\`\`\`html
<h2 id="rubrik">Hej!</h2>
<button onclick="andraText()">Klicka för att ändra</button>

<script>
  function andraText() {
    document.getElementById('rubrik').textContent = 'Magiskt! Texten ändrades!';
  }
</script>
\`\`\``,
        examples: [
          {
            title: "Räknare i HTML",
            code: `<p>Klick: <span id="antal">0</span></p>
<button onclick="document.getElementById('antal').textContent++">+1</button>`,
            explanation: "Ökar siffran vid varje knapptryck."
          }
        ],
        task: "Skapa en <h2 id='status'>Väntar...</h2>, en <button onclick='starta()'>Starta</button>, samt en <script>-tagg med funktionen 'function starta() { document.getElementById(\"status\").textContent = \"Aktiverad!\"; }'.",
        starterCode: `<!-- Skapa din interaktiva HTML nedan -->
`,
        solutionCode: `<h2 id="status">Väntar...</h2>
<button onclick="starta()">Starta</button>

<script>
  function starta() {
    document.getElementById("status").textContent = "Aktiverad!";
  }
</script>`,
        solutionExplanation: "Vi kopplade knappens klickhändelse till JavaScript-funktionen som uppdaterar DOM-trädet.",
        hints: [
          "Skapa <h2 id=\"status\">Väntar...</h2>",
          "Skapa <button onclick=\"starta()\">Starta</button>",
          "Lägg till <script>function starta() { document.getElementById('status').textContent = 'Aktiverad!'; }</script>"
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller ett element med id='status'",
            selector: "#status"
          },
          {
            id: "tc-2",
            description: "Innehåller en knapp med onclick='starta()'",
            selector: "button[onclick*='starta']"
          },
          {
            id: "tc-3",
            description: "Innehåller en <script>-tagg med funktionen starta",
            selector: "script"
          }
        ]
      }
    ]
  },
  {
    id: 12,
    levelTitle: "Nivå 12: Modern Webmaster & Landing Page",
    levelSubtitle: "Fullständig modern landningssida med SEO, styling och interaktion",
    icon: "Sparkles",
    badgeName: "Fullstack Webbmästare",
    badgeDesc: "Slutförde hela HTML-kursen och byggde en komplett landningssida",
    requiredXp: 1300,
    exercises: [
      {
        id: "html-12-1",
        title: "Bygg en Komplett Modern Landningssida",
        shortDesc: "Kombinera HTML5-semantik, CSS-styling och interaktivitet",
        difficulty: "proffs",
        xpReward: 100,
        theory: `Nu sätter vi ihop allt du lärt dig för att bygga en komplett, modern och responsiv webbsida!

En professionell sida innehåller:
- \`<!DOCTYPE html>\` och korrekt \`<html>\`, \`<head>\`, \`<body>\`
- Semantisk struktur (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<footer>\`)
- Inbäddad CSS med färger och typografi
- Interaktivitet med en knapp och JavaScript`,
        examples: [
          {
            title: "Komplett mini-sida",
            code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>CyberCorp</title>
  <style>
    body { background: #0b0f19; color: #fff; font-family: sans-serif; padding: 20px; }
    header { border-bottom: 1px solid #334155; padding-bottom: 10px; }
  </style>
</head>
<body>
  <header><h1>CyberCorp</h1></header>
  <main><section><h2>Framtidens Webb</h2></section></main>
  <footer><p>© 2026</p></footer>
</body>
</html>`,
            explanation: "Ett komplett, modernt HTML-dokument."
          }
        ],
        task: "Bygg en komplett landningssida med <!DOCTYPE html>, <head> med <title> och <style>, samt <body> innehållande <header> med <h1>, <main> med minst en <section>, en <button id='cta-btn'>, och en <footer>.",
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Min Landningssida</title>
  <style>
    /* Lägg till din CSS här */
  </style>
</head>
<body>
  <!-- Bygg din semantiska struktur här -->
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Min Landningssida</title>
  <style>
    body {
      background-color: #080d1a;
      color: #f8fafc;
      font-family: system-ui, sans-serif;
      margin: 0;
      padding: 24px;
    }
    .hero {
      background: linear-gradient(135deg, #0e1e38, #182848);
      border: 1px solid #38bdf8;
      border-radius: 16px;
      padding: 32px;
      text-align: center;
    }
    button {
      background-color: #38bdf8;
      color: #080d1a;
      font-weight: bold;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <header>
    <h1>🚀 TechInnovate 2026</h1>
  </header>
  <main>
    <section class="hero">
      <h2>Välkommen till framtiden</h2>
      <p>Vi skapar nästa generations webbupplevelser med HTML5 och modern teknik.</p>
      <button id="cta-btn" onclick="alert('Välkommen ombord!')">Kom Igång Nu</button>
    </section>
  </main>
  <footer>
    <p>© 2026 TechInnovate AB. Alla rättigheter förbehållna.</p>
  </footer>
</body>
</html>`,
        solutionExplanation: "En fullständig modern landningssida med komplett HTML5-arkitektur, modern inbäddad CSS och interaktiva element.",
        hints: [
          "Se till att ha <header>, <main>, <section>, <button id=\"cta-btn\"> och <footer>.",
          "Styla elementen i <style> för en snygg mörk profil."
        ],
        testCases: [
          {
            id: "tc-1",
            description: "Innehåller <!DOCTYPE html> och <title>",
            selector: "title"
          },
          {
            id: "tc-2",
            description: "Innehåller <header>, <main>, <section> och <footer>",
            selector: "main section"
          },
          {
            id: "tc-3",
            description: "Innehåller en knapp med id='cta-btn'",
            selector: "button#cta-btn"
          }
        ]
      }
    ]
  }
];

export const HTML_QUIZZES: QuizQuestion[] = [
  {
    id: "q-1",
    levelId: 1,
    title: "Vad står HTML för?",
    question: "Vilken är den korrekta betydelsen av förkortningen HTML?",
    options: [
      "HyperText Markup Language",
      "High Tech Multi Language",
      "Hyperlink and Text Management Level",
      "Home Tool Markup Language"
    ],
    correctIndex: 0,
    explanation: "HTML står för HyperText Markup Language och används för att bygga strukturen på webbsidor.",
    xp: 25
  },
  {
    id: "q-2",
    levelId: 1,
    title: "Största rubriken",
    question: "Vilken tagg används för att definiera den viktigaste och största rubriken?",
    options: [
      "<heading>",
      "<h6>",
      "<h1>",
      "<head>"
    ],
    correctIndex: 2,
    explanation: "<h1> är sidans huvudrubrik. <h6> är den minsta rubriknivån.",
    xp: 25
  },
  {
    id: "q-3",
    levelId: 2,
    title: "Semantisk fetstil",
    question: "Vilken tagg är bäst lämpad för att ge text stark semantisk betydelse (fetstil)?",
    options: [
      "<b>",
      "<strong>",
      "<bold>",
      "<fat>"
    ],
    correctIndex: 1,
    explanation: "<strong> förmedlar stark vikt till både webbläsare, sökmotorer och skärmläsare, till skillnad från det äldre <b>.",
    xp: 25
  },
  {
    id: "q-4",
    levelId: 3,
    title: "Öppna länk i ny flik",
    question: "Vilket attribut och värde används i en <a>-tagg för att öppna en länk i en ny flik?",
    options: [
      "target=\"_new\"",
      "window=\"_blank\"",
      "target=\"_blank\"",
      "rel=\"newtab\""
    ],
    correctIndex: 2,
    explanation: "target=\"_blank\" instruerar webbläsaren att öppna destinationen i en ny flik eller ett nytt fönster.",
    xp: 30
  },
  {
    id: "q-5",
    levelId: 4,
    title: "Oordnade vs Ordnade listor",
    question: "Vilken tagg skapar en numrerad lista (1, 2, 3...)?",
    options: [
      "<ul>",
      "<ol>",
      "<list>",
      "<nl>"
    ],
    correctIndex: 1,
    explanation: "<ol> står för Ordered List och numrerar automatiskt alla <li>-element.",
    xp: 25
  },
  {
    id: "q-6",
    levelId: 5,
    title: "Obligatoriskt bildattribut",
    question: "Vilket attribut är kritiskt för tillgänglighet och skärmläsare på en <img>-tagg?",
    options: [
      "title",
      "alt",
      "caption",
      "description"
    ],
    correctIndex: 1,
    explanation: "alt-attributet ger en alternativ textbeskrivning av bilden för personer med synnedsättning eller när bilden inte kan visas.",
    xp: 30
  },
  {
    id: "q-7",
    levelId: 7,
    title: "Formulär inmatning",
    question: "Vilken input-typ döljer tecknen med punkter när användaren skriver in sitt hemliga lösenord?",
    options: [
      "<input type=\"secret\">",
      "<input type=\"hidden\">",
      "<input type=\"password\">",
      "<input type=\"secure\">"
    ],
    correctIndex: 2,
    explanation: "type=\"password\" maskerar tecknen som skrivs in för ökad säkerhet.",
    xp: 25
  },
  {
    id: "q-8",
    levelId: 9,
    title: "Semantiska HTML5-element",
    question: "Vilket element ska innehålla det huvudsakliga och unika innehållet på en sida?",
    options: [
      "<header>",
      "<main>",
      "<section>",
      "<content>"
    ],
    correctIndex: 1,
    explanation: "<main> ska omsluta sidans unika huvudinnehåll och får endast förekomma en gång per dokument.",
    xp: 30
  }
];

export const HTML_CHEATSHEET: CheatsheetCategory[] = [
  {
    id: "structure",
    title: "Dokumentstruktur & Head",
    icon: "Layout",
    items: [
      {
        name: "<!DOCTYPE html>",
        syntax: "<!DOCTYPE html>",
        description: "Deklarerar att dokumentet är skrivet i HTML5.",
        example: "<!DOCTYPE html>\n<html>...</html>"
      },
      {
        name: "<html>",
        syntax: "<html lang=\"sv\">...</html>",
        description: "Rotelementet som omsluter allt HTML-innehåll på sidan.",
        example: "<html lang=\"sv\">\n  <head>...</head>\n  <body>...</body>\n</html>"
      },
      {
        name: "<head>",
        syntax: "<head>...</head>",
        description: "Innehåller metadata, titlar, teckenuppsättning och CSS-länkar.",
        example: "<head>\n  <meta charset=\"UTF-8\">\n  <title>Min Sida</title>\n</head>"
      },
      {
        name: "<title>",
        syntax: "<title>Sidtitel</title>",
        description: "Visas i webbläsarens flik och används som rubrik i sökmotorer.",
        example: "<title>Välkommen till Min Webbplats</title>"
      },
      {
        name: "<body>",
        syntax: "<body>...</body>",
        description: "Innehåller allt synligt innehåll för användaren.",
        example: "<body>\n  <h1>Hej!</h1>\n  <p>Innehåll här.</p>\n</body>"
      }
    ]
  },
  {
    id: "text",
    title: "Text & Typografi",
    icon: "Type",
    items: [
      {
        name: "<h1> till <h6>",
        syntax: "<h1>Rubrik 1</h1>\n<h2>Rubrik 2</h2>",
        description: "Sex nivåer av rubriker från störst till minst.",
        example: "<h1>Huvudrubrik</h1>\n<h2>Underrubrik</h2>"
      },
      {
        name: "<p>",
        syntax: "<p>Textstycke...</p>",
        description: "Definierar ett textstycke (paragraph).",
        example: "<p>HTML är grunden för alla webbsidor på internet.</p>"
      },
      {
        name: "<strong> & <em>",
        syntax: "<strong>Fet text</strong>\n<em>Kursiv text</em>",
        description: "Stark betydelse (fetstil) respektive betoning (kursiv).",
        example: "<p>Det är <strong>mycket viktigt</strong> med <em>semantik</em>.</p>"
      },
      {
        name: "<br> & <hr>",
        syntax: "<br>\n<hr>",
        description: "<br> ger en enkel radbrytning. <hr> ritar en horisontell skiljelinje.",
        example: "<p>Rad ett.<br>Rad två.</p>\n<hr>"
      },
      {
        name: "<blockquote> & <code>",
        syntax: "<blockquote>Citat</blockquote>\n<code>kod</code>",
        description: "Blockcitat och inline programmeringskod.",
        example: "<blockquote>Enkelhet är bäst.</blockquote>\n<p>Skriv <code>alert()</code>.</p>"
      }
    ]
  },
  {
    id: "links-media",
    title: "Länkar, Bilder & Media",
    icon: "Globe",
    items: [
      {
        name: "<a> (Hyperlänk)",
        syntax: "<a href=\"URL\" target=\"_blank\">Länktext</a>",
        description: "Skapar klickbara länkar till andra sidor eller filer.",
        example: "<a href=\"https://google.se\" target=\"_blank\">Sök på Google</a>"
      },
      {
        name: "<img> (Bild)",
        syntax: "<img src=\"bild.jpg\" alt=\"Beskrivning\" width=\"300\">",
        description: "Bäddar in en bild med sökväg och alternativ text.",
        example: "<img src=\"logo.png\" alt=\"Företagslogotyp\" width=\"200\">"
      },
      {
        name: "<figure> & <figcaption>",
        syntax: "<figure>\n  <img src=\"...\">\n  <figcaption>Bildtext</figcaption>\n</figure>",
        description: "Grupperar en bild med en beskrivande bildtext.",
        example: "<figure>\n  <img src=\"foto.jpg\" alt=\"Katt\">\n  <figcaption>En söt katt</figcaption>\n</figure>"
      },
      {
        name: "<video> & <audio>",
        syntax: "<video src=\"film.mp4\" controls width=\"400\"></video>",
        description: "Spelar upp video och ljud med inbyggda kontroller.",
        example: "<video src=\"intro.mp4\" controls></video>"
      }
    ]
  },
  {
    id: "forms",
    title: "Formulär & Input",
    icon: "FileCheck",
    items: [
      {
        name: "<form>",
        syntax: "<form action=\"/submit\" method=\"POST\">...</form>",
        description: "Omsluter formulärfält och skickar data.",
        example: "<form>\n  <input type=\"text\">\n  <button type=\"submit\">Skicka</button>\n</form>"
      },
      {
        name: "<input>",
        syntax: "<input type=\"text|email|password|number|date\" placeholder=\"...\">",
        description: "Mångsidigt inmatningsfält baserat på type-attributet.",
        example: "<input type=\"email\" placeholder=\"namn@mail.se\" required>"
      },
      {
        name: "<label>",
        syntax: "<label for=\"fältId\">Etikett</label>",
        description: "Kopplar text till ett inmatningsfält för klickbarhet och a11y.",
        example: "<label for=\"namn\">Ditt Namn:</label>\n<input id=\"namn\" type=\"text\">"
      },
      {
        name: "<select> & <option>",
        syntax: "<select>\n  <option value=\"1\">Val 1</option>\n</select>",
        description: "Rullgardinsmeny med valbara alternativ.",
        example: "<select>\n  <option value=\"se\">Sverige</option>\n  <option value=\"no\">Norge</option>\n</select>"
      },
      {
        name: "<textarea>",
        syntax: "<textarea rows=\"4\" placeholder=\"Meddelande...\"></textarea>",
        description: "Flergradigt textinmatningsfält.",
        example: "<textarea placeholder=\"Skriv ditt meddelande här...\"></textarea>"
      }
    ]
  },
  {
    id: "semantic",
    title: "Semantiska HTML5-taggar",
    icon: "Layout",
    items: [
      {
        name: "<header>",
        syntax: "<header>...</header>",
        description: "Sidhuvud eller sektionshuvud med logotyp, rubrik och nav.",
        example: "<header>\n  <h1>Min Blogg</h1>\n</header>"
      },
      {
        name: "<nav>",
        syntax: "<nav><a href=\"#\">Hem</a></nav>",
        description: "Navigationssektion som innehåller webbplatsens huvudlänkar.",
        example: "<nav>\n  <a href=\"#hem\">Hem</a>\n  <a href=\"#om\">Om</a>\n</nav>"
      },
      {
        name: "<main>",
        syntax: "<main>...</main>",
        description: "Sidans unika huvudinnehåll.",
        example: "<main>\n  <section>...</section>\n</main>"
      },
      {
        name: "<section> & <article>",
        syntax: "<section><h2>Avsnitt</h2></section>\n<article><h3>Artikel</h3></article>",
        description: "Tematiska avsnitt och fristående artiklar.",
        example: "<section>\n  <h2>Senaste Nyheterna</h2>\n  <article><h3>Nyhet 1</h3></article>\n</section>"
      },
      {
        name: "<footer>",
        syntax: "<footer><p>© 2026</p></footer>",
        description: "Sidfot med upphovsrätt, kontaktinfo och sekundära länkar.",
        example: "<footer>\n  <p>© 2026 Webbyrån</p>\n</footer>"
      }
    ]
  }
];
