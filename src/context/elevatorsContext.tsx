import React, { useContext } from "react";
import { direction, IElevator } from "../assets/utils/types";

export interface IElevatorContextProps {
  callsQueue: number[];
  setCallsQueue: (floors: number[]) => void;
  elevators: IElevator[];
  setElevators: (elevators: IElevator[]) => void;
}

const defaultContext: IElevatorContextProps = {
  callsQueue: [],
  setCallsQueue: () => {},
  elevators: [
    { id: 1, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 2, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 3, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 4, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 5, currentFloor: 0, direction: direction.stop, isMoving: false },
  ],
  setElevators: (elevators: IElevator[]) => {},
};

const ElevatorsContext = React.createContext(defaultContext);

export const useGame = () => useContext(ElevatorsContext);
export default ElevatorsContext;
