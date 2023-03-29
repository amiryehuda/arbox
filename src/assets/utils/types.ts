import { floors } from "../../components/FloorButton/constants";

export enum direction {
  up = "up",
  down = "down",
  stop = "stop",
}
type ElevatorDirection = direction.up | direction.down | direction.stop;

export interface IElevator {
  id: number;
  currentFloor: floors;
  isMoving: boolean;
  direction: ElevatorDirection;
}

export const floorsText = [
  "9th",
  "8th",
  "7th",
  "6th",
  "5th",
  "4th",
  "3rd",
  "2nd",
  "1st",
  "Ground Floor",
];
