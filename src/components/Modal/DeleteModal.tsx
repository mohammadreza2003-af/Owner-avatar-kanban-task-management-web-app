import { DeleteModalProps } from "../../constants/types";
import RuButton from "../RuButton";
import { Modal } from "./Modal";

const DeleteModal = ({
  isOpen,
  setIsOpen,
  title,
  onfunctionality,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <p className="text-colorLowGray mb-2">
        Are you sure you want to delete the "Marketing Plan" board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex w-full justify-between items-center">
        <RuButton
          customStyle={{
            className: "text-colorLightGrey rounded-full font-semibold",
            backgroundColor: { color: "rgb(234, 85, 85)" },
            padding: "12px 80px",
          }}
          functionlity={() => onfunctionality()}
        >
          Delete
        </RuButton>
        <RuButton
          customStyle={{
            className: "text-colorMainPurple rounded-full font-semibold",
            backgroundColor: { color: "rgb(244, 247, 253)" },
            padding: "12px 80px",
          }}
          functionlity={() => setIsOpen(false)}
        >
          Cancle
        </RuButton>
      </div>
    </Modal>
  );
};

export default DeleteModal;
