import { NavModalProps } from "../../constants/types";
import SideBar from "../SideBar";
import { Modal } from "./Modal";

const NavModal = ({ isOpen, setIsOpen, title }: NavModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <SideBar setIsOpen={setIsOpen} />
    </Modal>
  );
};

export default NavModal;
