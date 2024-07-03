import { TypeBoard } from "./types";

export const defaultBoard: TypeBoard = {
  name: "",
  isActive: false,
  columns: [
    {
      name: "Todo",
      tasks: [],
      id: 1,
    },
    {
      name: "Doing",
      tasks: [],
      id: 2,
    },
    {
      name: "Done",
      tasks: [],
      id: 3,
    },
  ],
};
