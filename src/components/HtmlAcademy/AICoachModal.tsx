import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Code, 
  Lightbulb, 
  Zap 
} from 'lucide-react';
import { Language } from '../../i18n/translations';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
  language?: Language;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

const QUICK_PROMPTS_SV = [
  'Hur fungerar semantiska taggar som <main> och <section>?',
  'Varför är alt-attributet viktigt för <img>?',
  'Hur länkar jag in en CSS-stil med <style>?',
  'Hur gör jag ett formulär obligatoriskt med required?',
  'Vad är skillnaden mellan <ul> och <ol>?'
];

const QUICK_PROMPTS_EN = [
  'How do semantic tags like <main> and <section> work?',
  'Why is the alt attribute important for <img>?',
  'How do I add CSS styling with <style>?',
  'How do I make a form field required?',
  'What is the difference between <ul> and <ol>?'
];

export const AICoachModal: React.FC<AICoachModalProps> = ({
  isOpen,
  onClose,
  initialContext,
  language = 'sv'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: language === 'sv' 
        ? 'Hej! Jag är din personliga AI Web Coach för HTML, CSS & JavaScript. Vad funderar du på eller behöver hjälp med?' 
        : 'Hello! I am your personal AI Web Coach for HTML, CSS & JavaScript. What questions do you have or need help with?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = language === 'sv' ? QUICK_PROMPTS_SV : QUICK_PROMPTS_EN;

  if (!isOpen) return null;

  const handleSendMessage = (msgToSend?: string) => {
    const text = msgToSend || inputText;
    if (!text.trim()) return;

    const newMsgs: ChatMessage[] = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponse = '';

      const lower = text.toLowerCase();
      if (lower.includes('alt') || lower.includes('bild') || lower.includes('image')) {
        aiResponse = language === 'sv'
          ? 'Alt-attributet ger en alternativ textbeskrivning av bilden. Det är superviktigt för tillgänglighet så att skärmläsare kan förklara bilden för synskadade besökare, och om bilden skulle misslyckas att laddas!'
          : 'The alt attribute provides an alternative text description of the image. It is crucial for accessibility so screen readers can describe images to visually impaired visitors, and displays if the image fails to load!';
      } else if (lower.includes('semantisk') || lower.includes('semantic') || lower.includes('main') || lower.includes('section')) {
        aiResponse = language === 'sv'
          ? 'Semantiska taggar (<header>, <nav>, <main>, <section>, <article>, <footer>) ger meningsfull struktur till din webbsida. Sökmotorer (SEO) och hjälpmedel förstår då direkt vad som är huvudinnehåll, meny eller sidfot.'
          : 'Semantic tags (<header>, <nav>, <main>, <section>, <article>, <footer>) give meaningful structure to web pages. Search engines (SEO) and accessibility tools immediately understand what is main content, navigation, or footer.';
      } else if (lower.includes('style') || lower.includes('css')) {
        aiResponse = language === 'sv'
          ? 'Du kan lägga till CSS inuti <style>-taggen i <head> eller toppen av ditt dokument. Till exempel: <style> body { background: #0b0f19; color: #fff; } h1 { color: #38bdf8; } </style>.'
          : 'You can add CSS inside the <style> tag in the <head> or at the top of your document. For example: <style> body { background: #0b0f19; color: #fff; } h1 { color: #38bdf8; } </style>.';
      } else if (lower.includes('formulär') || lower.includes('form') || lower.includes('required')) {
        aiResponse = language === 'sv'
          ? 'Ett formulär definieras med <form>. För att kräva att användaren fyller i ett fält lägger du bara till attributet "required" i input-taggen, t.ex: <input type="email" required>.'
          : 'A form is defined with <form>. To require user input before submission, simply add the "required" attribute to your input tag, e.g. <input type="email" required>.';
      } else if (lower.includes('ul') || lower.includes('ol') || lower.includes('lista') || lower.includes('list')) {
        aiResponse = language === 'sv'
          ? '<ul> skapar en oordnad punktlista (med bullets), medan <ol> skapar en numrerad lista (1, 2, 3...). Båda använder <li> för varje listpunkt!'
          : '<ul> creates an unordered bulleted list, while <ol> creates an ordered numbered list (1, 2, 3...). Both use <li> for each list item!';
      } else {
        aiResponse = language === 'sv'
          ? 'Bra fråga! När du bygger webben är det alltid bäst att tänka på ren struktur först (HTML), sedan utseende och layout (CSS), och slutligen interaktioner (JavaScript). Kontrollera alltid att dina taggar är rätt öppnade och stängda!'
          : 'Great web development question! Best practice is to structure content cleanly first (HTML), apply layout and styles (CSS), and add interactivity (JavaScript). Always ensure tags and syntax are properly closed!';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsThinking(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#070b16] rounded-3xl border border-white/10 shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#050811] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">AI Web Coach</h3>
              <p className="text-[11px] text-slate-400">
                {language === 'sv' ? 'Din interaktiva assistent för HTML, CSS & JavaScript' : 'Your interactive assistant for HTML, CSS & JavaScript'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-[#04060d] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
            {language === 'sv' ? 'Förslag:' : 'Suggestions:'}
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 border border-white/5 whitespace-nowrap shrink-0 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-orange-500 text-slate-950' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-orange-500 text-slate-950 font-medium'
                  : 'bg-white/5 border border-white/10 text-slate-200'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-10">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>{language === 'sv' ? 'AI Coachen tänker...' : 'AI Coach is thinking...'}</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-[#050811] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            placeholder={language === 'sv' ? "Ställ en fråga om HTML, taggar, CSS eller JavaScript..." : "Ask a question about HTML tags, CSS or JavaScript..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500/50"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 rounded-xl font-bold transition shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
