import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Bell, 
  ArrowRight,
  ChevronRight,
  Clock,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle2,
  FileText,
  QrCode,
  CreditCard,
  Target,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_STUDENT_COURSES, MOCK_TIMETABLE, MOCK_MESSAGES, MOCK_STAFF_COURSES, MOCK_STUDENTS } from '../constants';

export default function Dashboard() {
  const { user } = useAuth();
  
  if (user?.role === 'student') {
    return <StudentDashboard user={user} />;
  }
  return <StaffDashboard user={user} />;
}

function StudentDashboard({ user }: { user: any }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegister = () => {
    if (isRegistering || showSuccess) return;
    setIsRegistering(true);
    
    // Simulate attendance registration
    setTimeout(() => {
      setIsRegistering(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-10 max-w-7xl mx-auto relative px-4 md:px-0">
      {/* Attendance Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] bg-green-600 text-white p-4 rounded-2xl shadow-xl shadow-green-900/20 flex items-center gap-3 border border-green-500"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Attendance Registered</p>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-80">Software Engineering (CS101) • 09:15 AM</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center px-1"
      >
        <div>
          <h2 className="text-2xl font-black text-text-dark tracking-tight">Hi, {user?.name.split(' ')[0]} 👋</h2>
          <p className="text-gray-500 text-sm font-medium">Monday, 23 Oct 2024</p>
        </div>
        <button 
          onClick={handleRegister}
          disabled={isRegistering}
          className={`w-12 h-12 rounded-2xl shadow-sm border border-border flex items-center justify-center transition-all active:scale-95 duration-300 ${
            isRegistering ? 'bg-primary/5 text-primary' : 
            showSuccess ? 'bg-green-100 text-green-600 border-green-200' : 'bg-white text-primary hover:shadow-lg hover:border-primary/20'
          }`}
        >
          {isRegistering ? (
            <Loader2 size={24} className="animate-spin" />
          ) : showSuccess ? (
            <CheckCircle2 size={24} />
          ) : (
            <QrCode size={24} />
          )}
        </button>
      </motion.div>

      {/* Digital ID / Quick Summary Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-primary via-primary-dark to-black rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-primary/30"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Status</p>
              <p className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block">Active • Year 3</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-black">{user?.name}</h3>
            <p className="text-white/60 text-sm font-medium">Computer Science BSc</p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Student ID</p>
              <p className="text-lg font-mono font-bold tracking-widest">{user?.id}</p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center bg-white rounded-xl text-primary shadow-lg active:scale-95 transition-transform cursor-pointer">
              <ChevronRight size={24} />
            </div>
          </div>
        </div>
        {/* Background blobs for depth */}
        <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-20px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[2rem] border border-border shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current GPA</p>
            <h4 className="text-2xl font-black text-text-dark">3.82</h4>
          </div>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-border shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <Target size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Attendance</p>
            <h4 className="text-2xl font-black text-text-dark">94.5%</h4>
          </div>
        </div>
      </div>

      {/* Today's Schedule - Mobile List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold tracking-tight text-text-dark">Next Class</h3>
          <button className="text-primary text-sm font-bold active:bg-primary/5 px-3 py-1 rounded-full transition-colors">View All</button>
        </div>
        <div className="bg-white rounded-[2rem] border border-border p-4 shadow-sm">
          {MOCK_TIMETABLE.slice(0, 2).map((item, idx) => (
            <div key={item.id} className={`flex gap-4 p-4 ${idx === 0 ? 'bg-gray-50 rounded-3xl' : 'mt-2 opacity-60'}`}>
              <div className="flex flex-col items-center justify-center w-12 shrink-0">
                <p className="text-xs font-black text-text-dark">{item.startTime.split(':')[0]}</p>
                <div className="w-px h-6 bg-border my-1"></div>
                <p className="text-[10px] font-black text-gray-400">AM</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-text-dark truncate">{item.subject}</h4>
                  {idx === 0 && <span className="text-[8px] font-black uppercase tracking-widest bg-green-100 text-green-700 px-2 py-0.5 rounded-full">In 15m</span>}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-1"><MapPin size={12} className="text-primary" /> {item.room}</div>
                  <div className="flex items-center gap-1"><Users size={12} className="text-primary" /> {item.lecturer.split(' ')[1]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Courses - Horizontal Scroll */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold tracking-tight text-text-dark">My Courses</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1 snap-x">
          {MOCK_STUDENT_COURSES.slice(0, 3).map((course) => (
            <div key={course.id} className="min-w-[240px] bg-white p-5 rounded-[2.5rem] border border-border shadow-sm snap-start">
              <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-white bg-primary shadow-lg shadow-primary/20`}>
                <BookOpen size={24} />
              </div>
              <h4 className="font-bold text-text-dark mb-1 line-clamp-1">{course.name}</h4>
              <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">{course.code}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Progress</span>
                  <span className="text-primary">{course.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaffDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-6 pb-10">
      <header className="flex justify-between items-center px-1">
        <div>
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">Faculty Access</p>
          <h1 className="text-2xl font-black text-text-dark tracking-tight">Dr. {user?.name.split(' ')[1]}</h1>
        </div>
        <div className="flex -space-x-2">
          {MOCK_STUDENTS.slice(0, 3).map((s, i) => (
            <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" />
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
            +24
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <StatCard 
          icon={<Users className="text-teal-600" size={24} />}
          label="Assigned Students"
          value={String(MOCK_STUDENTS.length * 12)}
          trend="+5.2%"
          color="bg-teal-50"
        />
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={<BookOpen className="text-blue-600" size={20} />}
            label="Courses"
            value={String(MOCK_STAFF_COURSES.length)}
            trend="Active"
            color="bg-blue-50"
          />
          <StatCard 
            icon={<CheckCircle2 className="text-orange-600" size={20} />}
            label="Pending"
            value="12"
            trend="Tasks"
            color="bg-orange-50"
          />
        </div>
      </div>

      <div className="space-y-6">
        <SectionTitle title="Course Activity" action="Manage" />
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1 snap-x">
          {MOCK_STAFF_COURSES.map(course => (
            <div key={course.id} className="min-w-[280px] bg-white p-6 rounded-[2.5rem] border border-border shadow-sm snap-start">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-lg">{course.code}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{course.studentCount} Students</span>
              </div>
              <h4 className="font-bold text-text-dark mb-4">{course.name}</h4>
              <button className="w-full py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                Open Course <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitle title="Recent Tasks" />
        <div className="bg-white rounded-[2rem] border border-border p-2 shadow-sm">
           <div className="space-y-1">
              <FeedItem 
                title="Grade Submission" 
                description="CS101 Final results pending approval." 
                time="1h ago"
                status="current"
              />
              <FeedItem 
                title="Curriculum Update" 
                description="Database Systems Week 12 slides." 
                time="3h ago"
                status="completed"
              />
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) {
  return (
    <div className="bg-white border border-border p-5 rounded-[2rem] shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-text-dark">{value}</span>
          <span className="text-[9px] font-black text-primary/60 uppercase">{trend}</span>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between px-1">
      <h2 className="text-xl font-bold text-text-dark tracking-tight">{title}</h2>
      {action && (
        <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group">
          {action} <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}

function FeedItem({ title, description, time, status }: { title: string; description: string; time: string; status: 'completed' | 'current' }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-3xl ${status === 'current' ? 'bg-primary/5' : ''}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
        {status === 'completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <h4 className="text-sm font-bold text-text-dark truncate">{title}</h4>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{time}</span>
        </div>
        <p className="text-xs text-gray-500 font-medium truncate">{description}</p>
      </div>
    </div>
  );
}
