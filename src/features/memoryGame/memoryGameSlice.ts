import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { shuffleArray } from "../../utils";
import { RootState, AppThunk } from "../../app/store";

const TOTAL_PAIRS = 12;

export interface MemoryGame {
  failsCount: number;
  score: number;
  cardsMatrix: string[];
  triesToSelect: number;
  firstCard: { type: string; index: number };
  secondCard: { type: string; index: number };
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
    "flag",
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
    "flag",
    "star",
    "triangle",
    "umbrella",
  ],
  triesToSelect: 2,
  firstCard: { type: "", index: -1 },
  secondCard: { type: "", index: -1 },
};

export const memoryGameSlice = createSlice({
  name: "memoryGame",
  initialState,
  reducers: {
    incrementScore: (state) => {
      console.log("incrementa puntuacion");
      state.score += 1;
    },
    incrementFailsCount: (state) => {
      console.log("incrementa fallos");
      state.failsCount += 1;
    },
    decrementTriesToSelect: (state) => {
      state.triesToSelect -= 1;
    },
    setFirstCard: (state, action) => {
      state.firstCard = action.payload;
    },
    setSecondCard: (state, action) => {
      state.secondCard = action.payload;
    },
    resetTurn: (state) => {
      state.triesToSelect = 2;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    resetFails: (state) => {
      state.failsCount = 0;
    },
    shuffleCards: (state) => {
      shuffleArray(state.cardsMatrix);
    },
  },
});

export const {
  incrementScore,
  incrementFailsCount,
  decrementTriesToSelect,
  setFirstCard,
  setSecondCard,
  resetTurn,
  resetFails,
  resetScore,
  shuffleCards,
} = memoryGameSlice.actions;

export const selectScore = (state: RootState) => state.game.score;
export const selectFailsCount = (state: RootState) => state.game.failsCount;
export const selectTries = (state: RootState) => state.game.triesToSelect;
export const selectCards = (state: RootState) => state.game.cardsMatrix;
export const selectFirstCard = (state: RootState) => state.game.firstCard;
export const selectSecondCard = (state: RootState) => state.game.secondCard;

export default memoryGameSlice.reducer;
