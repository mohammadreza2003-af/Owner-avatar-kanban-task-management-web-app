import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { type ModalProps } from "../../constants/types";

export function Modal({
  isOpen,
  onClose,
  title,

  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-sm border-none bg-colorMediumGrey">
        <DialogHeader>
          <DialogTitle className="text-colorLightGrey">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
