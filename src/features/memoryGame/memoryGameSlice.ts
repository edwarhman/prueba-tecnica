import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState, AppThunk } from "../../app/store";

const TOTAL_PAIRS = 12;

export interface MemoryGame {
  failsCount: number;
  score: number;
  cardsMatrix: string[];
  pairs: number;
  triesToSelect: number;
}

const initialState: MemoryGame = {
  failsCount: 0,
  score: 0,
  cardsMatrix: [
    "circle",
    "envelope",
    "eye-fill",
    "gear",
    "heart-fill",
    "key",
    "lightning",
    "reception-4",
    "square",
    "star",
    "triangle",
    "umbrella",
    "circle",
    "envelope",
    "eye-fill",
    "gear",
    "heart-fill",
    "key",
    "lightning",
    "reception-4",
    "square",
    "star",
    "triangle",
    "umbrella",
  ],
  pairs: TOTAL_PAIRS,
  triesToSelect: 2,
};

export const memoryGameSlice = createSlice({
  name: "memoryGame",
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    incrementFailsCount: (state) => {
      state.failsCount += 1;
    },
    decrementTriesToSelect: (state) => {
      state.triesToSelect -= 1;
    },
    decrementPairs: (state) => {
      state.pairs -= 1;
    },
  },
});

export const {
  incrementScore,
  incrementFailsCount,
  decrementTriesToSelect,
  decrementPairs,
} = memoryGameSlice.actions;

export const selectScore = (state: RootState) => state.game.score;
export const selectFailsCount = (state: RootState) => state.game.failsCount;
export const selectPairs = (state: RootState) => state.game.pairs;
export const selectTries = (state: RootState) => state.game.triesToSelect;
export const selectCards = (state: RootState) => state.game.cardsMatrix;
export default memoryGameSlice.reducer;
