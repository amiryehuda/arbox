import React from "react";
import FloorCell from "../FloorCell/FloorCell";
import { ShaftWrapper } from "./style-shaft";
import _ from "lodash";
import { IElevator } from "../../assets/utils/types";

interface ShaftProps {
  elevator: IElevator;
  children: JSX.Element;
}

const ElevatorShaft: React.FC<ShaftProps> = ({ elevator, children }) => {
  return (
    <ShaftWrapper>
      {_.times(10, (index) => {
        return index === 9 ? (
          <FloorCell key={index}>{children}</FloorCell>
        ) : (
          <FloorCell key={index}>
            <></>
          </FloorCell>
        );
      })}
    </ShaftWrapper>
  );
};

export default ElevatorShaft;
