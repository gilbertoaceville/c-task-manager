"use client";

import { useUniversalContext } from "@/base/context/universalProvider";

import React from "react";
import { ButtonProps } from "./types";
import { StyledButton } from "./styled.const";

export default function Button({
  icon,
  name,
  variant = "primary",
  click,
  type,
}: ButtonProps) {
  const { theme } = useUniversalContext();

  return (
    <StyledButton
      data-variant={variant}
      type={type}
      theme={theme}
      onClick={click}
    >
      {icon && icon}
      {name}
    </StyledButton>
  );
}
