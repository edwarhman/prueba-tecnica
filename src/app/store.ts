import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import memoryGameReducer from "../features/memoryGame/memoryGameSlice";
export const store = configureStore({
  reducer: {
    game: memoryGameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
