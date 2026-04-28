import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { GraduationCap, Briefcase, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, UserCircle2, Globe, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const { login, loginRole, setLoginRole, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!loginRole) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 shrink-0">
          <div className="bg-[#005C5C] p-1.5 rounded-md">
            <GraduationCap className="text-white" size={18} />
          </div>
          <span className="font-black text-[#1a1a1a] tracking-tight">Socializzy</span>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-10 space-y-10 custom-scrollbar">
          {/* Welcome Text */}
          <div className="text-center space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-[#1a1a1a]"
            >
              Welcome back
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#4A4A4A] text-lg leading-relaxed px-2"
            >
              Select your portal to access your personalized academic environment and university resources.
            </motion.p>
          </div>

          {/* Cards Container */}
          <div className="space-y-6">
            {/* Student Portal Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-[#E6F4F1] rounded-full flex items-center justify-center">
                <GraduationCap className="text-[#005C5C]" size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Student Portal</h2>
                <p className="text-[#6B7280] text-sm font-medium leading-relaxed">
                  Manage courses, view grades, and access student services in one place.
                </p>
              </div>
              <div className="space-y-4 pt-2">
                <button 
                  onClick={() => setLoginRole('student')}
                  className="flex items-center gap-2 text-[#005C5C] font-bold text-lg hover:underline"
                >
                  Continue to Student Login <ArrowRight size={20} />
                </button>
                <button className="text-[#4D8C8C] text-sm font-bold block mx-auto">
                  Sign up as Student
                </button>
              </div>
            </motion.div>

            {/* Staff Portal Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-[#FDF2F2] rounded-full flex items-center justify-center">
                <Briefcase className="text-[#B91C1C]" size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Staff & Teacher Portal</h2>
                <p className="text-[#6B7280] text-sm font-medium leading-relaxed">
                  Access teaching tools, staff administration, and academic management systems.
                </p>
              </div>
              <div className="space-y-4 pt-2">
                <button 
                  onClick={() => setLoginRole('staff')}
                  className="flex items-center gap-2 text-[#B91C1C] font-bold text-lg hover:underline"
                >
                  Continue to Staff Login <ArrowRight size={20} />
                </button>
                <button className="text-[#E15A5A] text-sm font-bold block mx-auto">
                  Sign up as Staff
                </button>
              </div>
            </motion.div>

            {/* Empowering Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#107E7E] to-[#8B3B5B] rounded-[2rem] p-8 text-white relative overflow-hidden group h-64 flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60 transition-transform duration-700 group-hover:scale-110" />
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-bold">Empowering Your Future</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Discover the latest campus updates and career opportunities within our integrated digital ecosystem.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer Section */}
          <div className="pt-6 border-t border-gray-200 text-center space-y-8">
            <div className="space-y-1">
              <p className="text-[#4A4A4A] font-medium">New to Salford?</p>
              <button className="text-[#005C5C] font-bold text-lg">Register</button>
            </div>

            <div className="space-y-1">
              <p className="text-[#4A4A4A] font-medium">Need help logging in?</p>
              <button className="text-[#D14F4F] font-bold text-sm">Technical Support</button>
            </div>

            <div className="flex items-center justify-center gap-6 text-gray-400 py-4">
              <button className="hover:text-primary transition-colors"><Globe size={24} /></button>
              <button className="hover:text-primary transition-colors"><Accessibility size={24} /></button>
            </div>

            <p className="text-gray-400 text-xs font-bold py-6">
              © 2024 Socializzy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginRole, email);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-bg">
      <div className="p-6">
        <button 
          onClick={() => setLoginRole(null)}
          className="w-10 h-10 flex items-center justify-center bg-white border border-border rounded-xl text-gray-400 active:scale-95 transition-transform"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-8 pb-12">
        <div className="mb-10">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 mb-4">
            {loginRole === 'student' ? <UserCircle2 size={24} /> : <Briefcase size={24} />}
          </div>
          <h2 className="text-3xl font-black text-text-dark mb-1 tracking-tight">
            {loginRole === 'student' ? 'Student' : 'Faculty'} Portal
          </h2>
          <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">Access Node {loginRole === 'student' ? 'STU-001' : 'FAC-102'}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Universal Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  required
                  type="text"
                  placeholder={loginRole === 'student' ? "STU-XXXX-XXXX" : "FAC-XXXX-XXXX"}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secret Credential</label>
                <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-2">
              <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 transition-all" />
              <label htmlFor="remember" className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none">Keep me signed in</label>
            </div>
          </div>

          <button 
            disabled={isLoggingIn}
            className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
          >
            {isLoggingIn ? (
              <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Initiate Session
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
           <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-2xl flex gap-3">
            <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
            <p className="text-[10px] text-orange-900 leading-relaxed font-bold uppercase tracking-tight">
              Socializzy protocols require session termination after system use. Unauthorized access is monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
