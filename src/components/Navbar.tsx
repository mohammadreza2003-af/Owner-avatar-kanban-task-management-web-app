import { useDispatch, useSelector } from "react-redux";
import { selectActiveBoard } from "../utils/selector";
import Dropdown from "./DropDown";
import { useEffect, useState } from "react";
import { TypeBoard } from "../constants/types";
import { defaultBoard } from "../constants/defaultValue";
import EditModal from "./Modal/EditModal";
import { deleteBoard, editBoardAndSave } from "../redux/boardSlice";
import DeleteModal from "./Modal/DeleteModal";
import RuButton from "./RuButton";

const Navbar = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const [editBoard, setEditBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>("");

  useEffect(() => {
    if (activeBoard) {
      setEditBoard(activeBoard);
    }
  }, [activeBoard]);

  console.log(activeBoard, "active Board");
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
            customStyle={{
              className: "rounded-full",
              padding: "12px 18px",
              backgroundColor: { color: "rgb(100, 96, 199)" },
            }}
          >
            + Add New Task
          </RuButton>
          <Dropdown setIsOpen={setDialogOpen} setTypeModal={setTypeModal} />
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
          title={"Delete Board"}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          onfunctionality={() => {
            dispatch(deleteBoard(activeBoard?.name));
            setDialogOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
