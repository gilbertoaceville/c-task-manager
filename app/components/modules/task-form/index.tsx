"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { useUniversalContext } from "@/base/context/universalProvider";
import Button from "@/components/elements/button";

import { StyledTaskForm } from "./styled.const";

export default function TaskForm() {
  const { theme } = useUniversalContext();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
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

    try {
      const response = await axios.post("/api/tasks", formValues);

      if (response.data.error) {
        toast.error(response.data.error);
      }

      toast.success("Created Task!");
    } catch (error) {
      console.log("Something is not right!", error);
    }
  }

  return (
    <StyledTaskForm onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
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
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          onChange={handleChange}
          value={formValues.date}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
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
          type="checkbox"
          name="priority"
          id="priority"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button type="submit" name="Create Task" />
      </div>
    </StyledTaskForm>
  );
}
