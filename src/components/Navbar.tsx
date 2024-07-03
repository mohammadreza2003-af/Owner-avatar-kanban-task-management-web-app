import { useDispatch, useSelector } from "react-redux";
import { selectActiveBoard } from "../utils/selector";
import Dropdown from "./DropDown";
import { useEffect, useState } from "react";
import { StateType, TypeBoard, TypeTask } from "../constants/types";
import { defaultBoard } from "../constants/defaultValue";
import EditModal from "./Modal/EditModal";
import { addTask, deleteBoard, editBoardAndSave } from "../redux/boardSlice";
import DeleteModal from "./Modal/DeleteModal";
import RuButton from "./RuButton";
import AddTaskModal from "./Modal/AddTaskModal";

const Navbar = () => {
  const dispatch = useDispatch();

  const defalutTask = {
    title: "",
    description: "",
    status: "",
    subtasks: [],
  };
  const activeBoard = useSelector(selectActiveBoard);
  const boards = useSelector((state: StateType) => state.boards);
  const [editBoard, setEditBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>("");
  const [task, setTask] = useState<TypeTask>(defalutTask);

  useEffect(() => {
    if (activeBoard) {
      setEditBoard(activeBoard);
    }
    if (!isDialogOpen && activeBoard) {
      setEditBoard(activeBoard);
      setTask(defalutTask);
    }
  }, [activeBoard, isDialogOpen]);

  return (
    <nav className="flex items-center w-full">
      <div className="min-w-[260px] flex items-center justify-center h-[104px] border-r border-r-slate-600 md:py-8 py-8">
        <img src="/assets/logo-light.svg" />
      </div>
      <div className="flex justify-between w-full items-center md:px-6 px-4 md:py-8 py-8">
        <h2 className="text-2xl text-colorLightGrey font-bold">
          {activeBoard?.name}
        </h2>
        <div className="flex items-center gap-x-6">
          <RuButton
            disable={boards.length > 0 ? false : true}
            customStyle={{
              className: "rounded-full",
              padding: "12px 18px",
              backgroundColor: { color: "rgb(100, 96, 199)" },
            }}
            functionlity={() => {
              setDialogOpen(true);
              setTypeModal("addTask");
            }}
          >
            + Add New Task
          </RuButton>
          <Dropdown
            typeModal={{
              yes: "edit",
              no: "delete",
            }}
            disable={boards.length > 0 ? false : true}
            setIsOpen={setDialogOpen}
            setTypeModal={setTypeModal}
          />
        </div>
      </div>
      {isDialogOpen && typeModal === "edit" && (
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
      {isDialogOpen && typeModal === "delete" && (
        <DeleteModal
          des={`Are you sure you want to delete the "Marketing Plan" board? This action will remove all columns and tasks and cannot be reversed.`}
          title={"Delete Board"}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          onfunctionality={() => {
            dispatch(deleteBoard(activeBoard?.name));
            setDialogOpen(false);
          }}
        />
      )}
      {typeModal === "addTask" && isDialogOpen && (
        <AddTaskModal
          title={"Edit Task"}
          task={task}
          setTask={setTask}
          column={editBoard.columns}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Save Chenges"}
          submitFunction={() => {
            dispatch(addTask(task));
            setDialogOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
