import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar1 from '../components/AffectraWelcomeHub';
import { BIG_MEME } from '../utils/meme';
import { useSong } from './hooks/usesong';

export default function Card({ isCalibrated = true, currentExpression }) {
  const location = useLocation();
  const { song, loading, handleGetSong, error } = useSong();
  const [activeTab, setActiveTab] = useState("MUSIC");

  // Biometric core matrix indexing 
  const rawExpression = location.state?.currentExpression || currentExpression || "SYSTEM_READY";
  const currentMood = String(rawExpression).toUpperCase();

  const themeMap = {
    HAPPY: { accent: "#eab308", text: "text-yellow-400", border: "border-yellow-500/40", glow: "rgba(234, 179, 8, 0.25)" },
    SURPRISED: { accent: "#06b6d4", text: "text-cyan-400", border: "border-cyan-500/40", glow: "rgba(6, 182, 212, 0.30)" },
    ANGRY: { accent: "#ef4444", text: "text-red-400", border: "border-red-500/40", glow: "rgba(239, 68, 68, 0.30)" },
    SAD: { accent: "#3b82f6", text: "text-blue-400", border: "border-blue-500/40", glow: "rgba(59, 130, 246, 0.25)" },
    SLEEPY: { accent: "#a855f7", text: "text-purple-400", border: "border-purple-500/40", glow: "rgba(168, 85, 247, 0.25)" },
    POUT: { accent: "#ec4899", text: "text-pink-400", border: "border-pink-500/40", glow: "rgba(236, 72, 153, 0.25)" },
    SYSTEM_READY: { accent: "#f97316", text: "text-orange-400", border: "border-orange-500/40", glow: "rgba(249, 115, 22, 0.20)" }
  };

  const matchedThemeKey = Object.keys(themeMap).find(key => currentMood.includes(key)) || "SYSTEM_READY";
  const currentTheme = themeMap[matchedThemeKey];
  const currentExpressionMemes = BIG_MEME[matchedThemeKey] || [];

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
    return () => { active = false; };
  }, [matchedThemeKey, activeTab]); 

  const parseTracks = () => {
    if (!song) return [];
    if (Array.isArray(song)) return song;
    if (song.songs && Array.isArray(song.songs)) return song.songs;
    if (song.data && Array.isArray(song.data)) return song.data;
    return [song];
  };

  const synchronizedTracks = parseTracks();

  return (
    <div className="relative min-h-screen bg-[#020204] text-zinc-100 font-mono overflow-x-hidden flex flex-col md:flex-row pb-20 md:pb-0 select-none">
      
      <Navbar1 isCalibrated={isCalibrated} currentExpression={matchedThemeKey} />

      {/* Main Terminal Viewport */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 z-10 w-full relative">
        
        {/* Dynamic Scanlines Grid System */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b0b11_1px,transparent_1px),linear-gradient(to_bottom,#0b0b11_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />
        
        {/* Heavy Atmospheric Overload Glow */}
        <div 
          className="absolute w-[750px] h-[750px] rounded-full top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 blur-[130px] mix-blend-screen opacity-60" 
          style={{ background: `radial-gradient(circle, ${currentTheme.glow} 0%, transparent 70%)` }}
        />

        {/* Core Deck Grid Frame */}
        <div className="w-full max-w-[980px] z-10 flex flex-col gap-6 mt-4">
          
          {/* Header Specs Control Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-zinc-900 pb-6 gap-4 relative">
            <div>
              <span className="text-[9px] font-bold tracking-[0.4em] text-zinc-600 block">// DECRYPTING_BIOMETRIC_DATA...</span>
              <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase mt-1 flex items-center gap-3">
                AFFECTRA STREAM <span className={`text-[10px] font-black px-2 py-0.5 rounded border transition-all duration-500`} style={{ color: currentTheme.accent, borderColor: currentTheme.accent }}>HUB_v2.5</span>
              </h1>
              <p className="text-[10px] text-zinc-500 tracking-widest mt-2 uppercase">
                TARGET_NODE: <span style={{ color: currentTheme.accent, textShadow: `0 0 10px ${currentTheme.accent}` }} className="font-black transition-all duration-500">{matchedThemeKey}</span>
              </p>
            </div>

            {/* Cyber Tab Controller */}
            <div className="flex p-1 bg-zinc-950 border border-zinc-900 rounded-none shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("MUSIC")}
                className={`px-5 py-2 text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  activeTab === "MUSIC" ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={{ backgroundColor: activeTab === "MUSIC" ? currentTheme.accent : "transparent" }}
              >
                [ AUDIO_FEED ]
              </button>
              <button
                onClick={() => setActiveTab("MEMES")}
                className={`px-5 py-2 text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  activeTab === "MEMES" ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={{ backgroundColor: activeTab === "MEMES" ? currentTheme.accent : "transparent" }}
              >
                [ MEME_MATRIX ]
              </button>
            </div>
          </div>

          {/* Core Cyber Maindeck Board */}
          <div className="w-full bg-zinc-950/40 border border-zinc-900 backdrop-blur-2xl p-4 sm:p-6 relative min-h-[460px] shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
            
            {/* Hardcoded Cyber Terminal Vectors */}
            <div className="absolute top-0 left-0 w-4 h-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute top-0 left-0 h-4 w-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute top-0 right-0 w-4 h-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute top-0 right-0 h-4 w-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute bottom-0 left-0 w-4 h-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute bottom-0 left-0 h-4 w-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute bottom-0 right-0 w-4 h-[2px]" style={{ backgroundColor: currentTheme.accent }} />
            <div className="absolute bottom-0 right-0 h-4 w-[2px]" style={{ backgroundColor: currentTheme.accent }} />

            {activeTab === "MUSIC" ? (
              /* Premium Hacker Spotify Row Playlist Engine */
              <div className="w-full flex flex-col">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-3">
                    <div className="w-7 h-7 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${currentTheme.accent}30`, borderTopColor: currentTheme.accent }} />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-bold animate-pulse">CONNECTING_AUDIO_PIPELINES...</span>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-24 text-red-500 text-xs tracking-widest gap-2">
                    <span>[-] DECRYPTION_CRITICAL_FAILURE</span>
                    <span className="text-[9px] text-zinc-700">{error}</span>
                  </div>
                ) : synchronizedTracks.length > 0 ? (
                  <div className="flex flex-col w-full">
                    
                    {/* Head Row Fields */}
                    <div className="hidden sm:flex items-center text-[9px] font-black tracking-[0.2em] text-zinc-600 uppercase border-b border-zinc-900/60 px-4 py-2.5 mb-3">
                      <span className="w-12 text-center">IDX</span>
                      <span className="flex-1">STREAMS_IDENTIFIER</span>
                      <span className="w-64 text-center">HARDWARE_DECK_CONTROLLER</span>
                      <span className="w-24 text-right">RAW_NODE</span>
                    </div>

                    {/* Spotify Styled Cyber Row Loops */}
                    {synchronizedTracks.map((track, id) => (
                      <div 
                        key={track._id || id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border-b border-zinc-900/40 hover:bg-zinc-900/30 transition-all duration-150 gap-4 group relative"
                        style={{ '--hover-accent': currentTheme.accent }}
                      >
                        {/* Interactive dynamic hover border light marker */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-current transition-colors" style={{ color: currentTheme.accent }} />

                        <div className="flex items-center flex-1 gap-4 min-w-0">
                          {/* Index Index */}
                          <div className="hidden sm:flex items-center justify-center w-8 text-xs font-bold text-zinc-600 group-hover:text-zinc-200">
                            {(id + 1).toString().padStart(2, '0')}
                          </div>

                          {/* Icon Grid node cover */}
                          <div 
                            className="flex items-center justify-center w-10 h-10 bg-black border rounded-none transition-all duration-300 shrink-0 shadow-lg"
                            style={{ borderColor: `${currentTheme.accent}30` }}
                          >
                            <span className="text-xs filter saturate-200 group-hover:scale-110 transition-transform">⚡</span>
                          </div>

                          {/* Song Identifiers */}
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-xs font-black text-zinc-300 tracking-wider truncate group-hover:text-white" title={track.song}>
                              {track.song ? track.song.replace(/WhatsApp Audio \d{4}-\d{2}-\d{2} at /, 'STREAM_NODE_') : "DYNAMIC_NODE_SEGMENT"}
                            </h4>
                            <span className="text-[9px] font-bold text-zinc-600 mt-1 uppercase tracking-widest flex items-center gap-2">
                              <span>SOURCE: CDN_FEED</span>
                              <span className="w-1 h-1 bg-zinc-800" />
                              <span style={{ color: currentTheme.accent }} className="font-black tracking-normal opacity-80">{track.emotion || matchedThemeKey}</span>
                            </span>
                          </div>
                        </div>

                        {/* Player Engine with Download Disabled */}
                        {track.songUrl && (
                          <div className="w-full sm:w-64 shrink-0 bg-black border border-zinc-900 p-1 flex items-center shadow-inner group-hover:border-zinc-800">
                            <audio 
                              src={track.songUrl} 
                              controls 
                              controlsList="nodownload"
                              preload="none"
                              className="w-full h-6 filter invert brightness-90 tracking-tighter"
                            />
                          </div>
                        )}

                        {/* Direct Gateway */}
                        {track.songUrl && (
                          <div className="flex justify-end items-center sm:w-24 shrink-0">
                            <a 
                              href={track.songUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border transition-all duration-200 text-zinc-400 hover:text-white"
                              style={{ borderColor: '#27272a' }}
                              onMouseEnter={(e) => { e.target.style.borderColor = currentTheme.accent; e.target.style.boxShadow = `0 0 10px ${currentTheme.accent}40`; }}
                              onMouseLeave={(e) => { e.target.style.borderColor = '#27272a'; e.target.style.boxShadow = 'none'; }}
                            >
                              LAUNCH //
                            </a>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-zinc-700 text-xs tracking-widest">
                    <span>[-] NO_AUDIO_DATA_INDEXED</span>
                  </div>
                )}
              </div>
            ) : (
              /* Raw Heavy Cyber-Glow Meme Matrix Framework */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {currentExpressionMemes.length > 0 ? (
                  currentExpressionMemes.map((meme, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-black rounded-none overflow-hidden transition-all duration-300 flex flex-col relative border"
                      style={{ borderColor: `${currentTheme.accent}20` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = currentTheme.accent;
                        e.currentTarget.style.boxShadow = `0 0 25px ${currentTheme.accent}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${currentTheme.accent}20`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Technical Meta Line Header */}
                      <div className="px-3 py-1.5 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between text-[9px] text-zinc-600 font-mono tracking-widest">
                        <span className="font-black">MATRIX_ROW_0{idx + 1}</span>
                        <div className="w-1.5 h-1.5 animate-ping rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                      </div>

                      {/* Display Screen Visuals */}
                      <div className="w-full aspect-[4/3] bg-zinc-950 overflow-hidden relative border-b border-zinc-900">
                        <img 
                          src={meme.img} 
                          alt="Meme Decrypted Output" 
                          className="w-full h-full object-cover opacity-50 filter grayscale group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-102 transition-all duration-500 ease-out"
                        />
                        {/* Horizontal scan line visual layer overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
                      </div>

                      {/* Decryption Message Textbox Container */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-zinc-950/40">
                        <p className="text-xs font-bold leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          "{meme.text}"
                        </p>
                        
                        {/* Dynamic Active Action System Line */}
                        <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-between text-[9px] font-black tracking-widest">
                          <span className="uppercase px-1.5 py-0.5 border text-zinc-400" style={{ borderColor: `${currentTheme.accent}30`, color: currentTheme.accent }}>
                            NODE_{matchedThemeKey}
                          </span>
                          <button 
                            className="transition-all duration-300 flex items-center gap-1 font-black uppercase text-zinc-500 group-hover:text-white"
                            style={{ '--hover-color': currentTheme.accent }}
                            onMouseEnter={(e) => e.target.style.color = currentTheme.accent}
                            onMouseLeave={(e) => e.target.style.color = '#71717a'}
                          >
                            XFER_DECK &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-700 text-xs tracking-widest">
                    <span>[-] HARDWARE_FEED_MISSING // INDEX_EMPTY</span>
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