"use client";

import { ChangeEvent, useState } from "react";
import { StyledTaskForm } from "./styled.const";

export default function TaskForm() {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "",
    done: false,
    priority: false,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name, type, checked } = event.target;
    const newValue = type === "checkbox" ? event.target.checked : value;

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  }

  return <StyledTaskForm>TaskForm</StyledTaskForm>;
}
