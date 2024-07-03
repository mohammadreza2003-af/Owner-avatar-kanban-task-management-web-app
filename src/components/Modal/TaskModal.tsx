import { useDispatch } from "react-redux";
import { EditTaskModalProps } from "../../constants/types";
import RuButton from "../RuButton";
import { Label } from "../ui/label";
import { Modal } from "./Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toggleSubtaskCompletion } from "../../redux/boardSlice";

const TaskModal = ({
  isOpen,
  setIsOpen,
  task,
  setTask,
  title,
  column,
  subTitle,
  submitFuntion,
  boardName,
}: EditTaskModalProps & { boardName: string }) => {
  const dispatch = useDispatch();

  const numberOfComSubTask = task.subtasks.filter(
    (sub) => sub.isCompleted
  ).length;

  const toggleSubtask = (index: number) => {
    const updatedSubtasks = task.subtasks.map((subtask, subIndex) => {
      if (subIndex === index) {
        return { ...subtask, isCompleted: !subtask.isCompleted };
      }
      return subtask;
    });
    setTask((prevState) => ({ ...prevState, subtasks: updatedSubtasks }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <h2 className="text-colorLightGrey font-semibold text-lg">
        {task.title}
      </h2>
      <p className="text-colorLowGray">
        {task.description.length > 0 ? task.description : "No description"}
      </p>

      <span className="text-colorLightGrey font-semibold text-sm">
        Subtasks({numberOfComSubTask} of {task.subtasks.length})
      </span>
      {task.subtasks.map((sub, index) => {
        return (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              checked={sub.isCompleted}
              className="border-[rgb(244, 247, 253)]"
              id={`subtask-${index}`}
              onCheckedChange={() => {
                toggleSubtask(index);
                dispatch(
                  toggleSubtaskCompletion({
                    boardName,
                    taskId: task.title,
                    subtaskIndex: index,
                  })
                );
              }}
            />
            <Label
              htmlFor={`subtask-${index}`}
              className={`text-sm text-colorLightGrey font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                sub.isCompleted ? "line-through" : ""
              }`}
            >
              {sub.title}
            </Label>
          </div>
        );
      })}

      <Label className="text-colorLightGrey font-semibold">Status</Label>
      <Select
        onValueChange={(value) =>
          setTask((prevState) => ({
            ...prevState,
            status: value,
          }))
        }
        value={task.status}
        defaultValue={task.status}
      >
        <SelectTrigger className="w-full bg-colorMediumGrey text-colorLightGrey">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent className="bg-colorMediumGrey text-colorLightGrey">
          <SelectGroup>
            {column.map((col) => (
              <SelectItem
                key={col.name}
                value={col.name}
                defaultValue={col.name}
              >
                {col.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <RuButton
        customStyle={{
          className: "text-colorLightGrey rounded-full font-semibold",
          backgroundColor: { color: "rgb(100, 96, 199)" },
        }}
        functionlity={() => submitFuntion()}
      >
        {subTitle}
      </RuButton>
    </Modal>
  );
};

export default TaskModal;
