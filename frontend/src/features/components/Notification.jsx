import React from "react";

export default function Notification({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    // FIX: default coordinates are center-bottom with full-width injection padding, switches back to bottom-right grid on desktop viewports.
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-full sm:max-w-[340px] animate-[slideIn_0.4s_cubic-bezier(0.16,1,0.3,1)] font-mono">
      {/* Glow Backing Shadow */}
      <div className="absolute inset-0 bg-orange-500/5 rounded-xl blur-xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative bg-zinc-950/85 border border-orange-500/20 backdrop-blur-xl p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] select-none">
        
        {/* Top Header Grid with Close Cross */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
            <span className="text-[9px] text-zinc-400 font-bold tracking-[0.15em]">SYSTEM_TRIGGER // REDIRECT</span>
          </div>
          
          {/* Close Cross Button */}
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-orange-400 p-1.5 rounded-md transition-colors duration-200 active:scale-90 touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-3.5 sm:h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="mb-4">
          <h4 className="text-xs font-black tracking-wide text-zinc-200 uppercase">Scan Phase Terminated</h4>
          <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
            Biometric analysis locked. Matrix stream state is stable. Ready to synchronize audio engine layers.
          </p>
        </div>

        {/* Navigation Core Action Button */}
        <button
          onClick={onNavigate}
          className="w-full py-3 sm:py-2.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-black tracking-[0.2em] rounded-lg uppercase transition-all duration-300 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] shadow-[inset_0_0_10px_rgba(249,115,22,0.05)] active:scale-[0.98] touch-manipulation"
        >
          LET'S GO // INITIALIZE VIBE
        </button>
      </div>
    </div>
  );
}