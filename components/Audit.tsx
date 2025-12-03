import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateBusinessAudit } from '../services/geminiService';
import { AuditResult, SectionId } from '../types';

const Audit: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);

  const steps = [
    "Connecting to Aithra Core...",
    "Analyzing Business Model...",
    "Scanning for Inefficiencies...",
    "Generating AI Solutions...",
    "Finalizing Report..."
  ];

  const handleAudit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setStep(0);

    // Simulated progress steps
    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);

    try {
      const data = await generateBusinessAudit(input);
      clearInterval(interval);
      setResult(data);
    } catch (err) {
      clearInterval(interval);
      setError("Unable to generate audit at this time. Please check your API key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={SectionId.AUDIT} className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexus-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-nexus-accent font-mono text-sm tracking-wider uppercase mb-2 block">AI Powered Analysis</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Instant Business Audit</h2>
            <p className="text-gray-400">
              Tell our AI what your business does (e.g., "Dental practice in Chicago with 5 employees"). 
              <br className="hidden md:block" />
              Aithra will instantly analyze where you can save time and money.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-12 border border-nexus-accent/20 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
            {/* Loading Overlay */}
            <AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-nexus-dark/90 backdrop-blur-sm flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 border-4 border-nexus-accent/30 border-t-nexus-accent rounded-full animate-spin mb-6"></div>
                  <div className="font-mono text-nexus-accent text-lg">
                    {steps[step]}
                  </div>
                  <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-nexus-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., We run a real estate agency focusing on luxury rentals..."
                className="flex-1 bg-nexus-dark/50 border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all placeholder-gray-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
              />
              <button 
                onClick={handleAudit}
                disabled={loading || !input}
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] animate-gradient-x hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-w-[160px] border border-white/10"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="w-5 h-5" /> Analyze</>}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Analysis Box */}
                  <div className="p-6 bg-gradient-to-r from-nexus-accent/10 to-transparent rounded-xl border border-nexus-accent/20">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-nexus-accent" /> 
                      Operational Insight
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{result.analysis}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {result.suggestions.map((suggestion, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-nexus-accent/50 transition-colors relative group"
                      >
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-nexus-card border border-nexus-accent rounded-full flex items-center justify-center text-nexus-accent font-bold text-sm shadow-lg">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed group-hover:text-white transition-colors">{suggestion}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center pt-6 border-t border-white/10">
                    <p className="text-gray-400 text-sm mb-4">Ready to deploy these agents?</p>
                    <button 
                      onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-nexus-accent hover:text-white font-medium transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                      Book a full consultation <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audit;