export const startDetection = async ({
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
  drawFaceMesh,
  canvasRef
}) => {
  setLoading(true);
  setExpression("BOOTING_CAMERA...");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: "user" },
      audio: false
    });
    
    activeStreamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
    
    setIsDetecting(true);
    setLoading(false);
    setExpression("CALIBRATING...");
    
    // Pass the context payload object through the loop handler cleanly
    const loopPayload = {
      isDetecting: true,
      activeStreamRef,
      animationFrameRef,
      faceLandmarkerRef,
      videoRef,
      lastExpressionRef,
      setExpression,
      updateThemeColors,
      setMetrics,
      drawFaceMesh,
      canvasRef
    };

    animationFrameRef.current = requestAnimationFrame(() => detectFaceLoop(loopPayload));
  } catch (err) {
    console.error(err);
    setExpression("ACCESS_DENIED");
    setLoading(false);
  }
};

export const stopDetection = ({
  setIsDetecting,
  setLoading,
  setExpression,
  updateThemeColors,
  setMetrics,
  animationFrameRef,
  activeStreamRef,
  videoRef,
  canvasRef
}) => {
  setIsDetecting(false);
  setLoading(false);
  setExpression("SYSTEM_IDLE");
  setMetrics({ smile: 0, brow: 0, eyes: 0 });
  updateThemeColors("NEUTRAL");

  if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  if (activeStreamRef.current) {
    activeStreamRef.current.getTracks().forEach((track) => track.stop());
    activeStreamRef.current = null;
  }
  if (videoRef.current) videoRef.current.srcObject = null;
  
  // Fixed: Passed canvasRef directly inside the cleanup arguments safely
  if (canvasRef && canvasRef.current) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const detectFaceLoop = (params) => {
  const { isDetecting, activeStreamRef, animationFrameRef } = params;
  if (!isDetecting || !activeStreamRef.current) return;
  
  // Triggers the frame detection passing all dynamic variables forward
  detectFace(params);
  animationFrameRef.current = requestAnimationFrame(() => detectFaceLoop(params));
};

export const detectFace = async ({
  faceLandmarkerRef,
  videoRef,
  lastExpressionRef,
  setExpression,
  updateThemeColors,
  setMetrics,
  drawFaceMesh
}) => {
  if (!faceLandmarkerRef.current || !videoRef.current || videoRef.current.paused) return;

  const results = faceLandmarkerRef.current.detectForVideo(videoRef.current, performance.now());

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;
    const getScore = (name) => blendshapes.find((item) => item.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");
    const eyeBlinkLeft = getScore("eyeBlinkLeft");
    const eyeBlinkRight = getScore("eyeBlinkRight");
    const mouthPucker = getScore("mouthPucker");
    const cheekSquintLeft = getScore("cheekSquintLeft");
    const cheekSquintRight = getScore("cheekSquintRight");
    const eyeLookDownLeft = getScore("eyeLookDownLeft");
    const eyeLookDownRight = getScore("eyeLookDownRight");
    const eyeWideLeft = getScore("eyeWideLeft");
    const eyeWideRight = getScore("eyeWideRight");
    const browDownLeft = getScore("browDownLeft");
    const browDownRight = getScore("browDownRight");

    const happiness = (smileLeft + smileRight) / 2;
    const sadness = (frownLeft + frownRight + getScore("browOuterUpLeft") + getScore("browOuterUpRight")) / 4;
    const sleepy = (eyeBlinkLeft + eyeBlinkRight) / 2;
    const surprise = (jawOpen * 1.2 + browUp + eyeWideLeft + eyeWideRight) / 4;
    const laugh = (happiness + cheekSquintLeft + cheekSquintRight) / 3;
    const angry = (browDownLeft * 1.5 + browDownRight * 1.5 + frownLeft + frownRight) / 4;

    // Fixed: setMetrics is now available cleanly via argument bindings
    setMetrics({
      smile: Math.round(happiness * 100),
      brow: Math.round(((browDownLeft + browDownRight) / 2) * 100),
      eyes: Math.round(((eyeWideLeft + eyeWideRight) / 2) * 100)
    });

    let detectedExpression = "NEUTRAL 😐";

    if (laugh > 0.4) {
      detectedExpression = "LAUGHING 😂";
    } else if (happiness > 0.35) {
      detectedExpression = "HAPPY 😄";
    } else if (surprise > 0.3) {
      detectedExpression = "SURPRISED 😲";
    } else if (angry > 0.28) {
      detectedExpression = "ANGRY 😠";
    } else if (sadness > 0.25) {
      detectedExpression = "SAD 😢";
    } else if (sleepy > 0.65 || (eyeLookDownLeft > 0.35 && eyeLookDownRight > 0.35)) {
      detectedExpression = "SLEEPY 😴";
    } else if (mouthPucker > 0.45) {
      detectedExpression = "POUT 😗";
    }

    if (lastExpressionRef.current !== detectedExpression) {
      lastExpressionRef.current = detectedExpression;
      setExpression(detectedExpression);
      updateThemeColors(detectedExpression); 
    }
  }

  drawFaceMesh(results);
};