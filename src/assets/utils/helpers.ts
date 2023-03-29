import { IElevator } from "./types";

// export const getClosestElevator = (
//   elevators: Elevator[],
//   floor: number
// ): Elevator => {
//   let closestElevator = null;
//   let closestDistance = Math.abs(elevators[0].currentFloor - floor);

//   for (let i = 1; i < elevators.length; i++) {
//     const distance = Math.abs(elevators[i].currentFloor - floor);
//     if (distance < closestDistance) {
//       closestElevator = elevators[i];
//       closestDistance = distance;
//     }
//   }

//   return closestElevator;
// };

export const findClosestElevator = (
  elevators: IElevator[],
  floor: number
): IElevator => {
  let closestElevator = elevators[0];
  let minDistance = Infinity;
  elevators.forEach((elevator) => {
    if (elevator.currentFloor === 0 && !elevator.isMoving) {
      // if (!elevator.isMoving || elevator.currentFloor === 0) {
      closestElevator = elevator;
      minDistance = 0;
    } else {
      const distance = Math.abs(elevator.currentFloor - floor);
      if (distance < minDistance) {
        closestElevator = elevator;
        minDistance = distance;
      }
    }
  });
  return closestElevator;
};
