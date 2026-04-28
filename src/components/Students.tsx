import React from 'react';
import { GraduationCap, Mail, User, BookOpen, Search, ArrowRight, Filter } from 'lucide-react';
import { MOCK_STUDENTS } from '../constants';
import { motion } from 'motion/react';

export default function Students() {
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
             <h1 className="text-3xl font-extrabold text-text-dark tracking-tight">Student Directory</h1>
             <p className="text-gray-500 font-medium">Manage student profiles and academic performance.</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 shrink-0">
             <Mail size={18} /> Broadcast Message
          </button>
       </header>

       <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
             <input 
               placeholder="Search by name, ID, or course..." 
               className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium"
             />
          </div>
          <button className="bg-white border border-border text-gray-500 font-bold px-6 py-4 rounded-2xl flex items-center gap-2 shadow-sm hover:bg-bg transition-all">
             <Filter size={18} /> Filters
          </button>
       </div>

       <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-bg border-b border-border">
                   <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                   <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Enrollment ID</th>
                   <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course / Major</th>
                   <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Performance</th>
                   <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                {MOCK_STUDENTS.map((student, idx) => (
                   <motion.tr 
                     key={student.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.05 }}
                     className="hover:bg-bg transition-colors group cursor-pointer"
                   >
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
                               {student.name.charAt(0)}
                            </div>
                            <span className="font-bold text-text-dark">{student.name}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-400 font-black tracking-widest">{student.id}</td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                            <BookOpen size={14} />
                            {student.course}
                         </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            student.performance === 'Excellent' ? 'bg-green-100 text-green-700' :
                            student.performance === 'Good' ? 'bg-blue-100 text-blue-700' :
                            student.performance === 'Average' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                         }`}>
                            {student.performance}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button className="text-primary hover:text-primary-dark font-black text-xs uppercase tracking-widest flex items-center gap-1 ml-auto group/btn">
                            View Profile <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                      </td>
                   </motion.tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}
