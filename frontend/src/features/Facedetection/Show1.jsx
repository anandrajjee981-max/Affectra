import React, { useState, useEffect } from 'react';
import Navbar1 from '../components/AffectraWelcomeHub';
import Facedetection from './Facedetection';
import Music from './Card';
import { useNavigate } from 'react-router';

const Show1 = () => {
  // Global synchronization states
  const navigate = useNavigate()
  const [currentMood, setCurrentMood] = useState("SYSTEM_READY");
  const [isCalibrated, setIsCalibrated] = useState(false);
  
  // Custom states to eliminate white page flash
  const [isModelReady, setIsModelReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulated high-end boot matrix loader sequence for asset streams
  useEffect(() => {
    if (!isModelReady) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 4; // Control speed of UI load fake tracker before engine hits
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isModelReady]);

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 font-mono overflow-x-hidden flex flex-col md:flex-row select-none">
      
      {/* Global Background Tech Mesh Structure Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f14_1px,transparent_1px),linear-gradient(to_bottom,#0f0f14_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      {/* Cyber Preloader Overlay Screen: Fixes the white screen freeze completely */}
      {(!isModelReady || loadingProgress < 100) && (
        <div className="fixed inset-0 bg-[#050507] z-50 flex flex-col items-center justify-center p-6 transition-all duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b0b0f_1px,transparent_1px),linear-gradient(to_bottom,#0b0b0f_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />
          
          <div onClick={()=>{navigate('/face')}} className="w-full max-w-[340px] flex flex-col gap-3 z-10 cursor-pointer">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-black tracking-widest text-orange-500 animate-pulse">// Let's_Go</h3>
                <p className="text-[9px] text-zinc-500 mt-0.5 tracking-wider font-semibold">LOADING CORE FACELANDMARK VISUAL TASKS</p>
              </div>
              <span className="text-xs font-black tracking-widest text-zinc-400">{loadingProgress}%</span>
            </div>

            {/* Custom Premium Loading bar bar setup */}
            <div className="w-full h-[3px] bg-zinc-950 border border-zinc-900 rounded-full p-[1px] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-200 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-[8px] text-zinc-600 font-medium">
              <span>WASM_ENGINE // STREAMING</span>
              <span>SYS_STATUS_WAIT</span>
            </div>
          </div>
        </div>
      )}

      {/* 1. Global Navigation Frame Sidebar (Loads exactly once) */}
      <Navbar1 isCalibrated={isCalibrated} />

      {/* 2. Unified Grid Core Panel (Elements will scroll nicely vertically on Desktop) */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 z-10 w-full relative h-screen overflow-y-auto gap-8 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
        
        {/* TOP BLOCK: AI Face Engine Visualizer */}
        <Facedetection 
          setGlobalMood={setCurrentMood} 
          setIsCalibrated={setIsCalibrated}
          onModelLoaded={() => setIsModelReady(true)} // MediaPipe hook triggers this
        />
        
        {/* BOTTOM BLOCK: Media Stream Hub Matrix */}
        <Music 
          currentMood={currentMood} 
          isCalibrated={isCalibrated} 
        />
        
      </div>
    </div>
  );
};

export default Show1;