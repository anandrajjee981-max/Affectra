import { useState } from "react";
import { getSong } from '../service/song.api'; // Named match capital S fixed

export function useSong() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGetSong(emotion) {
    // Prevent empty or invalid triggers
    if (!emotion) return;

    try {
      setLoading(true);
      setError(null);

      console.log("[HOOK DEBUG] Requesting dynamic tracks for mood:", emotion);
      const res = await getSong(emotion);
      console.log("[HOOK DEBUG] Server raw payload received:", res);

      // Aapke backend structure ke mutabik res.songs inject ho raha hai
      setSong(res?.songs || res);
      return res;
    } catch (err) {
      console.error("[HOOK CATCH ENGINE]:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch song"
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    song,
    loading,
    error,
    handleGetSong,
  };
}