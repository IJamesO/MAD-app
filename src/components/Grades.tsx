import React from 'react';
import { MOCK_GRADES } from '../constants';
import { TrendingUp, FileText, ChevronRight, Award, Star, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export default function Grades() {
  return (
    <div className="space-y-6 pb-24 md:pb-10 max-w-7xl mx-auto">
      <header>
        <h1 className="text-2xl font-black text-text-dark tracking-tight">Grades & Feedback</h1>
        <p className="text-gray-500 text-sm font-medium">Your academic progress summary.</p>
      </header>

      {/* GPA Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 border border-border shadow-sm flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Cumulative GPA</div>
        <div className="text-6xl font-black text-primary mb-4 tracking-tighter">3.82</div>
        <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '95.5%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(15,106,106,0.5)]"
          />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-2xl text-[10px] font-black uppercase tracking-wider">
          <Star size={14} className="fill-primary" />
          Distinction Honors Candidate
        </div>
      </motion.div>

      {/* Course Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text-dark px-1">Recent Results</h3>
        <div className="space-y-3">
          {MOCK_GRADES.map((grade, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-5 rounded-[2rem] border border-border shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary relative shrink-0">
                <BookOpen size={24} />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-[10px] font-black rounded-full border-4 border-white flex items-center justify-center">
                  {grade.grade}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-text-dark truncate leading-tight">{grade.course}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5 truncate">{grade.assignment}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${grade.score}%` }}
                       className="h-full bg-primary opacity-60"
                    />
                  </div>
                  <span className="text-[10px] font-black text-text-dark">{grade.score}%</span>
                </div>
              </div>
              <ChevronRight className="text-gray-300" size={20} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-primary/5 rounded-[2.5rem] p-6 space-y-4">
        <h4 className="text-sm font-black text-primary uppercase tracking-widest text-center">Achievements</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl flex flex-col items-center text-center">
            <Award className="text-orange-500 mb-2" size={28} />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Modules Pass</span>
            <span className="text-xl font-black text-text-dark">18/24</span>
          </div>
          <div className="bg-white p-4 rounded-3xl flex flex-col items-center text-center">
            <TrendingUp className="text-teal-600 mb-2" size={28} />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg. Score</span>
            <span className="text-xl font-black text-text-dark">88.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
