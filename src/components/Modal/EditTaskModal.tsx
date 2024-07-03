import React from "react";
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
  submitFunction,
}: EditTaskModalProps) => {
  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (!isTitleUnique(newTitle)) {
      return;
    }
    setTask((prevTask) => ({
      ...prevTask,
      title: newTitle,
    }));
  };

  const isTitleUnique = (newTitle: string) => {
    return (
      task.title !== newTitle &&
      !column.some((col) => col.tasks.some((t) => t.title === newTitle))
    );
  };

  const handleSubtaskTitleChange = (index: number, newTitle: string) => {
    if (!isSubtaskTitleUnique(index, newTitle)) {
      return;
    }
    const updatedSubtasks = task.subtasks.map((subtask, i) =>
      i === index ? { ...subtask, title: newTitle } : subtask
    );
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: updatedSubtasks,
    }));
  };

  const isSubtaskTitleUnique = (index: number, newTitle: string) => {
    return !task.subtasks.some(
      (subtask, i) => i !== index && subtask.title === newTitle
    );
  };

  const handleAddSubtask = () => {
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: [...prevTask.subtasks, { title: "", isCompleted: false }],
    }));
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = task.subtasks.filter((_, i) => i !== index);
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: updatedSubtasks,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <Label htmlFor="taskTitle" className="text-colorLightGrey font-semibold">
        Title
      </Label>
      <Input
        type="text"
        id="taskTitle"
        value={task.title}
        onChange={handleTaskTitleChange}
        placeholder="Enter task title"
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
          placeholder="Type your description here."
          id="description"
          value={task.description}
          onChange={(e) =>
            setTask((prevTask) => ({
              ...prevTask,
              description: e.target.value,
            }))
          }
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
            onChange={(e) => handleSubtaskTitleChange(index, e.target.value)}
            placeholder="Enter subtask title"
            className="bg-inherit rounded-md border-colorLowGray border"
          />
          <RuButton functionlity={() => handleRemoveSubtask(index)}>
            <img src="/assets/icon-cross.svg" alt="Delete subtask" />
          </RuButton>
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
      <Select
        onValueChange={(value) =>
          setTask((prevTask) => ({ ...prevTask, status: value }))
        }
        defaultValue={task.status}
      >
        <SelectTrigger className="w-full bg-colorMediumGrey text-colorLightGrey">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {column.map((col) => (
              <SelectItem key={col.id} value={col.name}>
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
        functionlity={submitFunction}
      >
        {subTitle}
      </RuButton>
    </Modal>
  );
};

export default EditTaskModal;
