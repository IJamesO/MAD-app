import React from 'react';
import { useAuth } from '../AuthContext';
import { User, Bell, Shield, Eye, Smartphone, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
       <header>
          <h1 className="text-3xl font-extrabold text-text-dark tracking-tight">Account Settings</h1>
          <p className="text-gray-500 font-medium">Manage your profile, security, and notification preferences.</p>
       </header>

       <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
             <div className="relative group">
                <img src={user?.avatar} className="w-24 h-24 rounded-3xl object-cover bg-bg border border-border p-1 group-hover:scale-105 transition-transform" alt="" />
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all">
                   <Smartphone size={16} />
                </button>
             </div>
             <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-text-dark mb-1">{user?.name}</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{user?.role} • ID: {user?.id}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                   <button className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-primary-dark transition-all">Update Photo</button>
                   <button className="bg-bg text-text-dark border border-border px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition-all">Edit Details</button>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <SettingsGroup 
               icon={<Bell className="text-blue-500" size={20} />} 
               title="Notifications" 
               description="Control how you receive updates."
               items={[
                  { label: "Email Alerts", checked: true },
                  { label: "Mobile Notifications", checked: true },
                  { label: "SMS Assignments Updates", checked: false },
               ]}
             />
             <SettingsGroup 
               icon={<Shield className="text-teal-500" size={20} />} 
               title="Privacy & Security" 
               description="Secure your account access."
               items={[
                  { label: "Two-Factor Auth", checked: false },
                  { label: "Show Online Status", checked: true },
                  { label: "Account Visibility", checked: true },
               ]}
             />
          </div>

          <div className="bg-white rounded-3xl border border-border overflow-hidden">
             <SettingsActionItem icon={<User size={18} />} title="Personal Information" />
             <SettingsActionItem icon={<Eye size={18} />} title="Accessibility Settings" />
             <SettingsActionItem icon={<Smartphone size={18} />} title="Linked Devices" />
             <button onClick={logout} className="w-full flex items-center justify-between p-6 hover:bg-red-50 text-red-500 transition-all group border-t border-border">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                      <LogOut size={18} />
                   </div>
                   <span className="font-bold text-sm">Sign Out from All Devices</span>
                </div>
             </button>
          </div>

          <div className="text-center pt-6">
             <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Socializzy Academic System</div>
             <div className="text-[10px] font-black text-gray-400">Socializzy by University of Salford • System V4.2</div>
          </div>
       </div>
    </div>
  );
}

function SettingsGroup({ icon, title, description, items }: { icon: React.ReactNode, title: string, description: string, items: {label: string, checked: boolean}[] }) {
   return (
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
         <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-bg flex items-center justify-center">{icon}</div>
            <h3 className="font-bold text-sm text-text-dark">{title}</h3>
         </div>
         <p className="text-xs font-medium text-gray-400 mb-6">{description}</p>
         <div className="space-y-4">
            {items.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600">{item.label}</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${item.checked ? 'bg-primary' : 'bg-gray-200'}`}>
                     <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${item.checked ? 'left-5.5' : 'left-0.5'}`} />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function SettingsActionItem({ icon, title }: { icon: React.ReactNode, title: string }) {
   return (
      <button className="w-full flex items-center justify-between p-6 hover:bg-bg transition-all group border-b border-border last:border-0">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg text-gray-400 group-hover:text-primary transition-colors flex items-center justify-center group-hover:bg-primary/5">
               {icon}
            </div>
            <span className="font-bold text-sm text-text-dark group-hover:text-primary transition-colors">{title}</span>
         </div>
         <ChevronRight className="text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1" size={18} />
      </button>
   );
}

import { ChevronRight } from 'lucide-react';
