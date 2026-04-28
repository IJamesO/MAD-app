import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { GraduationCap, Briefcase, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, UserCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const { login, loginRole, setLoginRole, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!loginRole) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-primary relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-5%] left-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-2xl mb-8"
          >
            <GraduationCap size={44} />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-white tracking-tight mb-2 uppercase leading-none"
          >
            Socializzy
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            By University of Salford
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 25 }}
          className="bg-bg rounded-t-[3rem] p-8 pb-12 relative z-10"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6 text-center">Gateway Selection</h2>
          <div className="space-y-4">
            <button 
              onClick={() => setLoginRole('student')}
              className="w-full flex items-center gap-4 p-5 bg-white border border-border rounded-2xl hover:border-primary active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <UserCircle2 size={28} />
              </div>
              <div className="text-left">
                <p className="font-bold text-text-dark text-lg">Student Login</p>
                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Undergraduate & Grad</p>
              </div>
              <ArrowRight size={20} className="ml-auto text-gray-300" />
            </button>

            <button 
              onClick={() => setLoginRole('staff')}
              className="w-full flex items-center gap-4 p-5 bg-white border border-border rounded-2xl hover:border-primary active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center">
                <Briefcase size={28} />
              </div>
              <div className="text-left">
                <p className="font-bold text-text-dark text-lg">Staff Login</p>
                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Faculty & Administration</p>
              </div>
              <ArrowRight size={20} className="ml-auto text-gray-300" />
            </button>
          </div>
          <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
            Secure connection enabled • 256-bit encryption
          </p>
        </motion.div>
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
