import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Zap, MessageSquare } from 'lucide-react';
import { queryAIEnergyEngine } from '../utils/aiRAGEngine';
import { soundFX } from '../utils/audioFX';

export default function AIEnergyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "⚡ Hi! I'm KAFF'S AI Energy Assistant. Ask me anything about 40mg Cool Mint strips, Pack of 5 (₹229) vs Pack of 10 (₹399), gym timing, sublingual absorption, or FSSAI compliance!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    soundFX.playClick();
    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');

    setIsTyping(true);

    setTimeout(() => {
      const responseText = queryAIEnergyEngine(textToSend);
      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
      soundFX.playPowerUp();
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => { soundFX.playClick(); setIsOpen(!isOpen); }}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 text-black font-black text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-cyan-300/40 glow-ice"
      >
        <Bot className="w-4 h-4 fill-current animate-bounce" />
        <span>AI ENERGY ASSISTANT</span>
      </button>

      {/* Slide-Up Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-full max-w-sm bg-[#050912] border border-cyan-400/50 rounded-3xl shadow-2xl p-4 flex flex-col justify-between min-h-[420px] max-h-[500px] animate-in slide-in-from-bottom duration-300 glow-ice">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-black font-heading text-white flex items-center gap-1">
                  KAFF'S AI Advisor
                  <span className="text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-400/30">RAG LLM</span>
                </h4>
                <p className="text-[10px] text-slate-400">Instant Caffeine & Safety Guidance</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-black font-semibold rounded-br-none'
                      : 'bg-slate-900/90 text-slate-200 border border-cyan-500/20 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-[10px] text-cyan-400 font-mono animate-pulse">
                AI Assistant is typing response...
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="py-2 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend('How fast does it kick in?')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 shrink-0 hover:bg-cyan-500/10"
            >
              ⚡ How fast does it kick in?
            </button>
            <button
              onClick={() => handleSend('What packs are available?')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 shrink-0 hover:bg-cyan-500/10"
            >
              📦 Pack of 5 vs 10?
            </button>
            <button
              onClick={() => handleSend('Tell me about 40mg dose')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 shrink-0 hover:bg-cyan-500/10"
            >
              💊 40mg Cool Mint?
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2 pt-2 border-t border-slate-800"
          >
            <input
              type="text"
              placeholder="Ask AI anything about KAFF'S..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2.5 bg-gradient-to-r from-cyan-400 to-sky-400 text-black rounded-xl font-bold hover:scale-105 transition-all shadow-md shadow-cyan-500/40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
