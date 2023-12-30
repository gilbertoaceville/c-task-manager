import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
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
  oneTask?: Task;
  isLoading?: boolean;
  getOneTask?: (id: string) => void;
  deleteTask?: (id: string) => void;
  createTask?: (data: any) => void;
  updateTask?: (task: Task) => void;
  modal?: boolean;
  editModal?: boolean;
  setModal?: Dispatch<SetStateAction<boolean>>;
  setEditModal?: Dispatch<SetStateAction<boolean>>;
  isOpenedMenu?: boolean;
  handleOpenMenu?: () => void;
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
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [oneTask, setOneTask] = useState<Task>({});

  const { data, mutate, isLoading } = useSWR(
    fetchData ? "/api/tasks" : null,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const tasksData: Task[] = [
    {
      id: "12",
      title: "Default title",
      description: "Default description",
      isDone: true,
      isPriority: true,
      date: "2023-12-28",
      userId: "user_2aAHXx4gPzm4ePbYPabKtnicxCB",
      createdAt: "2023-12-29T11:35:51.237+00:00",
      updatedAt: "2023-12-29T11:35:51.237+00:00",
    },
  ];

  const results: Task[] = user ? data : [];
  const tasks =
    results?.length > 0
      ? results?.sort((a, b) => {
          // Use the nullish coalescing operator to handle potential undefined values
          const dateA = new Date(a.createdAt ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateB - dateA;
        })
      : [];

  async function createTask(formValues: any) {
    try {
      const response = await axios.post("/api/tasks", formValues);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Created Task!");
      }

      mutate();
      setModal(false);
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

  async function updateTask(task: Task) {
    try {
      const response = await axios.put(`/api/tasks`, task);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Task Updated");
      }

      if (editModal) setEditModal(false);

      mutate();
    } catch (error) {
      console.error(error);
      toast.error("Error updating task");
    }
  }

  function handleOpenMenu() {
    setIsOpenedMenu?.(!isOpenedMenu);
  }

  function getOneTask(id: string) {
    const task = tasks?.find((task) => task.id === id);
    setOneTask(task as Task);
  }

  const doneTasks =
    tasks?.length > 0 ? tasks?.filter((task) => task?.isDone) : [];
  const priorityTasks =
    tasks?.length > 0 ? tasks?.filter((task) => task?.isPriority) : [];
  const incompleteTasks =
    tasks?.length > 0 ? tasks?.filter((task) => !task?.isDone) : [];

  return (
    <UniversalContext.Provider
      value={{
        theme: themes[indexOfSelectedTheme],
        tasks,
        isLoading,
        doneTasks,
        oneTask,
        getOneTask,
        deleteTask,
        createTask,
        updateTask,
        priorityTasks,
        incompleteTasks,
        modal,
        setModal,
        editModal,
        setEditModal,
        isOpenedMenu,
        handleOpenMenu,
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
