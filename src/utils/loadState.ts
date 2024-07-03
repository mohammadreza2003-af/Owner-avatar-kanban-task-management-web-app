import { TypeBoards } from "../constants/types";

export const loadState = (): { boards: TypeBoards } | undefined => {
  try {
    const serializedState = localStorage.getItem("boards");
    if (serializedState === null) {
      return undefined;
    }
    return { boards: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};
