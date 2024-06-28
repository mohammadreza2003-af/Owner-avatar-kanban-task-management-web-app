import { configureStore } from "@reduxjs/toolkit";
import boards from "./boardSlice";

const store = configureStore({
  reducer: {
    boards: boards.reducer,
  },
});

export default store;
