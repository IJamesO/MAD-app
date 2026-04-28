import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Timetable from './components/Timetable';
import Grades from './components/Grades';
import Messages from './components/Messages';
import Settings from './components/Settings';
import Students from './components/Students';
import Reports from './components/Reports';
import SocialProfile from './components/SocialProfile';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'courses': return <Courses />;
      case 'timetable': return <Timetable />;
      case 'grades': return <Grades />;
      case 'messages': return <Messages />;
      case 'profile': return <SocialProfile />;
      case 'settings': return <Settings />;
      case 'students': return <Students />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center font-sans overflow-hidden">
      {/* Simulation Frame for Desktop */}
      <div className="w-full h-full md:h-[92vh] md:max-w-[430px] md:rounded-[3.5rem] bg-white overflow-hidden shadow-[0_0_0_12px_#1a1a1a,0_0_0_16px_#262626,0_40px_100px_-20px_rgba(0,0,0,0.8)] md:relative flex flex-col transition-all duration-500">
        {/* Dynamic Island Simulation */}
        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-36 h-10 bg-black rounded-[2rem] z-[100] border-t border-white/10 shadow-inner" />
        
        <div className="flex-1 flex flex-col relative overflow-hidden bg-bg">
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}
