"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { Task } from "@/base/types/task";
import Tasks from "@/components/sections/tasks";

export default function Incomplete() {
  const { incompleteTasks } = useUniversalContext();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks as Task[]} />;
}
