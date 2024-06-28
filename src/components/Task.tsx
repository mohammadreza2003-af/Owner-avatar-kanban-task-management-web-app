const Task = ({ data }) => {
  console.log(data, "Task");
  return (
    <div className="flex bg-colorMediumGrey rounded-lg px-4 py-4 w-[280px]">
      <h2 className="font-semibold text-2xl text-colorLightGrey">
        {data.title}
      </h2>
    </div>
  );
};

export default Task;
