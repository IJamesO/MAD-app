import React from 'react';
import { Tag, ExternalLink, Clock, MapPin, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface Deal {
  id: string;
  title: string;
  business: string;
  discount: string;
  category: 'Food' | 'Tech' | 'Fashion' | 'Entertainment' | 'Other';
  expiry: string;
  image: string;
  location: string;
}

const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: '50% Off Your First Order',
    business: 'Campus Coffee Co.',
    discount: '50% OFF',
    category: 'Food',
    expiry: 'Ends in 2 days',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
    location: 'Student Union'
  },
  {
    id: '2',
    title: 'Student Discount on Mac & iPad',
    business: 'Apple Store',
    discount: '10% OFF',
    category: 'Tech',
    expiry: 'Limited Time',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    location: 'Online'
  },
  {
    id: '3',
    title: 'BOGO Movie Tickets',
    business: 'Vue Cinemas',
    discount: 'BOGO',
    category: 'Entertainment',
    expiry: 'Tuesdays Only',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    location: 'Salford Quays'
  },
  {
    id: '4',
    title: '25% Off Sustainable Fashion',
    business: 'EcoWear',
    discount: '25% OFF',
    category: 'Fashion',
    expiry: 'Ends Sunday',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop',
    location: 'Manchester Arndale'
  }
];

export default function Deals() {
  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-black text-text-dark tracking-tight">Student Deals</h1>
          <p className="text-gray-500 font-medium">Exclusive discounts for Salford students.</p>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search deals..." 
              className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
          <button className="p-2.5 bg-white border border-border rounded-xl text-gray-500">
            <Filter size={20} />
          </button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {['All', 'Food', 'Tech', 'Fashion', 'Fun'].map((cat, i) => (
          <button 
            key={cat}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-primary text-white' : 'bg-white border border-border text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_DEALS.map((deal, idx) => (
          <motion.div 
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm group active:scale-[0.98] transition-transform"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={deal.image} alt={deal.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-widest shadow-lg">
                {deal.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-black shadow-xl shadow-primary/20">
                {deal.discount}
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-black text-text-dark leading-tight">{deal.title}</h3>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">{deal.business}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={12} className="text-primary" />
                    <span className="text-[10px] font-bold">{deal.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={12} className="text-red-400" />
                    <span className="text-[10px] font-bold">{deal.expiry}</span>
                  </div>
                </div>
                <button className="p-2.5 bg-gray-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
