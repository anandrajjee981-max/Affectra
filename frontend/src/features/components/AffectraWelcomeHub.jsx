import React from 'react';
import { useNavigate, useLocation } from 'react-router';

const Navbar1 = ({ isCalibrated = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hardcoded central mapping for all app links
  const navModules = [
    { id: "biometrics", label: "BIOMETRIC_LINK", path: "/face", icon: "✦"},
    { id: "analytics", label: "LIVE_ANALYTICS", path: "/analytics", icon: "📊" },
    { id: "memes", label: "MEME_GENERATOR", path: "/memes", icon: "🎭" },
    { id: "personal", label: "MOOD_ADAPT_UI", path: "/mood-ui", icon: "🎨" },
    { id: "reactions", label: "AI_INTERACT", path: "/ai-interact", icon: "🧠" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full md:sticky md:top-0 md:h-screen md:w-16 hover:md:w-64 bg-[#09090e]/95 md:bg-[#07070c]/50 border-t md:border-t-0 md:border-r border-zinc-900 z-50 flex flex-row md:flex-col justify-between p-2 md:p-4 transition-all duration-300 ease-in-out group backdrop-blur-md select-none font-mono">
      
      {/* Desktop Logo: Expands smoothly on sidebar hover state */}
      <div className="hidden md:flex flex-col gap-1 border-b border-zinc-900 pb-4 overflow-hidden w-full h-12">
        <div className="flex items-center gap-3 px-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
          <h1 className="text-sm font-black text-white tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-70 whitespace-nowrap">
            AFFECTRA_SYS
          </h1>
        </div>
      </div>

      {/* Dynamic Links Tracker Map */}
      <div className="flex flex-row md:flex-col justify-around md:justify-start gap-1 md:gap-2.5 w-full my-auto md:my-0 md:mt-6">
        {navModules.map((mod) => {
          // Exact route matching logic
          const isActiveRoute = location.pathname === mod.path;
          const isLocked = mod.locked && !isCalibrated;
          
          return (
            <div 
              key={mod.id}
              onClick={() => !isLocked && navigate(mod.path)}
              className={`flex items-center gap-3.5 p-3 md:p-3 border rounded-lg transition-all duration-200 relative overflow-hidden flex-1 md:flex-none justify-center md:justify-start ${
                isLocked 
                  ? 'opacity-25 border-transparent bg-transparent cursor-not-allowed' 
                  : isActiveRoute 
                    ? 'border-orange-500/40 bg-orange-500/5 text-white cursor-pointer' 
                    : 'border-transparent bg-transparent hover:bg-zinc-900/40 hover:border-zinc-900 cursor-pointer'
              }`}
            >
              {/* Left active marker strip for desktop layout */}
              {isActiveRoute && (
                <div className="hidden md:block absolute left-0 top-0 h-full w-[2px] bg-orange-500" />
              )}

              {/* Icon Element */}
              <span className={`text-xs font-bold flex-shrink-0 ${isActiveRoute ? 'text-orange-400' : 'text-zinc-400'}`}>
                {mod.icon}
              </span>
              
              {/* Text Reveal Logic (Desktop exclusive group hover wrapper) */}
              <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-70 whitespace-nowrap overflow-hidden">
                <span className="text-[11px] font-bold tracking-wider">{mod.label}</span>
                {isLocked && (
                  <span className="text-[7px] bg-zinc-900 text-zinc-500 px-1 rounded font-bold">LCK</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech System Signature Log (Desktop Only) */}
      <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[8px] text-zinc-600 border-t border-zinc-900 pt-3 whitespace-nowrap overflow-hidden">
        <div>NODE // Anand_Raj</div>
      </div>
      
    </nav>
  );
};

export default Navbar1;