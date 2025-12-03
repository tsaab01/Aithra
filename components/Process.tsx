import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket } from 'lucide-react';
import { SectionId } from '../types';

const Process: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Audit & Strategy",
      desc: "We dive deep into your operations to identify high-ROI automation opportunities."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Build & Integrate",
      desc: "Our engineers develop custom agents and connect them to your existing tech stack."
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch & Scale",
      desc: "We deploy the solution, train your team, and continuously optimize performance."
    }
  ];

  return (
    <section id={SectionId.PROCESS} className="py-24 bg-nexus-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-nexus-accent to-transparent -translate-y-1/2 opacity-30"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-nexus-card border border-nexus-accent rounded-full flex items-center justify-center text-white mb-6 relative shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all">
                  {step.icon}
                  <div className="absolute -inset-2 rounded-full border border-white/10 border-dashed animate-spin-slow"></div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;