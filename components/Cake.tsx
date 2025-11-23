import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CakeProps {
  onCut: () => void;
}

export const Cake: React.FC<CakeProps> = ({ onCut }) => {
  const [isCut, setIsCut] = useState(false);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);
    onCut();
  };

  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto cursor-pointer group" onClick={handleCut}>
      {/* Candles */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 flex gap-4 z-20 transition-opacity duration-500 ${isCut ? 'opacity-0' : 'opacity-100'}`}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative">
            <div className="w-3 h-12 bg-gradient-to-b from-yellow-100 to-yellow-600 rounded-sm shadow-md" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse shadow-[0_0_20px_rgba(255,165,0,0.6)]" />
          </div>
        ))}
      </div>

      {/* Cake Container */}
      <div className="relative w-full h-full pt-12">
        {/* Main Body (Bottom Layer) */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-r from-amber-700 to-amber-600 rounded-xl shadow-2xl overflow-hidden border-b-4 border-amber-800">
           <div className="absolute top-0 left-0 w-full h-4 bg-white/30 skew-y-1 blur-sm"></div>
        </div>

        {/* Middle Layer */}
        <div className="absolute bottom-20 left-[5%] w-[90%] h-28 bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl shadow-xl overflow-hidden border-b-4 border-pink-600">
           <div className="absolute top-0 left-0 w-full h-4 bg-white/20 skew-y-1"></div>
        </div>

        {/* Top Layer (The one that gets cut) */}
        <div className="absolute bottom-40 left-[10%] w-[80%] h-24 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-xl shadow-lg relative">
          {/* Frosting drips */}
          <div className="absolute -top-2 left-0 w-full h-6 bg-white rounded-full flex gap-2">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="flex-1 bg-white rounded-b-full h-4 shadow-sm" style={{ height: `${Math.random() * 12 + 6}px` }}></div>
             ))}
          </div>

          {/* The Slice that flies away */}
          {isCut && (
             <motion.div 
               initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
               animate={{ x: 100, y: -100, opacity: 0, rotate: 45 }}
               transition={{ duration: 1 }}
               className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-yellow-200 to-amber-200 rounded-tr-xl border-l border-white/50 z-10 origin-bottom-left"
             />
          )}
        </div>

        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-8 bg-white/10 rounded-[100%] blur-sm -z-10"></div>
      </div>
      
      {!isCut && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90 text-sm font-semibold tracking-wider animate-pulse pointer-events-none bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          Click to Cut
        </div>
      )}
    </div>
  );
};