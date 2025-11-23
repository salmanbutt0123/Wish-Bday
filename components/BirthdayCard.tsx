import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const BirthdayCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const quotes = [
    "The best is yet to come! 🌟",
    "Age is merely the number of years the world has been enjoying you! 🎈",
    "Today you are you! That is truer than true! 🦋",
    "May your day be as special as you are! 🌸"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="relative w-[90vw] max-w-md h-[500px] perspective-1000 mx-auto cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-100 to-teal-100 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 border-[12px] border-white/50">
          <div className="absolute inset-4 border-2 border-dashed border-rose-300 rounded-lg"></div>
          <h2 className="font-script text-4xl sm:text-5xl text-rose-500 mb-4 text-center">For Hadia</h2>
          <span className="text-6xl animate-bounce mt-4">🎁</span>
          <p className="mt-8 text-gray-500 text-sm font-sans tracking-widest uppercase">Tap to open</p>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 text-center border-[12px] border-white/50"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <h3 className="font-serif text-2xl sm:text-3xl text-deep-blue font-bold mb-6 z-10">Happy Birthday! 🎉</h3>
          
          <div className="font-script text-xl sm:text-2xl text-gray-700 space-y-2 z-10 leading-relaxed">
            <p>Wishing you endless joy,</p>
            <p>beautiful moments, and</p>
            <p>dreams that come true.</p>
          </div>

          <div className="mt-8 p-4 bg-rose-50 rounded-lg border border-rose-100 z-10">
            <p className="font-sans text-xs sm:text-sm text-gray-600 italic">"{randomQuote}"</p>
          </div>

          <div className="mt-8 font-bold text-rose-500 font-script text-xl z-10">~ Raheel</div>
        </div>
      </motion.div>
    </div>
  );
};