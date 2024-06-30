import { useSelector } from "react-redux";
import { selectActiveBoard } from "../utils/selector";
import { Button } from "./ui/button";

const Navbar = () => {
  const activeBoard = useSelector(selectActiveBoard);

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-x-20">
        <div>
          <img src="/assets/logo-light.svg" />
        </div>
        <h2 className="text-xl text-colorLightGrey font-bold">
          {activeBoard?.name}
        </h2>
      </div>
      <div>
        <div>
          <Button>
            <img src="/assets/icon-vertical-ellipsis.svg" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
