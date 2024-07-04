import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import data from "../constants/data.json";
import { TypeBoard, TypeBoards, TypeTask } from "../constants/types";

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
      const existingBoard = state.find(
        (board) => board.name === action.payload.name
      );
      if (!existingBoard) {
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
      }
    },
    editBoardAndSave: (state, action) => {
      const index = state.findIndex(
        (board) => board.isActive === action.payload.isActive
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBoard: (state, action) => {
      const index = state.findIndex((board) => board.name === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        if (state.length > 0) {
          const nextIndex = index === 0 ? 0 : index - 1;
          state[nextIndex].isActive = true;
        }
      }
    },
    editTask: (state, action) => {
      const {
        boardName,
        task,
        indexes,
      }: {
        boardName: string;
        task: TypeTask;
        indexes: {
          taskIndex: number;
          colIndex: number;
        };
      } = action.payload;

      const { colIndex, taskIndex } = indexes;

      const boardIndex = state.findIndex((board) => board.name === boardName);

      if (boardIndex !== -1) {
        const newIndexColumn = state[boardIndex].columns.findIndex(
          (col) => col.name === task.status
        );
        if (newIndexColumn === colIndex) {
          state[boardIndex].columns[colIndex].tasks[taskIndex] = task;
        } else {
          const indexr = state[boardIndex].columns[newIndexColumn].tasks.length;
          state[boardIndex].columns[colIndex].tasks.splice(taskIndex, 1);
          state[boardIndex].columns[newIndexColumn].tasks[indexr] = task;
        }
      }
    },
    addTask: (state, action) => {
      const index = state.findIndex((board) => board.isActive === true);
      if (index !== -1) {
        const columnIndex = state[index].columns.findIndex(
          (col) => col.name === action.payload.status
        );
        state[index].columns[columnIndex].tasks.push(action.payload);
      }
    },
    toggleSubtaskCompletion: (
      state,
      action: PayloadAction<{
        boardName: string;
        taskId: string;
        subtaskIndex: number;
      }>
    ) => {
      const { boardName, taskId, subtaskIndex } = action.payload;

      const boardIndex = state.findIndex((board) => board.name === boardName);
      if (boardIndex !== -1) {
        const columnIndex = state[boardIndex].columns.findIndex((column) =>
          column.tasks.some((task) => task.title === taskId)
        );
        if (columnIndex !== -1) {
          const taskIndex = state[boardIndex].columns[
            columnIndex
          ].tasks.findIndex((task) => task.title === taskId);
          if (taskIndex !== -1) {
            const subtask =
              state[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
                subtaskIndex
              ];
            if (subtask) {
              subtask.isCompleted = !subtask.isCompleted;
            }
          }
        }
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ task: TypeTask; boardName: string }>
    ) => {
      const { task, boardName } = action.payload;
      const { title, status } = task;
      const boardIndex = state.findIndex((board) => board.name === boardName);
      if (boardIndex === -1) return;
      const colIndex = state[boardIndex].columns.findIndex(
        (col) => col.name === status
      );
      if (colIndex === -1) return;
      const taskIndex = state[boardIndex].columns[colIndex].tasks.findIndex(
        (t) => t.title === title
      );
      if (taskIndex === -1) return;
      state[boardIndex].columns[colIndex].tasks.splice(taskIndex, 1);
    },
  },
});

export const activeBoard: TypeBoard = databoards.filter(
  (board) => board.isActive === true
)[0];

export const {
  setBoard,
  addBoard,
  editBoardAndSave,
  deleteBoard,
  editTask,
  addTask,
  deleteTask,
  toggleSubtaskCompletion,
} = boards.actions;
export default boards;
