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
  firstCard: { type: string; index: number };
  secondCard: { type: string; index: number };
  disabledCards: number[];
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
  pairs: TOTAL_PAIRS,
  triesToSelect: 2,
  firstCard: { type: "", index: -1 },
  secondCard: { type: "", index: -1 },
  disabledCards: [],
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
    setFirstCard: (state, action) => {
      state.firstCard = action.payload;
    },
    setSecondCard: (state, action) => {
      state.secondCard = action.payload;
    },
    addDisabledCards: (state, action) => {
      state.disabledCards = action.payload;
    },
    resetTurn: (state) => {
      state.triesToSelect = 2;
    },
  },
});

export const {
  incrementScore,
  incrementFailsCount,
  decrementTriesToSelect,
  decrementPairs,
  setFirstCard,
  setSecondCard,
  addDisabledCards,
  resetTurn,
} = memoryGameSlice.actions;

export const selectScore = (state: RootState) => state.game.score;
export const selectFailsCount = (state: RootState) => state.game.failsCount;
export const selectPairs = (state: RootState) => state.game.pairs;
export const selectTries = (state: RootState) => state.game.triesToSelect;
export const selectCards = (state: RootState) => state.game.cardsMatrix;
export const selectFirstCard = (state: RootState) => state.game.firstCard;
export const selectSecondCard = (state: RootState) => state.game.secondCard;
export const selectDisabledCards = (state: RootState) =>
  state.game.disabledCards;

export default memoryGameSlice.reducer;
