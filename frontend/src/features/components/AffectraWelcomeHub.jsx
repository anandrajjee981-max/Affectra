import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useauth } from '../auth/hooks/useauth';

const Navbar1 = ({ isCalibrated = false, currentExpression }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handlelogout } = useauth();

  // Biometric core matrix indexing for dynamic global layout illumination
  const rawExpression = location.state?.currentExpression || currentExpression || "SYSTEM_READY";
  const currentMood = String(rawExpression).toUpperCase();

  const themeMap = {
    HAPPY: { accent: "#eab308", text: "text-yellow-400", bgGlow: "bg-yellow-500/10", border: "border-yellow-500/20" },
    SURPRISED: { accent: "#06b6d4", text: "text-cyan-400", bgGlow: "bg-cyan-500/10", border: "border-cyan-500/20" },
    ANGRY: { accent: "#ef4444", text: "text-red-400", bgGlow: "bg-red-500/10", border: "border-red-500/20" },
    SAD: { accent: "#3b82f6", text: "text-blue-400", bgGlow: "bg-blue-500/10", border: "border-blue-500/20" },
    SLEEPY: { accent: "#a855f7", text: "text-purple-400", bgGlow: "bg-purple-500/10", border: "border-purple-500/20" },
    POUT: { accent: "#ec4899", text: "text-pink-400", bgGlow: "bg-pink-500/10", border: "border-pink-500/20" },
    SYSTEM_READY: { accent: "#f97316", text: "text-orange-400", bgGlow: "bg-orange-500/10", border: "border-orange-500/20" }
  };

  const matchedThemeKey = Object.keys(themeMap).find(key => currentMood.includes(key)) || "SYSTEM_READY";
  const currentTheme = themeMap[matchedThemeKey];

  // Core navigation registry matrix
  const navModules = [
    { id: "biometrics", label: "BIOMETRIC_LINK", path: "/face", icon: "✦" },
    { id: "analytics", label: "LIVE_ANALYTICS", path: "/analytics", icon: "📊" },
    { id: "personal", label: "MOOD_ADAPT_UI", path: "/mood-ui", icon: "🎨" },
    { id: "reactions", label: "AI_INTERACT", path: "/ai-interact", icon: "🧠" },
  ];

  const triggerSystemPurge = async () => {
    if (typeof handlelogout === 'function') {
      await handlelogout();
    } else {
      console.warn("[-] AUTH_DESTRUCTION_VECTOR_MISSING");
      navigate('/login');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full md:sticky md:top-0 md:h-screen md:w-16 hover:md:w-64 bg-[#040407]/95 md:bg-[#040407]/40 border-t md:border-t-0 md:border-r border-zinc-900 z-50 flex flex-row md:flex-col justify-between p-2 md:p-4 transition-all duration-300 ease-in-out group backdrop-blur-xl select-none font-mono">
      
      {/* Top Cybernetic Node Indicator Header */}
      <div className="hidden md:flex flex-col gap-1 border-b border-zinc-900/60 pb-4 overflow-hidden w-full h-12">
        <div className="flex items-center gap-3 px-2">
          <span className="h-2 w-2 rounded-none animate-pulse flex-shrink-0" style={{ backgroundColor: currentTheme.accent }} />
          <h1 className="text-xs font-black text-zinc-100 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            AFFECTRA_SYS // <span style={{ color: currentTheme.accent }}>ON</span>
          </h1>
        </div>
      </div>

      {/* Primary Dynamic Navigation Bus Link Loop */}
      <div className="flex flex-row md:flex-col justify-around md:justify-start gap-1 md:gap-3 w-full my-auto md:my-0 md:mt-6">
        {navModules.map((mod) => {
          const isActiveRoute = location.pathname === mod.path;
          const isLocked = mod.locked && !isCalibrated;
          
          return (
            <div 
              key={mod.id}
              onClick={() => !isLocked && navigate(mod.path)}
              className={`flex items-center gap-4 p-2.5 border rounded-none transition-all duration-150 relative overflow-hidden flex-1 md:flex-none justify-center md:justify-start ${
                isLocked 
                  ? 'opacity-20 border-transparent bg-transparent cursor-not-allowed' 
                  : isActiveRoute 
                    ? 'text-white cursor-pointer' 
                    : 'border-transparent bg-transparent hover:bg-zinc-900/20 text-zinc-500 hover:text-zinc-300 cursor-pointer'
              }`}
              style={{
                borderColor: isActiveRoute ? `${currentTheme.accent}40` : 'transparent',
                backgroundColor: isActiveRoute ? `${currentTheme.accent}0a` : 'transparent'
              }}
            >
              {/* Hardwired Dynamic Border Left Tag */}
              {isActiveRoute && (
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: currentTheme.accent }} />
              )}

              {/* Icon Matrix */}
              <span 
                className="text-xs font-black flex-shrink-0 transition-colors"
                style={{ color: isActiveRoute ? currentTheme.accent : '#52525b' }}
              >
                {mod.icon}
              </span>
              
              {/* Expand Text Trigger Label */}
              <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden">
                <span className="text-[10px] font-black tracking-widest uppercase">{mod.label}</span>
                {isLocked && (
                  <span className="text-[6px] bg-zinc-900 text-zinc-600 px-1 border border-zinc-800 font-bold">LOCKED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cyberpunk Dynamic Purge Action Node Container (Logout) */}
      <div className="flex md:flex-col items-center justify-end w-auto md:w-full border-l md:border-l-0 md:border-t border-zinc-900/60 pl-2 md:pl-0 md:pt-4">
        <div 
          onClick={triggerSystemPurge}
          className="flex items-center gap-4 p-2.5 border border-transparent rounded-none transition-all duration-200 relative overflow-hidden w-full justify-center md:justify-start cursor-pointer group/logout text-red-500/60 hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/30"
          title="TERMINATE_SESSION"
        >
          {/* Internal danger tracking vector strip */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover/logout:bg-red-500 transition-colors" />

          {/* Core Destruction Icon */}
          <span className="text-xs font-black flex-shrink-0 animate-pulse group-hover/logout:animate-none">
            ✕
          </span>

          {/* Reveal Command Log string text */}
          <div className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden">
            <span className="text-[10px] font-black tracking-widest text-red-500/80 group-hover/logout:text-red-400 font-mono">
              [ TERMINATE_SYS ]
            </span>
          </div>
        </div>

        {/* System Node Core Signature Flag info line */}
        <div className="hidden md:block opacity-0 group-hover:opacity-40 transition-opacity duration-300 text-[7px] text-zinc-600 pt-3 w-full text-left font-mono tracking-tighter uppercase whitespace-nowrap overflow-hidden">
          SYS_NODE // ANAND_RAJ
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar1;