import React from 'react';
import Second from './Second';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

const Hero = () => {
  const navigate = useNavigate();
  const theme = {
    accent: "#ef4444", 
    text: "text-red-500",
    border: "border-red-600/80",
    bgGlow: "from-red-600 via-rose-700 to-transparent",
    button: "bg-red-600/10 border-red-500/80 text-red-400 shadow-[inset_0_0_15px_rgba(239,68,68,0.1),0_0_20px_rgba(239,68,68,0.15)] hover:bg-red-500 hover:text-black hover:shadow-[0_0_35px_rgba(239,68,68,0.4)]",
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#050507] text-zinc-200 font-mono overflow-hidden px-4 sm:px-6 transition-all duration-500">
        <Navbar/>
        {/* Cyber Grid & Backdrop Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
        <div className={`absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br ${theme.bgGlow} opacity-[0.04] blur-[120px] rounded-full top-1/4 left-1/4 pointer-events-none`} />

        {/* Framing Badges */}
        <div className="absolute top-4 left-4 text-[9px] text-zinc-700 select-none tracking-widest">AFFECTRA // AUDIO_v2.5</div>
        <div className="absolute bottom-4 right-4 text-[9px] text-zinc-700 select-none">LABS © 2026</div>

        {/* Main Framework Grid */}
        <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 sm:py-12">
          
          {/* LEFT COLUMN: Core Interface */}
          <div className="lg:col-span-7 flex gap-4 sm:gap-6 relative order-2 lg:order-1">
            
            {/* Metric Bar (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col items-center justify-between border-r border-zinc-800/80 pr-4 text-[9px] text-zinc-600 font-bold select-none">
              <span>[01]</span>
              <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
              <span className="rotate-90 origin-center my-8 text-red-500/60 tracking-widest uppercase">SONIC_SCAN</span>
              <div className="w-[1px] h-20 bg-gradient-to-b from-red-500/50 via-transparent to-transparent" />
              <span>[808]</span>
            </div>

            <div className="flex-1 flex flex-col gap-5 sm:gap-6">
              {/* Main Hook */}
              <div className="flex flex-col gap-2 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.3em] text-red-500/80">Neural Beat Sync // Live</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none uppercase">
                  YOUR MOOD.<br />
                  YOUR BEATS. <span className={`text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 font-extrabold`}>MUTATED.</span>
                </h1>
              </div>

              {/* CRISP & SHORT TERMINAL BOX */}
              <div className="w-full bg-[#0a0a0f] border border-zinc-900 rounded p-4 flex flex-col gap-3.5 shadow-[inset_0_1px_10px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-center text-[9px] text-zinc-500 font-bold tracking-wider">
                  <span>SYS_NODE: //FREQ_0X7F</span>
                  <span className="text-red-500/70 animate-pulse">● READY_TO_SCAN</span>
                </div>

                {/* Short & Crisp Script */}
                <div className="text-xs text-zinc-400 space-y-2.5 font-sans leading-normal">
                  <p className="font-medium tracking-wide text-zinc-300">
                    Sync your camera to morph frequencies in real-time. Turn your raw emotions into custom design, live BPM shifts, and adaptive AI beats.
                  </p>
                  <p className="font-mono text-[10px] sm:text-[11px] text-zinc-500 bg-zinc-950/80 p-2 rounded border border-zinc-900/60 leading-normal">
                    <span className="text-red-400">$ inject --live-feed</span><br />
                    &gt; Biometric matrix mapping... <span className="text-emerald-500">[OK]</span><br />
                    &gt; <span className="text-red-400/90 animate-pulse">Ready to override sound engine.</span>
                  </p>
                </div>

                {/* Micro Visualizer */}
                <div className="flex items-end gap-1 h-5 pt-2 border-t border-zinc-900">
                  <div className="text-[9px] text-zinc-600 font-bold tracking-wider mr-2">AUDIO_GRAPH:</div>
                  <div className="w-1.5 bg-red-500/40 h-[40%] animate-pulse" />
                  <div className="w-1.5 bg-red-500 h-[95%] animate-pulse delay-75" />
                  <div className="w-1.5 bg-zinc-800 h-[25%]" />
                  <div className="w-1.5 bg-red-400 h-[70%] animate-pulse delay-150" />
                  <div className="w-1.5 bg-red-500/80 h-[85%] animate-pulse delay-100" />
                  <div className="flex-1" />
                  <span className="text-[9px] text-zinc-500 font-mono">BIOMETRICS: <b className="text-red-400 animate-pulse">ONLINE</b></span>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button onClick={() => navigate('/login')} className={`w-full sm:w-auto py-3 px-8 rounded font-bold tracking-widest text-xs transition-all duration-300 uppercase border ${theme.button}`}>
                  [ Enter Core ]
                </button>
                
                <div className="flex flex-col text-[9px] sm:text-[10px] text-zinc-600 font-semibold tracking-tight">
                  <span>🔒 100% LOCAL // NO DATA SAVED</span>
                  <span className="text-zinc-500">ENGINE: 6 ACTIVE SONIC NODES</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Responsive Hologram Component */}
          <div className="lg:col-span-5 w-full flex justify-center items-center order-1 lg:order-2">
            <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] rounded border border-zinc-900 bg-[#08080c]/30 p-4 sm:p-6 flex items-center justify-center group shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              
              {/* Brackets */}
              <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${theme.border} -translate-x-[1px] -translate-y-[1px]`} />
              <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${theme.border} translate-x-[1px] -translate-y-[1px]`} />
              <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${theme.border} -translate-x-[1px] translate-y-[1px]`} />
              <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${theme.border} translate-x-[1px] translate-y-[1px]`} />

              {/* Scan Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent bg-[length:100%_12px] animate-[scan_2.5s_linear_infinite] z-10 pointer-events-none opacity-40" />
              <div className="absolute w-32 h-32 bg-red-600/10 blur-[50px] rounded-full group-hover:bg-red-600/20 transition-all duration-700" />

              {/* Graphic Asset */}
              <img 
                src= "https://i.pinimg.com/736x/db/8a/f8/db8af888d8c58fb25628319fe1cfd6ec.jpg"
                alt="Cyberpunk Audio Matrix Terminal Component"
                className="w-full h-full object-contain opacity-[0.85] transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 z-10 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.15)]" 
              />

              {/* Floating Footer Tag */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#0a0a0f] border border-zinc-900 px-2 py-1 rounded z-20 flex justify-between items-center text-[8px] sm:text-[9px] text-zinc-500 font-bold">
                <span className="tracking-widest">// TARGET_FEED</span>
                <span className="text-red-500 font-mono tracking-wider">SYNC_ACTIVE</span>
              </div>
            </div>
          </div>

        </div>
        
      </div>
     
    </>
  );
};

  export default Hero;