import React, { useState, useRef, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { askAIAssistant } from '../services/api';
import { Bot, Mic, MicOff, Send, Volume2, Sparkles, MessageSquare } from 'lucide-react';

interface AIAssistantProps {
  weatherData: WeatherData;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ weatherData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am your AI Weather Assistant for ${weatherData.location.name}. Ask me about rain, clothing recommendations, farming advice, or travel plans!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!queryText) setInput('');
    setIsLoading(true);

    const res = await askAIAssistant(textToSend, weatherData);

    setMessages([...newMessages, { sender: 'ai', text: res.answer }]);
    setIsLoading(false);

    // Speak AI response if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(res.answer);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition duration-300 flex items-center gap-2 group"
      >
        <Bot className="w-6 h-6 animate-bounce" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold">
          AI Weather Assistant
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] glass-panel border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1">
                  AI Weather Assistant <Sparkles className="w-3 h-3 text-amber-400" />
                </h4>
                <p className="text-[10px] text-slate-300">Voice & Multi-language Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-lg font-bold">
              ×
            </button>
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex gap-1.5 overflow-x-auto text-[11px]">
            <button onClick={() => handleSend('Will it rain today?')} className="px-2.5 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 whitespace-nowrap hover:bg-blue-600 hover:text-white">
              🌧️ Rain today?
            </button>
            <button onClick={() => handleSend('What should I wear?')} className="px-2.5 py-1 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap hover:bg-indigo-600 hover:text-white">
              👕 Outfit advice
            </button>
            <button onClick={() => handleSend('Farming weather advice')} className="px-2.5 py-1 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap hover:bg-emerald-600 hover:text-white">
              🌾 Farming
            </button>
          </div>

          {/* Conversation Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl text-xs text-slate-400 animate-pulse">
                  AI is analyzing meteorological data...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={toggleVoiceInput}
              className={`p-2 rounded-xl border transition ${
                isListening
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Voice Input (Speech-to-Text)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask weather question..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
