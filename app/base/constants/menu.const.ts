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
    title: "Essential!",
    icon: list,
    link: "/essential",
  },
  {
    id: 3,
    title: "Completed",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Take Action",
    icon: todo,
    link: "/incomplete",
  },
];
