import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar1 from '../components/AffectraWelcomeHub';
import { BIG_MEME } from '../utils/meme';
import { useSong } from './hooks/usesong';

export default function Card({ isCalibrated = true, currentExpression }) {
  const location = useLocation();
  const { song, loading, handleGetSong, error } = useSong();
  const [activeTab, setActiveTab] = useState("MUSIC");

  // Biometric matrix configuration tracking
  const rawExpression = location.state?.currentExpression || currentExpression || "SYSTEM_READY";
  const currentMood = String(rawExpression).toUpperCase();

  const themeMap = {
    HAPPY: { accent: "#eab308", text: "text-yellow-400", border: "border-yellow-500/30", glow: "rgba(234, 179, 8, 0.15)" },
    SURPRISED: { accent: "#06b6d4", text: "text-cyan-400", border: "border-cyan-500/30", glow: "rgba(6, 182, 212, 0.18)" },
    ANGRY: { accent: "#ef4444", text: "text-red-400", border: "border-red-500/30", glow: "rgba(239, 68, 68, 0.18)" },
    SAD: { accent: "#3b82f6", text: "text-blue-400", border: "border-blue-500/30", glow: "rgba(59, 130, 246, 0.15)" },
    SLEEPY: { accent: "#a855f7", text: "text-purple-400", border: "border-purple-500/30", glow: "rgba(168, 85, 247, 0.15)" },
    POUT: { accent: "#ec4899", text: "text-pink-400", border: "border-pink-500/30", glow: "rgba(236, 72, 153, 0.15)" },
    SYSTEM_READY: { accent: "#f97316", text: "text-orange-400", border: "border-orange-500/30", glow: "rgba(249, 115, 22, 0.10)" }
  };

  const matchedThemeKey = Object.keys(themeMap).find(key => currentMood.includes(key)) || "SYSTEM_READY";
  const currentTheme = themeMap[matchedThemeKey];
  const currentExpressionMemes = BIG_MEME[matchedThemeKey] || [];

  // Central biometric synchronization event hook pipeline
  useEffect(() => {
    let active = true;

    const executeFetch = async () => {
      if (activeTab !== "MUSIC") return;

      let targetMood = "Happy"; 
      if (matchedThemeKey && matchedThemeKey !== "SYSTEM_READY") {
        const lower = matchedThemeKey.toLowerCase();
        targetMood = lower.charAt(0).toUpperCase() + lower.slice(1);
      }

      if (active && typeof handleGetSong === "function") {
        await handleGetSong(targetMood);
      }
    };

    executeFetch();

    return () => {
      active = false;
    };
  }, [matchedThemeKey, activeTab]); 

  // Database nested payload normalization mechanism 
  const parseTracks = () => {
    if (!song) return [];
    if (Array.isArray(song)) return song;
    if (song.songs && Array.isArray(song.songs)) return song.songs;
    if (song.data && Array.isArray(song.data)) return song.data;
    return [song];
  };

  const synchronizedTracks = parseTracks();

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 font-sans overflow-x-hidden flex flex-col md:flex-row pb-20 md:pb-0 select-none">
      
      {/* Global Navigation System */}
      <Navbar1 isCalibrated={isCalibrated} />

      {/* Main Core View Area */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 z-10 w-full relative">
        
        {/* Ambient Glow Aura Adaptive Layer */}
        <div 
          className="absolute w-[800px] h-[600px] rounded-full top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-1000 ease-in-out blur-[160px] mix-blend-screen opacity-50" 
          style={{
            background: `radial-gradient(circle, ${currentTheme.glow} 0%, transparent 80%)`
          }}
        />

        {/* Global Hub Grid Wrapper */}
        <div className="w-full max-w-[950px] z-10 flex flex-col gap-6 mt-4">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/80 pb-6 gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] opacity-50 uppercase font-mono">BIOMETRIC ENGINE DISPATCH</span>
              <h1 className="text-4xl font-black tracking-tight text-white mt-1 flex items-baseline gap-3">
                Affectra Studio <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 transition-all duration-500 ${currentTheme.text}`}>{matchedThemeKey}_v2.5</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-2">
                Current Sync: <span style={{ color: currentTheme.accent }} className="font-bold transition-all duration-500 uppercase font-mono tracking-wider">{matchedThemeKey} TARGET</span>
              </p>
            </div>

            {/* View Port Switcher Tabs (Spotify Styled Pill Switcher) */}
            <div className="flex p-1 bg-zinc-900/60 border border-zinc-800/50 rounded-full max-w-fit shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("MUSIC")}
                className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all duration-300 ${
                  activeTab === "MUSIC" ? "text-black shadow-md font-black" : "text-zinc-400 hover:text-zinc-200"
                }`}
                style={{
                  backgroundColor: activeTab === "MUSIC" ? currentTheme.accent : "transparent",
                  boxShadow: activeTab === "MUSIC" ? `0 4px 15px ${currentTheme.accent}40` : "none"
                }}
              >
                🎵 Audio Tracks
              </button>
              <button
                onClick={() => setActiveTab("MEMES")}
                className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all duration-300 ${
                  activeTab === "MEMES" ? "text-black shadow-md font-black" : "text-zinc-400 hover:text-zinc-200"
                }`}
                style={{
                  backgroundColor: activeTab === "MEMES" ? currentTheme.accent : "transparent",
                  boxShadow: activeTab === "MEMES" ? `0 4px 15px ${currentTheme.accent}40` : "none"
                }}
              >
                🔥 Meme Matrix
              </button>
            </div>
          </div>

          {/* Core Dynamic Content Hub */}
          <div className="w-full rounded-2xl bg-zinc-900/10 border border-zinc-900/40 backdrop-blur-2xl p-2 sm:p-5 relative min-h-[450px]">
            
            {/* Condition View Routing Render */}
            {activeTab === "MUSIC" ? (
              <div className="w-full flex flex-col animate-fadeIn">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-3">
                    <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${currentTheme.accent}30`, borderTopColor: currentTheme.accent }} />
                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold font-mono">Loading dynamic streams...</span>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-24 text-red-400 text-sm tracking-wide gap-2 font-mono">
                    <span>[-] ERROR: AUDIO_STREAM_DECRYPTION_FAILED</span>
                    <span className="text-xs text-zinc-500">{error}</span>
                  </div>
                ) : synchronizedTracks.length > 0 ? (
                  /* Spotify Row List Layout System */
                  <div className="flex flex-col w-full">
                    
                    {/* Header Columns for Premium Feel */}
                    <div className="hidden sm:flex items-center text-[10px] font-bold tracking-widest text-zinc-500 uppercase border-b border-zinc-800/40 px-4 py-2 mb-2 font-mono">
                      <span className="w-12 text-center">#</span>
                      <span className="flex-1">TITLE</span>
                      <span className="w-52 text-center">PLAYER CONTAINER</span>
                      <span className="w-24 text-right">ACTION</span>
                    </div>

                    {/* Spotify styled Rows */}
                    {synchronizedTracks.map((track, id) => (
                      <div 
                        key={track._id || id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-zinc-800/30 border border-transparent hover:border-zinc-800/30 transition-all duration-200 gap-4 group"
                      >
                        <div className="flex items-center flex-1 gap-4 min-w-0">
                          {/* Row Index Number */}
                          <div 
                            className="hidden sm:flex items-center justify-center w-8 text-sm font-bold font-mono transition-colors group-hover:text-white"
                            style={{ color: `${currentTheme.accent}cc` }}
                          >
                            {(id + 1).toString().padStart(2, '0')}
                          </div>

                          {/* Decorative Custom Node Art Box */}
                          <div 
                            className="flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-950 border transition-all duration-300 group-hover:scale-105 shrink-0 relative overflow-hidden shadow-lg"
                            style={{ borderColor: `${currentTheme.accent}40`, boxShadow: `inset 0 0 10px ${currentTheme.glow}` }}
                          >
                            <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">🎧</span>
                          </div>

                          {/* Text Data Block */}
                          <div className="flex flex-col min-w-0">
                            <h4 
                              className="text-sm font-semibold text-zinc-200 tracking-tight truncate pr-2 transition-colors group-hover:text-white"
                              title={track.song}
                            >
                              {track.song ? track.song.replace(/WhatsApp Audio \d{4}-\d{2}-\d{2} at /, 'Audio_Node_') : "Dynamic Ambient Track"}
                            </h4>
                            <span className="text-xs text-zinc-400 font-medium mt-0.5 flex items-center gap-2">
                              <span className="opacity-60">Affectra Core</span>
                              <span className="w-1 h-1 rounded-full bg-zinc-700" />
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-zinc-900 border rounded text-zinc-400" style={{ borderColor: `${currentTheme.accent}20` }}>
                                {track.emotion || matchedThemeKey}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Middle Stream Player Segment */}
                        {track.songUrl && (
                          <div className="w-full sm:w-52 shrink-0 bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 p-1.5 rounded-full flex items-center transition-all duration-300 shadow-inner group-hover:border-zinc-700">
                            <audio 
                              src={track.songUrl} 
                              controls 
                              preload="metadata"
                              className="w-full h-6 filter invert brightness-110 tracking-tighter"
                            />
                          </div>
                        )}

                        {/* Right Action Trigger */}
                        {track.songUrl && (
                          <div className="flex justify-end items-center sm:w-24 shrink-0">
                            <a 
                              href={track.songUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs font-bold px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800/80 text-zinc-300 hover:text-white transition-all duration-200 tracking-wide shadow-md"
                              style={{ '--hover-border': currentTheme.accent }}
                              onMouseEnter={(e) => e.target.style.borderColor = currentTheme.accent}
                              onMouseLeave={(e) => e.target.style.borderColor = '#27272a'}
                            >
                              Stream ↗
                            </a>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-zinc-500 text-sm tracking-wide font-mono">
                    <span>[-] NO_AUDIO_FEED_INJECTED // AWAITING_BIOMETRICS</span>
                  </div>
                )}
              </div>
            ) : (
              /* Premium Theme Matched Meme Matrix Grid Layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1 animate-fadeIn">
                {currentExpressionMemes.length > 0 ? (
                  currentExpressionMemes.map((meme, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-zinc-950/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 flex flex-col backdrop-blur-md relative border hover:-translate-y-1.5"
                      style={{ 
                        borderColor: `${currentTheme.accent}20`,
                        boxShadow: `0 10px 30px rgba(0,0,0,0.5)`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${currentTheme.accent}60`;
                        e.currentTarget.style.boxShadow = `0 15px 35px ${currentTheme.accent}15`;
                      }}
                      onPostRender={(e) => e.currentTarget.style.borderColor = `${currentTheme.accent}20`}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${currentTheme.accent}20`;
                        e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5)`;
                      }}
                    >
                      {/* Top Action Index Specifier */}
                      <div className="px-4 py-2.5 bg-zinc-950/80 border-b border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                        <span className="font-bold">GRID_NODE // 0{idx + 1}</span>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.accent }} />
                      </div>

                      {/* Cover Photo Canvas Frame */}
                      <div className="w-full aspect-[4/3] bg-zinc-950 overflow-hidden relative border-b border-zinc-900/50">
                        <img 
                          src={meme.img} 
                          alt="Meme Element" 
                          className="w-full h-full object-cover opacity-80 filter contrast-115 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        {/* Smooth internal shadow layer */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Information / Quotes Section */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-zinc-900/10">
                        <p className="text-sm font-medium leading-relaxed text-zinc-300 transition-colors group-hover:text-white">
                          "{meme.text}"
                        </p>
                        
                        {/* Dynamic Active Action Row */}
                        <div className="mt-5 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-xs font-bold">
                          <span className="uppercase font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 tracking-wider text-zinc-400" style={{ color: currentTheme.accent, borderColor: `${currentTheme.accent}20` }}>
                            {matchedThemeKey}
                          </span>
                          <button 
                            className="transition-all duration-300 flex items-center gap-1 opacity-80 hover:opacity-100 font-bold tracking-wide"
                            style={{ color: currentTheme.accent }}
                          >
                            Share Deck &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-500 text-xs tracking-wide font-mono">
                    <span>[-] CAMERA_FEED_UNAVAILABLE // WAITING_FOR_BIOMETRIC_DATA</span>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}