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
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      {/* Simulation Frame for Desktop */}
      <div className="w-full h-full md:h-[956px] md:max-w-[440px] md:rounded-[4rem] bg-white overflow-hidden shadow-[0_0_0_12px_#1a1a1a,0_0_0_14px_#333,0_40px_100px_-20px_rgba(0,0,0,0.5)] md:relative flex flex-col">
        {/* Dynamic Island Simulation */}
        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-full z-[100] border-t border-white/5" />
        
        <div className="flex-1 overflow-hidden flex flex-col relative">
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}
