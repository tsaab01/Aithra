import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { SectionId } from '../types';

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in high-growth sectors including SaaS, E-commerce, Healthcare, and Logistics. However, our automation frameworks are industry-agnostic and can be adapted to any business with digital workflows."
  },
  {
    question: "How quickly can we see results?",
    answer: "Most clients see an initial ROI within 30 days of deployment. Our 'Audit to Launch' process is designed to ship Minimum Viable Products (MVPs) in under 4 weeks, allowing you to validate value quickly."
  },
  {
    question: "Do I need a technical team to manage the AI?",
    answer: "No. We build 'human-in-the-loop' systems with user-friendly dashboards. We also offer fully managed retainer packages where our engineers handle all maintenance, updates, and optimization."
  },
  {
    question: "Is my proprietary data secure?",
    answer: "Security is our top priority. We use enterprise-grade encryption for all data in transit and at rest. We can also deploy models within your own private cloud infrastructure (AWS/GCP/Azure) so sensitive data never leaves your controlled environment."
  },
  {
    question: "How does the pricing model work?",
    answer: "We offer project-based pricing for initial builds and monthly retainers for ongoing management and optimization. During our discovery call, we'll help you choose the model that aligns best with your budget and growth goals."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={SectionId.FAQ} className="py-24 bg-nexus-dark relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-card border border-white/10 text-nexus-accent text-sm font-medium mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know about partnering with Aithra.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-lg bg-white/5 overflow-hidden transition-colors hover:border-nexus-accent/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-lg text-gray-200 pr-8">{item.question}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-nexus-accent shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                        <div className="pt-4">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;