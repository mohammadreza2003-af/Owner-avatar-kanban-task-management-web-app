import { useMedia } from "react-use";
import Board from "../components/Board";
import SideBar from "../components/SideBar";
import { useState } from "react";

const Container = () => {
  const isMobile = useMedia("(max-width : 768px)");
  const [isSideBar, setIsSideBar] = useState(true);
  let check;
  if (isMobile === false && isSideBar === false) {
    check = false;
  }
  if (isMobile === false && isSideBar === true) {
    check = true;
  }
  return (
    <div className="flex w-full min-h-[87.4vh]">
      {check && <SideBar setIsSideBar={setIsSideBar} />}
      {check === false && (
        <button
          onClick={() => setIsSideBar(true)}
          className="fixed bottom-[70px] py-[18px] bg-colorMainPurple text-colorLightGrey px-4 w-[78px] rounded-r-[28px] flex items-center font-semibold hover:text-colorMainPurple transition-all duration-300 ease-in-out"
        >
          <img width={24} src="/assets/icon-show-sidebar.svg" />
        </button>
      )}
      <Board />
    </div>
  );
};

export default Container;
