// import React, { useState, useEffect } from "react";

// interface Elevator {
//   id: number;
//   currentFloor: number;
//   direction: "up" | "down" | "stopped";
//   queuedFloors: number[];
// }

// const ELEVATOR_COUNT = 5;
// const FLOOR_COUNT = 10;

// const simulateElevator = (floorNumber: number, elevators: Elevator[]): void => {
//   // Find the closest elevator that's moving in the right direction or stopped.
//   const closestElevator = elevators.reduce((closest, elevator) => {
//     if (elevator.direction === "stopped") {
//       return elevator;
//     }
//     const distance = Math.abs(elevator.currentFloor - floorNumber);
//     const currentDistance = Math.abs(closest.currentFloor - floorNumber);
//     if (distance < currentDistance) {
//       return elevator;
//     }
//     return closest;
//   }, elevators[0]);

//   // Add the floor to the closest elevator's queue.
//   closestElevator.queuedFloors.push(floorNumber);
// };

// const ElevatorSimulator: React.FC = () => {
//   const [elevators, setElevators] = useState<Elevator[]>([]);
//   const [queue, setQueue] = useState<number[]>([]);

//   // Initialize the elevators and their states.
//   useEffect(() => {
//     const newElevators = Array.from({ length: ELEVATOR_COUNT }, (_, i) => ({
//       id: i,
//       currentFloor: 0,
//       direction: "stopped",
//       queuedFloors: [],
//     }));
//     setElevators(newElevators as Elevator[]);
//   }, []);

//   // Listen for new calls and simulate the elevators accordingly.
//   useEffect(() => {
//     if (queue.length > 0) {
//       const floorNumber = queue[0];
//       simulateElevator(floorNumber, elevators);
//       setQueue(queue.slice(1));
//     }
//   }, [queue, elevators]);

//   // Move the elevators up or down and stop at queued floors.
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setElevators((prevState) =>
//         prevState.map((elevator) => {
//           if (elevator.queuedFloors.length === 0) {
//             return elevator;
//           }
//           const currentFloor = elevator.currentFloor;
//           const nextFloor = elevator.queuedFloors[0];
//           const direction =
//             nextFloor > currentFloor
//               ? "up"
//               : nextFloor < currentFloor
//               ? "down"
//               : "stopped";
//           const queuedFloors = elevator.queuedFloors.slice(1);
//           const newCurrentFloor =
//             direction === "up" ? currentFloor + 1 : currentFloor - 1;
//           if (newCurrentFloor === nextFloor) {
//             // The elevator has arrived at the next floor.
//             setTimeout(() => {
//               // Wait for 2 seconds and then make a sound.
//               console.log(
//                 `Elevator ${elevator.id} arrived at floor ${nextFloor}`
//               );
//               // Go back to floor 0.
//               const newQueuedFloors = [...queuedFloors, 0];
//               const newDirection =
//                 newQueuedFloors[0] > nextFloor
//                   ? "down"
//                   : newQueuedFloors[0] < nextFloor
//                   ? "up"
//                   : "stopped";
//               return {
//                 ...elevator,
//                 currentFloor: 0,
//                 direction: newDirection,
//                 queuedFloors: newQueuedFloors,
//               };
//             }, 2000);
//           }
//           return {
//             ...elevator,
//             currentFloor: newCurrentFloor,
//             direction,
//             queuedFloors,
//           };
//         })
//       );
//     }, 1000);
//     // Clean up the interval.
//     return () => clearInterval(interval);
//   }, []);
//   // Render the elevators and their current floors.
//   return (
//     <div>
//       {elevators.map((elevator) => (
//         <div key={elevator.id}>
//           Elevator {elevator.id}: Floor {elevator.currentFloor}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ElevatorSimulator;

import React, { useState } from "react";

type ElevatorDirection = "up" | "down" | "stop";

interface Reading {
  floor: number;
}

interface Elevator {
  id: string;
  moving: boolean;
  direction: ElevatorDirection;
  destinationFloor: number | null;
}

const ElevatorSystem: React.FC = () => {
  const [elevator, setElevator] = useState<Elevator>({
    id: "elevator-1",
    moving: false,
    direction: "stop",
    destinationFloor: null,
  });

  const [readingQueue, setReadingQueue] = useState<Reading[]>([]);

  const addReadingToQueue = (floor: number) => {
    setReadingQueue([...readingQueue, { floor }]);
  };

  const handleElevatorArrival = () => {
    // Elevator has arrived at its destination floor
    setElevator((prev) => ({
      ...prev,
      moving: false,
      direction: "stop",
    }));

    // Remove destination floor from reading queue
    setReadingQueue((prev) => prev.slice(1));
  };

  const handleElevatorMovement = () => {
    // Get the next destination floor based on the current direction
    const nextDestinationFloor =
      elevator.direction === "up"
        ? Math.min(...readingQueue.map((reading) => reading.floor))
        : Math.max(...readingQueue.map((reading) => reading.floor));

    if (nextDestinationFloor === elevator.destinationFloor) {
      // Elevator has reached its next destination floor
      handleElevatorArrival();
    } else {
      // Elevator is still moving
      setElevator((prev) => ({
        ...prev,
        destinationFloor: nextDestinationFloor,
      }));
    }
  };

  const handleReadingQueueChange = () => {
    if (!elevator.moving) {
      // If the elevator is not moving, set the direction based on the first item in the reading queue
      const nextDirection =
        elevator.destinationFloor &&
        readingQueue[0]?.floor > elevator.destinationFloor
          ? "up"
          : "down";
      setElevator((prev) => ({
        ...prev,
        moving: true,
        direction: nextDirection,
      }));
    }

    // If the elevator is moving, continue moving towards the destination floor
    if (elevator.moving) {
      handleElevatorMovement();
    }
  };

  return (
    <div>
      <h1>Elevator System</h1>
      <div>
        <h2>Elevator Status</h2>
        <p>ID: {elevator.id}</p>
        <p>
          {elevator.moving
            ? `Moving ${elevator.direction} to floor ${elevator.destinationFloor}`
            : "Stopped"}
        </p>
      </div>
      <div>
        <h2>Reading Queue</h2>
        <button onClick={() => addReadingToQueue(1)}>Add Reading 1</button>
        <button onClick={() => addReadingToQueue(2)}>Add Reading 2</button>
        <button onClick={() => addReadingToQueue(3)}>Add Reading 3</button>
        <ul>
          {readingQueue.map((reading, index) => (
            <li key={index}>Floor {reading.floor}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleReadingQueueChange}>Call Elevator</button>
    </div>
  );
};

export default ElevatorSystem;
