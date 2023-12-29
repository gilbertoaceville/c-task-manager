"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { Task } from "@/base/types/task";
import Tasks from "@/components/sections/tasks";

export default function Done() {
  const { doneTasks } = useUniversalContext();
  return <Tasks title="Done Tasks" tasks={doneTasks as Task[]} />;
}
