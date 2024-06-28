import { activeBoard } from "../redux/boardSlice";

const Navbar = () => {
  return (
    <nav className="flex">
      <div className="flex gap-x-20">
        <div>
          <img src="/assets/logo-light.svg" />
        </div>
        <h2 className="text-xl text-colorLightGrey font-bold">
          {activeBoard.name}
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
