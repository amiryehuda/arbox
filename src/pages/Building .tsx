import React, { useContext, useEffect } from "react";
import icon from "../assets/icons/icon_elevator.svg";
import ElevatorShaft from "../components/ElevatorShaft/ElevatorShaft";
import FloorButton from "../components/FloorButton/FloorButton";
// import { statusType } from "../assets/utils/types";
import SideColumns from "../components/SideColumns/SideColumns";
import { direction, floorsText, IElevator } from "../assets/utils/types";
import _ from "lodash";
import ElevatorsContext from "../context/elevatorsContext";
import Elevator from "../components/Elevator/Elevator";
import { floors } from "../components/FloorButton/constants";
import { findClosestElevator } from "../assets/utils/helpers";

const Building = () => {
  const { elevators, callsQueue, setElevators, setCallsQueue } =
    useContext(ElevatorsContext);

  const updateEllevators = (el: IElevator) => {
    const updatedElevators = elevators.map((e) => (e.id === el.id ? el : e));
    setElevators(updatedElevators);
  };

  useEffect(() => {
    if (
      callsQueue.length > 0 &&
      elevators.some((elevator) => !elevator.isMoving)
    ) {
      const floor = callsQueue[0];
      const elevator = findClosestElevator(elevators, floor);

      const updatedElevator: IElevator = {
        ...elevator,
        direction:
          floor > elevator.currentFloor ? direction.up : direction.down,
        currentFloor: floor as floors,
        isMoving: true,
      };
      updateEllevators(updatedElevator);
      setCallsQueue(callsQueue.splice(1));
    }
  }, [callsQueue, elevators.some((elevator) => !elevator.isMoving)]);

  const buttons = _.times(10, (index) => {
    return (
      <FloorButton
        // status={"call" as statusType}
        floor={(9 - index) as floors}
        key={9 - index}
      />
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <SideColumns children={floorsText} />

      {elevators.map((elevator) => {
        return (
          <ElevatorShaft elevator={elevator} key={elevator.id}>
            <Elevator elevator={elevator} />
          </ElevatorShaft>
        );
      })}

      <SideColumns children={buttons} />
    </div>
  );
};

export default Building;
