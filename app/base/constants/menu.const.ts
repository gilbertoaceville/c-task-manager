import { list, check, todo, home } from "./icons.const";

export const menuItems = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Priority!",
    icon: list,
    link: "/priority",
  },
  {
    id: 3,
    title: "Done",
    icon: check,
    link: "/done",
  },
  {
    id: 4,
    title: "Take Action",
    icon: todo,
    link: "/incomplete",
  },
];
