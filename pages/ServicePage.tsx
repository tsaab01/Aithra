import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Cpu, Zap, ArrowRight, CreditCard, Check, Plus, Minus, HelpCircle } from 'lucide-react';
import { servicesData } from '../data/services';
import { SectionId } from '../types';

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Dynamic SEO and Meta Tags
  useEffect(() => {
    if (!service) return;

    // Save previous title to restore later
    const previousTitle = document.title;
    document.title = `${service.title} | Aithra Capabilities`;

    // Define the meta tags we want to manage
    const metaTags = [
      { attr: 'name', key: 'description', content: service.shortDescription },
      { attr: 'property', key: 'og:title', content: `${service.title} | Aithra` },
      { attr: 'property', key: 'og:description', content: service.shortDescription },
      { attr: 'property', key: 'og:image', content: `${window.location.origin}/assets/services/${service.id}-share.jpg` },
      { attr: 'property', key: 'og:url', content: window.location.href },
      { attr: 'property', key: 'og:type', content: 'website' },
      { attr: 'property', key: 'og:site_name', content: 'Aithra Automation' },
      { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
      { attr: 'name', key: 'twitter:title', content: service.title },
      { attr: 'name', key: 'twitter:description', content: service.shortDescription },
      { attr: 'name', key: 'twitter:image', content: `${window.location.origin}/assets/services/${service.id}-share.jpg` },
      { attr: 'name', key: 'twitter:domain', content: window.location.hostname },
    ];

    // Store references to revert changes on unmount
    const originals: { element: HTMLMetaElement, originalContent: string | null }[] = [];
    const createdElements: HTMLMetaElement[] = [];

    metaTags.forEach(({ attr, key, content }) => {
      // Look for existing tag
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;

      if (element) {
        // If it exists, save its current state before updating
        originals.push({ element, originalContent: element.getAttribute('content') });
        element.setAttribute('content', content);
      } else {
        // If it doesn't exist, create it
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        element.setAttribute('content', content);
        document.head.appendChild(element);
        createdElements.push(element);
      }
    });

    // Cleanup function
    return () => {
      document.title = previousTitle;
      
      // Restore original values
      originals.forEach(({ element, originalContent }) => {
        if (originalContent !== null) {
          element.setAttribute('content', originalContent);
        } else {
          // If it had no content originally (rare), remove attribute
          element.removeAttribute('content');
        }
      });

      // Remove tags we created
      createdElements.forEach(el => el.remove());
    };
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nexus-dark text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-nexus-accent hover:text-white underline"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.fullDescription,
    "provider": {
      "@type": "Organization",
      "name": "Aithra Automation",
      "url": window.location.origin
    },
    "url": window.location.href,
    "serviceType": service.title,
    "image": `${window.location.origin}/assets/services/${service.id}.jpg`,
    "areaServed": "Worldwide",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly"
    }
  };

  const toggleFaq = (index: number) => {
    // If clicking the currently open item, close it (set to null)
    // Otherwise, open the clicked item (set to index), automatically closing the previous one
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-nexus-dark pt-24 pb-12">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-8`}>
              <div className="w-full h-full bg-nexus-card rounded-xl flex items-center justify-center text-white">
                {service.icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {service.fullDescription}
            </p>
            <button 
              onClick={() => navigate('/', { state: { scrollTo: SectionId.CONTACT } })}
              className="px-8 py-4 bg-nexus-accent hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
            >
              Book Consultation <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Tech Specs Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-nexus-card border border-white/10 rounded-2xl p-8 overflow-hidden">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Cpu className="w-5 h-5 text-nexus-accent" />
                <span className="font-mono text-sm text-gray-400">TECHNICAL_SPECS</span>
              </div>
              <div className="space-y-4">
                {service.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className="text-gray-500 font-mono text-sm">{spec.label}</span>
                    <span className="text-white font-mono text-sm group-hover:text-nexus-accent transition-colors">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  SYSTEM_READY
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits & Use Cases */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" /> Key Benefits
            </h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-nexus-accent/30 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-nexus-accent shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
             <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-400" /> Common Use Cases
            </h2>
             <div className="grid sm:grid-cols-2 gap-4">
              {service.useCases.map((useCase, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-nexus-card to-black border border-white/10 hover:border-white/20 transition-all group">
                  <h3 className="text-white font-medium group-hover:text-nexus-accent transition-colors">
                    {useCase}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Pricing Section */}
        {service.pricing && (
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <CreditCard className="w-8 h-8 text-nexus-accent" /> Transparent Pricing
              </h2>
              <p className="text-gray-400">Choose the engagement model that fits your stage of growth.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {service.pricing.map((tier, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    tier.highlight 
                      ? 'bg-nexus-card border-nexus-accent shadow-2xl shadow-blue-900/20 scale-105 z-10' 
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nexus-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-white">{tier.price}</span>
                    <span className="text-sm text-gray-500">{tier.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 h-10">{tier.description}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-nexus-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => navigate('/', { state: { scrollTo: SectionId.CONTACT } })}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                      tier.highlight
                        ? 'bg-nexus-accent hover:bg-blue-600 text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Get Started
                  </button>

                  <button 
                    onClick={() => navigate('/', { state: { scrollTo: SectionId.CONTACT } })}
                    className="w-full mt-3 py-2 rounded-lg font-medium text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-transparent flex items-center justify-center gap-2"
                  >
                    Contact Sales
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {service.faq && (
          <div className="mb-24 max-w-3xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-nexus-accent" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {service.faq.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  const buttonId = `faq-btn-${index}`;
                  const contentId = `faq-content-${index}`;
                  
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-white/10 rounded-lg bg-white/5 overflow-hidden transition-colors hover:border-nexus-accent/30"
                    >
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-inset focus:ring-nexus-accent"
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
                            id={contentId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-0">
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
            </motion.div>
          </div>
        )}

        {/* CTA Bottom */}
        <div className="text-center py-16 bg-gradient-to-b from-transparent to-nexus-card/50 rounded-3xl border border-white/5">
           <h2 className="text-3xl font-bold mb-6">Ready to deploy {service.title}?</h2>
           <p className="text-gray-400 max-w-xl mx-auto mb-8">
             Our team is ready to analyze your requirements and build a custom solution in weeks, not months.
           </p>
           <button 
              onClick={() => navigate('/', { state: { scrollTo: SectionId.CONTACT } })}
              className="px-8 py-4 bg-white text-nexus-dark font-bold rounded-lg hover:bg-gray-200 transition-colors"
           >
             Start Your Project
           </button>
        </div>

      </div>
    </div>
  );
};

export default ServicePage;