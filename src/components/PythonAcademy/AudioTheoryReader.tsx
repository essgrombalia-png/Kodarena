import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface AudioTheoryReaderProps {
  text: string;
  title?: string;
}

export const AudioTheoryReader: React.FC<AudioTheoryReaderProps> = ({ text, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Cancel speaking when text changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [text]);

  const cleanTextForSpeech = (rawText: string): string => {
    return rawText
      .replace(/#+\s/g, '') // remove markdown headings
      .replace(/```[\s\S]*?```/g, 'Kodexempel.') // replace code blocks
      .replace(/`([^`]+)`/g, '$1') // remove inline code ticks
      .replace(/\*+/g, '') // remove asterisks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // remove links
  };

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'sv-SE';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try to find a Swedish voice
    const voices = window.speechSynthesis.getVoices();
    const swedishVoice = voices.find(v => v.lang.startsWith('sv') || v.lang.includes('sv-SE'));
    if (swedishVoice) {
      utterance.voice = swedishVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-1.5 bg-[#050810] border border-white/10 px-2.5 py-1 rounded-xl text-xs">
      <button
        onClick={handleTogglePlay}
        className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition font-medium"
        title={isPlaying ? (isPaused ? 'Fortsätt uppläsning' : 'Pausa uppläsning') : 'Läs upp teorin med svensk röst'}
      >
        {isPlaying ? (
          isPaused ? (
            <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
          ) : (
            <Pause className="w-3.5 h-3.5 text-cyan-400 fill-current animate-pulse" />
          )
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
        )}
        <span className="text-[11px]">
          {isPlaying ? (isPaused ? 'Pausad' : 'Läser upp...') : 'Läs upp'}
        </span>
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          className="p-1 text-slate-400 hover:text-red-400 transition"
          title="Stoppa uppläsning"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
