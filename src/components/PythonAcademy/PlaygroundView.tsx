import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  FolderOpen, 
  Sparkles, 
  Code2, 
  BookMarked, 
  Terminal, 
  Database, 
  Palette,
  Layers,
  Zap,
  TrendingUp,
  Shield
} from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { TerminalOutput } from './TerminalOutput';
import { VariableInspector } from './VariableInspector';
import { VisualCanvasOutput } from './VisualCanvasOutput';
import { pythonInterpreter } from '../../utils/pythonInterpreter';
import { ExecutionResult } from '../../types/python';

const TEMPLATES = [
  {
    id: 'canvas-art',
    title: '🎨 Turtle Canvas Grafik',
    desc: 'Rita en cyberpunk neon-spiral och cirklar direkt på canvaset.',
    icon: Palette,
    code: `# Cyberpunk Turtle Grafik & Canvas
turtle.clear()
turtle.color("#29e6d0")
turtle.width(2)

print("🎨 Startar geometrisk rendering...")

# Rita en cirkel & stjärna
turtle.circle(80)
turtle.dot(15, "#ffd166")

for i in range(1, 13):
    turtle.color("#6a5bff")
    turtle.forward(60)
    turtle.right(150)
    turtle.dot(4, "#ff007f")

print("✨ Rendering slutförd! Klicka på Canvas-fliken för att se konstverket.")
`
  },
  {
    id: 'chart',
    title: '📊 Data Science & Stapeldiagram',
    desc: 'Analysera kvartalsdata och rita interaktiva grafer.',
    icon: TrendingUp,
    code: `# Data Science: Försäljningsanalys & Plotting
kategorier = ["Q1", "Q2", "Q3", "Q4", "Bonus"]
salj_siffror = [120, 240, 310, 480, 520]

# Beräkna statistik
total = sum(salj_siffror)
medel = round(total / len(salj_siffror), 1)
basta_kvartal = max(salj_siffror)

print("=== FÖRSÄLJNINGSRAPPORT ===")
print(f"Total omsättning: {total} kkr")
print(f"Genomsnitt per kvartal: {medel} kkr")
print(f"Bästa kvartal: {basta_kvartal} kkr")

# Generera diagram på Canvas
turtle.color("#29e6d0")
turtle.plot_bar_chart(kategorier, salj_siffror)
print("📊 Stapeldiagram genererat på Canvas!")
`
  },
  {
    id: 'algo',
    title: '⚡ Binärsökning Visualiserare',
    desc: 'Logaritmisk sökning O(log n) med steg-för-steg spårning.',
    icon: Zap,
    code: `# Algoritm: Binärsökning med Spårning
def binary_search_trace(arr, target):
    low = 0
    high = len(arr) - 1
    steg = 0
    
    print(f"Söker efter {target} i sorterad lista med {len(arr)} element:")
    
    while low <= high:
        steg += 1
        mid = (low + high) // 2
        print(f"Steg {steg}: Undersöker index {mid} (värde {arr[mid]})")
        
        if arr[mid] == target:
            print(f"🎯 Hittade {target} vid index {mid} efter bara {steg} steg!")
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    print("Elementet finns inte i listan.")
    return -1

lista = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91, 104, 130]
binary_search_trace(lista, 56)
`
  },
  {
    id: 'bank',
    title: '🏦 OOP: RPG & Bankkonto',
    desc: 'Objektorienterad programmering med metoder och transaktioner.',
    icon: Shield,
    code: `class SpelHjälte:
    def __init__(self, namn, hp=100, attack=25):
        self.namn = namn
        self.hp = hp
        self.attack = attack
        self.ryggsäck = []

    def plocka_upp(self, föremål):
        self.ryggsäck.append(föremål)
        print(f"{self.namn} plockade upp {föremål}!")

    def ta_skada(self, skada):
        self.hp -= skada
        print(f"{self.namn} tog {skada} skada. Kvarvarande HP: {self.hp}")

# Skapa hjälte
hero = SpelHjälte("Aria", hp=120, attack=30)
hero.plocka_upp("Kristallsvärd")
hero.plocka_upp("Hälsodryck")
hero.ta_skada(35)
print(f"Ryggsäck: {hero.ryggsäck}")
`
  }
];

interface PlaygroundViewProps {
  onOpenAICoach: (prompt?: string) => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ onOpenAICoach }) => {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string>(TEMPLATES[0].id);
  
  // Mobile / iPad layout state
  const [mobileTab, setMobileTab] = useState<'editor' | 'output'>('editor');
  const [outputTab, setOutputTab] = useState<'terminal' | 'variables' | 'canvas'>('terminal');

  const handleRun = async () => {
    setIsRunning(true);
    const res = await pythonInterpreter.execute(code, []);
    setResult(res);
    setIsRunning(false);

    if (res.canvasCommands && res.canvasCommands.length > 0) {
      setOutputTab('canvas');
    }
  };

  const handleSelectTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setActiveTemplate(tmpl.id);
    setCode(tmpl.code);
    setResult(null);
  };

  return (
    <div className="flex flex-col space-y-4 pb-12">
      {/* Templates Selector */}
      <div className="p-4 sm:p-5 bg-[#080d1a] rounded-2xl border border-white/10 shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-100 font-sans">Python Pro Sandbox</h2>
          </div>
          <span className="text-xs text-slate-400">Välj mall eller experimentera med fri kod</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {TEMPLATES.map(tmpl => {
            const Icon = tmpl.icon;
            return (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl)}
                className={`p-3 rounded-xl text-left border transition ${
                  activeTemplate === tmpl.id
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-[#050810] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-slate-200 mb-1">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate">{tmpl.title}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">{tmpl.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden items-center justify-between p-1 bg-[#080d1a] rounded-2xl border border-white/10">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition ${
            mobileTab === 'editor'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          💻 Kod-Editor
        </button>
        <button
          onClick={() => setMobileTab('output')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition ${
            mobileTab === 'output'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          📟 Resultat & Canvas
        </button>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Code Editor */}
        <div className={`lg:col-span-7 ${
          mobileTab === 'output' ? 'hidden lg:block' : 'block'
        }`}>
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onReset={() => {
              const current = TEMPLATES.find(t => t.id === activeTemplate);
              if (current) setCode(current.code);
            }}
            onAskAI={() => onOpenAICoach(`Jag experimenterar med följande kod i Python-lekplatsen:\n\`\`\`python\n${code}\n\`\`\`\nGe mig tips på förbättringar eller förklara hur den fungerar!`)}
            isRunning={isRunning}
            showSubmit={false}
            exerciseTitle="Sandbox Playground"
            initialHeight={480}
          />
        </div>

        {/* Output Panel with Subtabs */}
        <div className={`lg:col-span-5 flex flex-col space-y-2 ${
          mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Subtab Selector */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#080d1a] rounded-xl border border-white/10 text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOutputTab('terminal')}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition flex items-center gap-1.5 ${
                  outputTab === 'terminal'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Terminal</span>
              </button>

              <button
                onClick={() => setOutputTab('variables')}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition flex items-center gap-1.5 ${
                  outputTab === 'variables'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Variabler</span>
              </button>

              <button
                onClick={() => setOutputTab('canvas')}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition flex items-center gap-1.5 ${
                  outputTab === 'canvas'
                    ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Canvas</span>
              </button>
            </div>
          </div>

          <div className="h-[360px] sm:h-[420px] lg:h-[56vh]">
            {outputTab === 'terminal' && (
              <TerminalOutput
                result={result}
                onClear={() => setResult(null)}
                onAskAIDebug={msg => onOpenAICoach(`Fick detta fel i lekplatsen: ${msg}`)}
              />
            )}

            {outputTab === 'variables' && (
              <VariableInspector variables={result?.variables || []} />
            )}

            {outputTab === 'canvas' && (
              <VisualCanvasOutput commands={result?.canvasCommands || []} onClear={() => setResult(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
