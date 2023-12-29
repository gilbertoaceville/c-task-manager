"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { Task } from "@/base/types/task";
import Tasks from "@/components/sections/tasks";

export default function Priority() {
  const { priorityTasks } = useUniversalContext();
  return <Tasks title="Priority Tasks" tasks={priorityTasks as Task[]} />;
}
