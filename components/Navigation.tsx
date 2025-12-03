import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SectionId } from '../types';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrolling after navigation state change
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Clear state
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  const handleNavClick = (id: SectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Services', id: SectionId.SERVICES },
    { label: 'Process', id: SectionId.PROCESS },
    { label: 'Free Audit', id: SectionId.AUDIT },
    { label: 'Contact', id: SectionId.CONTACT },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick(SectionId.HERO)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-nexus-accent blur-md opacity-50 group-hover:opacity-100 transition-opacity rounded-full"></div>
            <Cpu className="w-8 h-8 text-white relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-tight">AITHRA<span className="text-nexus-accent">AI</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-medium text-gray-300 hover:text-white hover:text-shadow-glow transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick(SectionId.AUDIT)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] animate-gradient-x text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] border border-white/10 hover:border-nexus-glow/50"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass border-t border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-left text-lg font-medium text-gray-300 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;