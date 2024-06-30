import { EditModalProps } from "../../constants/types";
import {
  handleAddColumn,
  handleChangeBoardName,
  handleColumnNameChange,
  handleDeleteColumn,
} from "../../utils/utils";
import RuButton from "../RuButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Modal } from "./Modal";

const EditModal = ({
  isOpen,
  setIsOpen,
  board,
  setBoard,
  title,
  subTitle,
  submitFuntion,
}: EditModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <Label htmlFor="boardName" className="text-colorLightGrey font-semibold">
        Board Name
      </Label>
      <Input
        type="text"
        value={board?.name}
        onChange={(e) => handleChangeBoardName(e, setBoard)}
        id="boardName"
        placeholder="e.g. Web Design"
        className="bg-inherit rounded-md border-colorLowGray border text-colorLightGrey"
      />

      <Label htmlFor="ColumnName" className="text-colorLightGrey font-semibold">
        Board Columns
      </Label>
      {board?.columns.map((col, index) => {
        return (
          <div className="flex items-center justify-between w-full gap-4 text-colorLightGrey">
            <Input
              type="text"
              id="ColumnName"
              value={col.name}
              onChange={(event) =>
                handleColumnNameChange(board, index, event, setBoard)
              }
              className="bg-inherit rounded-md border-colorLowGray border"
            />
            <RuButton
              functionlity={() => handleDeleteColumn(board, col.id, setBoard)}
            >
              <img src="/assets/icon-cross.svg" />
            </RuButton>
          </div>
        );
      })}
      <RuButton
        customStyle={{
          className: "text-colorMainPurple rounded-full font-semibold",
          backgroundColor: { color: "rgb(244, 247, 253)" },
        }}
        functionlity={() => handleAddColumn(board, setBoard)}
      >
        + Add New Column
      </RuButton>
      <RuButton
        customStyle={{
          className: "text-colorLightGrey rounded-full font-semibold",
          backgroundColor: { color: "rgb(100, 96, 199)" },
        }}
        functionlity={() => submitFuntion()}
      >
        {subTitle}
      </RuButton>
    </Modal>
  );
};

export default EditModal;
