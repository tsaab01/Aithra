import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';

// Wrapper to provide location-aware layout features if needed
const AppContent: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-nexus-dark text-white font-sans selection:bg-nexus-accent selection:text-white">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<ServicePage />} />
        </Routes>
      </main>
      <Footer onOpenAdmin={() => setAdminOpen(true)} />
      <ScrollToTop />
      <ChatBot />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;