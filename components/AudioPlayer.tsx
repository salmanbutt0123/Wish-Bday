import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  // Using a placeholder royalty-free track. In production, replace with the specific file.
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_4f09230571.mp3?filename=happy-birthday-jazz-123469.mp3"; 

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed (interaction required):", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
       <audio ref={audioRef} loop preload="auto">
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      {isPlaying && (
        <div className="flex items-end gap-[2px] h-6 mx-2 opacity-80">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-gradient-to-t from-soft-pink to-gold-accent rounded-t-sm animate-pulse"
              style={{
                height: `${Math.max(30, Math.random() * 100)}%`,
                animationDuration: `${0.4 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20 transition-all"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        <Music size={20} className={isPlaying ? "text-gold-accent animate-pulse" : "text-white"} />
      </button>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20 transition-all"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};