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
    "card-1",
    "card-2",
    "Card-3",
    "card-4",
    "card-5",
    "card-6",
    "card-7",
    "card-8",
    "card-9",
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
