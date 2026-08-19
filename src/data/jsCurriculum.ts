import { HtmlLessonLevel, QuizQuestion, CheatsheetCategory } from '../types/html';

export const JS_CURRICULUM: HtmlLessonLevel[] = [
  {
    id: 1,
    track: 'js',
    levelTitle: 'Nivå 1: JS Grunder, Console & Variabler (let & const)',
    levelSubtitle: 'Upptäck webbens programmeringsspråk. Lär dig skriva till konsolen och spara data i variabler.',
    icon: 'Terminal',
    badgeName: 'JS Pioniär',
    badgeDesc: 'Har skrivit sina första rader JavaScript och förstår variabler.',
    requiredXp: 0,
    exercises: [
      {
        id: 'js-1-1',
        track: 'js',
        title: 'console.log & Variabler (let och const)',
        shortDesc: 'Skriv ett välkomstmeddelande till konsolen med console.log().',
        difficulty: 'nyborjare',
        xpReward: 25,
        theory: `JavaScript (JS) är programmeringsspråket som gör webbsidor dynamiska och interaktiva.\n\n• 'console.log("Hej!");' skriver ut information i webbläsarens utvecklarkonsol.\n• 'const' används för variabler vars värde inte ska ändras.\n• 'let' används för variabler som kan ändras senare.\n\nExempel:\nconst namn = "Nexus";\nconsole.log("Välkommen till " + namn);`,
        examples: [
          {
            title: 'Variabel och logg',
            code: `<script>\n  const kurs = "JavaScript";\n  console.log("Lär dig " + kurs);\n</script>`,
            explanation: 'Skapar en konstant och skriver ut den med console.log.'
          }
        ],
        task: 'Skapa en variabel "const appNamn = \'Nexus\';" och skriv ut "Välkommen till Nexus" i konsolen med console.log("Välkommen till " + appNamn).',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>JS Grunder</title>
</head>
<body>
  <h1>JavaScript Konsol Test</h1>
  <script>
    // Skriv din JavaScript-kod här nedanför
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>JS Grunder</title>
</head>
<body>
  <h1>JavaScript Konsol Test</h1>
  <script>
    const appNamn = 'Nexus';
    console.log('Välkommen till ' + appNamn);
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi definierade konstanten appNamn och använde console.log för att skriva ut meddelandet.',
        hints: [
          'Skriv: const appNamn = \'Nexus\';',
          'Skriv därefter: console.log(\'Välkommen till \' + appNamn);'
        ],
        testCases: [
          {
            id: 'tc-js-var',
            description: 'Koden ska deklarera appNamn',
            jsCheck: { type: 'script_contains', snippet: 'appnamn' }
          },
          {
            id: 'tc-js-log',
            description: 'console.log ska skriva ut "Välkommen till Nexus"',
            jsCheck: { type: 'console_log', expectedValue: 'Välkommen till Nexus' }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    track: 'js',
    levelTitle: 'Nivå 2: Datatyper & Template Literals (Strängar & Tal)',
    levelSubtitle: 'Mästra textsträngar med backticks (${namn}), siffror och matematiska operatorer.',
    icon: 'Type',
    badgeName: 'Sträng & Talmästare',
    badgeDesc: 'Kombinerar variabler smidigt med moderna ES6 Template Literals.',
    requiredXp: 55,
    exercises: [
      {
        id: 'js-2-1',
        track: 'js',
        title: 'Template Literals med Backticks (`${...}`)',
        shortDesc: 'Bygg dynamiska strängar utan klumpig plustecken-sammanfogning.',
        difficulty: 'nyborjare',
        xpReward: 30,
        theory: `I modern JavaScript (ES6) använder vi backticks (\` \`) för Template Literals.\n\nMed '\${variabel}' kan du baka in variabler direkt i en text:\n\nconst anvandare = "Alice";\nconst poang = 100;\nconsole.log(\`Spelare: \${anvandare}, Poäng: \${poang * 2}\`);`,
        examples: [
          {
            title: 'Template literal beräkning',
            code: `<script>\n  const pris = 50;\n  const antal = 3;\n  console.log(\`Totalsumma: \${pris * antal} kr\`);\n</script>`,
            explanation: 'Räknar ut 50 * 3 = 150 och skriver ut "Totalsumma: 150 kr".'
          }
        ],
        task: 'Skapa "const spelare = \'Leo\';" och "const niva = 5;", och logga sedan strängen `Spelare Leo är på nivå 5!` med template literals.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    // Skriv dina variabler och template literal-logg här:
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const spelare = 'Leo';
    const niva = 5;
    console.log(\`Spelare \${spelare} är på nivå \${niva}!\`);
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi använde backticks och ${...} för att infoga variablerna spelare och niva.',
        hints: [
          'Använd backticks ` istället för vanliga citationstecken.',
          'Skriv console.log(`Spelare ${spelare} är på nivå ${niva}!`);'
        ],
        testCases: [
          {
            id: 'tc-js-template',
            description: 'console.log ska skriva ut "Spelare Leo är på nivå 5!"',
            jsCheck: { type: 'console_log', expectedValue: 'Spelare Leo är på nivå 5!' }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    track: 'js',
    levelTitle: 'Nivå 3: Villkor & Logik (if, else if, else)',
    levelSubtitle: 'Styr programmets flöde med jämförelser (===, >=, &&, ||).',
    icon: 'Sliders',
    badgeName: 'Logik Arkitekt',
    badgeDesc: 'Skapar beslutsfattande kod med if-satser och jämförelser.',
    requiredXp: 115,
    exercises: [
      {
        id: 'js-3-1',
        track: 'js',
        title: 'Villkorsstyrning med if och else',
        shortDesc: 'Kontrollera användarens ålder eller poäng och ge rätt svar.',
        difficulty: 'nyborjare',
        xpReward: 35,
        theory: `Med 'if' och 'else' kan ditt program fatta beslut:\n\nif (poang >= 50) {\n  console.log("Godkänd!");\n} else {\n  console.log("Försök igen!");\n}\n\nJämförelseoperatorer:\n• '===' strikt lika med\n• '!==' inte lika med\n• '>=' större än eller lika med\n• '&&' och (båda måste stämma)\n• '||' eller (minst en måste stämma)`,
        examples: [
          {
            title: 'Ålderskontroll',
            code: `<script>\n  const alder = 18;\n  if (alder >= 18) {\n    console.log("Myndig");\n  } else {\n    console.log("Minderårig");\n  }\n</script>`,
            explanation: 'Skriver ut "Myndig" om alder är minst 18.'
          }
        ],
        task: 'Skapa "const xp = 120;". Om xp är större än eller lika med 100 ska programmet logga "Nivå Upp!", annars "Fortsätt Kämpa!".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const xp = 120;
    // Skriv din if/else-sats här
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const xp = 120;
    if (xp >= 100) {
      console.log("Nivå Upp!");
    } else {
      console.log("Fortsätt Kämpa!");
    }
  </script>
</body>
</html>`,
        solutionExplanation: 'Eftersom xp (120) är >= 100 körs det första kodblocket och "Nivå Upp!" skrivs ut.',
        hints: [
          'Skriv if (xp >= 100) { console.log("Nivå Upp!"); } else { console.log("Fortsätt Kämpa!"); }'
        ],
        testCases: [
          {
            id: 'tc-js-if',
            description: 'console.log ska skriva ut "Nivå Upp!"',
            jsCheck: { type: 'console_log', expectedValue: 'Nivå Upp!' }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    track: 'js',
    levelTitle: 'Nivå 4: Funktioner & Arrow Functions',
    levelSubtitle: 'Bygg återanvändbara kodblock med parametrar och returvärden.',
    icon: 'Zap',
    badgeName: 'Funktionsmästare',
    badgeDesc: 'Skapar modulära funktioner och behärskar arrow-syntaxen.',
    requiredXp: 180,
    exercises: [
      {
        id: 'js-4-1',
        track: 'js',
        title: 'Skapa och anropa en Arrow Function',
        shortDesc: 'Skapa en funktion som tar två tal och returnerar summan.',
        difficulty: 'medel',
        xpReward: 35,
        theory: `En funktion samlar kod som du kan köra flera gånger med olika indata:\n\n// Klassisk funktion:\nfunction dubbla(x) {\n  return x * 2;\n}\n\n// Modern Arrow Function (pilfunktion):\nconst dubbla = (x) => x * 2;\n\nconsole.log(dubbla(10)); // Skriver ut 20`,
        examples: [
          {
            title: 'Hälsningsfunktion',
            code: `<script>\n  const halsa = (namn) => \`Hej, \${namn}!\`;\n  console.log(halsa("Sara"));\n</script>`,
            explanation: 'Returnerar "Hej, Sara!" och skriver ut det.'
          }
        ],
        task: 'Skapa en arrow function "const addera = (a, b) => a + b;" och logga resultatet av "addera(15, 25)".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    // Skapa arrow funktionen addera och logga addera(15, 25) här:
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const addera = (a, b) => a + b;
    console.log(addera(15, 25));
  </script>
</body>
</html>`,
        solutionExplanation: 'Funktionen addera tar a och b och returnerar 15 + 25 = 40.',
        hints: [
          'Skriv: const addera = (a, b) => a + b;',
          'Skriv sedan: console.log(addera(15, 25));'
        ],
        testCases: [
          {
            id: 'tc-js-fn-res',
            description: 'console.log ska skriva ut 40',
            jsCheck: { type: 'console_log', expectedValue: '40' }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    track: 'js',
    levelTitle: 'Nivå 5: Arrayer & Listor (push, pop, length)',
    levelSubtitle: 'Spara och hantera samlingar av data i JavaScript-listor.',
    icon: 'ListTree',
    badgeName: 'Array Arkitekt',
    badgeDesc: 'Lagrar och manipulerar ordnade datamängder i arrayer.',
    requiredXp: 250,
    exercises: [
      {
        id: 'js-5-1',
        track: 'js',
        title: 'Skapa och manipulera en array',
        shortDesc: 'Lägg till ett element med push() och läs ut arrayens längd.',
        difficulty: 'medel',
        xpReward: 40,
        theory: `En array (lista) skapas med klammerparenteser:\n\nconst frukter = ["Äpple", "Banan"];\nfrukter.push("Apelsin"); // Lägger till i slutet\nconsole.log(frukter[0]);  // Första elementet: "Äpple"\nconsole.log(frukter.length); // Antal element: 3`,
        examples: [
          {
            title: 'Färger array',
            code: `<script>\n  const farger = ["Röd", "Grön"];\n  farger.push("Blå");\n  console.log(\`Antal: \${farger.length}\`);\n</script>`,
            explanation: 'Lägger till "Blå" så arrayen har 3 element.'
          }
        ],
        task: 'Skapa arrayen "const verktyg = [\'HTML\', \'CSS\'];", lägg till "\'JavaScript\'" med push(), och logga "verktyg.length".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    // Skriv din array-kod här:
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const verktyg = ['HTML', 'CSS'];
    verktyg.push('JavaScript');
    console.log(verktyg.length);
  </script>
</body>
</html>`,
        solutionExplanation: 'Efter att ha pushat JavaScript har listan 3 element.',
        hints: [
          'Skriv: const verktyg = [\'HTML\', \'CSS\'];',
          'Skriv: verktyg.push(\'JavaScript\');',
          'Skriv: console.log(verktyg.length);'
        ],
        testCases: [
          {
            id: 'tc-js-array-len',
            description: 'console.log ska skriva ut 3',
            jsCheck: { type: 'console_log', expectedValue: '3' }
          }
        ]
      }
    ]
  },
  {
    id: 6,
    track: 'js',
    levelTitle: 'Nivå 6: Array-metoder (map, filter, forEach)',
    levelSubtitle: 'Transformera och filtrera listor funktionellt med map och filter.',
    icon: 'Layers',
    badgeName: 'Data Transformerare',
    badgeDesc: 'Bearbetar data funktionellt med moderna array-metoder.',
    requiredXp: 330,
    exercises: [
      {
        id: 'js-6-1',
        track: 'js',
        title: 'Filtrera jämna tal med .filter()',
        shortDesc: 'Filtrera ut alla tal som är större än 10 från en lista.',
        difficulty: 'medel',
        xpReward: 40,
        theory: `Array-metoder gör databearbetning ren och kraftfull:\n\n• '.filter(fn)': behåller element som uppfyller ett villkor.\n• '.map(fn)': omvandlar varje element till något nytt.\n\nExempel:\nconst tal = [5, 12, 8, 20];\nconst storaTal = tal.filter(n => n > 10);\nconsole.log(storaTal); // [12, 20]`,
        examples: [
          {
            title: 'Mappa till versaler',
            code: `<script>\n  const ord = ["hej", "webb"];\n  const stora = ord.map(o => o.toUpperCase());\n  console.log(stora.join(", "));\n</script>`,
            explanation: 'Omvandlar alla ord till versaler: "HEJ, WEBB".'
          }
        ],
        task: 'Givet "const poangLista = [45, 80, 20, 95, 60];", använd .filter() för att skapa "const godkanda = poangLista.filter(p => p >= 60);" och logga "godkanda.length".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const poangLista = [45, 80, 20, 95, 60];
    // Skapa godkanda med filter och logga antalet godkända
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const poangLista = [45, 80, 20, 95, 60];
    const godkanda = poangLista.filter(p => p >= 60);
    console.log(godkanda.length);
  </script>
</body>
</html>`,
        solutionExplanation: 'Talen 80, 95 och 60 är >= 60, så längden på den filtrerade listan är 3.',
        hints: [
          'Skriv const godkanda = poangLista.filter(p => p >= 60);',
          'Logga därefter godkanda.length'
        ],
        testCases: [
          {
            id: 'tc-js-filter-len',
            description: 'console.log ska skriva ut 3',
            jsCheck: { type: 'console_log', expectedValue: '3' }
          }
        ]
      }
    ]
  },
  {
    id: 7,
    track: 'js',
    levelTitle: 'Nivå 7: Objekt & Datastrukturer (Key-Value)',
    levelSubtitle: 'Modellera verkliga entiteter med JSON-liknande JavaScript-objekt.',
    icon: 'Sliders',
    badgeName: 'Objekt Arkitekt',
    badgeDesc: 'Strukturerar komplex information i lättlästa JavaScript-objekt.',
    requiredXp: 410,
    exercises: [
      {
        id: 'js-7-1',
        track: 'js',
        title: 'Skapa och läs ut egenskaper från ett objekt',
        shortDesc: 'Bygg ett användarobjekt och skriv ut dess egenskaper.',
        difficulty: 'medel',
        xpReward: 40,
        theory: `Ett objekt lagrar data som nyckel-värde par:\n\nconst profil = {\n  namn: "Elin",\n  roll: "Frontend Utvecklare",\n  niva: 3\n};\n\nconsole.log(profil.namn); // "Elin"\nconsole.log(\`\${profil.namn} är \${profil.roll}\`);`,
        examples: [
          {
            title: 'Bil-objekt',
            code: `<script>\n  const bil = { marke: "Volvo", ar: 2024 };\n  console.log(\`Modell: \${bil.marke}\`);\n</script>`,
            explanation: 'Hämtar bil.marke.'
          }
        ],
        task: 'Skapa objektet "const spelare = { namn: \'Klara\', hp: 100 };" och logga strängen `Spelare Klara har 100 HP`.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    // Skapa objektet spelare och logga dess egenskaper här:
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    const spelare = { namn: 'Klara', hp: 100 };
    console.log(\`Spelare \${spelare.namn} har \${spelare.hp} HP\`);
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi skapade objektet med egenskaperna namn och hp och använde punkt-notation.',
        hints: [
          'Skriv const spelare = { namn: \'Klara\', hp: 100 };',
          'Skriv console.log(`Spelare ${spelare.namn} har ${spelare.hp} HP`);'
        ],
        testCases: [
          {
            id: 'tc-js-obj-log',
            description: 'console.log ska skriva ut "Spelare Klara har 100 HP"',
            jsCheck: { type: 'console_log', expectedValue: 'Spelare Klara har 100 HP' }
          }
        ]
      }
    ]
  },
  {
    id: 8,
    track: 'js',
    levelTitle: 'Nivå 8: DOM Manipulation (document.querySelector & textContent)',
    levelSubtitle: 'Koppla samman JS med HTML. Ändra text och CSS-stilar live i webbläsaren.',
    icon: 'Code2',
    badgeName: 'DOM Trollkarl',
    badgeDesc: 'Manipulerar och uppdaterar webbsidans element dynamiskt med JS.',
    requiredXp: 490,
    exercises: [
      {
        id: 'js-8-1',
        track: 'js',
        title: 'Hitta element och ändra dess text',
        shortDesc: 'Använd document.getElementById eller querySelector för att uppdatera en rubrik.',
        difficulty: 'avancerad',
        xpReward: 45,
        theory: `DOM (Document Object Model) låter JavaScript prata med HTML-elementen på sidan:\n\n• 'document.getElementById("titel")': hittar elementet med id="titel".\n• 'el.textContent = "Ny text"': uppdaterar texten inuti elementet.\n• 'el.style.color = "#38bdf8"': ändrar CSS-styling direkt via JS!`,
        examples: [
          {
            title: 'Ändra text på en knapp',
            code: `<h1 id="rubrik">Gammal rubrik</h1>\n<script>\n  const r = document.getElementById("rubrik");\n  r.textContent = "Uppdaterad av JS!";\n</script>`,
            explanation: 'Byter direkt ut texten när sidan laddas.'
          }
        ],
        task: 'Hämta elementet med id "status" och ändra dess textContent till "Systemet är Online!".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h2 id="status">Väntar på anslutning...</h2>

  <script>
    // Hämta elementet #status och sätt textContent till "Systemet är Online!"
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h2 id="status">Väntar på anslutning...</h2>

  <script>
    const statusEl = document.getElementById('status');
    statusEl.textContent = 'Systemet är Online!';
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi hämtade h2-elementet och uppdaterade dess textContent.',
        hints: [
          'Skriv document.getElementById(\'status\').textContent = \'Systemet är Online!\';'
        ],
        testCases: [
          {
            id: 'tc-js-dom-txt',
            description: '#status ska innehålla texten "Systemet är Online!"',
            selector: '#status',
            containsText: 'Systemet är Online!'
          }
        ]
      }
    ]
  },
  {
    id: 9,
    track: 'js',
    levelTitle: 'Nivå 9: Händelselyssnare & Klick (addEventListener)',
    levelSubtitle: 'Gör knappar och formulär interaktiva med klick-händelser.',
    icon: 'Zap',
    badgeName: 'Event Mästare',
    badgeDesc: 'Reagerar på användarklick och interaktioner med addEventListener.',
    requiredXp: 575,
    exercises: [
      {
        id: 'js-9-1',
        track: 'js',
        title: 'Interaktiv klick-räknare med addEventListener',
        shortDesc: 'Öka ett räknarvärde varje gång användaren klickar på knappen.',
        difficulty: 'avancerad',
        xpReward: 45,
        theory: `För att reagera på vad användaren gör använder vi 'addEventListener':\n\nconst knapp = document.getElementById("minKnapp");\nknapp.addEventListener("click", () => {\n  console.log("Klickad!");\n});\n\nVanliga händelser:\n• 'click': vid musklick / fingertryck\n• 'input': när användaren skriver i ett textfält\n• 'submit': när ett formulär skickas`,
        examples: [
          {
            title: 'Klick-räknare',
            code: `<button id="btn">Klicka mig</button>\n<p id="raknare">0</p>\n<script>\n  let antal = 0;\n  document.getElementById("btn").addEventListener("click", () => {\n    antal++;\n    document.getElementById("raknare").textContent = antal;\n  });\n</script>`,
            explanation: 'Ökar räknaren med 1 för varje klick.'
          }
        ],
        task: 'Lägg till en klick-lyssnare på "#knapp" som sätter textContent i "#meddelande" till "Knappen klickades!".',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    button { padding: 10px 20px; background: #f59e0b; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <button id="knapp">Aktivera</button>
  <p id="meddelande">Ingen aktivitet än</p>

  <script>
    // Lägg till addEventListener("click") på #knapp här:
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    button { padding: 10px 20px; background: #f59e0b; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <button id="knapp">Aktivera</button>
  <p id="meddelande">Ingen aktivitet än</p>

  <script>
    document.getElementById('knapp').addEventListener('click', () => {
      document.getElementById('meddelande').textContent = 'Knappen klickades!';
    });
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi registrerade en klick-lyssnare med addEventListener som uppdaterar texten.',
        hints: [
          'Skriv document.getElementById(\'knapp\').addEventListener(\'click\', () => { ... });'
        ],
        testCases: [
          {
            id: 'tc-js-event',
            description: 'Koden ska innehålla addEventListener med "click"',
            jsCheck: { type: 'script_contains', snippet: 'addeventlistener' }
          }
        ]
      }
    ]
  },
  {
    id: 10,
    track: 'js',
    levelTitle: 'Nivå 10: Asynkron JS & Fetch API (async/await)',
    levelSubtitle: 'Hämta data från API:er på internet och hantera asynkrona svar.',
    icon: 'Globe',
    badgeName: 'API & Async Pro',
    badgeDesc: 'Hämtar data över nätverket med async/await och fetch.',
    requiredXp: 665,
    exercises: [
      {
        id: 'js-10-1',
        track: 'js',
        title: 'Asynkrona funktioner med async & await',
        shortDesc: 'Skapa en asynkron funktion som simulerar datahämtning.',
        difficulty: 'proffs',
        xpReward: 50,
        theory: `Mycket i modern webbutveckling sker asynkront (t.ex. nätverksanrop):\n\nasync function hamtaData() {\n  const svar = await fetch("https://api.example.com/data");\n  const json = await svar.json();\n  console.log(json);\n}\n\n• 'async' gör att funktionen kan använda 'await'.\n• 'await' pausar tills löftet (Promise) är klart utan att låsa webbläsaren.`,
        examples: [
          {
            title: 'Simulerad asynkron laddning',
            code: `<script>\n  const vantaOchLogga = async () => {\n    console.log("Startar...");\n    await new Promise(r => setTimeout(r, 500));\n    console.log("Klar!");\n  };\n  vantaOchLogga();\n</script>`,
            explanation: 'Väntar 500ms och loggar sedan "Klar!".'
          }
        ],
        task: 'Skapa en asynkron funktion "async function laddaSystem()" som loggar "System Laddat!" och anropa den.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    // Skapa async function laddaSystem() och anropa den
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <script>
    async function laddaSystem() {
      console.log('System Laddat!');
    }
    laddaSystem();
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi definierade funktionen med async och anropade den.',
        hints: [
          'Skriv async function laddaSystem() { console.log(\'System Laddat!\'); }',
          'Glöm inte att anropa funktionen med laddaSystem();'
        ],
        testCases: [
          {
            id: 'tc-js-async',
            description: 'console.log ska skriva ut "System Laddat!"',
            jsCheck: { type: 'console_log', expectedValue: 'System Laddat!' }
          }
        ]
      }
    ]
  },
  {
    id: 11,
    track: 'js',
    levelTitle: 'Nivå 11: Dynamisk Rendering & Skapa Nya Element (createElement)',
    levelSubtitle: 'Bygg användargränssnitt dynamiskt med document.createElement och appendChild.',
    icon: 'Sparkles',
    badgeName: 'UI Generator',
    badgeDesc: 'Genererar dynamiska HTML-komponenter och listor från data med JS.',
    requiredXp: 755,
    exercises: [
      {
        id: 'js-11-1',
        track: 'js',
        title: 'Skapa och lägg till ett nytt listelement',
        shortDesc: 'Använd document.createElement("li") och appendChild för att bygga en dynamisk lista.',
        difficulty: 'proffs',
        xpReward: 50,
        theory: `Istället för att skriva all HTML i förväg kan JavaScript skapa element under körning:\n\nconst nyttLi = document.createElement("li");\nnyttLi.textContent = "Ny uppgift";\nnyttLi.className = "kort";\n\ndocument.getElementById("minLista").appendChild(nyttLi);`,
        examples: [
          {
            title: 'Generera lista från array',
            code: `<ul id="lista"></ul>\n<script>\n  const items = ["A", "B"];\n  const ul = document.getElementById("lista");\n  items.forEach(text => {\n    const li = document.createElement("li");\n    li.textContent = text;\n    ul.appendChild(li);\n  });\n</script>`,
            explanation: 'Skapar <li>-element för varje sträng i arrayen.'
          }
        ],
        task: 'Skapa ett nytt <li>-element med texten "JavaScript Mästare" och lägg till det i "#kunskapslista" med appendChild().',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h2>Mina Kunskaper</h2>
  <ul id="kunskapslista">
    <li>HTML5 Grunder</li>
    <li>CSS3 Layout</li>
  </ul>

  <script>
    // Skapa ett nytt <li> med "JavaScript Mästare" och lägg till i #kunskapslista
    
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h2>Mina Kunskaper</h2>
  <ul id="kunskapslista">
    <li>HTML5 Grunder</li>
    <li>CSS3 Layout</li>
  </ul>

  <script>
    const nyttElement = document.createElement('li');
    nyttElement.textContent = 'JavaScript Mästare';
    document.getElementById('kunskapslista').appendChild(nyttElement);
  </script>
</body>
</html>`,
        solutionExplanation: 'Vi skapade ett <li> med createElement och lade till det med appendChild.',
        hints: [
          'Skriv const li = document.createElement(\'li\');',
          'Sätt li.textContent = \'JavaScript Mästare\';',
          'Lägg till med document.getElementById(\'kunskapslista\').appendChild(li);'
        ],
        testCases: [
          {
            id: 'tc-js-create',
            description: '#kunskapslista ska innehålla "JavaScript Mästare"',
            selector: '#kunskapslista',
            containsText: 'JavaScript Mästare'
          }
        ]
      }
    ]
  },
  {
    id: 12,
    track: 'js',
    levelTitle: 'Nivå 12: Fullstack Frontend Mini-App (HTML + CSS + JS)',
    levelSubtitle: 'Kombinera allt du har lärt dig! Bygg en komplett interaktiv webbapp.',
    icon: 'Award',
    badgeName: 'Fullstack Frontend Mästare',
    badgeDesc: 'Har byggt en komplett, stylad och interaktiv webbapp med HTML, CSS och JS!',
    requiredXp: 850,
    exercises: [
      {
        id: 'js-12-1',
        track: 'js',
        title: 'Bygg en Interaktiv Att-göra / Mål-app',
        shortDesc: 'Koppla samman formulär-input, klickhändelse och dynamisk listrendering.',
        difficulty: 'proffs',
        xpReward: 60,
        theory: `Grattis till den sista nivån! Här kombinerar vi treenigheten av modern webbutveckling:\n\n1. HTML: Ger strukturen med inputfält, knappar och behållare.\n2. CSS: Ger modern mörk/ljus styling, flexbox och runda hörn.\n3. JavaScript: Läser av vad användaren skriver, reagerar på klick och skapar dynamiska listelement!`,
        examples: [
          {
            title: 'Komplett flöde',
            code: `btn.addEventListener("click", () => {\n  const val = input.value.trim();\n  if (val) {\n    const item = document.createElement("li");\n    item.textContent = val;\n    list.appendChild(item);\n    input.value = "";\n  }\n});`,
            explanation: 'Läser input, skapar element, rensar fältet.'
          }
        ],
        task: 'Lägg till klicklyssnaren så att när man klickar på "#laggTillKnapp" skapas ett <li> med texten från "#uppgiftInput" och läggs till i "#malLista". Sätt ett standardvärde med ett första element eller rensa fältet.',
        starterCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 24px; }
    .kort { background: #1e293b; padding: 24px; border-radius: 16px; max-width: 400px; }
    input { padding: 10px; border-radius: 8px; border: 1px solid #334155; background: #0b0f19; color: #fff; width: calc(100% - 24px); margin-bottom: 10px; }
    button { width: 100%; padding: 10px; background: #f59e0b; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; color: #000; }
    ul { list-style: none; padding: 0; margin-top: 16px; }
    li { background: #334155; padding: 8px 12px; border-radius: 6px; margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="kort">
    <h2>Mina Framtidsmål</h2>
    <input type="text" id="uppgiftInput" placeholder="Skriv ett mål..." value="Bygga min första webbapp">
    <button id="laggTillKnapp">Lägg till mål</button>
    <ul id="malLista">
      <li>Lär mig HTML, CSS & JS</li>
    </ul>
  </div>

  <script>
    const input = document.getElementById('uppgiftInput');
    const knapp = document.getElementById('laggTillKnapp');
    const lista = document.getElementById('malLista');

    // Skriv klicklyssnaren här under:
    knapp.addEventListener('click', () => {
      
    });
  </script>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 24px; }
    .kort { background: #1e293b; padding: 24px; border-radius: 16px; max-width: 400px; }
    input { padding: 10px; border-radius: 8px; border: 1px solid #334155; background: #0b0f19; color: #fff; width: calc(100% - 24px); margin-bottom: 10px; }
    button { width: 100%; padding: 10px; background: #f59e0b; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; color: #000; }
    ul { list-style: none; padding: 0; margin-top: 16px; }
    li { background: #334155; padding: 8px 12px; border-radius: 6px; margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="kort">
    <h2>Mina Framtidsmål</h2>
    <input type="text" id="uppgiftInput" placeholder="Skriv ett mål..." value="Bygga min första webbapp">
    <button id="laggTillKnapp">Lägg till mål</button>
    <ul id="malLista">
      <li>Lär mig HTML, CSS & JS</li>
    </ul>
  </div>

  <script>
    const input = document.getElementById('uppgiftInput');
    const knapp = document.getElementById('laggTillKnapp');
    const lista = document.getElementById('malLista');

    knapp.addEventListener('click', () => {
      const text = input.value.trim();
      if (text) {
        const nyttLi = document.createElement('li');
        nyttLi.textContent = text;
        lista.appendChild(nyttLi);
        input.value = '';
      }
    });
  </script>
</body>
</html>`,
        solutionExplanation: 'Grattis! Du har byggt en komplett, levande app med HTML strukturer, CSS formgivning och JavaScript interaktion!',
        hints: [
          'Hämta texten med: const text = input.value;',
          'Skapa element: const li = document.createElement(\'li\'); li.textContent = text;',
          'Lägg till med: lista.appendChild(li);'
        ],
        testCases: [
          {
            id: 'tc-js-app-struct',
            description: 'Sidan ska ha input, knapp och lista',
            selector: '#uppgiftInput'
          },
          {
            id: 'tc-js-app-btn',
            description: 'Knappen ska ha ID #laggTillKnapp',
            selector: '#laggTillKnapp'
          },
          {
            id: 'tc-js-app-script',
            description: 'Skriptet ska innehålla createElement och appendChild',
            jsCheck: { type: 'script_contains', snippet: 'createelement' }
          }
        ]
      }
    ]
  }
];

export const JS_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-js-1',
    track: 'js',
    levelId: 1,
    title: 'Deklarera Variabler',
    question: 'Vilket nyckelord används i modern JavaScript för en variabel som INTE ska ändra sitt värde?',
    options: ['var', 'let', 'const', 'static'],
    correctIndex: 2,
    explanation: 'const (konstant) förhindrar att variabeln tilldelas ett nytt värde efter att den skapats.',
    xp: 25
  },
  {
    id: 'quiz-js-2',
    track: 'js',
    levelId: 2,
    title: 'Template Literals Syntax',
    question: 'Vilka tecken omsluter en Template Literal i JavaScript?',
    options: ['Enkla citationstecken (\' \')', 'Dubbla citationstecken (" ")', 'Backticks (` `)', 'Klamrar ({ })'],
    correctIndex: 2,
    explanation: 'Backticks (` `) tillåter att man bakar in variabler direkt i strängar med ${variabel}.',
    xp: 25
  },
  {
    id: 'quiz-js-3',
    track: 'js',
    levelId: 3,
    title: 'Strikt Jämförelse',
    question: 'Varför rekommenderas "===" istället för "==" i JavaScript?',
    options: [
      'Det körs 3 gånger snabbare',
      'Det jämför både värde och datatyp utan automatisk typomvandling',
      'Det fungerar bara för nummer',
      'Det är en matematisk tilldelning'
    ],
    correctIndex: 1,
    explanation: '=== kontrollerar att både typen (t.ex. number eller string) och värdet stämmer överens.',
    xp: 30
  },
  {
    id: 'quiz-js-4',
    track: 'js',
    levelId: 6,
    title: 'Array .map() Metoden',
    question: 'Vad gör metoden array.map() i JavaScript?',
    options: [
      'Tar bort dubbletter från en lista',
      'Sorterar listan i bokstavsordning',
      'Skapar en ny array genom att applicera en funktion på varje element',
      'Filtrerar bort udda tal'
    ],
    correctIndex: 2,
    explanation: 'map() transformera varje element i arrayen och returnerar en ny array med resultaten.',
    xp: 30
  },
  {
    id: 'quiz-js-5',
    track: 'js',
    levelId: 8,
    title: 'Hämta element från DOM',
    question: 'Vilken metod används för att hämta det första elementet som matchar en CSS-väljare som ".kort"?',
    options: ['document.select(".kort")', 'document.querySelector(".kort")', 'document.fetchElement(".kort")', 'window.getElement(".kort")'],
    correctIndex: 1,
    explanation: 'document.querySelector tar emot valfri CSS-selektor och returnerar det första matchande elementet.',
    xp: 30
  },
  {
    id: 'quiz-js-6',
    track: 'js',
    levelId: 10,
    title: 'Asynkron Programmering',
    question: 'Vad gör nyckelordet "await" framför ett Promise i en async-funktion?',
    options: [
      'Avbryter programmet omedelbart',
      'Pausar funktionens körning tills Promiset har lösts och returnerar dess värde',
      'Gör koden synkron i hela webbläsaren',
      'Startar om webbläsaren'
    ],
    correctIndex: 1,
    explanation: 'await låter dig skriva asynkron kod som ser ut som vanlig synkron kod utan krångliga callbacks.',
    xp: 35
  }
];

export const JS_CHEATSHEET: CheatsheetCategory[] = [
  {
    id: 'js-variables',
    track: 'js',
    title: 'Variabler & Datatyper',
    icon: '⚡',
    items: [
      { name: 'const', syntax: 'const pi = 3.14;', description: 'Konstant variabel vars referens inte ändras.', example: 'const namn = "Alice";' },
      { name: 'let', syntax: 'let poang = 0; poang += 10;', description: 'Variabel som kan tilldelas nya värden.', example: 'let x = 1;' },
      { name: 'Template Literal', syntax: '`Hej ${namn}, du har ${poang} XP`', description: 'Sträng med dynamiskt inbakat innehåll via backticks.', example: '`Total: ${a + b}`' }
    ]
  },
  {
    id: 'js-functions',
    track: 'js',
    title: 'Funktioner & Logik',
    icon: '🎯',
    items: [
      { name: 'Arrow Function', syntax: 'const addera = (a, b) => a + b;', description: 'Kompakt funktion med automatisk retur för enkla uttryck.', example: 'const dubbla = n => n * 2;' },
      { name: 'if / else', syntax: 'if (x > 10) { ... } else { ... }', description: 'Villkorsstyrning baserad på ett booleskt uttryck.', example: 'if (isReady) start();' },
      { name: 'Ternary Operator', syntax: 'const status = x >= 18 ? "Vuxen" : "Barn";', description: 'Kompakt if-else på en enda rad.', example: 'x > 0 ? "Positiv" : "Negativ"' }
    ]
  },
  {
    id: 'js-arrays',
    track: 'js',
    title: 'Arrayer & Listmetoder',
    icon: '📋',
    items: [
      { name: 'map()', syntax: 'const dubblade = tal.map(n => n * 2);', description: 'Omvandlar alla element till en ny array.', example: 'namn.map(n => n.toUpperCase())' },
      { name: 'filter()', syntax: 'const godkanda = poang.filter(p => p >= 50);', description: 'Behåller element som matchar villkoret.', example: 'items.filter(i => i.active)' },
      { name: 'forEach()', syntax: 'lista.forEach(item => console.log(item));', description: 'Loopar igenom varje element i arrayen.', example: 'arr.forEach(fn)' },
      { name: 'includes()', syntax: 'frukter.includes("Banan"); // true/false', description: 'Kollar om ett element finns i listan.', example: '[1, 2, 3].includes(2)' }
    ]
  },
  {
    id: 'js-dom',
    track: 'js',
    title: 'DOM & Händelser (Events)',
    icon: '🌐',
    items: [
      { name: 'querySelector', syntax: 'const btn = document.querySelector(".spela-knapp");', description: 'Hittar element via valfri CSS-selektor.', example: 'document.querySelector("#logo")' },
      { name: 'addEventListener', syntax: 'knapp.addEventListener("click", () => { ... });', description: 'Registrerar en funktion som körs vid händelsen.', example: 'input.addEventListener("input", fn)' },
      { name: 'createElement', syntax: 'const nyttKort = document.createElement("div");', description: 'Skapar ett nytt HTML-element i minnet.', example: 'document.createElement("li")' },
      { name: 'appendChild', syntax: 'foralder.appendChild(nyttElement);', description: 'Placerar ett element inuti en förälder.', example: 'ul.appendChild(li)' }
    ]
  }
];
