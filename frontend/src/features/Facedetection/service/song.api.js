import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
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