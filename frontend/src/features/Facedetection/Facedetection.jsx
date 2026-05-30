import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useNavigate } from "react-router-dom"; // <-- Fix 1: Import hook

// Core utility handlers
import { startDetection, stopDetection, detectFaceLoop } from "../utils/utils";

// Importing the central modular navigation
import Navbar1 from "../components/AffectraWelcomeHub";
import Music from "./Card";
import Notification from "../components/Notification";

export default function Facedetection() {
  const navigate = useNavigate(); // <-- Fix 2: Initialize hook inside component

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastExpressionRef = useRef("");
  const activeStreamRef = useRef(null);
  
  const [showNotification, setShowNotification] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expression, setExpression] = useState("SYSTEM_READY");
  const [metrics, setMetrics] = useState({ smile: 0, brow: 0, eyes: 0 });
  
  // Controls dynamic routing authorization inside global Navbar component
  const [isCalibrated, setIsCalibrated] = useState(false);

  // High-fidelity futuristic neon color-state maps with explicit spotlight tracking
  const [theme, setTheme] = useState({
    accent: "#f97316",
    text: "text-orange-400",
    border: "border-orange-500/50",
    spotlightGlow: "rgba(249, 115, 22, 0.12)", // Volumetric pure hex alpha glow
    button: "bg-orange-500/10 border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] shadow-[inset_0_0_12px_rgba(249,115,22,0.1)]",
    meterBg: "bg-orange-950/40 border-orange-900/30",
    meterFill: "bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
  });

  // MediaPipe Setup hook
  useEffect(() => {
    async function initModel() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
            runningMode: "VIDEO",
            numFaces: 1
          }
        );
      } catch (error) {
        console.error("Model loading failed:", error);
        setExpression("INIT_FAILED");
      }
    }
    initModel();

    return () => {
      // Unmount par cleanup normal chalega
      stopDetection({
        setIsDetecting,
        setLoading,
        setExpression,
        updateThemeColors,
        setMetrics,
        animationFrameRef,
        activeStreamRef,
        videoRef,
        canvasRef
      });
      if (faceLandmarkerRef.current) faceLandmarkerRef.current.close();
    };
  }, []);

  // Live recognition canvas rendering cycle
  useEffect(() => {
    if (isDetecting) {
      animationFrameRef.current = requestAnimationFrame(() =>
        detectFaceLoop({
          isDetecting,
          activeStreamRef,
          animationFrameRef,
          faceLandmarkerRef,
          videoRef,
          lastExpressionRef,
          setExpression,
          updateThemeColors,
          setMetrics,
          drawFaceMesh
        })
      );
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDetecting]);

  const updateThemeColors = (expr) => {
    if (expr.includes("HAPPY") || expr.includes("LAUGHING")) {
      setTheme({
        accent: "#eab308",
        text: "text-yellow-400",
        border: "border-yellow-500/50",
        spotlightGlow: "rgba(234, 179, 8, 0.15)",
        button: "bg-yellow-500/10 border-yellow-500/40 text-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] shadow-[inset_0_0_12px_rgba(234,179,8,0.1)]",
        meterBg: "bg-yellow-950/40 border-yellow-900/30",
        meterFill: "bg-gradient-to-r from-yellow-500 to-amber-400 shadow-[0_0_10px_rgba(234, 179, 8, 0.5)]"
      });
    } else if (expr.includes("SURPRISED")) {
      setTheme({
        accent: "#06b6d4",
        text: "text-cyan-400",
        border: "border-cyan-500/50",
        spotlightGlow: "rgba(6, 182, 212, 0.18)",
        button: "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]",
        meterBg: "bg-cyan-950/40 border-cyan-900/30",
        meterFill: "bg-gradient-to-r from-cyan-500 to-blue-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      });
    } else if (expr.includes("ANGRY") || expr.includes("SAD")) {
      setTheme({
        accent: "#ef4444",
        text: "text-red-400",
        border: "border-red-500/50",
        spotlightGlow: "rgba(239, 68, 68, 0.18)",
        button: "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] shadow-[inset_0_0_12px_rgba(239,68,68,0.1)]",
        meterBg: "bg-red-950/40 border-red-900/30",
        meterFill: "bg-gradient-to-r from-red-500 to-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
      });
    } else if (expr.includes("SLEEPY") || expr.includes("POUT")) {
      setTheme({
        accent: "#a855f7",
        text: "text-purple-400",
        border: "border-purple-500/50",
        spotlightGlow: "rgba(168, 85, 247, 0.15)",
        button: "bg-purple-500/10 border-purple-500/40 text-purple-400 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] shadow-[inset_0_0_12px_rgba(168,85,247,0.1)]",
        meterBg: "bg-purple-950/40 border-purple-900/30",
        meterFill: "bg-gradient-to-r from-purple-500 to-fuchsia-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
      });
    } else {
      setTheme({
        accent: "#f97316",
        text: "text-orange-400",
        border: "border-orange-500/50",
        spotlightGlow: "rgba(249, 115, 22, 0.12)",
        button: "bg-orange-500/10 border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] shadow-[inset_0_0_12px_rgba(249,115,22,0.1)]",
        meterBg: "bg-orange-950/40 border-orange-900/30",
        meterFill: "bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
      });
    }
  };

  const handleToggleDetection = async () => {
    if (isDetecting) {
      stopDetection({
        setIsDetecting,
        setLoading,
        setExpression: () => {},      // State freeze logic intact
        updateThemeColors: () => {},  // Theme freeze logic intact
        setMetrics,
        animationFrameRef,
        activeStreamRef,
        videoRef,
        canvasRef
      });
      setShowNotification(true);
    } else {
      setShowNotification(false);
      await startDetection({
        setLoading,
        setExpression,
        activeStreamRef,
        setIsDetecting,
        videoRef,
        animationFrameRef,
        detectFaceLoop,
        faceLandmarkerRef,
        lastExpressionRef,
        updateThemeColors,
        setMetrics,
        drawFaceMesh
      });
      setIsCalibrated(true);
    }
  };

  const drawFaceMesh = (results) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!results.faceLandmarks?.length) return;

    results.faceLandmarks.forEach((landmarks) => {
      landmarks.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x * canvas.width, point.y * canvas.height, 0.8, 0, 2 * Math.PI);
        ctx.fillStyle = theme.accent;
        ctx.fill();
      });
    });
  };

  return (
    <>
      <div className="relative min-h-screen bg-[#050507] text-zinc-100 font-mono overflow-x-hidden flex flex-col md:flex-row pb-20 md:pb-0 select-none">
        
        {/* Global Modular Adaptive Left/Bottom Navigation Panel */}
        <Navbar1 isCalibrated={isCalibrated} />

        {/* Main Apps Matrix Stream Container */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 z-10 w-full relative">
          
          {/* Background Cyber Tech Grid Gradients */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f14_1px,transparent_1px),linear-gradient(to_bottom,#0f0f14_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
          
          {/* HEAVY VOLUMETRIC SPOTLIGHT */}
          <div 
            className="absolute w-[550px] h-[550px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-in-out blur-[130px] opacity-100 mix-blend-screen" 
            style={{
              background: `radial-gradient(circle, ${theme.spotlightGlow} 0%, transparent 70%)`
            }}
          />

          {/* Central Operations Console Card */}
          <div 
            className="w-full max-w-[390px] z-10 flex flex-col gap-4 bg-zinc-950/20 p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
            style={{ borderColor: theme.accent + "20" }}
          >
            
            {/* Asymmetric System Header Header */}
            <div className="flex items-end justify-between border-b border-zinc-900 pb-3">
              <div>
                <h2 className="text-xl font-black tracking-tighter text-zinc-200 flex items-center gap-2">
                  AFFECTRA <span className={`text-xs font-bold px-1.5 py-0.5 rounded border border-current/20 transition-colors duration-500 ${theme.text}`}>v2.1</span>
                </h2>
                <p className="text-[9px] text-zinc-500 tracking-[0.18em] mt-1 font-semibold">CORE_BIOMETRIC_MODULE</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-500 ${isDetecting ? "shadow-[0_0_12px_currentColor] animate-pulse" : "bg-zinc-700"}`} style={{ color: theme.accent }} />
                  <span className="text-[10px] text-zinc-400 font-bold tracking-wider">{isDetecting ? "LIVE_RUN" : "STDBY"}</span>
                </div>
                <span className="text-[8px] text-zinc-600 font-medium">SYS_LOG_OK</span>
              </div>
            </div>

            {/* Camera Viewfinder Viewport Window */}
            <div className="relative aspect-[4/3] w-full rounded-xl border border-zinc-900 bg-black/40 shadow-inner overflow-hidden group/hud">
              
              {/* Holographic Reactive Corner Accents */}
              <div className={`absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 ${theme.border} z-20 transition-all duration-500 group-hover/hud:scale-110`} />
              <div className={`absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 ${theme.border} z-20 transition-all duration-500 group-hover/hud:scale-110`} />
              <div className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 ${theme.border} z-20 transition-all duration-500 group-hover/hud:scale-110`} />
              <div className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 ${theme.border} z-20 transition-all duration-500 group-hover/hud:scale-110`} />

              {isDetecting && (
                <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40 shadow-[0_0_10px_currentColor] z-20 animate-[scan_2.5s_ease-in-out_infinite]" style={{ color: theme.accent }} />
              )}

              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-all duration-1000 filter contrast-[1.05] brightness-[1.02] ${isDetecting ? "opacity-90 scale-100" : "opacity-5 scale-95 blur-md"}`}
                playsInline
                muted
              />

              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-screen" />

              {!isDetecting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070709]/60 backdrop-blur-[2px] z-10 transition-all duration-500">
                  <div className="w-11 h-11 rounded-xl bg-zinc-950/80 border border-zinc-900 flex items-center justify-center text-zinc-600 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 47.774 47.86 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                  </div>
                  <span className="text-[9px] text-zinc-500 tracking-[0.25em] mt-3 font-bold uppercase">FEED_OFFLINE</span>
                </div>
              )}
            </div>

            {/* Real-time Bio Telemetry Core Bars */}
            <div className={`grid grid-cols-3 gap-2 bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-900/60 text-[9px] transition-all duration-500 ${isDetecting ? "opacity-100 scale-100" : "opacity-30 pointer-events-none scale-98"}`}>
              <div>
                <div className="text-zinc-500 mb-1 font-bold tracking-wider">Z_SMILE</div>
                <div className={`h-1.5 p-[1px] border rounded-full overflow-hidden ${theme.meterBg}`}>
                  <div className={`h-full rounded-full ${theme.meterFill} transition-all duration-200`} style={{ width: `${isDetecting ? metrics.smile : 0}%` }} />
                </div>
              </div>
              <div>
                <div className="text-zinc-500 mb-1 font-bold tracking-wider">Y_BROW</div>
                <div className={`h-1.5 p-[1px] border rounded-full overflow-hidden ${theme.meterBg}`}>
                  <div className={`h-full rounded-full ${theme.meterFill} transition-all duration-200`} style={{ width: `${isDetecting ? metrics.brow : 0}%` }} />
                </div>
              </div>
              <div>
                <div className="text-zinc-500 mb-1 font-bold tracking-wider">X_EYES</div>
                <div className={`h-1.5 p-[1px] border rounded-full overflow-hidden ${theme.meterBg}`}>
                  <div className={`h-full rounded-full ${theme.meterFill} transition-all duration-200`} style={{ width: `${isDetecting ? metrics.eyes : 0}%` }} />
                </div>
              </div>
            </div>

            {/* Real-time System Terminal Status logs */}
            <div className="w-full bg-zinc-950/90 p-3 rounded-xl border border-zinc-900 flex items-center justify-between shadow-[inset_0_1px_6px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col">
                <span className="text-[8px] text-zinc-500 tracking-wider font-bold">MATRIX_DECODE</span>
                <span className={`text-xs font-black tracking-widest mt-1 uppercase transition-colors duration-500 ${theme.text}`}>
                  {loading ? "LOAD_SYS..." : expression}
                </span>
              </div>
              <div className="text-[8px] text-zinc-600 text-right font-medium leading-normal tracking-wide">
                SEC_AUTH // GRANTED <br />
                LOCK_STATE // STABLE
              </div>
            </div>

            {/* Cybernetic Structural Button Core */}
            <button
              onClick={handleToggleDetection}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-black tracking-[0.15em] text-[10px] transition-all duration-300 uppercase border active:scale-[0.98] disabled:opacity-20 ${
                isDetecting
                  ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] shadow-[inset_0_0_10px_rgba(239,68,68,0.05)]"
                  : theme.button
              }`}
            >
              {isDetecting ? ":: TERMINATE_SCANNER ::" : ":: INITIATE_FEED_SCAN ::"}
            </button>

          </div>
        </div>

        {/* Dynamic Notification Toast Trigger */}
        {/* Expression value passed down here */}
        <Notification 
          isOpen={showNotification} 
          onClose={() => setShowNotification(false)}
          onNavigate={() => navigate("/card", { state: { currentExpression: expression } })}
          currentExpression={expression} 
        />
        
      </div>
    </>
  );
}