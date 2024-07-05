import { useMedia } from "react-use";
import Board from "../components/Board";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";

const Container = () => {
  const isMobile = useMedia("(max-width : 768px)");

  const [isSideBar, setIsSideBar] = useState(true);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (isMobile === false && isSideBar === false) {
      setCheck(false);
    }
    if (isMobile === false && isSideBar === true) {
      setCheck(true);
    }
  }, [isMobile, isSideBar]);

  return (
    <div className="flex w-full min-h-[87.5vh]">
      <div
        className={`${check ? "sidebar-show" : "sidebar-hide"} ${
          isMobile ? "hidden" : "flex"
        }  flex-shrink-0 absolute`}
      >
        <SideBar setIsSideBar={setIsSideBar} />
      </div>
      {!isMobile && (
        <button
          onClick={() => setIsSideBar(true)}
          className={`fixed ${
            check ? "sidebar-hide" : "sidebar-show"
          } bottom-[72px] py-[18px] bg-colorMainPurple text-colorLightGrey px-4 w-[78px] rounded-r-[28px] flex items-center font-semibold hover:text-colorMainPurple transition-all duration-300 ease-in-out`}
        >
          <img width={24} src="/assets/icon-show-sidebar.svg" />
        </button>
      )}

      <Board check={check} />
    </div>
  );
};

export default Container;
 