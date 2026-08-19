import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Lightbulb, AlertCircle, RefreshCw } from 'lucide-react';
import { PythonExercise } from '../../types/python';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentExercise?: PythonExercise;
  currentCode: string;
  initialQuestion?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({
  isOpen,
  onClose,
  currentExercise,
  currentCode,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `👋 Hej! Jag är din personliga **Python-Coach**.\n\nJag kan förklara koncept, ge dig smarta ledtrådar på svenska, eller hjälpa dig hitta buggar i din kod. Vad undrar du över?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState(initialQuestion || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          currentCode,
          exerciseTitle: currentExercise?.title,
          exerciseDescription: currentExercise?.task,
          level: currentExercise?.difficulty,
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.response || data.fallback || 'Jag kunde tyvärr inte svara just nu. Testa igen!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: 'ai-err-' + Date.now(),
        sender: 'ai',
        text: 'Ett anslutningsfel uppstod. Kontrollera din kod och indentering, eller ställ frågan igen!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    {
      icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" />,
      text: 'Ge mig en ledtråd utan att avslöja hela svaret',
    },
    {
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-400" />,
      text: 'Varför fungerar inte min nuvarande kod?',
    },
    {
      icon: <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />,
      text: 'Förklara detta koncept med en enkel liknelse',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="flex flex-col w-full max-w-2xl h-[85vh] bg-[#070b16] rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a1020] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-bold text-base text-slate-100">PyMaster AI Coach</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">Din pedagogiska svenska Python-mentor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-indigo-300" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md'
                    : 'bg-[#0f172a] text-slate-200 border border-white/10 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-sm">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-cyan-200 text-right' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-400/30 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-cyan-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-400/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              </div>
              <span>Coachen funderar och formulerar svar...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-6 py-2 bg-[#050810]/70 border-t border-white/5 flex gap-2 overflow-x-auto">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp.text)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 whitespace-nowrap transition"
            >
              {qp.icon}
              <span>{qp.text}</span>
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 bg-[#0a1020] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Fråga Python-Coachen vad som helst..."
            className="flex-1 px-4 py-3 bg-[#050810] rounded-2xl border border-white/10 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-90 active:scale-95 disabled:opacity-40 text-slate-950 rounded-2xl font-bold transition shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
