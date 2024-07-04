import React, { useState, useEffect } from "react";
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
  submitFunction,
}: AddTaskModalProps) => {
  const [errors, setErrors] = useState<ErrorStateAddTask>({
    title: "",
    subtasks: [],
    status: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setErrors({
        title: "",
        subtasks: [],
        status: "",
      });
    }
  }, [isOpen]);

  console.log(column, "col", task.status);

  const validateTitle = (title: string): string => {
    const isDuplicate = column
      ?.filter((t) => t.name === task.status)[0]
      ?.tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());

    console.log(isDuplicate, "isDup");
    if (title.trim() === "") {
      return "Required";
    }
    if (isDuplicate) return "Used";

    return "";
  };
  const validateSubtasks = (subtasks: Array<{ title: string }>): string[] => {
    const subtaskTitles = subtasks.map((subtask) => subtask.title.trim());
    const titleCounts = subtaskTitles.reduce((counts, title) => {
      counts[title] = (counts[title] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });

    const errors = subtaskTitles.map((title) =>
      title === "" ? "Required" : titleCounts[title] > 1 ? "Used" : ""
    );

    console.log(errors, "Eee");
    return errors;
  };
  const validateStatus = (status: string): string => {
    return status.trim() === "" ? "Required" : "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTask((prevState) => ({ ...prevState, title: newTitle }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: validateTitle(newTitle),
    }));
  };

  const handleSubtaskChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSubtasks = [...task.subtasks];
    newSubtasks[index] = { ...newSubtasks[index], title: e.target.value };
    setTask((prevState) => ({ ...prevState, subtasks: newSubtasks }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      subtasks: validateSubtasks(newSubtasks),
    }));
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
      submitFunction();
    }
  };

  const handleAddSubtask = () => {
    setTask((prevState) => ({
      ...prevState,
      subtasks: [...prevState.subtasks, { title: "", isCompleted: false }],
    }));
  };

  const handleRemoveSubtask = (index: number) => {
    const newSubtasks = [...task.subtasks];
    newSubtasks.splice(index, 1);
    setTask((prevState) => ({
      ...prevState,
      subtasks: newSubtasks,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      subtasks: validateSubtasks(newSubtasks),
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <Label htmlFor="taskTitle" className="text-colorLightGrey font-semibold">
        Title
      </Label>
      <Input
        type="text"
        value={task.title}
        onChange={handleTitleChange}
        id="taskTitle"
        placeholder="Enter task title"
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
          placeholder="Type your description here."
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

      <Label htmlFor="subtasks" className="text-colorLightGrey font-semibold">
        Subtasks
      </Label>
      {task.subtasks.map((subtask, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-full gap-4 text-colorLightGrey"
        >
          <Input
            type="text"
            id={`subtask-${index}`}
            value={subtask.title}
            onChange={(e) => handleSubtaskChange(index, e)}
            placeholder="Enter subtask title"
            className="bg-inherit rounded-md border-colorLowGray border"
          />
          <RuButton functionlity={() => handleRemoveSubtask(index)}>
            <img src="/assets/icon-cross.svg" alt="Delete subtask" />
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
        functionlity={handleAddSubtask}
      >
        + Add New Subtask
      </RuButton>

      <Label className="text-colorLightGrey font-semibold">Status</Label>
      <Select onValueChange={handleStatusChange} defaultValue={task.status}>
        <SelectTrigger className="w-full bg-colorMediumGrey text-colorLightGrey">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent className="bg-colorMediumGrey text-colorLightGrey">
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
