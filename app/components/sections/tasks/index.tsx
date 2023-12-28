"use client";

import { useUniversalContext } from "@/base/context/universalProvider";
import { StyledTasks } from "./styled.const";

export default function Tasks() {
  const { theme } = useUniversalContext();

  return <StyledTasks theme={theme}>Tasks</StyledTasks>;
}
