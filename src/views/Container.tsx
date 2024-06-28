import Board from "../components/Board";
import SideBar from "../components/SideBar";

const Container = () => {
  return (
    <div className="flex w-full min-h-[87.5vh]">
      <SideBar />
      <Board />
    </div>
  );
};

export default Container;
