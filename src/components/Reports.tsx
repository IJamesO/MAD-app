import React from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const DATA = [
  { name: 'Week 1', students: 400, grades: 85 },
  { name: 'Week 2', students: 420, grades: 82 },
  { name: 'Week 3', students: 450, grades: 88 },
  { name: 'Week 4', students: 480, grades: 90 },
  { name: 'Week 5', students: 510, grades: 86 },
  { name: 'Week 6', students: 540, grades: 92 },
];

export default function Reports() {
  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
       <header>
          <h1 className="text-3xl font-extrabold text-text-dark tracking-tight">Academic Reporting</h1>
          <p className="text-gray-500 font-medium">Analyze student performance and course engagement metrics.</p>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard icon={<Users />} label="Student Retention" value="94.2%" trend="+2.1%" />
          <MetricCard icon={<TrendingUp />} label="Avg. Grade Progress" value="86.5%" trend="+4.5%" />
          <MetricCard icon={<BookOpen />} label="Course Completion" value="78.0%" trend="-1.2%" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold">Student Enrollment Growth</h3>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Last 6 Weeks</span>
             </div>
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94A3B8'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94A3B8'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="students" fill="#0F6A6A" radius={[4, 4, 0, 0]} barSize={40} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold">Average Grade Performance</h3>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Weekly Trends</span>
             </div>
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94A3B8'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94A3B8'}} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="grades" stroke="#0F6A6A" strokeWidth={4} dot={{ r: 6, fill: '#0F6A6A', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
       </div>

       <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
             <AlertCircle size={20} />
          </div>
          <div>
             <h4 className="font-bold text-orange-900 text-sm">Low Engagement Warning</h4>
             <p className="text-xs text-orange-800 font-medium mt-1">Modules 'Cloud Architecture' and 'Database Systems' show a 15% decrease in attendance compared to last week. Recommended action: Review course difficulty or check for scheduling conflicts.</p>
          </div>
       </div>
    </div>
  );
}

function MetricCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
   const isUp = trend.startsWith('+');
   return (
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm group">
         <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
               {icon}
            </div>
            <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
               {trend}
            </div>
         </div>
         <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</div>
         <div className="text-3xl font-black text-text-dark tracking-tight">{value}</div>
      </div>
   );
}
