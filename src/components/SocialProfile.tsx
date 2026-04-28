import React from 'react';
import { 
  Users, 
  UserPlus, 
  Grid, 
  MapPin, 
  Link as LinkIcon, 
  Linkedin, 
  MessageSquare, 
  MoreHorizontal,
  Share2,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';

export default function SocialProfile() {
  const { user } = useAuth();

  const stats = [
    { label: 'Posts', value: '124' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '840' },
  ];

  return (
    <div className="pb-20">
      {/* Cover Image Placeholder */}
      <div className="h-48 md:h-64 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-b-[3rem] -mt-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0F6A6A_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Profile Header */}
      <div className="px-6 md:px-12 -mt-16 md:-mt-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-[2.5rem] shadow-2xl"
            >
              <div className="w-full h-full bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary text-4xl font-black border-4 border-white">
                {user?.name.charAt(0)}
              </div>
            </motion.div>
            
            <div>
              <h1 className="text-3xl font-black text-text-dark tracking-tight">{user?.name}</h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1 flex items-center gap-2">
                Student ID: {user?.id} • {user?.course || 'Undergraduate'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex-1 md:flex-none bg-primary text-white font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
              <UserPlus size={18} /> Follow
            </button>
            <button className="p-3.5 bg-white border border-border text-gray-500 rounded-2xl hover:bg-bg transition-all active:scale-95 shadow-sm">
              <Share2 size={18} />
            </button>
            <button className="p-3.5 bg-white border border-border text-gray-500 rounded-2xl hover:bg-bg transition-all active:scale-95 shadow-sm">
               <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Stats & Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-1 space-y-8">
            {/* Stats Card */}
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex items-center justify-around">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-black text-text-dark">{stat.value}</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Card */}
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Biography</h3>
              <p className="text-gray-600 font-medium leading-relaxed text-sm">
                Passionate software engineering student at Salford. Focused on building user-centric academic tools and exploring distributive systems. 💻✨
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-gray-500">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-xs font-bold">Manchester, UK</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-xs font-bold">Joined Salford Oct 2023</span>
                </div>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary hover:underline transition-all"
                >
                  <Linkedin size={16} />
                  <span className="text-xs font-bold">linkedin.com/in/{user?.name.toLowerCase().replace(' ', '-') || 'salford-student'}</span>
                </a>
              </div>
            </div>

            {/* Badges/Achievements */}
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge icon={<Award size={14} />} label="Top Contributor" />
                <Badge icon={<MessageSquare size={14} />} label="Peer Mentor" />
                <Badge icon={<BookOpen size={14} />} label="Dean's List" />
              </div>
            </div>
          </div>

          {/* Feed/Grid Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-border p-4 shadow-sm flex items-center gap-2">
              <button className="flex-1 py-3 bg-bg rounded-xl text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-2">
                <Grid size={16} /> Feed
              </button>
              <button className="flex-1 py-3 hover:bg-bg rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2 transition-colors">
                 Media
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((post) => (
                <motion.div 
                  key={post}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: post * 0.1 }}
                  className="aspect-square bg-gray-100 rounded-[2rem] border border-border overflow-hidden relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                    <MessageSquare className="text-primary" />
                  </div>
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                      <Grid size={24} className="opacity-20" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Saved Post #{post}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-2 bg-primary/5 text-primary px-3 py-1.5 rounded-xl border border-primary/10">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
    </div>
  );
}
