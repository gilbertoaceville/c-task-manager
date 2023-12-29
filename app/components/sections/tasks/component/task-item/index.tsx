"use client";

import { Task } from "@/base/types/task";
import { edit, trash } from "@/base/constants/icons.const";
import { useUniversalContext } from "@/base/context/universalProvider";
import formatDate from "@/base/utils/formatDate";
import TaskForm from "@/components/modules/task-form";
import { Dialog, DialogContent } from "@/ui/dialog";

import { StyledTaskItem } from "./styled.const";

export default function TaskItem({
  id = "",
  title,
  description,
  date,
  isDone,
}: Task) {
  const { theme, editModal, deleteTask, updateTask, setEditModal, getOneTask } =
    useUniversalContext();

  async function handleUpdate() {
    const task = {
      id,
      isDone: !isDone,
    };

    await updateTask?.(task);
  }

  function renderButton() {
    return isDone ? (
      <button className="done" onClick={handleUpdate}>
        Done
      </button>
    ) : (
      <button className="incomplete" onClick={handleUpdate}>
        Not Done
      </button>
    );
  }

  function handleEdit() {
    setEditModal?.(true);
    getOneTask?.(id);
  }

  return (
    <StyledTaskItem theme={theme}>
      <Dialog open={editModal} onOpenChange={(close) => setEditModal?.(close)}>
        <DialogContent forceMount={true} size="xl">
          <TaskForm isEdit title="Update a task" btnText="Update task" />
        </DialogContent>
      </Dialog>

      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date as string)}</p>
      <div className="task-footer">
        {renderButton()}
        <button onClick={handleEdit} className="edit">
          {edit}
        </button>
        <button className="delete" onClick={() => deleteTask?.(id)}>
          {trash}
        </button>
      </div>
    </StyledTaskItem>
  );
}
