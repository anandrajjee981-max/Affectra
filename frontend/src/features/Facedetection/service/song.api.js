import axios from 'axios';

const api = axios.create({
  baseURL: "https://affectra-koea.onrender.com",
  withCredentials: true
});

export async function getSong(emotion) {
  try {
    // String template injection safe practice
    const res = await api.get(`/api/song/getsong?emotion=${emotion}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}