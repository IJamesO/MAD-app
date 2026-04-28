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
    <div className="min-h-screen bg-[#FDFDFD] flex justify-center font-sans">
      {/* Root Application Container constrained to iPhone Pro Max width */}
      <div className="w-full max-w-[430px] min-h-screen bg-white relative flex flex-col shadow-2xl overflow-hidden shadow-black/5 ring-1 ring-black/5">
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </div>
    </div>
  );
}
