import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import Navbar1 from "../features/components/AffectraWelcomeHub";

export default function Moodadapt() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const rafRef = useRef(null);

  const [isModelLoading, setIsModelLoading] = useState(true);
  const [currentMood, setCurrentMood] = useState("CALIBRATING...");

  // springs
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };

  const mouthScaleY = useSpring(0.1, springConfig);
  const mouthWidth = useSpring(80, springConfig);
  const smileCurve = useSpring(0, springConfig);
  const browLeftY = useSpring(0, springConfig);
  const browRightY = useSpring(0, springConfig);
  const eyeScaleY = useSpring(1, springConfig);

  useEffect(() => {
    const init = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: "/face_landmarker.task",
              delegate: "GPU",
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );

        setIsModelLoading(false);
        startCamera();
      } catch (err) {
        console.error(err);
        setCurrentMood("INIT_ERROR");
      }
    };

    init();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          rafRef.current = requestAnimationFrame(predictLoop);
        }
      })
      .catch((err) => console.error(err));
  };

  const predictLoop = async () => {
    if (!videoRef.current || !landmarkerRef.current) {
      rafRef.current = requestAnimationFrame(predictLoop);
      return;
    }

    const now = performance.now();

    if (videoRef.current.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = videoRef.current.currentTime;

      const result = landmarkerRef.current.detectForVideo(
        videoRef.current,
        now
      );

      if (result?.faceBlendshapes?.length) {
        const blend = result.faceBlendshapes[0].categories;

        // OPTIMIZED MAP (IMPORTANT FIX)
        const map = Object.fromEntries(
          blend.map((b) => [b.categoryName, b.score])
        );

        const smileLeft = map.mouthSmileLeft || 0;
        const smileRight = map.mouthSmileRight || 0;
        const jawOpen = map.jawOpen || 0;
        const browDownLeft = map.browDownLeft || 0;
        const browDownRight = map.browDownRight || 0;
        const blinkLeft = map.eyeBlinkLeft || 0;
        const blinkRight = map.eyeBlinkRight || 0;

        const avgSmile = (smileLeft + smileRight) / 2;
        const avgBlink = (blinkLeft + blinkRight) / 2;
        const avgBrow = (browDownLeft + browDownRight) / 2;

        // SPRING UPDATES (FIXED SCALE RANGE 0-1)
        mouthScaleY.set(Math.max(0.1, jawOpen));
        mouthWidth.set(80 + avgSmile * 40);
        smileCurve.set(avgSmile * 20);

        browLeftY.set(browDownLeft * -10);
        browRightY.set(browDownRight * -10);

        eyeScaleY.set(Math.max(0.2, 1 - avgBlink));

        // MOOD ENGINE
        if (avgSmile > 0.45) setCurrentMood("HAPPY");
        else if (jawOpen > 0.35) setCurrentMood("SURPRISED");
        else if (avgBrow > 0.35) setCurrentMood("ANGRY");
        else setCurrentMood("IDLE_SYSTEM");
      }
    }

    rafRef.current = requestAnimationFrame(predictLoop);
  };

  return (
    <div className="min-h-screen bg-[#020204] text-zinc-100 font-mono flex flex-col select-none relative overflow-x-hidden">
      <Navbar1 isCalibrated={true} currentExpression="LIVE_MOTION_v3" />

      {/* hidden camera */}
      <video ref={videoRef} className="hidden" muted playsInline autoPlay />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-[500px] bg-zinc-950/50 border border-zinc-900 p-8 flex flex-col items-center justify-center">

          {isModelLoading ? (
            <div className="text-xs text-zinc-500">LOADING ENGINE...</div>
          ) : (
            <>
              {/* MOOD BAR */}
              <div className="w-full flex justify-between text-xs mb-6">
                <span className="text-zinc-600">// MOOD</span>
                <span className="text-orange-400">{currentMood}</span>
              </div>

              {/* AVATAR */}
              <div className="w-[280px] h-[280px] relative flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">

                  {/* EYEBROWS FIXED */}
                  <motion.line
                    x1="45"
                    y1="65"
                    x2="80"
                    y2="65"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                      transform: browLeftY.to(v => `translateY(${v}px)`),
                    }}
                  />

                  <motion.line
                    x1="120"
                    y1="65"
                    x2="155"
                    y2="65"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                      transform: browRightY.to(v => `translateY(${v}px)`),
                    }}
                  />

                  {/* EYES */}
                  <motion.ellipse
                    cx="62"
                    cy="85"
                    rx="10"
                    ry="10"
                    fill="#10b981"
                    style={{
                      scaleY: eyeScaleY,
                      transformOrigin: "center",
                    }}
                  />

                  <motion.ellipse
                    cx="138"
                    cy="85"
                    rx="10"
                    ry="10"
                    fill="#10b981"
                    style={{
                      scaleY: eyeScaleY,
                      transformOrigin: "center",
                    }}
                  />

                  {/* MOUTH (ONLY ANIMATION FIXED - NO CONFLICT) */}
                  <motion.path
                    stroke="#ef4444"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    animate={{
                      d:
                        currentMood === "HAPPY"
                          ? "M 60 135 Q 100 165 140 135"
                          : currentMood === "ANGRY"
                          ? "M 65 150 Q 100 130 135 150"
                          : "M 65 142 Q 100 142 135 142",
                    }}
                  />
                </svg>
              </div>

              <div className="text-[10px] text-zinc-600 mt-4 tracking-widest">
                SPRING_VECTOR_ENGINE_ACTIVE
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}