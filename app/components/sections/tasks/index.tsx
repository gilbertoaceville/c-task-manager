"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { StyledTasks } from "./styled.const";
import Link from "next/link";
import TaskForm from "@/components/modules/task-form";

export default function Tasks() {
  const { theme } = useUniversalContext();

  return (
    <StyledTasks theme={theme}>
      <TaskForm />
    </StyledTasks>
  );
}
