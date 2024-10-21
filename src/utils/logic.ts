import { ReactElement, ReactNode } from "react";

export function isChildReactComponent(child: ReactNode): child is ReactElement {
  return child !== null && typeof child === "object" && "type" in child;
}
