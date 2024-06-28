import { useSelector } from "react-redux";

const SideBar = () => {
  const borads = useSelector((state) => state.boards);
  return (
    <div className="w-[260px] flex-shrink-0 col-span-4  bg-colorMediumGrey py-4 max-h-[87.5vh]">
      <p className="font-semibold text-lg text-colorLightWhite ml-4">
        All board ({borads.length})
      </p>
      <div className="flex flex-col items-start mt-8 w-full">
        {borads.map((board) => (
          <>
            <button
              className={`${
                board.isActive === true ? "bg-colorMainPurple" : ""
              }  px-4 w-[90%] rounded-r-[28px] py-4 flex items-center text-colorLightGrey font-semibold hover:text-colorMainPurple hover:bg-colorLightGrey transition-all duration-300 ease-in-out`}
            >
              <img
                src="/assets/icon-board.svg"
                alt="icon-board"
                className="mr-4"
              />
              {board.name}
            </button>
          </>
        ))}
        <button
          className={`px-4 w-[90%] rounded-r-[28px] py-4 flex items-center text-colorMainPurple font-semibold hover:text-colorMainPurple hover:bg-colorLightGrey transition-all duration-300 ease-in-out`}
        >
          <img src="/assets/icon-board.svg" alt="icon-board" className="mr-4" />
          + Create New Board
        </button>
      </div>
    </div>
  );
};

export default SideBar;
