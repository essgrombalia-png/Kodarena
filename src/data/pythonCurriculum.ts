import { PythonLessonLevel } from '../types/python';

export const pythonCurriculum: PythonLessonLevel[] = [
  {
    id: 1,
    levelTitle: 'Nivå 1: Grunderna & Variabler',
    levelSubtitle: 'Ta dina allra första steg i Python och lär dig skriva ut text och hantera variabler.',
    icon: 'Sparkles',
    badgeName: 'Python-Novis',
    badgeDesc: 'Klarade grunderna i syntax och variabler!',
    requiredXp: 0,
    exercises: [
      {
        id: 'ex-1-1',
        title: '1.1 Hej Världen & Print',
        shortDesc: 'Lär dig använda print() för att skriva ut text i terminalen.',
        difficulty: 'nyborjare',
        xpReward: 25,
        theory: `### Välkommen till Python! 🐍
Python är ett av världens mest populära och kraftfulla programmeringsspråk. Det används för allt från webbutveckling och spel till artificiell intelligens (AI) och dataanalys.

I Python använder vi den inbyggda funktionen \`print()\` för att visa text på skärmen. Text (kallat *strängar*) skrivs alltid inom citattecken \`"..."\` eller enkla citattecken \`'...' \`.`,
        examples: [
          {
            title: 'Skriva ut text',
            code: 'print("Välkommen till Python-kursen!")\nprint(42)',
            explanation: 'Skriver ut strängen och siffran på var sin rad.'
          }
        ],
        task: 'Skriv ett program som använder `print()` för att skriva ut texten **"Hej, Python!"** exakt som den står.',
        starterCode: '# Skriv din print-sats här nedanför:\n',
        solutionCode: 'print("Hej, Python!")',
        solutionExplanation: 'Vi anropar print-funktionen med texten "Hej, Python!" omgiven av citattecken.',
        hints: [
          'Kom ihåg att funktionen heter print med små bokstäver.',
          'Sätt texten inom parenteser och citattecken: print("...")'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Utskriften innehåller "Hej, Python!"',
            expectedOutput: 'Hej, Python!'
          }
        ]
      },
      {
        id: 'ex-1-2',
        title: '1.2 Variabler & Matematik',
        shortDesc: 'Spara värden i variabler och gör enkla matematiska beräkningar.',
        difficulty: 'nyborjare',
        xpReward: 30,
        theory: `### Variabler i Python
En variabel är som en namngiven låda där du kan spara data för att använda den senare.
I Python behöver du inte ange någon typ – du skriver bara variabelnamnet, ett likhetstecken \`=\` och värdet.

### Matematiska operatorer:
- \`+\` Addition
- \`-\` Subtraktion
- \`*\` Multiplikation
- \`/\` Division`,
        examples: [
          {
            title: 'Spara och räkna',
            code: 'pris = 150\nantal = 3\ntotalt = pris * antal\nprint(totalt)',
            explanation: 'Räknar ut 150 * 3 och sparar 450 i variabeln totalt.'
          }
        ],
        task: 'Skapa två variabler: `a = 15` och `b = 25`. Skapa en tredje variabel `summa = a + b` och skriv ut `summa` med `print()`.',
        starterCode: '# 1. Skapa variablerna a och b\n# 2. Skapa variabeln summa\n# 3. Skriv ut summa\n',
        solutionCode: 'a = 15\nb = 25\nsumma = a + b\nprint(summa)',
        solutionExplanation: 'Vi definierar variablerna a och b, adderar dem och sparar resultatet i summa som skrivs ut.',
        hints: [
          'Skriv a = 15 på första raden.',
          'Skriv b = 25 på andra raden.',
          'Skriv summa = a + b och sedan print(summa)'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Summan 40 skrivs ut',
            expectedOutput: '40'
          }
        ]
      },
      {
        id: 'ex-1-3',
        title: '1.3 F-Strings: Snygga Utskrifter',
        shortDesc: 'Kombinera variabler och text enkelt med moderna f-strings.',
        difficulty: 'nyborjare',
        xpReward: 35,
        theory: `### Formaterade strängar (f-strings)
När du vill kombinera text och variabler är **f-strings** det smidigaste och modernaste sättet i Python.
Du sätter ett \`f\` precis framför citattecknet och kan placera variabler eller uttryck direkt inuti klammerparenteser \`{variabel}\`.`,
        examples: [
          {
            title: 'Exempel på f-string',
            code: 'namn = "Alice"\npoang = 100\nprint(f"Spelare {namn} har {poang} poäng!")',
            explanation: 'Ersätter {namn} med Alice och {poang} med 100.'
          }
        ],
        task: 'Skapa en variabel `spel = "Python"` och `niva = 1`. Skriv ut meddelandet: `"Jag spelar Python på nivå 1!"` med en f-string.',
        starterCode: 'spel = "Python"\nniva = 1\n\n# Skriv ut med en f-string:\n',
        solutionCode: 'spel = "Python"\nniva = 1\nprint(f"Jag spelar {spel} på nivå {niva}!")',
        solutionExplanation: 'Genom att skriva f"Jag spelar {spel} på nivå {niva}!" infogas variablernas värden dynamiskt.',
        hints: [
          'Börja strängen med ett litet f före citattecknet: f"..."',
          'Sätt {spel} och {niva} inuti strängen där värdena ska visas.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Korrekt formaterad text skrivs ut',
            expectedOutput: 'Jag spelar Python på nivå 1!'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    levelTitle: 'Nivå 2: Beslut, Villkor & Logik',
    levelSubtitle: 'Lär din kod att fatta intelligenta beslut med if, elif och else.',
    icon: 'GitBranch',
    badgeName: 'Logikmästare',
    badgeDesc: 'Bemästrade if-satser och boolesk logik!',
    requiredXp: 90,
    exercises: [
      {
        id: 'ex-2-1',
        title: '2.1 If & Else: Ålderskontroll',
        shortDesc: 'Kontrollera villkor och kör olika kod beroende på resultatet.',
        difficulty: 'nyborjare',
        xpReward: 35,
        theory: `### Villkorssatser (if / else)
I programmering vill vi ofta att programmet gör olika saker beroende på data.
I Python använder vi \`if\` och \`else\`.

**Viktigt om indentering:** Kod som ska köras inuti ett \`if\`-block måste dras in med **4 mellanslag** (indentering)!

### Jämförelseoperatorer:
- \`==\` Lika med
- \`!=\` Inte lika med
- \`>\` Större än
- \`>=\` Större än eller lika med
- \`<\` Mindre än
- \`<=\` Mindre än eller lika med`,
        examples: [
          {
            title: 'Enkelt villkor',
            code: 'alder = 20\nif alder >= 18:\n    print("Myndig")\nelse:\n    print("Omyndig")',
            explanation: 'Eftersom 20 är >= 18 skrivs "Myndig" ut.'
          }
        ],
        task: 'Givet variabeln `poang = 75`, skriv en if/else-sats: Om `poang >= 50`, skriv ut `"Godkänd"`, annars skriv ut `"Underkänd"`.',
        starterCode: 'poang = 75\n\n# Skriv din if/else-sats här:\n',
        solutionCode: 'poang = 75\nif poang >= 50:\n    print("Godkänd")\nelse:\n    print("Underkänd")',
        solutionExplanation: 'Vi testar om poang är minst 50 med >= och skriver ut motsvarande meddelande.',
        hints: [
          'Kom ihåg kolon (:) efter if-raden och else-raden.',
          'Kom ihåg att dra in print-raderna med 4 mellanslag.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Utskriften är "Godkänd"',
            expectedOutput: 'Godkänd'
          }
        ]
      },
      {
        id: 'ex-2-2',
        title: '2.2 Elif: Betygssättaren',
        shortDesc: 'Hantera flera olika utfall i följd med elif (else-if).',
        difficulty: 'medel',
        xpReward: 40,
        theory: `### Flera villkor med elif
När du har fler än två möjliga utfall använder du \`elif\` (förkortning för *else if*).
Python testar villkoren uppifrån och ned och kör det första blocket som är sant.`,
        examples: [
          {
            title: 'Exempel på elif',
            code: 'temp = 28\nif temp > 30:\n    print("Extremt varmt")\nelif temp >= 20:\n    print("Skönt och varmt")\nelse:\n    print("Kyligt")',
            explanation: 'Eftersom 28 >= 20 körs det andra blocket.'
          }
        ],
        task: 'Givet `poang = 85`, skriv ett betygssystem: Om poäng är minst 90 skriv ut `"Betyg A"`, om poäng är minst 80 skriv ut `"Betyg B"`, annars skriv ut `"Betyg C"`.',
        starterCode: 'poang = 85\n\n# Skriv din if/elif/else-struktur här:\n',
        solutionCode: 'poang = 85\nif poang >= 90:\n    print("Betyg A")\nelif poang >= 80:\n    print("Betyg B")\nelse:\n    print("Betyg C")',
        solutionExplanation: 'Villkoret poang >= 80 uppfylls eftersom poang är 85, så "Betyg B" skrivs ut.',
        hints: [
          'Börja med if poang >= 90:',
          'Följ upp med elif poang >= 80:',
          'Avsluta med else:'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Betyg B skrivs ut korrekt för 85 poäng',
            expectedOutput: 'Betyg B'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    levelTitle: 'Nivå 3: Loopar & Automatisering',
    levelSubtitle: 'Låt datorn göra det tunga repetitiva jobbet med for- och while-loopar.',
    icon: 'Repeat',
    badgeName: 'Loopmästare',
    badgeDesc: 'Lärde sig att iterera och automatisera med for och while!',
    requiredXp: 165,
    exercises: [
      {
        id: 'ex-3-1',
        title: '3.1 For-loop & Range',
        shortDesc: 'Iterera ett bestämt antal gånger med range().',
        difficulty: 'nyborjare',
        xpReward: 35,
        theory: `### For-loopar i Python
En \`for\`-loop används för att upprepa kod ett visst antal gånger eller gå igenom element i en samling.

Funktionen \`range(start, stop)\` skapar en talföljd från \`start\` upp till (men inte inklusive) \`stop\`.
Exempel: \`range(1, 4)\` ger talen 1, 2, 3.`,
        examples: [
          {
            title: 'For-loop med range',
            code: 'for i in range(1, 4):\n    print(f"Varv {i}")',
            explanation: 'Skriver ut: Varv 1, Varv 2, Varv 3.'
          }
        ],
        task: 'Använd en for-loop med `range()` för att skriva ut talen från 1 till 5 (varje tal på en egen rad).',
        starterCode: '# Skriv en for-loop här:\n',
        solutionCode: 'for i in range(1, 6):\n    print(i)',
        solutionExplanation: 'range(1, 6) genererar talen 1, 2, 3, 4, 5. I varje varv skrivs talet i ut.',
        hints: [
          'Kom ihåg att stop-värdet i range inte inkluderas, så använd range(1, 6).',
          'Glöm inte kolon (:) efter for-satsen.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Talen 1 till 5 skrivs ut',
            expectedOutput: '1\n2\n3\n4\n5'
          }
        ]
      },
      {
        id: 'ex-3-2',
        title: '3.2 Beräkna Summan med en Loop',
        shortDesc: 'Ackumulera värden inuti en loop.',
        difficulty: 'medel',
        xpReward: 45,
        theory: `### Ackumulator-mönstret
Ett mycket vanligt programmeringsmönster är att ha en variabel (t.ex. \`total = 0\`) och i varje loopvarv addera det aktuella talet med \`total += i\`.`,
        examples: [
          {
            title: 'Addera tal i loop',
            code: 'summa = 0\nfor x in [10, 20, 30]:\n    summa += x\nprint(summa)',
            explanation: 'Adderar 10 + 20 + 30 och skriver ut 60.'
          }
        ],
        task: 'Beräkna summan av alla tal från 1 till 10 (1+2+3+...+10) med en for-loop och skriv ut totalsumman.',
        starterCode: 'total = 0\n\n# Loopa över talen 1 till 10 och addera till total:\n\n# Skriv ut total:\n',
        solutionCode: 'total = 0\nfor i in range(1, 11):\n    total += i\nprint(total)',
        solutionExplanation: 'Loopen går från 1 till 10 och adderar varje i till total. 1+2+...+10 = 55.',
        hints: [
          'Använd range(1, 11) för att få talen 1 till och med 10.',
          'Inuti loopen: total += i',
          'Skriv ut total efter att loopen är klar.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Summan 55 skrivs ut',
            expectedOutput: '55'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    levelTitle: 'Nivå 4: Listor & Datastrukturer',
    levelSubtitle: 'Strukturera och hantera samlingar av data med listor, index och dictionaries.',
    icon: 'Layers',
    badgeName: 'Datastruktur-Arkitekt',
    badgeDesc: 'Bemästrade listor, metoder och dictionaries!',
    requiredXp: 245,
    exercises: [
      {
        id: 'ex-4-1',
        title: '4.1 Listor & Indexering',
        shortDesc: 'Skapa listor och hämta element med 0-indexering.',
        difficulty: 'nyborjare',
        xpReward: 35,
        theory: `### Listor i Python
En lista är en ordnad samling av element som omges av hakparenteser \`[...]\`.
I Python börjar indexering alltid på **0** (det första elementet har index 0).

- Första elementet: \`lista[0]\`
- Sista elementet: \`lista[-1]\`
- Lägg till element: \`lista.append(nytt_element)\`
- Antal element: \`len(lista)\``,
        examples: [
          {
            title: 'Arbeta med listor',
            code: 'frukter = ["äpple", "banan", "apelsin"]\nprint(frukter[0]) # Skriver ut äpple\nfrukter.append("kiwi")\nprint(len(frukter)) # Skriver ut 4',
            explanation: 'Visar index 0 och lägger till kiwi.'
          }
        ],
        task: 'Skapa en lista `språk = ["Python", "JavaScript", "C++"]`. Lägg till `"Rust"` med `.append()` och skriv sedan ut det sista elementet med `[-1]`.',
        starterCode: 'sprak = ["Python", "JavaScript", "C++"]\n\n# 1. Lägg till "Rust" med .append()\n# 2. Skriv ut det sista elementet:\n',
        solutionCode: 'sprak = ["Python", "JavaScript", "C++"]\nsprak.append("Rust")\nprint(sprak[-1])',
        solutionExplanation: 'Vi lägger till Rust och skriver ut det sista elementet med sprak[-1].',
        hints: [
          'Använd sprak.append("Rust")',
          'Skriv ut med print(sprak[-1])'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Utskriften är "Rust"',
            expectedOutput: 'Rust'
          }
        ]
      },
      {
        id: 'ex-4-2',
        title: '4.2 Dictionaries (Nyckel-Värdepar)',
        shortDesc: 'Lagra strukturerad data som i en databas eller ordbok.',
        difficulty: 'medel',
        xpReward: 45,
        theory: `### Dictionaries i Python
Ett dictionary (dict) lagrar data i form av **nyckel: värde** omgivet av klammerparenteser \`{...}\`.
Du hämtar värdet genom att använda nyckeln som index: \`person["namn"]\`.`,
        examples: [
          {
            title: 'Skapa och läsa dict',
            code: 'anvandare = {"namn": "Erik", "niva": 5}\nprint(anvandare["namn"])\nanvandare["poang"] = 950 # Lägg till nytt par\nprint(anvandare["poang"])',
            explanation: 'Hämtar och uppdaterar värden via nycklar.'
          }
        ],
        task: 'Skapa en dict `hero = {"namn": "Shadow", "hp": 100}`. Ändra `hero["hp"]` till `150` och skriv ut meddelandet `"{hero[\'namn\']} har {hero[\'hp\']} HP"` med en f-string.',
        starterCode: 'hero = {"namn": "Shadow", "hp": 100}\n\n# Uppdatera hp till 150 och skriv ut:\n',
        solutionCode: 'hero = {"namn": "Shadow", "hp": 100}\nhero["hp"] = 150\nprint(f"{hero[\'namn\']} har {hero[\'hp\']} HP")',
        solutionExplanation: 'Vi uppdaterar nyckeln hp och formaterar utskriften med f-string.',
        hints: [
          'Ändra värdet med hero["hp"] = 150',
          'Skriv ut med print(f"{hero[\'namn\']} har {hero[\'hp\']} HP")'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Texten "Shadow har 150 HP" skrivs ut',
            expectedOutput: 'Shadow har 150 HP'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    levelTitle: 'Nivå 5: Funktioner & Modularitet',
    levelSubtitle: 'Skapa återanvändbara kodblock med def, parametrar och return.',
    icon: 'Cpu',
    badgeName: 'Funktionsmästare',
    badgeDesc: 'Skapade modulär och återanvändbar Python-kod!',
    requiredXp: 325,
    exercises: [
      {
        id: 'ex-5-1',
        title: '5.1 Definiera en Funktion med Return',
        shortDesc: 'Skapa egna funktioner som tar emot argument och returnerar svar.',
        difficulty: 'medel',
        xpReward: 45,
        theory: `### Funktioner i Python
En funktion är ett namngivet kodblock som utför en specifik uppgift.
Vi definierar funktioner med nyckelordet \`def\` och använder \`return\` för att skicka tillbaka ett resultat.`,
        examples: [
          {
            title: 'Enkel funktion',
            code: 'def addera(a, b):\n    return a + b\n\nresultat = addera(10, 5)\nprint(resultat)',
            explanation: 'Funktionen addera tar två tal och returnerar deras summa 15.'
          }
        ],
        task: 'Definiera en funktion `dubbla(x)` som tar ett tal `x` och returnerar dess dubbla värde (`x * 2`). Anropa sedan `print(dubbla(7))`.',
        starterCode: '# 1. Definiera funktionen dubbla(x)\n# 2. Anropa och skriv ut dubbla(7)\n',
        solutionCode: 'def dubbla(x):\n    return x * 2\n\nprint(dubbla(7))',
        solutionExplanation: 'Funktionen multiplicerar argumentet x med 2 och returnerar det.',
        hints: [
          'Börja med def dubbla(x):',
          'På nästa indragna rad: return x * 2',
          'Skriv ut med print(dubbla(7))'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Resultatet 14 skrivs ut',
            expectedOutput: '14'
          }
        ]
      },
      {
        id: 'ex-5-2',
        title: '5.2 Palindrom-Kontrollant',
        shortDesc: 'Bygg en funktion som kontrollerar om ett ord är likadant framlänges och baklänges.',
        difficulty: 'medel',
        xpReward: 50,
        theory: `### Strängslicing och jämförelser
I Python kan du enkelt vända på en sträng med syntaxen \`text[::-1]\`.
Ett palindrom är ett ord som stavas likadant framifrån och bakifrån (t.ex. "radar", "kajak", "anna").`,
        examples: [
          {
            title: 'Vända en sträng',
            code: 'ord = "python"\nvant = ord[::-1]\nprint(vant) # nohtyp',
            explanation: 'Vänder på tecknen i ordet.'
          }
        ],
        task: 'Skriv en funktion `ar_palindrom(ord)` som returnerar `True` om ordet är ett palindrom (dvs `ord == ord[::-1]`), annars `False`. Testa med `print(ar_palindrom("radar"))`.',
        starterCode: 'def ar_palindrom(ord):\n    # Skriv din logik här:\n    pass\n\nprint(ar_palindrom("radar"))\n',
        solutionCode: 'def ar_palindrom(ord):\n    return ord == ord[::-1]\n\nprint(ar_palindrom("radar"))',
        solutionExplanation: 'Vi jämför strängen med dess omvända variant med return ord == ord[::-1].',
        hints: [
          'Ersätt pass med return ord == ord[::-1]',
          'radar baklänges är radar, vilket är True.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'radar utvärderas till True',
            expectedOutput: 'True'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    levelTitle: 'Nivå 6: Textmagi & Strängmetoder',
    levelSubtitle: 'Bli en mästare på att bearbeta, transformera och analysera text.',
    icon: 'FileText',
    badgeName: 'Textanalytiker',
    badgeDesc: 'Mästrade split, join och avancerad strängmanipulation!',
    requiredXp: 420,
    exercises: [
      {
        id: 'ex-6-1',
        title: '6.1 Textstädaren: Split & Join',
        shortDesc: 'Dela upp text i ord och sätt ihop dem igen.',
        difficulty: 'medel',
        xpReward: 45,
        theory: `### Strängmetoder: split() och join()
- \`.split()\` delar upp en sträng vid mellanslag till en lista av ord.
- \`"-".join(lista)\` sammanfogar listans element med ett bindestreck mellan varje ord.
- \`.lower()\` och \`.upper()\` ändrar skiftläge.`,
        examples: [
          {
            title: 'Dela och sätta ihop',
            code: 'mening = "Python är fantastiskt"\nord_lista = mening.split()\nprint(ord_lista) # [\'Python\', \'är\', \'fantastiskt\']\nslug = "-".join(ord_lista)\nprint(slug) # Python-är-fantastiskt',
            explanation: 'Skapar en snygg url-vänlig sträng.'
          }
        ],
        task: 'Givet texten `mening = "lär dig koda python"`. Dela upp den med `.split()`, gör varje ord till versaler eller sätt ihop orden med `"_"`, och skriv ut resultatet `"LÄR_DIG_KODA_PYTHON"`.',
        starterCode: 'mening = "lär dig koda python"\n\n# Dela upp, gör till versaler med .upper() och sammanfoga med "_"\n',
        solutionCode: 'mening = "lär dig koda python"\nord_lista = mening.upper().split()\nresultat = "_".join(ord_lista)\nprint(resultat)',
        solutionExplanation: 'Vi gör texten versal med .upper(), delar den med .split() och sätter ihop den med "_".join().',
        hints: [
          'mening.upper() ger "LÄR DIG KODA PYTHON"',
          'Dela upp med .split() och sätt ihop med "_".join(...)',
          'Skriv ut resultatet med print()'
        ],
        testCases: [
          {
            id: 't1',
            description: 'LÄR_DIG_KODA_PYTHON skrivs ut',
            expectedOutput: 'LÄR_DIG_KODA_PYTHON'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    levelTitle: 'Nivå 7: Objektorienterad Programmering (OOP)',
    levelSubtitle: 'Bygg verkliga datamodeller med klasser, metoder och instanser.',
    icon: 'Shield',
    badgeName: 'OOP-Arkitekt',
    badgeDesc: 'Skapade klasser, objekt och metoder i Python!',
    requiredXp: 510,
    exercises: [
      {
        id: 'ex-7-1',
        title: '7.1 Skapa en Spelhjälte-Klass',
        shortDesc: 'Definiera en klass med __init__ och metoder.',
        difficulty: 'avancerad',
        xpReward: 60,
        theory: `### Klasser och Objekt i Python
En **klass** är en ritning och ett **objekt** är en instans skapad från ritningen.
Klassen initieras med metoden \`__init__(self, ...)\` där \`self\` refererar till det specifika objektet som skapas.`,
        examples: [
          {
            title: 'Exempel på klass',
            code: 'class Spelare:\n    def __init__(self, namn, niva):\n        self.namn = namn\n        self.niva = niva\n    \n    def halsa(self):\n        print(f"Hej, jag heter {self.namn}!")\n\np1 = Spelare("Neo", 99)\np1.halsa()',
            explanation: 'Skapar en instans p1 och anropar metoden halsa.'
          }
        ],
        task: 'Skapa en klass `Konto` med en `__init__(self, agare, saldo)` som sparar `self.agare` och `self.saldo`. Skapa en metod `visa_saldo(self)` som skriver ut `f"{self.agare}: {self.saldo} kr"`. Skapa en instans `k = Konto("Anna", 5000)` och anropa `k.visa_saldo()`.',
        starterCode: '# Definiera klassen Konto här:\n\n\n# Skapa instansen k och anropa visa_saldo:\n',
        solutionCode: 'class Konto:\n    def __init__(self, agare, saldo):\n        self.agare = agare\n        self.saldo = saldo\n    \n    def visa_saldo(self):\n        print(f"{self.agare}: {self.saldo} kr")\n\nk = Konto("Anna", 5000)\nk.visa_saldo()',
        solutionExplanation: 'Vi skapar klassen Konto med __init__ och metoden visa_saldo, instansierar objektet och anropar metoden.',
        hints: [
          'Kom ihåg def __init__(self, agare, saldo):',
          'Sätt self.agare = agare och self.saldo = saldo',
          'Definiera metoden def visa_saldo(self): och printa saldot.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Anna: 5000 kr skrivs ut',
            expectedOutput: 'Anna: 5000 kr'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    levelTitle: 'Nivå 8: Proffstekniker & Projekt',
    levelSubtitle: 'List Comprehensions, felhantering och kompletta miniprojekt.',
    icon: 'Award',
    badgeName: 'Python-Proffs',
    badgeDesc: 'Erövrade hela Python-kursen från grunden till proffs!',
    requiredXp: 620,
    exercises: [
      {
        id: 'ex-8-1',
        title: '8.1 List Comprehensions',
        shortDesc: 'Skapa och transformera listor på en enda elegant rad.',
        difficulty: 'proffs',
        xpReward: 60,
        theory: `### List Comprehensions
List comprehensions är ett av Pythons mest älskade drag. Det låter dig skapa nya listor baserade på befintliga listor på ett ultrakompakt sätt:
\`[uttryck for element in samling if villkor]\``,
        examples: [
          {
            title: 'Filtrera och kvadrera',
            code: 'tal = [1, 2, 3, 4, 5, 6]\njamna_kvadrater = [x**2 for x in tal if x % 2 == 0]\nprint(jamna_kvadrater) # [4, 16, 36]',
            explanation: 'Tar bara jämna tal och upphöjer dem till 2.'
          }
        ],
        task: 'Givet listan `tal = [1, 2, 3, 4, 5]`, skapa en ny lista `dubblade = [x * 2 for x in tal]` med en list comprehension och skriv ut `dubblade`.',
        starterCode: 'tal = [1, 2, 3, 4, 5]\n\n# Skapa dubblade med list comprehension:\n',
        solutionCode: 'tal = [1, 2, 3, 4, 5]\ndubblade = [x * 2 for x in tal]\nprint(dubblade)',
        solutionExplanation: 'List comprehension [x * 2 for x in tal] itererar över varje tal, multiplicerar med 2 och skapar en ny lista.',
        hints: [
          'Skriv dubblade = [x * 2 for x in tal]',
          'Skriv ut med print(dubblade)'
        ],
        testCases: [
          {
            id: 't1',
            description: '[2, 4, 6, 8, 10] skrivs ut',
            expectedOutput: '[2, 4, 6, 8, 10]'
          }
        ]
      },
      {
        id: 'ex-8-2',
        title: '8.2 Caesar-Kryptering (Miniprojekt)',
        shortDesc: 'Bygg en chiffer-funktion som flyttar bokstäver ett steg framåt i alfabetet.',
        difficulty: 'proffs',
        xpReward: 75,
        theory: `### Caesar-chiffer
Ett klassiskt krypteringssätt där varje bokstav förskjuts med ett givet antal steg.
Om vi förskjuter med 1 steg blir 'a' -> 'b', 'b' -> 'c' osv.`,
        examples: [
          {
            title: 'Kryptera ett ord',
            code: 'def kryptera(ord):\n    alfa = "abcdefghijklmnopqrstuvwxyz"\n    hemligt = ""\n    for bokstav in ord:\n        idx = alfa.index(bokstav)\n        hemligt += alfa[(idx + 1) % 26]\n    return hemligt\n\nprint(kryptera("abc")) # bcd',
            explanation: 'Förskjuter varje bokstav med 1 position.'
          }
        ],
        task: 'Skriv en funktion `kryptera(text)` som för varje bokstav i `text` ("kod") returnerar den krypterade versionen där "kod" blir `"lpe"`. Testa med `print(kryptera("kod"))`.',
        starterCode: `def kryptera(text):
    alfa = "abcdefghijklmnopqrstuvwxyz"
    resultat = ""
    for bokstav in text:
        idx = alfa.index(bokstav)
        resultat += alfa[(idx + 1) % 26]
    return resultat

print(kryptera("kod"))
`,
        solutionCode: `def kryptera(text):
    alfa = "abcdefghijklmnopqrstuvwxyz"
    resultat = ""
    for bokstav in text:
        idx = alfa.index(bokstav)
        resultat += alfa[(idx + 1) % 26]
    return resultat

print(kryptera("kod"))`,
        solutionExplanation: 'Vi hittar index för varje bokstav och tar nästa bokstav med modulo 26 för att slå runt vid z.',
        hints: [
          'Kör koden och kontrollera att "lpe" skrivs ut.',
          'Varje bokstav i "kod" förskjuts: k->l, o->p, d->e.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Texten lpe skrivs ut',
            expectedOutput: 'lpe'
          }
        ]
      }
    ]
  },
  {
    id: 9,
    levelTitle: 'Nivå 9: Funktionell Programmering & Lambda',
    levelSubtitle: 'Anonyma funktioner, map, filter och avancerade datatransformationer.',
    icon: 'Zap',
    badgeName: 'Lambda-Virtuos',
    badgeDesc: 'Bemästrade funktionell programmering och anonyma funktioner!',
    requiredXp: 750,
    exercises: [
      {
        id: 'ex-9-1',
        title: '9.1 Lambda-Funktioner & Map',
        shortDesc: 'Skriv kompakta enradsfunktioner och transformera listor blixtsnabbt.',
        difficulty: 'avancerad',
        xpReward: 65,
        theory: `### Lambda-funktioner
En **lambda-funktion** är en liten anonym funktion som definieras med nyckelordet \`lambda\`:
\`kvadrera = lambda x: x ** 2\`

Kombinerat med \`map(funktion, lista)\` kan du transformera alla element i en lista i ett enda anrop.`,
        examples: [
          {
            title: 'Map med lambda',
            code: 'tal = [1, 2, 3, 4]\ndubblade = list(map(lambda x: x * 2, tal))\nprint(dubblade) # [2, 4, 6, 8]',
            explanation: 'Multiplicerar varje element med 2 med lambda.'
          }
        ],
        task: 'Givet listan `priser = [100, 200, 300]`, använd `map()` med en `lambda` för att lägga på 25% moms (dvs multiplicera med 1.25) och skriv ut den resulterande listan.',
        starterCode: 'priser = [100, 200, 300]\n\n# Använd map() och lambda x: x * 1.25:\n\n# Skriv ut resultatet:\n',
        solutionCode: 'priser = [100, 200, 300]\nmed_moms = list(map(lambda x: x * 1.25, priser))\nprint(med_moms)',
        solutionExplanation: 'Vi mappar lambda x: x * 1.25 över priser och konverterar resultatet till en lista.',
        hints: [
          'Skriv med_moms = list(map(lambda x: x * 1.25, priser))',
          'Skriv sedan print(med_moms)'
        ],
        testCases: [
          {
            id: 't1',
            description: '[125, 250, 375] skrivs ut',
            expectedOutput: '[125, 250, 375]'
          }
        ]
      },
      {
        id: 'ex-9-2',
        title: '9.2 Filter: Hitta Perfekta Matchningar',
        shortDesc: 'Filtrera ut element med villkorsbaserad lambda.',
        difficulty: 'avancerad',
        xpReward: 70,
        theory: `### Funktionen filter()
\`filter(funktion, lista)\` filtrerar en lista och behåller endast de element där funktionen returnerar \`True\`.`,
        examples: [
          {
            title: 'Filtrera jämna tal',
            code: 'tal = [1, 2, 3, 4, 5, 6]\njamna = list(filter(lambda x: x % 2 == 0, tal))\nprint(jamna) # [2, 4, 6]',
            explanation: 'Behåller endast de jämna talen.'
          }
        ],
        task: 'Givet listan `ord = ["python", "ai", "kod", "maskininlärning", "data"]`, filtrera ut alla ord som har fler än 3 bokstäver med `filter()` och `lambda`, och skriv ut listan.',
        starterCode: 'ord = ["python", "ai", "kod", "maskininlärning", "data"]\n\n# Filtrera ord med len(x) > 3:\n',
        solutionCode: 'ord = ["python", "ai", "kod", "maskininlärning", "data"]\nlånga_ord = list(filter(lambda x: len(x) > 3, ord))\nprint(långa_ord)',
        solutionExplanation: 'Vi använder filter med lambda x: len(x) > 3 vilket plockar ut ["python", "maskininlärning", "data"].',
        hints: [
          'Använd list(filter(lambda x: len(x) > 3, ord))',
          'Skriv ut resultatet med print()'
        ],
        testCases: [
          {
            id: 't1',
            description: "['python', 'maskininlärning', 'data'] skrivs ut",
            expectedOutput: "['python', 'maskininlärning', 'data']"
          }
        ]
      }
    ]
  },
  {
    id: 10,
    levelTitle: 'Nivå 10: Algoritmer, Rekursion & Datastrukturer',
    levelSubtitle: 'Binärsökning, rekursiva anrop och effektiv problemlösning i O(log n).',
    icon: 'Cpu',
    badgeName: 'Algoritm-Mästare',
    badgeDesc: 'Knäckte rekursion och binärsökning på proffsnivå!',
    requiredXp: 900,
    exercises: [
      {
        id: 'ex-10-1',
        title: '10.1 Rekursion: Beräkna Fakultet',
        shortDesc: 'Låt en funktion anropa sig själv för att lösa matematiska problem.',
        difficulty: 'proffs',
        xpReward: 80,
        theory: `### Rekursion
En funktion är **rekursiv** när den anropar sig själv.
Varje rekursiv funktion måste ha:
1. **Basfall (Base Case):** Villkoret när anropen stoppar (t.ex. \`if n <= 1: return 1\`).
2. **Rekursivt steg:** Funktionen anropar sig själv med ett mindre problem (\`return n * fakultet(n - 1)\`).`,
        examples: [
          {
            title: 'Fakultet (5! = 5*4*3*2*1)',
            code: 'def fakultet(n):\n    if n <= 1:\n        return 1\n    return n * fakultet(n - 1)\n\nprint(fakultet(5)) # 120',
            explanation: 'Beräknar 5 * 4 * 3 * 2 * 1 = 120.'
          }
        ],
        task: 'Implementera den rekursiva funktionen `fakultet(n)` och skriv ut resultatet av `fakultet(6)` (6! = 720).',
        starterCode: 'def fakultet(n):\n    # 1. Basfall: om n <= 1 returnera 1\n    # 2. Annars returnera n * fakultet(n - 1)\n    pass\n\nprint(fakultet(6))\n',
        solutionCode: 'def fakultet(n):\n    if n <= 1:\n        return 1\n    return n * fakultet(n - 1)\n\nprint(fakultet(6))',
        solutionExplanation: 'Funktionen anropar sig själv rekursivt tills n blir 1. 6! = 720.',
        hints: [
          'if n <= 1: return 1',
          'return n * fakultet(n - 1)'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Resultatet 720 skrivs ut',
            expectedOutput: '720'
          }
        ]
      },
      {
        id: 'ex-10-2',
        title: '10.2 Binärsökning (O(log n))',
        shortDesc: 'Sök i en sorterad lista genom att halvera sökrymden i varje steg.',
        difficulty: 'proffs',
        xpReward: 90,
        theory: `### Binärsökning
I en sorterad lista behöver vi inte gå igenom element för element (O(n)).
Genom att titta på mittelementet och dela listan på mitten varje gång kan vi hitta rätt värde på extremt få steg (O(log n)).`,
        examples: [
          {
            title: 'Binärsökning i Python',
            code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
            explanation: 'Returnerar index för det eftersökta talet eller -1.'
          }
        ],
        task: 'Givet listan `data = [10, 20, 30, 40, 50, 60, 70, 80, 90]`, implementera `binary_search(arr, target)` och skriv ut index för talet `70` (ska bli index 6).',
        starterCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
print(binary_search(data, 70))
`,
        solutionCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

data = [10, 20, 30, 40, 50, 60, 70, 80, 90]
print(binary_search(data, 70))`,
        solutionExplanation: 'Binärsökningen hittar 70 vid index 6 i listan på logaritmiskt få steg.',
        hints: [
          'Kör koden och kontrollera att index 6 skrivs ut.',
          'Kontrollera villkoren för low och high.'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Index 6 returneras och skrivs ut',
            expectedOutput: '6'
          }
        ]
      }
    ]
  },
  {
    id: 11,
    levelTitle: 'Nivå 11: Felhantering, Math & Random',
    levelSubtitle: 'Try/Except, matematiska beräkningar och slumpgeneratorer.',
    icon: 'ShieldAlert',
    badgeName: 'Robusthet-Mästare',
    badgeDesc: 'Byggde krasch-säkra program med try/except och math-modulen!',
    requiredXp: 1050,
    exercises: [
      {
        id: 'ex-11-1',
        title: '11.1 Try / Except Felhantering',
        shortDesc: 'Fånga upp fel och förhindra att ditt program kraschar.',
        difficulty: 'medel',
        xpReward: 60,
        theory: `### Undantagshantering (Exceptions)
Om din kod gör något olagligt (som att dela med noll eller indexera utanför en lista) kraschar programmet om du inte fångar felet med \`try / except\`.`,
        examples: [
          {
            title: 'Fånga division med noll',
            code: `try:
    svar = 10 / 0
except:
    print("Fel: Kan inte dividera med noll!")`,
            explanation: 'Fångar felet och skriver ut ett snyggt felmeddelande.'
          }
        ],
        task: 'Skapa en funktion `säker_division(a, b)` som i ett `try`-block beräknar och returnerar `a / b`. Om ett fel uppstår i `except`, returnera strängen `"Division med noll ej tillåten"`. Testa med `print(säker_division(10, 0))`.',
        starterCode: `def säker_division(a, b):
    try:
        return a / b
    except:
        return "Division med noll ej tillåten"

print(säker_division(10, 0))
`,
        solutionCode: `def säker_division(a, b):
    try:
        return a / b
    except:
        return "Division med noll ej tillåten"

print(säker_division(10, 0))`,
        solutionExplanation: 'Eftersom division med noll misslyckas fångas undantaget och felmeddelandet returneras.',
        hints: [
          'Använd try: och return a / b',
          'I except: returnera texten "Division med noll ej tillåten"'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Felmeddelandet returneras säkert',
            expectedOutput: 'Division med noll ej tillåten'
          }
        ]
      },
      {
        id: 'ex-11-2',
        title: '11.2 Math & Pythagoras Sats',
        shortDesc: 'Beräkna hypotenusan med math.sqrt() och math.pow().',
        difficulty: 'medel',
        xpReward: 65,
        theory: `### Modulen math
Pythons \`math\`-modul ger tillgång till avancerade matematiska funktioner:
- \`math.sqrt(x)\` kvadratroten ur x
- \`math.pi\` talet Pi (3.14159...)
- \`math.pow(x, y)\` x upphöjt till y`,
        examples: [
          {
            title: 'Kvadratrot',
            code: 'c = math.sqrt(25)\nprint(c) # 5.0',
            explanation: 'Räknar ut roten ur 25.'
          }
        ],
        task: 'Givet kateterna `a = 3` och `b = 4`, beräkna hypotenusan `c = math.sqrt(a**2 + b**2)` och skriv ut `c`.',
        starterCode: 'a = 3\nb = 4\n\n# Beräkna c med math.sqrt:\n\n# Skriv ut c:\n',
        solutionCode: 'a = 3\nb = 4\nc = math.sqrt(a**2 + b**2)\nprint(c)',
        solutionExplanation: 'Pythagoras sats 3^2 + 4^2 = 9 + 16 = 25. Roten ur 25 är 5.0.',
        hints: [
          'c = math.sqrt(a**2 + b**2)',
          'print(c)'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Resultatet 5.0 skrivs ut',
            expectedOutput: '5'
          }
        ]
      }
    ]
  },
  {
    id: 12,
    levelTitle: 'Nivå 12: Data Science & AI Visualisering',
    levelSubtitle: 'Analysera data, beräkna statistik och rita diagram med Python Canvas!',
    icon: 'PieChart',
    badgeName: 'Data Scientist & AI Ninja',
    badgeDesc: 'Erövrade den absoluta toppen av Python Pro Academy!',
    requiredXp: 1250,
    exercises: [
      {
        id: 'ex-12-1',
        title: '12.1 Dataanalys & Statistik',
        shortDesc: 'Beräkna medelvärde, median och varians på ett dataset.',
        difficulty: 'proffs',
        xpReward: 85,
        theory: `### Dataanalys i Python
I Data Science analyserar vi stora mängder data:
- **Medelvärde (Mean):** \`sum(data) / len(data)\`
- **Max / Min:** \`max(data)\`, \`min(data)\``,
        examples: [
          {
            title: 'Beräkna medelvärde',
            code: 'betyg = [80, 90, 100, 70]\nmedel = sum(betyg) / len(betyg)\nprint(f"Medelbetyg: {medel}")',
            explanation: 'Räknar ut genomsnittet i listan.'
          }
        ],
        task: 'Givet datasettet `temperaturer = [18, 22, 25, 19, 21, 27, 24]`. Skapa en funktion som beräknar medelvärdet avrundat med `round(medel, 1)` och skriv ut: `"Veckans medeltemperatur: {medel} grader"`.',
        starterCode: `temperaturer = [18, 22, 25, 19, 21, 27, 24]

# Beräkna medelvärdet och avrunda:
medel = round(sum(temperaturer) / len(temperaturer), 1)

# Skriv ut med f-string:
print(f"Veckans medeltemperatur: {medel} grader")
`,
        solutionCode: `temperaturer = [18, 22, 25, 19, 21, 27, 24]
medel = round(sum(temperaturer) / len(temperaturer), 1)
print(f"Veckans medeltemperatur: {medel} grader")`,
        solutionExplanation: 'Summan är 156, delat på 7 är ~22.3 grader.',
        hints: [
          'Använd sum(temperaturer) / len(temperaturer)',
          'Avrunda med round(..., 1)'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Medeltemperaturen 22.3 grader skrivs ut',
            expectedOutput: 'Veckans medeltemperatur: 22.3 grader'
          }
        ]
      },
      {
        id: 'ex-12-2',
        title: '12.2 Visualisera Stapeldiagram på Canvas',
        shortDesc: 'Använd turtle / canvas för att plotta ett färgstarkt stapeldiagram!',
        difficulty: 'proffs',
        xpReward: 100,
        theory: `### Visualisering med Python Canvas
Python Pro Academys inbyggda ritmodul stödjer både klassisk Turtle-grafik och stapeldiagram via \`turtle.plot_bar_chart(kategorier, värden)\`.`,
        examples: [
          {
            title: 'Plotta stapeldiagram',
            code: `kategorier = ["Q1", "Q2", "Q3", "Q4"]
värden = [120, 240, 310, 450]
turtle.color("#29e6d0")
turtle.plot_bar_chart(kategorier, värden)
print("Diagram ritat på canvas!")`,
            explanation: 'Skapar ett snyggt interaktivt stapeldiagram i canvas-vyn.'
          }
        ],
        task: 'Definiera `manader = ["Jan", "Feb", "Mar", "Apr"]` och `salj = [45, 80, 65, 120]`. Anropa `turtle.plot_bar_chart(manader, salj)` och skriv ut `"Försäljningsgrafik genererad!"`. Klicka sedan på fliken "🎨 Canvas / Grafik" för att beundra ditt diagram!',
        starterCode: `manader = ["Jan", "Feb", "Mar", "Apr"]
salj = [45, 80, 65, 120]

turtle.color("#29e6d0")
turtle.plot_bar_chart(manader, salj)
print("Försäljningsgrafik genererad!")
`,
        solutionCode: `manader = ["Jan", "Feb", "Mar", "Apr"]
salj = [45, 80, 65, 120]

turtle.color("#29e6d0")
turtle.plot_bar_chart(manader, salj)
print("Försäljningsgrafik genererad!")`,
        solutionExplanation: 'Plottar data över de fyra månaderna på det interaktiva canvaset och bekräftar med utskrift.',
        hints: [
          'Anropa turtle.plot_bar_chart(manader, salj)',
          'Skriv ut print("Försäljningsgrafik genererad!")'
        ],
        testCases: [
          {
            id: 't1',
            description: 'Försäljningsgrafik genererad! skrivs ut',
            expectedOutput: 'Försäljningsgrafik genererad!'
          }
        ]
      }
    ]
  }
];

