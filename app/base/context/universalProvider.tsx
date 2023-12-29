import { createContext, useContext, useState } from "react";
import useSWR from "swr";

import { Task } from "@/base/types/task";

import themes from "./themes";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

interface ContextProps {
  theme?: Record<string, string | any>;
  tasks?: Task[];
  doneTasks?: Task[];
  priorityTasks?: Task[];
  incompleteTasks?: Task[];
  isLoading?: boolean;
  deleteTask?: (id: string) => void;
  createTask?: (data: any) => void;
  updateTask?: (task: Task) => void;
}

export const UniversalContext = createContext<ContextProps>({
  theme: {},
});
export const UniversalUpdateContext = createContext(null);

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export function UniversalProvider({
  children,
  fetchData,
}: {
  children: React.ReactNode;
  fetchData?: boolean;
}) {
  const { user } = useUser();
  const [indexOfSelectedTheme, setIndexOfSelectedTheme] = useState(0);

  const { data, mutate, isLoading } = useSWR(
    fetchData ? "/api/tasks" : null,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const results = user ? data : [];
  const tasks: Task[] = isLoading ? [] : results;

  async function createTask(formValues: any) {
    try {
      const response = await axios.post("/api/tasks", formValues);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Created Task!");
      }

      mutate();
    } catch (error) {
      console.log("Something is not right!", error);
    }
  }

  async function deleteTask(id: string) {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task Deleted");

      mutate();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting task");
    }
  }

  async function updateTask(task: Pick<Task, "id" | "isDone">) {
    try {
      const response = await axios.put(`/api/tasks`, task);
      toast.success("Task Updated");

      mutate();
    } catch (error) {
      console.error(error);
      toast.error("Error updating task");
    }
  }

  const doneTasks = tasks?.filter((task) => task?.isDone);
  const priorityTasks = tasks?.filter((task) => task?.isPriority);
  const incompleteTasks = tasks?.filter((task) => !task?.isDone);

  return (
    <UniversalContext.Provider
      value={{
        theme: themes[indexOfSelectedTheme],
        tasks,
        isLoading,
        doneTasks,
        deleteTask,
        createTask,
        updateTask,
        priorityTasks,
        incompleteTasks,
      }}
    >
      <UniversalUpdateContext.Provider value={{} as any}>
        {children}
      </UniversalUpdateContext.Provider>
    </UniversalContext.Provider>
  );
}

export const useUniversalContext = () => useContext(UniversalContext);
export const useUniversalUpdate = () => useContext(UniversalUpdateContext);
