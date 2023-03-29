import React from "react";
import { Cell } from "../FloorCell/style-floorCell";

interface SideColumnsProps {
  floor?: number;
  children: JSX.Element[] | string[];
}

const SideColumns: React.FC<SideColumnsProps> = ({ floor, children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "600px",
        margin: "0px 18px",
      }}
    >
      {children.map((child, index) => (
        <Cell
          style={{
            border: "0px",
            justifyContent: "flex-end",
          }}
          key={index}
        >
          {child}
        </Cell>
      ))}
    </div>
  );
};

export default SideColumns;
