import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { MOCK_STUDENT_COURSES, MOCK_STAFF_COURSES } from '../constants';
import { 
  Users, 
  FileText, 
  Upload, 
  ChevronRight, 
  Plus, 
  BookOpen, 
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Courses() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'current' | 'completed'>('current');
  const isStudent = user?.role === 'student';
  const courses = isStudent ? MOCK_STUDENT_COURSES : MOCK_STAFF_COURSES;
  
  const filteredCourses = isStudent 
    ? courses.filter(c => c.status === filter)
    : courses;

  return (
    <div className="space-y-6 pb-24 md:pb-10 max-w-7xl mx-auto">
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-black text-text-dark tracking-tight">
            {isStudent ? 'My Enrolled Courses' : 'Course Management'}
          </h1>
          <p className="text-gray-500 text-sm font-medium">Manage and view your academic courses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full bg-white border border-border rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
            />
          </div>
          <button className="w-12 h-12 bg-white border border-border rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>

        {isStudent ? (
          <div className="flex p-1.5 bg-gray-100 rounded-2xl">
            <button 
              onClick={() => setFilter('current')}
              className={`flex-1 py-2.5 rounded-[0.85rem] text-xs font-black uppercase tracking-widest transition-all ${filter === 'current' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2.5 rounded-[0.85rem] text-xs font-black uppercase tracking-widest transition-all ${filter === 'completed' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
            >
              Completed
            </button>
          </div>
        ) : (
          <button className="w-full bg-primary text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform">
            <Plus size={20} /> Create New Module
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, idx) => (
            <motion.div 
              layout
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="bg-white border border-border rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center gap-2">
                  {course.grade && (
                    <span className="text-lg font-black text-primary bg-primary/10 px-3 py-1 rounded-xl">
                      {course.grade}
                    </span>
                  )}
                  <button className="p-2 text-gray-300 hover:text-gray-500">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-black text-text-dark leading-tight">{course.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{course.code} • {course.lecturer}</p>
              </div>

              {isStudent ? (
                <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">Your Progress</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-gray-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <Users className="mx-auto text-primary mb-1" size={18} />
                    <div className="text-xs font-black text-text-dark">{course.studentCount}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Students</div>
                  </div>
                  <div className="text-center border-x border-border">
                    <FileText className="mx-auto text-primary mb-1" size={18} />
                    <div className="text-xs font-black text-text-dark">4</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Assignments</div>
                  </div>
                  <div className="text-center">
                    <Upload className="mx-auto text-primary mb-1" size={18} />
                    <div className="text-[9px] font-black uppercase text-primary tracking-tighter">Uploads</div>
                  </div>
                </div>
              )}

              <button className="w-full py-4 bg-gray-50 hover:bg-primary hover:text-white text-text-dark font-black rounded-2xl transition-all flex items-center justify-center gap-2 group text-sm">
                Open Course Info <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
