import { CheatsheetCategory } from '../types/python';

export const pythonCheatsheet: CheatsheetCategory[] = [
  {
    id: 'syntax',
    title: 'Grundläggande Syntax & Variabler',
    icon: 'Terminal',
    items: [
      {
        name: 'Print & Kommentarer',
        syntax: 'print("text") / # kommentar',
        description: 'Skriver ut till konsolen. Brädgård (#) används för kommentarer.',
        example: 'print("Hej världen!")\n# Detta är en kommentar',
        output: 'Hej världen!'
      },
      {
        name: 'Variabler & Typer',
        syntax: 'x = 10; namn = "Py"; pi = 3.14; aktiv = True',
        description: 'Dynamisk typning; du behöver inte ange typ i förväg.',
        example: 'namn = "Mikael"\nalder = 28\naktiv = True\nprint(f"{namn}, {alder} år, aktiv: {aktiv}")',
        output: 'Mikael, 28 år, aktiv: True'
      },
      {
        name: 'F-strings (Formatering)',
        syntax: 'f"Värde: {variabel}"',
        description: 'Bästa sättet att kombinera variabler och text i moderna Python 3.6+.',
        example: 'poang = 95\nprint(f"Du fick {poang}% på provet!")',
        output: 'Du fick 95% på provet!'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'Villkor & Logik',
    icon: 'GitBranch',
    items: [
      {
        name: 'If / Elif / Else',
        syntax: 'if villkor:\n    ...\nelif annat:\n    ...\nelse:\n    ...',
        description: 'Styr programflödet baserat på booleska uttryck. 4 mellanslags indrag krävs.',
        example: 'x = 15\nif x > 20:\n    print("Stort")\nelif x >= 10:\n    print("Mellan")\nelse:\n    print("Litet")',
        output: 'Mellan'
      },
      {
        name: 'Logiska Operatorer',
        syntax: 'and, or, not, in, not in',
        description: 'Kombinera eller invertera sanningsvärden.',
        example: 'alder = 22\nhar_kort = True\nif alder >= 18 and har_kort:\n    print("Får köra bil")',
        output: 'Får köra bil'
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loopar & Iteration',
    icon: 'Repeat',
    items: [
      {
        name: 'For-loop med range',
        syntax: 'for i in range(start, stop, step):',
        description: 'Upprepar kod ett visst antal gånger.',
        example: 'for i in range(1, 4):\n    print(f"Steg {i}")',
        output: 'Steg 1\nSteg 2\nSteg 3'
      },
      {
        name: 'While-loop',
        syntax: 'while villkor:\n    ...',
        description: 'Körs så länge villkoret är sant.',
        example: 'rakna = 3\nwhile rakna > 0:\n    print(rakna)\n    rakna -= 1\nprint("Lyft!")',
        output: '3\n2\n1\nLyft!'
      }
    ]
  },
  {
    id: 'datastructures',
    title: 'Listor, Dictionaries & Sets',
    icon: 'Layers',
    items: [
      {
        name: 'Listmetoder',
        syntax: 'lst.append(x), lst.pop(), len(lst), lst[0], lst[-1]',
        description: 'Hantering av ordnade listor.',
        example: 'frukter = ["äpple", "päron"]\nfrukter.append("banan")\nprint(frukter)\nprint(frukter[-1])',
        output: '[\'äpple\', \'päron\', \'banan\']\nbanan'
      },
      {
        name: 'Dictionary (Mappning)',
        syntax: 'd = {"nyckel": "värde"}\nd["nyckel"]',
        description: 'Snabb uppslagning med nyckel-värdepar.',
        example: 'user = {"namn": "Sara", "roll": "Admin"}\nprint(user["namn"])\nuser["poang"] = 500\nprint(user)',
        output: 'Sara\n{\'namn\': \'Sara\', \'roll\': \'Admin\', \'poang\': 500}'
      },
      {
        name: 'List Slicing',
        syntax: 'lista[start:stop:step]',
        description: 'Hämta delar av en lista eller vänd den med [::-1].',
        example: 'tal = [0, 1, 2, 3, 4, 5]\nprint(tal[1:4])\nprint(tal[::-1])',
        output: '[1, 2, 3]\n[5, 4, 3, 2, 1, 0]'
      }
    ]
  },
  {
    id: 'functions_oop',
    title: 'Funktioner & OOP',
    icon: 'Cpu',
    items: [
      {
        name: 'Funktioner med def',
        syntax: 'def namn(param1, param2=default):\n    return värde',
        description: 'Definiera modulär kod och returnera resultat.',
        example: 'def addera(a, b=10):\n    return a + b\nprint(addera(5))\nprint(addera(5, 20))',
        output: '15\n25'
      },
      {
        name: 'Klasser & Objekt',
        syntax: 'class Bil:\n    def __init__(self, marke):\n        self.marke = marke',
        description: 'Objektorienterad programmering i Python med metoder och self.',
        example: 'class Bil:\n    def __init__(self, marke):\n        self.marke = marke\n    def tuta(self):\n        print(f"{self.marke} tutar: BEEP!")\n\nb = Bil("Volvo")\nb.tuta()',
        output: 'Volvo tutar: BEEP!'
      },
      {
        name: 'List Comprehension',
        syntax: '[uttryck for x in lista if villkor]',
        description: 'Supersnabb och koncis konstruktion av listor.',
        example: 'tal = [1, 2, 3, 4, 5]\nkvadrater = [x**2 for x in tal if x % 2 != 0]\nprint(kvadrater)',
        output: '[1, 9, 25]'
      }
    ]
  }
];
