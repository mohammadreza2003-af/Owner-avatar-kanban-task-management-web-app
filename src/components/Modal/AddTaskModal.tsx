import { useState, useEffect } from "react";
import { AddTaskModalProps, ErrorStateAddTask } from "../../constants/types";
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
} from "../../components/ui/select";

const AddTaskModal = ({
  isOpen,
  setIsOpen,
  task,
  setTask,
  title,
  column,
  subTitle,
  submitFuntion,
}: AddTaskModalProps) => {
  const [errors, setErrors] = useState<ErrorStateAddTask>({
    title: "",
    subtasks: [],
    status: "",
  });

  console.log(errors, "ee");

  useEffect(() => {
    if (!isOpen) {
      setErrors({
        title: "",
        subtasks: [],
        status: "",
      });
    }
  }, [isOpen]);

  const validateTitle = (title: string): string => {
    return title.trim() === "" ? "Required" : "";
  };

  const validateSubtasks = (subtasks: Array<{ title: string }>): string[] => {
    return subtasks.map((subtask) =>
      subtask.title.trim() === "" ? "Required" : ""
    );
  };

  const validateStatus = (status: string): string => {
    return status.trim() === "" ? "Required" : "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevState) => ({ ...prevState, title: e.target.value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: validateTitle(e.target.value),
    }));
  };

  const handleSubtaskChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSubtasks = task.subtasks.map((subtask, subIndex) =>
      subIndex === index ? { ...subtask, title: e.target.value } : subtask
    );
    setTask((prevState) => ({ ...prevState, subtasks: updatedSubtasks }));
    setErrors((prevErrors) => {
      const newSubtaskErrors = [...prevErrors.subtasks];
      newSubtaskErrors[index] = validateTitle(e.target.value);
      return { ...prevErrors, subtasks: newSubtaskErrors };
    });
  };

  const handleStatusChange = (value: string) => {
    setTask((prevState) => ({ ...prevState, status: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      status: validateStatus(value),
    }));
  };

  const handleFormSubmit = () => {
    const titleError = validateTitle(task.title);
    const subtaskErrors = validateSubtasks(task.subtasks);
    const statusError = validateStatus(task.status);

    if (
      titleError ||
      subtaskErrors.some((error) => error !== "") ||
      statusError
    ) {
      setErrors({
        title: titleError,
        subtasks: subtaskErrors,
        status: statusError,
      });
    } else {
      submitFuntion();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <Label htmlFor="taskTitle" className="text-colorLightGrey font-semibold">
        Title
      </Label>
      <Input
        type="text"
        value={task?.title}
        onChange={handleTitleChange}
        id="taskTitle"
        placeholder="e.g. Web Design"
        className="bg-inherit rounded-md border-colorLowGray border text-colorLightGrey"
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}

      <div className="grid w-full gap-1.5">
        <Label
          htmlFor="description"
          className="text-colorLightGrey font-semibold mb-2"
        >
          Description (Optional)
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
      {task.subtasks.map((sub, index) => (
        <div
          className="flex items-center justify-between w-full gap-4 text-colorLightGrey"
          key={index}
        >
          <Input
            type="text"
            id="Subtasks"
            value={sub.title}
            onChange={(event) => handleSubtaskChange(index, event)}
            className="bg-inherit rounded-md border-colorLowGray border"
          />
          <RuButton
            functionlity={() => {
              const updatedSubtasks = task.subtasks.filter(
                (_, subIndex) => subIndex !== index
              );
              setTask((prevState) => ({
                ...prevState,
                subtasks: updatedSubtasks,
              }));
              setErrors((prevErrors) => {
                const newSubtaskErrors = prevErrors.subtasks.filter(
                  (_, subIndex) => subIndex !== index
                );
                return { ...prevErrors, subtasks: newSubtaskErrors };
              });
            }}
          >
            <img src="/assets/icon-cross.svg" />
          </RuButton>
          {errors.subtasks[index] && (
            <p className="text-red-500">{errors.subtasks[index]}</p>
          )}
        </div>
      ))}
      <RuButton
        customStyle={{
          className: "text-colorMainPurple rounded-full font-semibold",
          backgroundColor: { color: "rgb(244, 247, 253)" },
        }}
        functionlity={() => {
          const updatedSubtasks = [
            ...task.subtasks,
            { title: "", isCompleted: false },
          ];
          setTask((prevState) => ({ ...prevState, subtasks: updatedSubtasks }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            subtasks: [...prevErrors.subtasks, ""],
          }));
        }}
      >
        + Add New Subtask
      </RuButton>

      <Label className="text-colorLightGrey font-semibold">Status</Label>
      <Select onValueChange={handleStatusChange} defaultValue={task.status}>
        <SelectTrigger className="w-full bg-colorMediumGrey text-colorLightGrey">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {column.map((col) => (
              <SelectItem key={col.name} value={col.name}>
                {col.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.status && <p className="text-red-500">{errors.status}</p>}

      <RuButton
        customStyle={{
          className: "text-colorLightGrey rounded-full font-semibold",
          backgroundColor: { color: "rgb(100, 96, 199)" },
        }}
        functionlity={handleFormSubmit}
      >
        {subTitle}
      </RuButton>
    </Modal>
  );
};

export default AddTaskModal;
