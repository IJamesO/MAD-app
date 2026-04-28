import React, { useState, ReactNode } from 'react';
import { useAuth } from '../AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  Users,
  BarChart3,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const STUDENT_MENU: SidebarItem[] = [
  { id: 'dashboard', label: 'Home', icon: <LayoutDashboard size={20} /> },
  { id: 'profile', label: 'Social', icon: <UserCircle size={20} /> },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },
  { id: 'timetable', label: 'Schedule', icon: <Calendar size={20} /> },
  { id: 'grades', label: 'Grades', icon: <GraduationCap size={20} /> },
  { id: 'messages', label: 'Inbox', icon: <MessageSquare size={20} /> },
];

const STAFF_MENU: SidebarItem[] = [
  { id: 'dashboard', label: 'Home', icon: <LayoutDashboard size={20} /> },
  { id: 'profile', label: 'Social', icon: <UserCircle size={20} /> },
  { id: 'students', label: 'Directory', icon: <Users size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },
  { id: 'messages', label: 'Inbox', icon: <MessageSquare size={20} /> },
];

export default function Layout({ children, activeTab, onTabChange }: { 
  children: ReactNode, 
  activeTab: string, 
  onTabChange: (id: string) => void 
}) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menu = user?.role === 'student' ? STUDENT_MENU : STAFF_MENU;

  return (
    <div className="h-screen bg-bg flex flex-col md:flex-row overflow-hidden max-w-[100vw] safe-top safe-bottom">
      {/* Mobile Top App Bar */}
      <div className="md:hidden bg-surface/80 backdrop-blur-md border-b border-border px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={18} />
          </div>
          <span className="font-bold text-primary tracking-tight uppercase text-xs tracking-[0.2em] ml-1">Socializzy</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
              <img src={user?.avatar} alt="" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>

      {/* Profile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-surface z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-dark">Profile</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 flex flex-col items-center border-b border-border bg-gray-50/50">
                <div className="relative mb-4">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gray-50 object-cover"
                  />
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-text-dark">{user?.name}</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">{user?.role}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{user?.id} • {user?.email}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <button 
                  onClick={() => {
                    onTabChange('profile');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors font-semibold ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-text-dark hover:bg-gray-50'}`}
                >
                  <UserCircle size={20} className={activeTab === 'profile' ? 'text-primary' : 'text-gray-400'} />
                  Social Profile
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-text-dark font-semibold">
                  <Settings size={20} className="text-gray-400" />
                  Settings
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-text-dark font-semibold">
                  <GraduationCap size={20} className="text-gray-400" />
                  Academic Profile
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-text-dark font-semibold text-red-500" onClick={logout}>
                  <LogOut size={20} />
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-border shrink-0">
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Socializzy</span>
          </div>

          <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-2 scrollbar-hide">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-all group
                  ${activeTab === item.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}
                `}
              >
                <span className={`transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex items-center gap-3 mb-4 p-2 rounded-xl bg-gray-50 border border-border">
              <img src={user?.avatar} alt="" className="w-9 h-9 rounded-lg bg-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-text-dark truncate">{user?.name}</div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{user?.role}</div>
              </div>
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all group text-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Desktop Topbar */}
        <header className="h-20 bg-surface border-b border-border px-8 hidden md:flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold text-text-dark capitalize">
            {activeTab.replace('-', ' ')}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative group w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              />
            </div>
            <button className="w-10 h-10 border border-border rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="pb-24 md:pb-0"> {/* Extra padding for mobile bottom nav */}
            {children}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-1 left-4 right-4 bg-surface/80 backdrop-blur-xl border border-border flex items-center justify-around pb-6 pt-3 z-50 rounded-[2.5rem] shadow-2xl shadow-black/10">
          {menu.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 flex-1 py-1 relative"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' 
                  : 'text-gray-400 active:scale-95'
              }`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${
                activeTab === item.id ? 'text-primary' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Security Footer (Desktop Only) */}
        <footer className="bg-white border-t border-border py-2 px-8 hidden md:flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-2 h-2 bg-green-500 rounded-full"
            />
            Secure Academic Session • {user?.id}
          </div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Socializzy by University of Salford</div>
        </footer>
      </main>
    </div>
  );
}
