import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Maximize2, ShieldCheck, Zap } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted in dedicated theater

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

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="video-showcase" className="py-24 bg-[#020407] relative overflow-hidden border-t border-cyan-500/15">
      
      {/* Background Volumetric Light Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest glow-ice-sm">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            Official Commercial & Sound Experience
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            THE KAFF'S EXPERIENCE
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Turn up your audio and watch the official 3D reveal. Listen to how 40mg of sublingual caffeine in Cool Mint powers up your day in seconds.
          </p>
        </div>

        {/* Theater Player Container */}
        <div className="relative rounded-3xl p-3 sm:p-5 frost-card border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/30 glow-ice-lg group">
          
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            
            <video
              ref={videoRef}
              src="/brand/kaffs-hero-video.mp4"
              playsInline
              loop
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain bg-black"
            />

            {/* Play Overlay when Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center gap-4 cursor-pointer group/overlay transition-all"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center justify-center text-black shadow-2xl shadow-cyan-500/80 group-hover/overlay:scale-110 transition-transform glow-ice">
                  <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current ml-1" />
                </div>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-widest text-cyan-300 bg-black/70 px-4 py-1.5 rounded-full border border-cyan-400/40">
                    Click to Play Commercial with Sound
                  </span>
                </div>
              </div>
            )}

            {/* In-Video Bottom Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-white z-20">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-black transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors cursor-pointer flex items-center gap-2 text-xs font-mono font-bold"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  <span>{isMuted ? 'Muted' : 'Sound Active'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-cyan-400/90 hidden sm:inline">
                  Pack of 5 (₹229) • Pack of 10 (₹399)
                </span>
                
                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Theater Bottom Transcript Highlights */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left text-xs text-slate-300 font-mono">
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-0.5">⚡ 01. NARRATION</span>
              <span>"Experience instant energy with KAFF'S flavored caffeine strips."</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-0.5">🎯 02. FOCUS & MIND</span>
              <span>"Get sharper focus and a clearer mind with 40mg of caffeine."</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-0.5">🧊 03. POWER UP</span>
              <span>"Pack up on your tongue and power up your day."</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
