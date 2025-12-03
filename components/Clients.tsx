
import React from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Command, Layers, Box, Aperture, Triangle } from 'lucide-react';

const clients = [
  { name: "Vertex Dynamic", icon: <Hexagon className="w-8 h-8 mb-2" /> },
  { name: "Cmd+Alt", icon: <Command className="w-8 h-8 mb-2" /> },
  { name: "LayerStack", icon: <Layers className="w-8 h-8 mb-2" /> },
  { name: "Cube Systems", icon: <Box className="w-8 h-8 mb-2" /> },
  { name: "Aperture AI", icon: <Aperture className="w-8 h-8 mb-2" /> },
  { name: "Delta Force", icon: <Triangle className="w-8 h-8 mb-2" /> },
];

const Clients: React.FC = () => {
  return (
    <section className="py-16 bg-nexus-dark border-t border-white/5 relative overflow-hidden">
      {/* Background Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-sm font-mono text-gray-500 uppercase tracking-widest mb-10"
        >
          Trusted by Leading Brands
        </motion.p>

        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-80">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="group flex flex-col items-center cursor-pointer transition-all duration-300"
            >
              <div className="text-gray-500 group-hover:text-white transition-colors duration-300">
                {client.icon}
              </div>
              <span className="text-lg font-bold text-gray-600 group-hover:text-white transition-colors duration-300">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
