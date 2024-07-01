import { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import RuButton from "./RuButton";

export function Dropdown({
  setIsOpen,
  setTypeModal,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTypeModal: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <RuButton>
            <img src="/assets/icon-vertical-ellipsis.svg" />
          </RuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[100px] rounded-sm border-none bg-colorHighGrey  mt-4 mr-8">
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
              setTypeModal("edit");
            }}
            className="focus-visible:outline-none text-colorLightGrey"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
              setTypeModal("delete");
            }}
            className="focus-visible:outline-none text-colorRed"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Dropdown;
