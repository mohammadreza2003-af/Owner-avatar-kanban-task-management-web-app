import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { selectActiveBoard } from "../utils/selector";
import { useEffect, useState } from "react";
import { TypeBoard, TypeTask } from "../constants/types";
import { editBoardAndSave, editTask } from "../redux/boardSlice";
import { defaultBoard } from "../constants/defaultValue";
import EditModal from "./Modal/EditModal";
import EditTaskModal from "./Modal/EditTaskModal";

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  console.log(activeBoard);

  const [editBoard, setEditBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [indexes, setIndexes] = useState<{
    taskIndex: number;
    colIndex: number;
  }>({
    taskIndex: 0,
    colIndex: 0,
  });

  console.log(activeBoard, "indexes");
  const [typeModal, setTypeModal] = useState<string>("");
  const [task, setTask] = useState<TypeTask>({
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
        title: "",
        isCompleted: false,
      },
    ],
  });
  useEffect(() => {
    if (activeBoard) {
      setEditBoard(activeBoard);
    }
  }, [activeBoard]);

  console.log(task, "Task");
  return (
    <div className="w-full flex-1 bg-colorHighGrey py-4 px-4 overflow-x-scroll max-h-[87.5vh] ">
      <div className="flex gap-x-8 w-full">
        {activeBoard?.columns.map((col, index) => (
          <Column
            setDialogOpen={setDialogOpen}
            setTask={setTask}
            setTypeModal={setTypeModal}
            key={col.name}
            colIndex={index}
            data={col}
            setIndexes={setIndexes}
          />
        ))}
        <div className="min-w-[280px]">
          <p className="text-colorLowGray mb-4">Create Board</p>
          <div
            onClick={() => {
              setTypeModal("edit");
              setDialogOpen(true);
            }}
            className="flex flex-col gap-y-4 bg-colorMediumGrey text-colorLowGray hover:text-colorMainPurple w-full h-full rounded-lg justify-center items-center transition-all duration-300 ease-in-out cursor-pointer"
          >
            <button className="text-2xl font-semibold">+ New Column</button>
          </div>
        </div>
      </div>
      {typeModal === "edit" && isDialogOpen && (
        <EditModal
          title={"Edit Board"}
          board={editBoard}
          setBoard={setEditBoard}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Save Chenges"}
          submitFuntion={() => {
            dispatch(editBoardAndSave(editBoard));
            setDialogOpen(false);
          }}
        />
      )}
      {typeModal === "editTask" && isDialogOpen && (
        <EditTaskModal
          title={"Edit Task"}
          task={task}
          setTask={setTask}
          column={editBoard.columns}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Save Chenges"}
          submitFuntion={() => {
            dispatch(
              editTask({ task: task, boardName: editBoard.name, indexes })
            );
            setDialogOpen(false);
          }}
        />
      )}
      {typeModal === "addTask" && isDialogOpen && (
        <EditTaskModal
          title={"Edit Task"}
          task={task}
          setTask={setTask}
          column={editBoard.columns}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Save Chenges"}
          submitFuntion={() => {
            dispatch(
              editTask({ task: task, boardName: editBoard.name, indexes })
            );
            setDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Board;
