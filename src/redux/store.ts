import { configureStore } from "@reduxjs/toolkit";
import boards from "./boardSlice";
import { localStorageMiddleware } from "../utils/localStorageMiddleware";
import { loadState } from "../utils/loadState";

const preloadedState = loadState();
const store = configureStore({
  reducer: {
    boards: boards.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
