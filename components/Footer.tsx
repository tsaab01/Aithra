import React from 'react';
import { Cpu } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Cpu className="w-6 h-6 text-nexus-accent" />
          <span className="text-lg font-bold">AITHRA<span className="text-nexus-accent">AI</span></span>
        </div>
        <div className="text-gray-500 text-sm flex flex-col items-center md:items-start gap-1">
          <span>© {new Date().getFullYear()} Aithra Automation Agency. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
          <button 
            onClick={onOpenAdmin}
            className="text-gray-800 hover:text-gray-600 text-xs transition-colors ml-4"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;