import React, { useEffect, useState, useRef } from 'react';
import Navbar1 from '../components/AffectraWelcomeHub';
import { useemotion } from './hooks/useemotion';

// Matrix Hex-Color Mapping Node Framework
const EMOTION_COLORS = {
  HAPPY: "#eab308",
  SAD: "#3b82f6",
  ANGRY: "#ef4444",
  SURPRISED: "#06b6d4",
  POUT: "#a855f7",
  SLEEPY: "#6366f1",
  SYSTEM_READY: "#10b981",
  SYSTEM_IDLE: "#71717a"
};

const CHANNELS = ["HAPPY", "SAD", "ANGRY", "SURPRISED", "POUT", "SLEEPY"];

export default function Analysis() {
  const { fetchStoredEmotions, emotions } = useemotion();
  const [metrics, setMetrics] = useState({ channels: {}, total: 0, dominant: null });
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  // 1. BACKEND INITIALIZATION GATE
  useEffect(() => {
    if (!isFetched.current && typeof fetchStoredEmotions === 'function') {
      fetchStoredEmotions();
      isFetched.current = true;
    }
  }, [fetchStoredEmotions]);

  // 2. DATA PROCESSING & SMART INCLUSION MATRICES
  useEffect(() => {
    if (!Array.isArray(emotions)) return;

    if (emotions.length > 0) {
      // Clean counter blueprint
      const counts = { HAPPY: 0, SAD: 0, ANGRY: 0, SURPRISED: 0, POUT: 0, SLEEPY: 0 };
      let systemLogs = 0;

      emotions.forEach((item) => {
        // Safe sanitization parse string
        const rawExpr = item.emotion ? String(item.emotion).trim().toUpperCase() : 'SYSTEM_IDLE';
        
        // 🔥 SMART STRING DETECTION: Finds strings inside slashes or whitespace anomalies
        if (rawExpr.includes("ANGRY")) {
          counts.ANGRY++;
        } else if (rawExpr.includes("SURPRISE")) {
          counts.SURPRISED++;
        } else if (rawExpr.includes("HAPPY")) {
          counts.HAPPY++;
        } else if (rawExpr.includes("SAD")) {
          counts.SAD++;
        } else if (rawExpr.includes("POUT")) {
          counts.POUT++;
        } else if (rawExpr.includes("SLEEPY")) {
          counts.SLEEPY++;
        } else {
          systemLogs++; // Increments default systemic nodes
        }
      });

      const totalValid = Object.values(counts).reduce((a, b) => a + b, 0);
      
      // Compute Top Signal Priority Node
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const dominantChannel = totalValid > 0 && sorted[0][1] > 0 ? sorted[0][0] : "SYSTEM_IDLE";

      setMetrics({
        channels: counts,
        total: emotions.length,
        dominant: dominantChannel
      });
    }
    setLoading(false);
  }, [emotions]);

  return (
    <div className="relative min-h-screen bg-[#020204] text-zinc-100 font-mono flex flex-col md:flex-row pb-20 md:pb-0 select-none">
      
      {/* Universal Welcome Header Component */}
      <Navbar1 isCalibrated={true} currentExpression="SYSTEM_READY" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 z-10 w-full relative">
        
        {/* Cyber Grid Structural Texture Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b0b11_1px,transparent_1px),linear-gradient(to_bottom,#0b0b11_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

        <div className="w-full max-w-[980px] z-10 flex flex-col gap-6 mt-4">
          
          {/* Main Top Header Block Deck */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-6 relative">
            <div>
              <span className="text-[9px] font-bold tracking-[0.4em] text-zinc-600 block">// PARSING_DATA_STREAMS... ACTIVE_MESH</span>
              <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase mt-1">
                BIOMETRIC_RADIAL_MATRIX
              </h1>
            </div>
            
            {!loading && metrics.total > 0 && (
              <div className="bg-zinc-950 border border-zinc-900 p-2 text-right rounded">
                <span className="text-[9px] text-zinc-500 block tracking-widest">// DOMINANT_CORE</span>
                <span className="text-sm font-black tracking-widest uppercase transition-all duration-300" style={{ color: EMOTION_COLORS[metrics.dominant] }}>
                  {metrics.dominant}
                </span>
              </div>
            )}
          </div>

          {/* MAIN GRID CONNECTOR LAYER */}
          <div className="w-full bg-zinc-950/40 border border-zinc-900 backdrop-blur-2xl p-4 sm:p-6 relative min-h-[500px] flex flex-col justify-between shadow-2xl rounded-sm">
            
            {/* Cyber Corner Anchor Brackets */}
            {[
              "top-0 left-0 w-4 h-[2px]", "top-0 left-0 h-4 w-[2px]",
              "top-0 right-0 w-4 h-[2px]", "top-0 right-0 h-4 w-[2px]",
              "bottom-0 left-0 w-4 h-[2px]", "bottom-0 left-0 h-4 w-[2px]",
              "bottom-0 right-0 w-4 h-[2px]", "bottom-0 right-0 h-4 w-[2px]"
            ].map((cls, i) => (
              <div key={i} className={`absolute ${cls} bg-orange-500`} />
            ))}

            {/* Matrix Metadata Strings */}
            <div className="text-[9px] text-zinc-500 tracking-widest uppercase mb-4 flex justify-between items-center">
              <span>[+] TELEMETRY: QUANTUM_DISTRIBUTION_NODES</span>
              <span className="text-zinc-400 bg-black/60 px-2 py-1 border border-zinc-900 rounded">TOTAL_SAMPLES: {metrics.total}</span>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center py-28 text-xs text-zinc-500 tracking-widest animate-pulse">
                LOADING_NODE_CHANNELS...
              </div>
            ) : metrics.total > 0 ? (
              
              /* RE-ENGINEERED RADIAL DISTRIBUTION MODULES */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-auto p-1">
                {CHANNELS.map((channel) => {
                  const count = metrics.channels[channel] || 0;
                  const percentage = metrics.total > 0 ? Math.round((count / metrics.total) * 100) : 0;
                  const color = EMOTION_COLORS[channel];
                  const isDominant = metrics.dominant === channel;

                  // Circular Path Tracing Math Calculations
                  const radius = 40;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (percentage / 100) * circumference;

                  return (
                    <div 
                      key={channel}
                      className={`border p-4 bg-black/60 relative flex flex-col items-center justify-center transition-all duration-300 group ${
                        isDominant 
                          ? "border-zinc-800 shadow-[0_0_40px_rgba(255,255,255,0.02)]" 
                          : "border-zinc-900 hover:border-zinc-800"
                      }`}
                    >
                      {/* Critical Stream Priority Tag */}
                      {isDominant && (
                        <span className="absolute top-2 right-2 text-[6.5px] font-bold px-1.5 py-0.5 bg-black border border-zinc-800 text-orange-500 tracking-widest rounded-sm">
                          PEAK_SIGNAL
                        </span>
                      )}

                      {/* SVG Engine Render */}
                      <div className="relative w-28 h-28 flex items-center justify-center mt-2">
                        {isDominant && (
                          <div 
                            className="absolute w-20 h-20 rounded-full opacity-[0.08] blur-xl animate-pulse"
                            style={{ backgroundColor: color }}
                          />
                        )}

                        <svg width="100" height="100" className="transform -rotate-90 overflow-visible">
                          {/* Track Base Ring */}
                          <circle cx="50" cy="50" r={radius} stroke="#09090e" strokeWidth="4" fill="transparent" />
                          
                          {/* Colored Active Frequency Overlay Arc */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r={radius} 
                            stroke={color} 
                            strokeWidth="4" 
                            fill="transparent" 
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                            style={{
                              filter: isDominant ? `drop-shadow(0 0 8px ${color})` : 'none'
                            }}
                          />
                        </svg>

                        {/* Internal Digital Counters */}
                        <div className="absolute text-center">
                          <span className="text-xl font-black tracking-tighter text-white block">
                            {percentage}%
                          </span>
                          <span className="text-[8px] text-zinc-500 uppercase block tracking-wider mt-0.5">
                            {count} LOGS
                          </span>
                        </div>
                      </div>

                      {/* Lower Label Deck */}
                      <div className="w-full text-center mt-4 pt-2 border-t border-zinc-900/60">
                        <span 
                          className="text-xs font-black tracking-widest uppercase transition-all duration-200"
                          style={{ color: color }}
                        >
                          {channel}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

            ) : (
              <div className="flex-1 flex items-center justify-center py-28 text-zinc-700 text-xs tracking-wider">
                NO_BIOMETRIC_STREAMS_CAPTURED_IN_DATABASE
              </div>
            )}

            {/* System Status Deck Footer */}
            <div className="text-[8px] text-zinc-600 font-bold tracking-widest uppercase mt-4 flex justify-between border-t border-zinc-900/40 pt-4">
              <span>// PIPELINE_STATUS: SECURE</span>
              <span>v3.0_RADIAL_MATRIX</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}