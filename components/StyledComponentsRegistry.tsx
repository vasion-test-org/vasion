"use client";

import { ReactNode } from "react";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface StyledComponentsRegistryProps {
  children: ReactNode;
}

export default function StyledComponentsRegistry({ children }: StyledComponentsRegistryProps) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      {children}
    </StyleSheetManager>
  );
}
