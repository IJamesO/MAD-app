import React, { useState } from 'react';
import { Map as MapIcon, Navigation, Search, MapPin, Info, ArrowLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Building {
  id: string;
  name: string;
  code: string;
  type: 'Academic' | 'Administrative' | 'Library' | 'Social' | 'Sports';
  description: string;
  image: string;
  coords: { x: number, y: number };
}

const BUILDINGS: Building[] = [
  {
    id: '1',
    name: 'Maxwell Building',
    code: 'MAX',
    type: 'Academic',
    description: 'Home to Science, Engineering and Environment labs and lecture halls.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=400',
    coords: { x: 30, y: 40 }
  },
  {
    id: '2',
    name: 'Clifford Whitworth Library',
    code: 'CWL',
    type: 'Library',
    description: 'The main university library open 24/7 during term time.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400',
    coords: { x: 60, y: 30 }
  },
  {
    id: '3',
    name: 'University House',
    code: 'UHS',
    type: 'Social',
    description: 'Student union, cafeteria, and social hub.',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&q=80&w=400',
    coords: { x: 50, y: 60 }
  },
  {
    id: '4',
    name: 'Sports Centre',
    code: 'SPT',
    type: 'Sports',
    description: 'Indoor courts, swimming pool and fitness suite.',
    coords: { x: 20, y: 80 },
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400'
  }
];

export default function CampusMap() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuildings = BUILDINGS.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-text-dark tracking-tight">Campus Navigator</h1>
            <p className="text-gray-500 font-medium">Find your way around Salford.</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <MapIcon size={24} />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search buildings or codes (e.g. MAX)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
          />
        </div>
      </header>

      {/* Visual Map Area */}
      <div className="relative aspect-square bg-[#E6F4F1] rounded-[2.5rem] border border-border overflow-hidden shadow-inner group">
        {/* Mock Map Background Grids/Shapes */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#005C5C_2px,transparent_2px)] [background-size:30px_30px]" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/40 rounded-full blur-3xl" />

        {/* Building Pins */}
        {BUILDINGS.map(building => (
          <button
            key={building.id}
            onClick={() => setSelectedBuilding(building)}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 z-10"
            style={{ left: `${building.coords.x}%`, top: `${building.coords.y}%` }}
          >
            <div className={`p-2 rounded-full shadow-lg border-2 border-white ${selectedBuilding?.id === building.id ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
              <MapPin size={20} />
            </div>
            <div className="mt-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-border shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-tight text-text-dark">{building.code}</span>
            </div>
          </button>
        ))}

        {/* Navigation Mode Overlay */}
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center p-8 z-20 pointer-events-none"
          >
            <div className="w-full h-[2px] bg-primary relative animate-pulse">
              <div className="absolute -left-1 -top-1 w-2 h-2 bg-primary rounded-full" />
              <div className="absolute -right-1 -top-1 w-2 h-2 bg-primary rounded-full shrink-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <Navigation size={14} className="text-primary animate-bounce" />
                <span className="text-[10px] font-black uppercase text-primary">Routing...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Building List / Detail Bottom Sheet */}
      <div className="flex-1 space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Nearby Buildings</h2>
        <div className="grid grid-cols-1 gap-4 pb-10">
          <AnimatePresence mode="wait">
            {selectedBuilding ? (
              <motion.div 
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2rem] border border-primary p-6 shadow-xl shadow-primary/5 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <button onClick={() => setSelectedBuilding(null)} className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
                    <ArrowLeft size={14} /> Back to List
                  </button>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">{selectedBuilding.type}</span>
                </div>

                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={selectedBuilding.image} alt={selectedBuilding.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-text-dark">{selectedBuilding.name}</h3>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{selectedBuilding.description}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => {
                      setIsNavigating(true);
                      setTimeout(() => setIsNavigating(false), 3000);
                    }}
                    disabled={isNavigating}
                    className="flex-1 bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-xs uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isNavigating ? 'Calculating Route...' : <><Send size={16} /> Get Directions</>}
                  </button>
                  <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:text-primary transition-colors">
                    <Info size={20} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {filteredBuildings.map(building => (
                  <button
                    key={building.id}
                    onClick={() => setSelectedBuilding(building)}
                    className="w-full bg-white border border-border p-4 rounded-2xl flex items-center gap-4 hover:border-primary transition-all active:scale-[0.98] group"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin size={22} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-text-dark text-sm">{building.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{building.code} • {building.type}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
