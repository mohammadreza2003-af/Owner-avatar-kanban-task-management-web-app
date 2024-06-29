import { createSlice } from "@reduxjs/toolkit";
import data from "../constants/data.json";
import { TypeBoard, TypeBoards } from "../constants/types";

const databoards: TypeBoards = data.boards;

const boards = createSlice({
  name: "boards",
  initialState: databoards,
  reducers: {
    setBoard: (state, action) => {
      state.forEach((board) => {
        board.isActive = false;
      });
      const newboard = state.find((board) => board.name === action.payload);
      if (newboard) {
        newboard.isActive = true;
      }
    },
    addBoard: (state, action) => {
      state.push(action.payload);
      state.forEach((board) => {
        board.isActive = false;
      });
      const newboard = state.find(
        (board) => board.name === action.payload.name
      );
      if (newboard) {
        newboard.isActive = true;
      }
    },
  },
});

export const activeBoard: TypeBoard = databoards.filter(
  (board) => board.isActive === true
)[0];

export const { setBoard, addBoard } = boards.actions;
export default boards;
