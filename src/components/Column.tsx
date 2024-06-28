import Task from "./Task";

const Column = ({ data }) => {
  console.log(data);
  return (
    <div>
      <p className="text-colorLightGrey mb-4">Todo ({data.tasks.length})</p>
      <div className="flex flex-col gap-y-4">
        {data.tasks.map((task) => (
          <Task data={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
