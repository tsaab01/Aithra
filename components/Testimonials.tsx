import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionId, Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: "Sarah Jenkins",
    role: "COO",
    company: "Vertex Dynamic",
    content: "Aithra AI completely transformed our customer support. We reduced response times by 90% and saved over $12k/month in overhead within the first quarter.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
  },
  {
    id: '2',
    name: "Marcus Chen",
    role: "Founder",
    company: "Cmd+Alt",
    content: "The workflow automation they built handles our entire lead qualification process. It feels like we hired 5 full-time SDRs overnight, but with zero management required.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
  },
  {
    id: '3',
    name: "Elena Rodriguez",
    role: "VP of Sales",
    company: "LayerStack",
    content: "I was skeptical about AI agents handling client calls, but the voice assistant Aithra developed is indistinguishable from a human. It booked 45 demos last week alone.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id={SectionId.TESTIMONIALS} className="py-24 bg-nexus-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Real results from businesses that switched to intelligent automation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#10B981', // Brighter shade of nexus-glow
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
              className="glass-card p-8 rounded-2xl border border-white/5 relative group cursor-default"
            >
              <Quote className="absolute top-8 right-8 w-8 h-8 text-nexus-accent/20 group-hover:text-nexus-accent/60 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed relative z-10">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  loading="lazy"
                  width="48"
                  height="48"
                  className="w-12 h-12 rounded-full object-cover border-2 border-nexus-accent/50 group-hover:border-nexus-accent transition-colors"
                />
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-sm text-nexus-accent group-hover:text-white transition-colors">{item.role}, {item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;