import React, { useContext, useEffect, useState } from "react";
import { findClosestElevator } from "../../assets/utils/helpers";
import { direction, IElevator } from "../../assets/utils/types";
import ElevatorsContext from "../../context/elevatorsContext";
import { button, buttons, floors } from "./constants";
import { StyledButton } from "./style-FloorBotton";

interface FloorButtonProps {
  floor: floors;
}

const FloorButton: React.FC<FloorButtonProps> = ({ floor }) => {
  const [btnTextAndStyle, setBtnTextAndStyle] = useState<button>(buttons.call);
  const { callsQueue, elevators, setCallsQueue } = useContext(ElevatorsContext);

  const handleCallElevator = () => {
    setCallsQueue([...callsQueue, floor]);
  };

  //check buttons status
  useEffect(() => {
    if (
      elevators.some(
        (elevator) => elevator.isMoving && elevator.currentFloor === floor
      )
    ) {
      setBtnTextAndStyle(buttons.wating);
    } else if (
      elevators.some(
        (elevator) =>
          !elevator.isMoving &&
          elevator.currentFloor === floor &&
          elevator.currentFloor !== 0
      )
    ) {
      setBtnTextAndStyle(buttons.arrived);
    } else {
      setBtnTextAndStyle(buttons.call);
    }

    //change buttons state
    // elevators.forEach((elevator) => {
    //   if (
    //     (elevator.currentFloor === floor && elevator.isMoving) ||
    //     callsQueue.includes(floor)
    //   ) {
    //     setBtnTextAndStyle(buttons.wating);
    //   } else if (elevator.currentFloor === floor && floor !== 0) {
    //     setBtnTextAndStyle(buttons.arrived);
    //   } else if (!callsQueue.includes(floor)) {
    //     setBtnTextAndStyle(buttons.call);
    //   }
    // });
  }, [
    elevators, //chack this
    callsQueue,
  ]);

  return (
    <StyledButton style={btnTextAndStyle.style} onClick={handleCallElevator}>
      {btnTextAndStyle.text}
    </StyledButton>
  );
};

export default FloorButton;
