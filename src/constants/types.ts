import { ReactNode } from "react";

export type TypeBoards = TypeBoard[];

export type TypeBoard = {
  name: string;
  isActive: boolean;
  columns: TypeColumn[];
};

export type TypeColumn = {
  name: string;
  tasks: TypeTask[];
  id: number;
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
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
};
