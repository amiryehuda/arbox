import React from "react";
import { Cell } from "./style-floorCell";

interface FloorCellProps {
  children: JSX.Element;
}

const FloorCell: React.FC<FloorCellProps> = ({ children }) => {
  return <Cell>{children}</Cell>;
};

export default FloorCell;
