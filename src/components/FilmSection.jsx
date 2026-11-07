import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from './Icons';

export default function FilmSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="film" className="py-24 sm:py-32 bg-[#060709] border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
        
        {/* Header Minimal Copy */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
            BRAND FILM
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[1.05]">
            SMALL STRIP. BIG ENERGY.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Everyday alertness engineered for the modern routine.
          </p>
        </div>

        {/* Full-Width Video Player */}
        <div className="relative rounded-3xl overflow-hidden bg-black border border-white/[0.08] shadow-2xl aspect-video max-w-5xl mx-auto group">
          <video
            ref={videoRef}
            src="/brand/kaffs-hero-video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Minimal Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
            
            <div className="flex items-center gap-3 pointer-events-auto">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="px-4 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                <span className="hidden sm:inline">{isMuted ? 'UNMUTE SOUND' : 'SOUND ON'}</span>
              </button>
            </div>

            <div className="text-xs font-sans tracking-wider text-slate-400 uppercase hidden sm:block bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              KAFF'S 4K Brand Film
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
