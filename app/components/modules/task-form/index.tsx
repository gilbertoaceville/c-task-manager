"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { useUniversalContext } from "@/base/context/universalProvider";
import Button from "@/components/elements/button";
import { plus } from "@/base/constants/icons.const";

import { StyledTaskForm } from "./styled.const";
import { TaskFormProps } from "./types";

export default function TaskForm({ isEdit, title, btnText }: TaskFormProps) {
  const { theme, createTask, oneTask, updateTask } =
  useUniversalContext();

  const task = isEdit ? oneTask : {};
  const [formValues, setFormValues] = useState({
    title: task?.title || "",
    description: task?.description || "",
    date: "",
    done: false,
    priority: false,
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) {
    const { value, name, type } = event.target;
    const newValue = type === "checkbox" ? event.target.checked : value;

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    !isEdit
      ? createTask?.(formValues)
      : updateTask?.({
          id: oneTask?.id,
          title: formValues.title,
          description: formValues.description,
          isPriority: formValues.priority,
        });
  }

  return (
    <StyledTaskForm
      data-is-edit={String(isEdit)}
      onSubmit={handleSubmit}
      theme={theme}
    >
      <h1>{title}</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          value={formValues.title}
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          placeholder="Write a title"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={formValues.description}
          onChange={handleChange}
          name="description"
          id="description"
          rows={4}
          placeholder="Write a description"
        />
      </div>
      <div className="input-control date">
        <label htmlFor="date">Date</label>
        <input
          onChange={handleChange}
          value={formValues.date}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler complete">
        <label htmlFor="done">Toggle Done</label>
        <input
          onChange={handleChange}
          value={String(formValues.done)}
          type="checkbox"
          name="done"
          id="done"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="priority">Toggle Priority</label>
        <input
          value={String(formValues.priority)}
          onChange={handleChange}
          defaultChecked={task?.isPriority}
          type="checkbox"
          name="priority"
          id="priority"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button type="submit" icon={plus} name={btnText} />
      </div>
    </StyledTaskForm>
  );
}
