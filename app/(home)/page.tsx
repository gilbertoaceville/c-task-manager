"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { Task } from "@/base/types/task";
import Tasks from "@/components/sections/tasks";

export default function Home() {
  const { tasks } = useUniversalContext();

  return <Tasks tasks={tasks as Task[]} title="All Tasks" />;
}
