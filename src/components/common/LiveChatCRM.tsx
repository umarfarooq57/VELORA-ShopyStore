import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageSquare, X, Send, Sparkles, ShieldCheck, User, Bot, HelpCircle } from 'lucide-react';

export const LiveChatCRM: React.FC = () => {
  const { isChatOpen, toggleChat, chatMessages, sendChatMessage, navigateTo } = useStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const quickPrompts = [
    'Track my order',
    'Current promo vouchers',
    'Return policy inquiry',
    'Product recommendations'
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        id="live-chat-toggle-btn"
        onClick={toggleChat}
        aria-label="Open Velora Concierge Support"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-stone-700/30"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
          {isChatOpen ? 'Close Concierge' : 'Atelier Concierge'}
        </span>
      </button>

      {/* Chat Box */}
      {isChatOpen && (
        <aside
          id="crm-live-chat-widget"
          aria-label="Velora Concierge Support Chat"
          className="fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden max-h-[580px] h-[520px] animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white dark:bg-stone-950 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700 text-[#C5A880]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-stone-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-1.5">
                  Velora CRM Concierge
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                </h4>
                <p className="text-[11px] text-stone-400">Encrypted 24/7 Client Advisory</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/50 dark:bg-stone-900/50 text-sm">
            <div className="p-2.5 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 text-xs text-stone-700 dark:text-stone-300">
              <p className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                End-to-End Encrypted Session
              </p>
              Your inquiries and client identifiers are safeguarded under strict CCPA & GDPR standards.
            </div>

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 shrink-0 text-xs font-semibold">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-tr-none'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200/80 dark:border-stone-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block mt-1 text-[10px] opacity-60 text-right">{msg.timestamp}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-900 text-white dark:bg-stone-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="px-3 py-2 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendChatMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:border-stone-900 dark:hover:border-stone-400 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
            <input
              id="crm-chat-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask our atelier curators anything..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send Message"
              className="p-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </aside>
      )}
    </>
  );
};
