"use client";

import { Task } from "@/base/types/task";
import { StyledTaskItem } from "./styled.const";
import { edit, trash } from "@/base/constants/icons.const";
import { useUniversalContext } from "@/base/context/universalProvider";
import formatDate from "@/base/utils/formatDate";

export default function TaskItem({
  id = "",
  title,
  description,
  date,
  isDone,
}: Task) {
  const { theme, deleteTask } = useUniversalContext();

  function renderButton() {
    return isDone ? (
      <button className="done">Done</button>
    ) : (
      <button className="incomplete">Not Done</button>
    );
  }

  return (
    <StyledTaskItem theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {renderButton()}
        <button className="edit">{edit}</button>
        <button className="delete" onClick={() => deleteTask?.(id)}>
          {trash}
        </button>
      </div>
    </StyledTaskItem>
  );
}
