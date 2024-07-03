import { useMedia } from "react-use";
import Board from "../components/Board";
import SideBar from "../components/SideBar";

const Container = () => {
  const isMobile = useMedia("(max-width : 768px)");

  return (
    <div className="flex w-full min-h-[87.4vh]">
      {!isMobile && <SideBar />}
      <Board />
    </div>
  );
};

export default Container;
