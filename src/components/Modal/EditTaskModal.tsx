import { EditTaskModalProps } from "../../constants/types";
import RuButton from "../RuButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Modal } from "./Modal";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const EditTaskModal = ({
  isOpen,
  setIsOpen,
  task,
  setTask,
  title,
  column,
  subTitle,
  submitFuntion,
}: EditTaskModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <Label htmlFor="boardName" className="text-colorLightGrey font-semibold">
        Title
      </Label>
      <Input
        type="text"
        value={task?.title}
        onChange={(e) =>
          setTask((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        }
        id="boardName"
        placeholder="e.g. Web Design"
        className="bg-inherit rounded-md border-colorLowGray border text-colorLightGrey"
      />
      <div className="grid w-full gap-1.5">
        <Label
          htmlFor="description"
          className="text-colorLightGrey font-semibold mb-2"
        >
          Description
        </Label>
        <Textarea
          placeholder="Type your message here."
          id="description"
          onChange={(e) =>
            setTask((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          value={task.description}
          className="bg-inherit rounded-md border-colorLowGray border text-colorLightGrey"
        />
      </div>
      <Label htmlFor="Subtasks" className="text-colorLightGrey font-semibold">
        Subtasks
      </Label>
      {task.subtasks.map((sub) => {
        return (
          <div className="flex items-center justify-between w-full gap-4 text-colorLightGrey">
            <Input
              type="text"
              id="Subtasks"
              value={sub.title}
              onChange={(event) => {
                const updataTask = task.subtasks.map((col) => {
                  if (col.title === sub.title) {
                    return {
                      ...col,
                      title: event.target.value,
                    };
                  }
                  return col;
                });
                setTask((prevState) => ({
                  ...prevState,
                  subtasks: updataTask,
                }));
              }}
              className="bg-inherit rounded-md border-colorLowGray border"
            />
            <RuButton
              functionlity={() => {
                const updataTask = task.subtasks.filter(
                  (col) => col.title !== sub.title
                );
                setTask((prevState) => ({
                  ...prevState,
                  subtasks: updataTask,
                }));
              }}
            >
              <img src="/assets/icon-cross.svg" />
            </RuButton>
          </div>
        );
      })}
      <RuButton
        customStyle={{
          className: "text-colorMainPurple rounded-full font-semibold",
          backgroundColor: { color: "rgb(244, 247, 253)" },
        }}
        functionlity={() => {
          const updateTask = [...task.subtasks];
          updateTask.push({
            title: "",
            isCompleted: false,
          });
          setTask((prevState) => ({ ...prevState, subtasks: updateTask }));
        }}
      >
        + Add New Subtask
      </RuButton>
      <Label className="text-colorLightGrey font-semibold">Status</Label>
      <Select
        onValueChange={(value) =>
          setTask((prevState) => ({
            ...prevState,
            status: value,
          }))
        }
        defaultValue={task.status}
      >
        <SelectTrigger className="w-full bg-colorMediumGrey text-colorLightGrey">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>State</SelectLabel>
            {column.map((col) => (
              <SelectItem value={col.name}>{col.name}</SelectItem>
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

export default EditTaskModal;
