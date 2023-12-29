"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { StyledTasks } from "./styled.const";
import { add, plus } from "@/base/constants/icons.const";
import TaskForm from "@/components/modules/task-form";
import { TaskProps } from "./types";
import TaskItem from "./component/task-item";

export default function Tasks({ title, tasks }: TaskProps) {
  const { theme, isLoading } = useUniversalContext();

  return (
    <StyledTasks theme={theme}>
      <h1>{title}</h1>

      <button className="btn-rounded">{plus}</button>

      <div className="tasks grid">
        {!isLoading ? (
          tasks?.map((task) => <TaskItem key={task.id} {...task} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )}
        <button className="create-task">
          {add}
          Add New Task
        </button>
      </div>

      <TaskForm />
    </StyledTasks>
  );
}
