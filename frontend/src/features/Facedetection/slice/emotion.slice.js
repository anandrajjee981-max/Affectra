import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEmotion: null,
  emotions: [],
};

const emotionSlice = createSlice({
  name: "emotion",
  initialState,

  reducers: {
    addEmotion: (state, action) => {
      const emotionData = {
        emotion: action.payload,
        time: Date.now(),
      };

      state.currentEmotion = action.payload;
      state.emotions.push(emotionData);
    },

    getemotion: (state, action) => {
      state.emotions = action.payload;
    },

    clearEmotions: (state) => {
      state.currentEmotion = null;
      state.emotions = [];
    },
  },
});

export const {
  addEmotion,
  getemotion,
  clearEmotions,
} = emotionSlice.actions;

export default emotionSlice.reducer;