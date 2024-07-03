import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { selectActiveBoard } from "../utils/selector";
import { useEffect, useState } from "react";
import { StateType, TypeBoard, TypeTask } from "../constants/types";
import { addBoard, editBoardAndSave, editTask } from "../redux/boardSlice";
import { defaultBoard } from "../constants/defaultValue";
import EditModal from "./Modal/EditModal";
import EditTaskModal from "./Modal/EditTaskModal";
import TaskModal from "./Modal/TaskModal";
import RuButton from "./RuButton";
import DeleteModal from "./Modal/DeleteModal";

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const [newBoard, setNewBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const boards = useSelector((state: StateType) => state.boards);
  const [editBoard, setEditBoard] = useState<TypeBoard>(defaultBoard);
  const [indexes, setIndexes] = useState<{
    taskIndex: number;
    colIndex: number;
  }>({
    taskIndex: 0,
    colIndex: 0,
  });

  console.log(boards);

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

  useEffect(() => {
    if (!isDialogOpen && activeBoard) {
      setEditBoard(activeBoard);
    }
  }, [activeBoard, isDialogOpen]);

  if (boards.length === 0) {
    return (
      <>
        <div className="w-full flex flex-col space-y-4 bg-colorHighGrey py-4 px-4 items-center justify-center overflow-x-scroll max-h-[87.5vh] ">
          <h2 className="font-semibold text-colorLightWhite text-xl">
            This board is empty. Create a new column to get started.
          </h2>
          <RuButton
            customStyle={{
              className: "rounded-full",
              padding: "16px 18px",
              backgroundColor: { color: "rgb(100, 96, 199)" },
            }}
            functionlity={() => {
              setDialogOpen(true);
              setTypeModal("addTask");
            }}
          >
            + Create New Board
          </RuButton>
        </div>
        {isDialogOpen && typeModal === "addTask" && (
          <EditModal
            title={"Add new board"}
            board={newBoard}
            setBoard={setNewBoard}
            isOpen={isDialogOpen}
            setIsOpen={setDialogOpen}
            subTitle={"Create New Board"}
            submitFuntion={() => {
              dispatch(addBoard(newBoard));
              setDialogOpen(false);
              setNewBoard(defaultBoard);
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="w-full flex-1 bg-colorHighGrey py-4 px-4 overflow-x-scroll max-h-[87.5vh] ">
      <div className="flex gap-x-8 w-full min-h-[540px]">
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
        {activeBoard && activeBoard?.columns.length <= 6 && (
          <div className="min-w-[280px] min-h-[540px]">
            <p className="text-colorLowGray mb-3">Create Board</p>
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
        )}
      </div>
      {typeModal === "edit" && isDialogOpen && (
        <EditModal
          title={"Edit Board"}
          board={editBoard}
          type="addColumn"
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
          submitFunction={() => {
            dispatch(
              editTask({ task: task, boardName: editBoard.name, indexes })
            );
            setDialogOpen(false);
          }}
        />
      )}
      {typeModal === "task" && isDialogOpen && (
        <TaskModal
          title={"Task"}
          task={task}
          setTask={setTask}
          column={editBoard.columns}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Save Chenges"}
          setTypeModal={setTypeModal}
          boardName={activeBoard?.name || ""}
          submitFunction={() => {
            dispatch(
              editTask({ task: task, boardName: editBoard.name, indexes })
            );
            setDialogOpen(false);
          }}
        />
      )}
      {isDialogOpen && typeModal === "deleteTask" && (
        <DeleteModal
          des={`Are you sure you want to delete the task.`}
          title={"Delete Task"}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          onfunctionality={() => {
            setDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Board;
