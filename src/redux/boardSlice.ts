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
    editBoardAndSave: (state, action) => {
      const index = state.findIndex(
        (board) => board.isActive === action.payload.isActive
      );
      console.log(index);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const activeBoard: TypeBoard = databoards.filter(
  (board) => board.isActive === true
)[0];

export const { setBoard, addBoard, editBoardAndSave } = boards.actions;
export default boards;
