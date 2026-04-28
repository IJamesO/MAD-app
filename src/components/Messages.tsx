import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../constants';
import { Search, Send, Plus, MoreVertical, MessageCircle, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Messages() {
  const [selectedId, setSelectedId] = useState(MOCK_MESSAGES[0].id);
  
  const selectedChat = MOCK_MESSAGES.find(m => m.id === selectedId);

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto pb-6">
       <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-text-dark tracking-tight">Universal Mailbox</h1>
          <p className="text-gray-500 font-medium">Coordinate with staff and chat with colleagues.</p>
       </header>

       <div className="flex-1 min-h-0 bg-white rounded-3xl border border-border shadow-sm flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r border-border flex flex-col shrink-0">
             <div className="p-5 border-b border-border">
                <div className="relative group">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" />
                   <input 
                     placeholder="Search chats..." 
                     className="w-full bg-bg border border-border rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                   />
                </div>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {MOCK_MESSAGES.map(chat => (
                   <button 
                     key={chat.id}
                     onClick={() => setSelectedId(chat.id)}
                     className={`w-full text-left p-4 rounded-2xl transition-all flex gap-3 group ${selectedId === chat.id ? 'bg-primary/5 group' : 'hover:bg-bg'}`}
                   >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-border transition-colors ${selectedId === chat.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-400 group-hover:bg-primary group-hover:text-white'}`}>
                         <User size={20} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <div className="flex justify-between items-center mb-0.5">
                            <span className={`font-bold text-sm truncate ${selectedId === chat.id ? 'text-primary' : 'text-text-dark'}`}>{chat.sender}</span>
                            <span className="text-[10px] font-bold text-gray-400">{chat.timestamp}</span>
                         </div>
                         <p className="text-xs text-gray-500 truncate font-medium">{chat.content}</p>
                      </div>
                   </button>
                ))}
             </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col relative bg-bg/20">
             <div className="p-5 bg-white border-b border-border flex justify-between items-center z-10 shadow-sm shadow-black/[0.02]">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
                      {selectedChat?.sender.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm text-text-dark">{selectedChat?.sender}</h4>
                      <div className="flex items-center gap-1.5">
                         <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Now</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-2.5 text-gray-400 hover:text-primary transition-colors bg-white rounded-xl border border-border shadow-sm">
                      <MessageCircle size={18} />
                   </button>
                   <button className="p-2.5 text-gray-400 hover:text-primary transition-colors bg-white rounded-xl border border-border shadow-sm">
                      <MoreVertical size={18} />
                   </button>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col custom-scrollbar">
                <div className="self-center bg-white border border-border rounded-full px-4 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   Today
                </div>
                
                <div className="max-w-[70%] bg-white border border-border p-4 rounded-2xl rounded-tl-none shadow-sm font-medium text-sm text-gray-600 leading-relaxed">
                   Hello! I just wanted to confirm if the materials for Module 4 have been uploaded yet? I can't seem to find them in the portal.
                   <div className="text-[9px] font-black text-gray-400 mt-2 text-right">09:12 AM</div>
                </div>

                <div className="max-w-[70%] self-end bg-primary text-white p-4 rounded-3xl rounded-br-none shadow-xl shadow-primary/20 font-medium text-sm leading-relaxed">
                   {selectedChat?.content}
                   <div className="text-[9px] font-black text-white/60 mt-2 text-right uppercase">Sent • {selectedChat?.timestamp}</div>
                </div>
                
                <div className="max-w-[70%] bg-white border border-border p-4 rounded-2xl rounded-tl-none shadow-sm font-medium text-sm text-gray-600 leading-relaxed">
                   Thank you so much! That really helps. I'll get started right away.
                   <div className="text-[9px] font-black text-gray-400 mt-2 text-right">09:45 AM</div>
                </div>
             </div>

             <div className="p-5 bg-white border-t border-border">
                <div className="flex items-center gap-3 bg-bg border border-border rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary transition-all group">
                   <button className="p-2 text-gray-400 hover:text-primary transition-all">
                      <Plus size={20} />
                   </button>
                   <input 
                     className="flex-1 bg-transparent px-2 text-sm font-medium outline-none placeholder:text-gray-400"
                     placeholder="Type your message here..."
                   />
                   <button className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      <Send size={18} strokeWidth={2.5} />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
