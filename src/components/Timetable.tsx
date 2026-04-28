import React, { useState } from 'react';
import { MOCK_TIMETABLE } from '../constants';
import { Clock, MapPin, User, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedWeek, setSelectedWeek] = useState(12);

  const dayItems = MOCK_TIMETABLE.filter(t => t.day === selectedDay);

  return (
    <div className="space-y-6 pb-24 md:pb-10">
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-black text-text-dark tracking-tight">Your Schedule</h1>
          <p className="text-gray-500 text-sm font-medium">Week {selectedWeek} • Semester 2</p>
        </div>

        {/* Week Selector */}
        <div className="flex items-center justify-between bg-white border border-border p-2 rounded-2xl shadow-sm">
          <button 
            onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
            className="p-2 text-gray-400 hover:text-primary active:scale-95 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} className="text-primary" />
            <span className="font-bold text-text-dark">Week {selectedWeek}</span>
          </div>
          <button 
            onClick={() => setSelectedWeek(prev => prev + 1)}
            className="p-2 text-gray-400 hover:text-primary active:scale-95 transition-transform"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Day Selector - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                flex flex-col items-center justify-center min-w-[70px] aspect-square rounded-[1.5rem] transition-all snap-start
                ${selectedDay === day 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-white border border-border text-gray-400'}
              `}
            >
              <span className="text-[10px] font-black uppercase tracking-widest mb-1">{day.substring(0, 3)}</span>
              <span className="text-xl font-black">{day === 'Monday' ? '23' : day === 'Tuesday' ? '24' : day === 'Wednesday' ? '25' : day === 'Thursday' ? '26' : '27'}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Agenda List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold text-text-dark">Agenda for {selectedDay}</h3>
          <button className="text-gray-400"><Filter size={20} /></button>
        </div>

        <AnimatePresence mode="popLayout">
          {dayItems.length > 0 ? (
            <div className="space-y-4">
              {dayItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative flex gap-4"
                >
                  {/* Time indicator */}
                  <div className="flex flex-col items-center w-14 shrink-0 pt-2 text-center">
                    <span className="text-xs font-black text-text-dark">{item.startTime}</span>
                    <div className="w-px flex-1 bg-border my-2 border-dashed"></div>
                  </div>

                  {/* Class Card */}
                  <div className={`
                    flex-1 p-5 rounded-[2rem] border-l-[6px] shadow-sm flex flex-col gap-3 relative
                    ${item.color.replace('border-l-4', 'border-l-[6px]')}
                    ${item.color.includes('teal') ? 'bg-teal-50/50' : item.color.includes('blue') ? 'bg-blue-50/50' : item.color.includes('purple') ? 'bg-purple-50/50' : 'bg-white'}
                  `}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-text-dark leading-tight">{item.subject}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">End: {item.endTime}</p>
                      </div>
                      <button className="text-gray-300"><MoreVertical size={18} /></button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-white/60 px-2 py-1 rounded-lg">
                        <MapPin size={12} className="text-primary" /> {item.room}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-white/60 px-2 py-1 rounded-lg">
                        <User size={12} className="text-primary" /> {item.lecturer}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
                <CalendarIcon size={40} />
              </div>
              <h4 className="font-bold text-text-dark">No classes scheduled</h4>
              <p className="text-sm text-gray-500 font-medium">Enjoy your day off!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Action FAB (Optional, but looks nice in apps) */}
      <div className="md:hidden">
        <button className="absolute bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center active:scale-95 transition-transform z-40">
          <CalendarIcon size={24} />
        </button>
      </div>
    </div>
  );
}
