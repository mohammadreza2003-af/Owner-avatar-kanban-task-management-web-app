export type TypeBoards = TypeBoard[];

export type TypeBoard = {
  name: string;
  isActive: boolean;
  columns: TypeColumn[];
};

export type TypeColumn = {
  name: string;
  tasks: TypeTask[];
};

export type TypeTask = {
  title: string;
  description: string;
  status: string;
  subtasks: { title: string; isCompleted: boolean }[];
};

export type StateType = {
  boards: TypeBoards;
};
