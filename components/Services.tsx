import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/services';
import { SectionId } from '../types';

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-24 bg-nexus-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We don't just wrap ChatGPT. We build robust, production-grade AI infrastructure tailored to your business goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-nexus-accent/50 transition-all duration-300"
            >
              <Link to={`/service/${service.id}`} className="block h-full">
                <div className="relative h-full bg-nexus-card rounded-xl p-8 overflow-hidden border border-white/5 group-hover:border-transparent transition-colors flex flex-col">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-nexus-card rounded-md flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-grow mb-6">
                    {service.shortDescription}
                  </p>
                  
                  <motion.div 
                    className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-nexus-accent/30 text-nexus-accent text-sm font-medium bg-nexus-accent/5"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: '#00CCFF',
                      backgroundColor: 'rgba(0, 204, 255, 0.1)',
                      color: '#ffffff'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;