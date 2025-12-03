import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Users, DollarSign, Activity, Bell, Search, LayoutDashboard, Settings, LogOut, FileText } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid Access Key');
    }
  };

  const mockLeads = [
    { id: 1, name: "Alice Freeman", company: "TechNova", email: "alice@technova.io", status: "New", date: "2 mins ago" },
    { id: 2, name: "Robert Lang", company: "ConstructCo", email: "r.lang@construct.co", status: "Contacted", date: "1 hour ago" },
    { id: 3, name: "Sarah Connor", company: "Skynet Inc.", email: "sarah@skynet.com", status: "Qualified", date: "4 hours ago" },
    { id: 4, name: "David Miller", company: "Miller Logistics", email: "dave@miller.com", status: "New", date: "1 day ago" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <div className="absolute top-4 right-4 z-50">
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isLoggedIn ? (
          // Login Screen
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-md bg-nexus-card border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-nexus-accent/30">
                <Lock className="w-8 h-8 text-nexus-accent" />
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
              <p className="text-gray-400 text-sm mt-2">Restricted Access. Authorization Required.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Access Key"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent outline-none transition-all text-center tracking-widest"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-nexus-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]"
              >
                Authenticate
              </button>
            </form>
            <div className="mt-6 text-center">
               <p className="text-xs text-gray-600 font-mono">Hint: password is 'admin'</p>
            </div>
          </motion.div>
        ) : (
          // Dashboard Screen
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-6xl h-[85vh] bg-[#0f0f13] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex"
          >
            {/* Sidebar */}
            <div className="w-20 md:w-64 border-r border-white/5 flex flex-col bg-black/20">
              <div className="p-6 border-b border-white/5">
                 <span className="text-xl font-bold hidden md:block">AITHRA<span className="text-nexus-accent">OS</span></span>
                 <span className="text-xl font-bold md:hidden block text-center">A</span>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'leads', icon: Users, label: 'Leads' },
                  { id: 'reports', icon: FileText, label: 'Audit Reports' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id 
                        ? 'bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="hidden md:block font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-white/5">
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:block font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-nexus-dark to-black">
              {/* Header */}
              <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02]">
                <h3 className="font-bold text-lg capitalize text-white">{activeTab}</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-nexus-accent rounded-full"></span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                </div>
              </header>

              {/* Dashboard Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {activeTab === 'dashboard' && (
                  <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-nexus-card border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Users className="w-16 h-16 text-blue-500" />
                        </div>
                        <div className="relative z-10">
                          <div className="text-gray-400 text-sm font-medium mb-1">Total Visitors</div>
                          <div className="text-3xl font-bold text-white">24.5k</div>
                          <div className="text-green-400 text-xs mt-2 flex items-center gap-1">
                            <Activity className="w-3 h-3" /> +12% this week
                          </div>
                        </div>
                      </div>

                      <div className="bg-nexus-card border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <FileText className="w-16 h-16 text-purple-500" />
                        </div>
                        <div className="relative z-10">
                          <div className="text-gray-400 text-sm font-medium mb-1">Audits Generated</div>
                          <div className="text-3xl font-bold text-white">843</div>
                          <div className="text-purple-400 text-xs mt-2 flex items-center gap-1">
                            <Activity className="w-3 h-3" /> +5% this week
                          </div>
                        </div>
                      </div>

                      <div className="bg-nexus-card border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <DollarSign className="w-16 h-16 text-green-500" />
                        </div>
                        <div className="relative z-10">
                          <div className="text-gray-400 text-sm font-medium mb-1">Est. Revenue Impact</div>
                          <div className="text-3xl font-bold text-white">$1.2M</div>
                          <div className="text-green-400 text-xs mt-2 flex items-center gap-1">
                            <Activity className="w-3 h-3" /> Based on 15 closed deals
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-nexus-card border border-white/5 rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h4 className="font-bold text-white">Recent Inquiries</h4>
                        <button className="text-xs text-nexus-accent hover:text-white transition-colors">View All</button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                            <tr>
                              <th className="px-6 py-4 font-medium">Name</th>
                              <th className="px-6 py-4 font-medium">Company</th>
                              <th className="px-6 py-4 font-medium">Status</th>
                              <th className="px-6 py-4 font-medium text-right">Time</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {mockLeads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white">
                                      {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-white">{lead.name}</div>
                                      <div className="text-xs text-gray-500">{lead.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">{lead.company}</td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                    lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    lead.status === 'Qualified' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                  }`}>
                                    {lead.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right text-xs text-gray-500">{lead.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab !== 'dashboard' && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Module under development.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;