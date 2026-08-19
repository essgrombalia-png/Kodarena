import { QuizQuestion } from '../types/python';

export const pythonQuizzes: QuizQuestion[] = [
  {
    id: 'q1-1',
    levelId: 1,
    title: 'Print-funktionen',
    question: 'Vilken av följande rader skriver ut texten "Hej" korrekt i Python?',
    options: [
      'print("Hej")',
      'Console.WriteLine("Hej");',
      'echo "Hej";',
      'System.out.println("Hej");'
    ],
    correctIndex: 0,
    explanation: 'I Python används funktionen print("Hej") med små bokstäver och citattecken.',
    xp: 15
  },
  {
    id: 'q1-2',
    levelId: 1,
    title: 'Heltalsdivision',
    codeSnippet: 'a = 10\nb = 3\nprint(a // b)',
    question: 'Vad blir utskriften av koden ovan?',
    options: ['3.33', '3', '1', 'Felmeddelande'],
    correctIndex: 1,
    explanation: 'Operatorn // utför heltalsdivision (avrundar nedåt mot närmaste heltal), så 10 // 3 blir 3.',
    xp: 20
  },
  {
    id: 'q2-1',
    levelId: 2,
    title: 'Jämförelseoperatorer',
    codeSnippet: 'x = 5\nif x == "5":\n    print("Lika")\nelse:\n    print("Olika")',
    question: 'Vad skrivs ut i terminalen?',
    options: ['Lika', 'Olika', 'None', 'TypeError'],
    correctIndex: 1,
    explanation: 'I Python är heltalet 5 inte lika med strängen "5" eftersom de har olika datatyper.',
    xp: 20
  },
  {
    id: 'q3-1',
    levelId: 3,
    title: 'For-loop & Range',
    codeSnippet: 'summa = 0\nfor i in range(1, 4):\n    summa += i\nprint(summa)',
    question: 'Vilket tal skrivs ut?',
    options: ['10', '6', '4', '3'],
    correctIndex: 1,
    explanation: 'range(1, 4) ger talen 1, 2 och 3 (stoppvärdet 4 inkluderas ej). 1 + 2 + 3 = 6.',
    xp: 25
  },
  {
    id: 'q4-1',
    levelId: 4,
    title: 'Negativa index i listor',
    codeSnippet: 'frukter = ["äpple", "banan", "kiwi", "mango"]\nprint(frukter[-2])',
    question: 'Vilken frukt skrivs ut?',
    options: ['mango', 'kiwi', 'banan', 'äpple'],
    correctIndex: 1,
    explanation: 'Index -1 är det sista elementet ("mango"), och -2 är det näst sista elementet ("kiwi").',
    xp: 25
  },
  {
    id: 'q5-1',
    levelId: 5,
    title: 'Returvärde i funktioner',
    codeSnippet: 'def plussa(a, b):\n    c = a + b\n\nres = plussa(3, 4)\nprint(res)',
    question: 'Vad skrivs ut när koden körs?',
    options: ['7', 'None', 'Error: missing return', '0'],
    correctIndex: 1,
    explanation: 'Om en funktion inte innehåller ett "return"-nyckelord returnerar den automatiskt värdet None i Python.',
    xp: 30
  },
  {
    id: 'q7-1',
    levelId: 7,
    title: 'Klasser & __init__',
    question: 'Vad är syftet med metoden __init__ i en Python-klass?',
    options: [
      'Den initierar objektet när en ny instans skapas (konstruktor).',
      'Den avslutar och raderar objektet.',
      'Den gör klassen privat.',
      'Den konverterar klassen till en sträng.'
    ],
    correctIndex: 0,
    explanation: '__init__ är konstruktormetoden som automatiskt anropas när ett nytt objekt instansieras.',
    xp: 35
  }
];
