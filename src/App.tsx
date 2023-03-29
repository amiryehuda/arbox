import React, { useState } from "react";
import { direction, IElevator } from "./assets/utils/types";
import ElevatorsContext, {
  IElevatorContextProps,
} from "./context/elevatorsContext";
import { AppWrapper } from "./global-style";
import Building from "./pages/Building ";

const App = () => {
  const [callsQueue, setCallsQueue] = useState<number[]>([]);
  const [elevators, setElevators] = useState<IElevator[]>([
    { id: 1, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 2, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 3, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 4, currentFloor: 0, direction: direction.stop, isMoving: false },
    { id: 5, currentFloor: 0, direction: direction.stop, isMoving: false },
  ]);

  const elevatorsContextValue: IElevatorContextProps = {
    callsQueue: callsQueue,
    setCallsQueue: setCallsQueue,
    elevators: elevators,
    setElevators: setElevators,
  };

  return (
    <ElevatorsContext.Provider value={elevatorsContextValue}>
      <AppWrapper>
        <h2>Elevator Execrise</h2>
        <Building />
      </AppWrapper>
    </ElevatorsContext.Provider>
  );
};

export default App;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import React, { useState } from "react";

// interface Elevator {
//   id: number;
//   currentFloor: number;
//   targetFloor: number;
//   direction: "up" | "down" | null;
//   isMoving: boolean;
// }

// const NUMBER_OF_ELEVATORS = 5;
// const NUMBER_OF_FLOORS = 10;

// const App = () => {
//   const [elevators, setElevators] = useState<Elevator[]>(
//     Array.from({ length: NUMBER_OF_ELEVATORS }, (_, id) => ({
//       id,
//       currentFloor: 1,
//       targetFloor: 1,
//       direction: null,
//       isMoving: false,
//     }))
//   );

//   const handleFloorButtonClick = (floor: number) => {
//     // Find the closest elevator that can take the request
//     const closestElevator = elevators.reduce(
//       (closest: Elevator, elevator: Elevator) => {
//         if (
//           !closest ||
//           (Math.abs(elevator.currentFloor - floor) <
//             Math.abs(closest.currentFloor - floor) &&
//             !elevator.isMoving) ||
//           (Math.abs(elevator.targetFloor - floor) <
//             Math.abs(closest.targetFloor - floor) &&
//             elevator.isMoving)
//         ) {
//           return elevator;
//         }
//         return closest;
//       },
//       elevators[0]
//     );

//     if (closestElevator) {
//       // Update the closest elevator's target floor and direction
//       const direction = closestElevator.currentFloor < floor ? "up" : "down";
//       closestElevator.targetFloor = floor;
//       closestElevator.direction = direction;
//       closestElevator.isMoving = true;
//       setElevators([...elevators]);
//     }
//   };

//   const handleElevatorArrival = (elevatorId: number, floor: number) => {
//     const elevator = elevators.find((e) => e.id === elevatorId);
//     if (elevator) {
//       elevator.currentFloor = floor;
//       elevator.isMoving = false;
//       elevator.direction = null;
//       setElevators([...elevators]);
//     }
//   };

//   return (
//     <div>
//       <h1>Elevator Simulator</h1>
//       <div>
//         {Array.from({ length: NUMBER_OF_FLOORS }, (_, i) => (
//           <button key={i} onClick={() => handleFloorButtonClick(i + 1)}>
//             Floor {i + 1}
//           </button>
//         ))}
//       </div>
//       <div>
//         {elevators.map((elevator) => (
//           <div key={elevator.id} style={{ border: "1px solid black" }}>
//             <div>Elevator {elevator.id + 1}</div>
//             <div>Current Floor: {elevator.currentFloor}</div>
//             <div>Target Floor: {elevator.targetFloor}</div>
//             <div>Direction: {elevator.direction ?? "None"}</div>
//             {elevator.isMoving && <div>Moving...</div>}
//             {!elevator.isMoving && (
//               <button
//                 onClick={() =>
//                   handleElevatorArrival(elevator.id, elevator.targetFloor)
//                 }
//               >
//                 Arrived
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
