import { createSlice } from "@reduxjs/toolkit";
import data from "../constants/data.json";
const boards = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    activeBoard: (state) => {
      const activeBoard = state.filter((board) => board.isActive === true);
      return activeBoard;
    },
  },
});

export const activeBoard = data.boards.filter(
  (board) => board.isActive === true
)[0];

// export const {} = boards.actions;
export default boards;
