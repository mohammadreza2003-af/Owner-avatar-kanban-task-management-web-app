import { DeleteModalProps } from "../../constants/types";
import RuButton from "../RuButton";
import { Modal } from "./Modal";

const DeleteModal = ({
  isOpen,
  setIsOpen,
  title,
  onfunctionality,
  des,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <p className="text-colorLowGray mb-2">{des}</p>
      <div className="md:flex-row md:gap-x-4 flex gap-y-4 w-full flex-col md:items-center justify-between items-center">
        <RuButton
          customStyle={{
            className: "text-colorLightGrey rounded-full font-semibold w-full",
            backgroundColor: { color: "rgb(234, 85, 85)" },
            padding: "12px 80px",
          }}
          functionlity={() => onfunctionality()}
        >
          Delete
        </RuButton>
        <RuButton
          customStyle={{
            className: "text-colorMainPurple rounded-full font-semibold w-full",
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
