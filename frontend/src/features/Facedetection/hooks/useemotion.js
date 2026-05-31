import { useDispatch, useSelector } from "react-redux";
import { saveEmotion, getEmotions } from "../../utils/Localstorage";
import { addEmotion, getemotion } from "../slice/emotion.slice";
import { useRef } from "react";

const SKIP_EMOTIONS = new Set(["SYSTEM_READY", "SYSTEM_IDLE", "INIT_FAILED", "LOAD_SYS..."]);
const THROTTLE_MS = 5000; // 5 sec mein ek baar hi save hoga

export const useemotion = () => {
  const dispatch = useDispatch();
  const lastSavedRef = useRef(0);
  const lastEmotionRef = useRef(null);

  const emotionState = useSelector((state) => state.emotion);

  function handleemotion(currentExpression) {
    if (!currentExpression) return;

    const expr = String(currentExpression).trim().toUpperCase();

    // System states kabhi save nahi honge
    if (SKIP_EMOTIONS.has(expr)) return;

    const now = Date.now();

    // Same emotion repeat ho rahi hai AND 5 sec nahi guzre — skip
    if (expr === lastEmotionRef.current && now - lastSavedRef.current < THROTTLE_MS) return;

    lastSavedRef.current = now;
    lastEmotionRef.current = expr;

    const emotionData = { emotion: expr, time: now };

    saveEmotion("emotions", emotionData);
    dispatch(addEmotion(expr));
  }

  function fetchStoredEmotions() {
    const emotions = getEmotions("emotions");
    dispatch(getemotion(emotions));
  }

  return {
    ...emotionState,
    handleemotion,
    fetchStoredEmotions,
  };
};