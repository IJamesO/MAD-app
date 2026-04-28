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
  UserCircle,
  Tag,
  Map as MapIcon
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
  { id: 'map', label: 'Map', icon: <MapIcon size={20} /> },
  { id: 'deals', label: 'Deals', icon: <Tag size={20} /> },
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
    <div className="h-screen bg-bg flex flex-col overflow-hidden w-full safe-top safe-bottom relative">
      {/* Universal Top App Bar */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-border px-6 h-20 flex items-center justify-between sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-[#005C5C] p-1.5 rounded-md flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#1a1a1a] text-sm leading-tight tracking-tight">Socializzy</span>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary">Socializzy Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
              <img src={user?.avatar} alt="" className="w-full h-full object-cover rounded-full" />
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-surface z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between pt-12">
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
                <button 
                  onClick={() => {
                    onTabChange('map');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors font-semibold ${activeTab === 'map' ? 'bg-primary/10 text-primary' : 'text-text-dark hover:bg-gray-50'}`}
                >
                  <MapIcon size={20} className={activeTab === 'map' ? 'text-primary' : 'text-gray-400'} />
                  Campus Map
                </button>
                <button 
                  onClick={() => {
                    onTabChange('deals');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors font-semibold ${activeTab === 'deals' ? 'bg-primary/10 text-primary' : 'text-text-dark hover:bg-gray-50'}`}
                >
                  <Tag size={20} className={activeTab === 'deals' ? 'text-primary' : 'text-gray-400'} />
                  Student Deals
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
              
              <div className="p-8 border-t border-border mt-auto">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center">Socializzy V4.2 • Salford</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar scroll-smooth">
          <div className="pb-32 pt-2"> {/* Extra padding for mobile bottom nav and spacing */}
            {children}
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="absolute bottom-8 left-6 right-6 bg-surface/90 backdrop-blur-2xl border border-border flex items-center justify-around pb-8 pt-4 z-50 rounded-[3rem] shadow-2xl shadow-black/20 ring-1 ring-white/10">
          {menu.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 flex-1 py-1 relative"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30 -translate-y-1' 
                  : 'text-gray-400 active:scale-95'
              }`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
                activeTab === item.id ? 'text-primary' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}
