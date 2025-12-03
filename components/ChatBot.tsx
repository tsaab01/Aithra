import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Minimize2, Sparkles, Trash2 } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialMessage: ChatMessage = { role: 'model', content: "Systems online. I am Aithra's virtual assistant. How can I accelerate your business today?" };

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem('aithra_chat_history');
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        setMessages([initialMessage]);
      }
    } else {
      setMessages([initialMessage]);
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('aithra_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const suggestions = [
    "What services do you offer?",
    "Explain Workflow Automation",
    "What are the benefits of Voice Agents?",
    "How can AI Development help my business?",
    "Tell me about Custom Chatbots",
    "How does the pricing work?",
    "I need a Predictive Analytics audit",
    "How do I book a consultation?"
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userText = text.trim();
    const newMessages = [...messages, { role: 'user', content: userText } as ChatMessage];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Use the messages state directly (which contains history BEFORE this new message)
      // Note: React state updates are async, so 'messages' here is still the old history.
      const responseText = await sendChatMessage(messages, userText);
      
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Connection interrupted. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialMessage]);
    localStorage.removeItem('aithra_chat_history');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-nexus-accent hover:bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center border border-white/20"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-nexus-glow"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[85vh] flex flex-col glass-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-nexus-accent/10 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-nexus-accent/20 flex items-center justify-center border border-nexus-accent/50">
                  <Bot className="w-5 h-5 text-nexus-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Aithra Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleClearChat}
                  title="Clear Chat"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-nexus-accent text-white rounded-tr-sm' 
                        : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-nexus-accent rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.15
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            {!loading && (
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-nexus-accent/20 border border-white/10 hover:border-nexus-accent/50 text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1.5 flex-shrink-0"
                    >
                      <Sparkles className="w-3 h-3 text-nexus-accent" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-sm">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-nexus-accent/50 focus:ring-1 focus:ring-nexus-accent/50 transition-all placeholder-gray-600"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="p-3 bg-nexus-accent hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-colors shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[10px] text-center text-gray-600 mt-2">
                Powered by Gemini 3 Pro
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;