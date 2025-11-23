import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStage } from './types';
import { AudioPlayer } from './components/AudioPlayer';
import { LifetimeCounter } from './components/LifetimeCounter';
import { Cake } from './components/Cake';
import { BirthdayCard } from './components/BirthdayCard';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOADING);
  const [isPlaying, setIsPlaying] = useState(false);

  // Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(AppStage.INTRO);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const startCelebration = () => {
    setIsPlaying(true);
    setStage(AppStage.REVEAL);
    triggerFireworks();
  };

  const handleCakeCut = () => {
    triggerConfetti();
    setTimeout(() => {
      setStage(AppStage.CARD);
    }, 2000);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF69B4', '#FFD700', '#ffffff']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FFD700', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const triggerFireworks = () => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const particleCount = 50;
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setTimeout(() => clearInterval(interval), 3000);
  };

  // Shared container styles
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c29] via-[#3a2e57] to-[#1a1c29] text-white overflow-hidden relative selection:bg-soft-pink selection:text-white">
      {/* Background Animated Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-soft-pink/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gold-accent/10 rounded-full blur-[80px] animate-pulse"></div>
      </div>

      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      <main className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-10">
        <AnimatePresence mode="wait">
          
          {/* Loading Stage */}
          {stage === AppStage.LOADING && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-4 border-white/20 border-t-soft-pink rounded-full animate-spin"></div>
              <p className="mt-4 font-serif text-xl tracking-widest text-white/80">Loading Surprise...</p>
            </motion.div>
          )}

          {/* Intro Stage */}
          {stage === AppStage.INTRO && (
            <motion.div
              key="intro"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center w-full max-w-4xl"
            >
              <h1 className="font-serif text-4xl md:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gold-accent via-white to-soft-pink drop-shadow-lg animate-glow">
                Special Birthday Wish
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/80 font-light mb-8">
                For the extraordinary <span className="font-script text-3xl md:text-4xl text-soft-pink ml-2">Hadia Raheel</span>
              </p>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
                <p className="text-sm uppercase tracking-widest mb-6 text-white/60">Time spent making the world brighter</p>
                <LifetimeCounter />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startCelebration}
                className="mt-12 px-8 py-4 bg-gradient-to-r from-soft-pink to-purple-600 rounded-full font-bold text-lg shadow-lg hover:shadow-soft-pink/50 transition-all border border-white/20"
              >
                Continue to Celebration →
              </motion.button>
            </motion.div>
          )}

          {/* Reveal Stage */}
          {stage === AppStage.REVEAL && (
            <motion.div
              key="reveal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <h2 className="font-script text-6xl md:text-8xl mb-8 text-gold-accent drop-shadow-lg">Happy Birthday!</h2>
              <p className="font-serif text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Hadia, today is all about celebrating the wonderful soul that you are. Let's make a wish!
              </p>
              
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setStage(AppStage.CAKE)}
                  className="px-8 py-3 bg-white text-deep-blue rounded-full font-bold shadow-xl hover:bg-gray-100 transition-colors"
                >
                  🎂 Cut the Cake
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Cake Stage */}
          {stage === AppStage.CAKE && (
            <motion.div
              key="cake"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center w-full"
            >
              <h2 className="font-serif text-3xl mb-8">Make a Wish & Cut the Cake! 🎂</h2>
              <Cake onCut={handleCakeCut} />
            </motion.div>
          )}

          {/* Card Stage */}
          {stage === AppStage.CARD && (
            <motion.div
              key="card"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center"
            >
              <BirthdayCard />
              
              <div className="mt-12 flex gap-4 justify-center">
                <button 
                  onClick={() => {
                    setStage(AppStage.INTRO);
                    setIsPlaying(false);
                  }}
                  className="px-6 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-colors text-sm"
                >
                  Back to Start
                </button>
                <button 
                  onClick={() => {
                     setStage(AppStage.REVEAL);
                     triggerFireworks();
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-soft-pink to-purple-600 rounded-full hover:opacity-90 transition-opacity text-sm font-semibold shadow-lg"
                >
                  Replay Celebration
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;