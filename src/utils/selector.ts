import { StateType } from "../constants/types";

export const selectActiveBoard = (state: StateType) => {
  return state.boards.find((board) => board.isActive === true);
};
