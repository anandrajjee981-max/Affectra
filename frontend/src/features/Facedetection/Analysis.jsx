import React, { useEffect, useState, useRef } from 'react';
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import Navbar1 from '../components/AffectraWelcomeHub';
import { useemotion } from './hooks/useemotion';

// ✅ Moved outside — no re-creation on every render
const EMOTION_WEIGHTS = {
  ANGRY: 6, SURPRISED: 5, HAPPY: 4,
  POUT: 3, SLEEPY: 2, SAD: 1,
  SYSTEM_READY: 3.5, SYSTEM_IDLE: 2.5
};

const INVERSE_WEIGHTS = {
  6: "ANGRY", 5: "SURPRISED", 4: "HAPPY",
  3: "POUT", 2: "SLEEPY", 1: "SAD"
};

const EMOTION_COLORS = {
  ANGRY: "#ef4444", SURPRISED: "#06b6d4", HAPPY: "#eab308",
  POUT: "#a855f7", SLEEPY: "#6366f1", SAD: "#3b82f6",
  SYSTEM_READY: "#10b981", SYSTEM_IDLE: "#71717a"
};

// ✅ Compute dominant emotion from chartData
function getDominantEmotion(data) {
  if (!data.length) return null;
  const freq = {};
  data.forEach(({ displayEmotion }) => {
    freq[displayEmotion] = (freq[displayEmotion] || 0) + 1;
  });
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
}

export default function Analysis() {
  const { fetchStoredEmotions, emotions } = useemotion();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current && typeof fetchStoredEmotions === 'function') {
      fetchStoredEmotions();
      isFetched.current = true;
    }
  }, [fetchStoredEmotions]);

  useEffect(() => {
    if (!Array.isArray(emotions)) return;

    if (emotions.length > 0) {
      const formatted = emotions.map((item) => {
        const rawExpr = item.emotion
          ? String(item.emotion).trim().toUpperCase()
          : 'SYSTEM_IDLE';

        return {
          ...item,
          displayTime: new Date(item.time).toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          }),
          weight: EMOTION_WEIGHTS[rawExpr] ?? 2.5,
          displayEmotion: rawExpr,
          barColor: EMOTION_COLORS[rawExpr] || "#f97316"
        };
      });
      setChartData(formatted);
    }

    setLoading(false);
  }, [emotions]);

  const dominant = getDominantEmotion(chartData);

  return (
    <div className="relative min-h-screen bg-[#020204] text-zinc-100 font-mono flex flex-col md:flex-row pb-20 md:pb-0 select-none">
      <Navbar1 isCalibrated={true} currentExpression="SYSTEM_READY" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 z-10 w-full relative">
        {/* Grid BG */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b0b11_1px,transparent_1px),linear-gradient(to_bottom,#0b0b11_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

        <div className="w-full max-w-[980px] z-10 flex flex-col gap-6 mt-4">
          <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase border-b-2 border-zinc-900 pb-6">
            BIOMETRIC_MATRIX
          </h1>

          {/* ✅ Stats Row */}
          {!loading && chartData.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "TOTAL_LOGS", value: chartData.length },
                {
                  label: "DOMINANT",
                  value: dominant?.[0] ?? "—",
                  color: dominant ? EMOTION_COLORS[dominant[0]] : "#71717a"
                },
                { label: "FREQ_COUNT", value: dominant?.[1] ?? 0 }
              ].map(({ label, value, color }) => (
                <div key={label} className="border border-zinc-900 bg-zinc-950/50 p-3">
                  <p className="text-[9px] text-zinc-600 mb-1">{label}</p>
                  <p
                    className="text-lg font-black tracking-tight"
                    style={{ color: color || "#e4e4e7" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Chart Card */}
          <div className="w-full bg-zinc-950/40 border border-zinc-900 backdrop-blur-2xl p-4 sm:p-6 relative min-h-[460px] flex flex-col justify-between shadow-2xl">
            {/* Corner Brackets */}
            {[
              "top-0 left-0 w-4 h-[2px]", "top-0 left-0 h-4 w-[2px]",
              "top-0 right-0 w-4 h-[2px]", "top-0 right-0 h-4 w-[2px]",
              "bottom-0 left-0 w-4 h-[2px]", "bottom-0 left-0 h-4 w-[2px]",
              "bottom-0 right-0 w-4 h-[2px]", "bottom-0 right-0 h-4 w-[2px]"
            ].map((cls, i) => (
              <div key={i} className={`absolute ${cls} bg-orange-500`} />
            ))}

            {loading ? (
              <div className="flex-1 flex items-center justify-center py-28 text-xs text-zinc-500">
                LOADING_STREAM...
              </div>
            ) : chartData.length > 0 ? (
              <div className="w-full block h-[380px] min-h-[380px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#12121a" vertical={false} />

                    <XAxis
                      dataKey="displayTime"
                      stroke="#3f3f46"
                      tick={{ fill: '#71717a', fontSize: 9, fontFamily: 'monospace' }}
                    />

                    <YAxis
                      domain={[0, 6.5]}
                      tickCount={7}
                      stroke="#3f3f46"
                      tickFormatter={(v) => INVERSE_WEIGHTS[v] || ""}
                      tick={{ fill: '#52525b', fontSize: 8, fontFamily: 'monospace', fontWeight: 'bold' }}
                    />

                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="bg-black border border-orange-500 p-3 font-mono">
                            <p className="text-[9px] text-zinc-500 mb-1">// {d.displayTime}</p>
                            <p className="text-xs text-white">
                              EMOTION:{" "}
                              <span style={{ color: d.barColor }}>{d.displayEmotion}</span>
                            </p>
                          </div>
                        );
                      }}
                    />

                    <Bar dataKey="weight" barSize={25}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.barColor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center py-28 text-zinc-700 text-xs">
                NO_DATA
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}