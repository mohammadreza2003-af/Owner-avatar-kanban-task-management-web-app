import Board from "../components/Board";
import SideBar from "../components/SideBar";

const Container = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <Board />
    </div>
  );
};

export default Container;
