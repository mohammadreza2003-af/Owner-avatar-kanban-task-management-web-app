import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { type ModalProps } from "../../constants/types";

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-sm border-none bg-colorMediumGrey">
        <DialogHeader>
          <DialogTitle className="text-colorLightGrey">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
