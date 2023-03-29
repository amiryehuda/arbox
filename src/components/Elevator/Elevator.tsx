import React, { useContext, useEffect, useState } from "react";
import { direction, IElevator } from "../../assets/utils/types";
import ElevatorsContext from "../../context/elevatorsContext";
import Icon from "../Icon/Icon";
import { motion } from "framer-motion";
import { floorHeighs, floorFast } from "./constant";
import { floors } from "../FloorButton/constants";

interface ElevatorProps {
  elevator: IElevator;
}

const Elevator: React.FC<ElevatorProps> = ({ elevator }) => {
  const { setElevators, setCallsQueue, callsQueue, elevators } =
    useContext(ElevatorsContext);
  const [colorIcon, setColorIcon] = useState<string>("black");
  const [floor, setFloor] = useState<floors>(0);
  const [fast, setFast] = useState(1); //calculate math.abs(current - floor)
  const [prevCall, setPrevCall] = useState(0); //calculate math.abs(current - floor)

  const updateEllevators = (el: IElevator) => {
    const updatedElevators = elevators.map((e) => (e.id === el.id ? el : e));
    setElevators(updatedElevators);
  };

  //render elevator color
  useEffect(() => {
    if (elevator.isMoving && elevator.direction === direction.up) {
      setColorIcon("red");
    } else if (
      (elevator.isMoving && elevator.direction === direction.down) ||
      (!elevator.isMoving && elevator.currentFloor === 0)
    ) {
      setColorIcon("black");
    } else if (!elevator.isMoving && elevator.currentFloor !== 0) {
      setColorIcon("green");
    }
  }, [elevator]);

  const setNewFloor = () => {
    setFloor(floorHeighs[elevator.currentFloor] as floors);
    setFast(Math.abs((prevCall - floorFast[elevator.currentFloor]) as floors));
  };

  const backToZero = () => {
    setFloor(0);
    setFast(floorFast[elevator.currentFloor] as floors);
    setColorIcon("black");
    const updatedElevator: IElevator = {
      ...elevator,
      direction: direction.down,
      isMoving: true,
      currentFloor: 0,
    };
    updateEllevators(updatedElevator);
    // setTimeout(() => {
    //   const updatedElevator: IElevator = {
    //     ...elevator,
    //     direction: direction.stop,
    //     isMoving: false,
    //   };
    //   updateEllevators(updatedElevator);
    // }, prevCall * 1000);
  };

  //   useEffect(() => {
  //     setFloor(floorHeighs[elevator.currentFloor] as floors);
  //     setTimeout(() => {
  //       const updatedElevator: IElevator = {
  //         ...elevator,
  //         direction: direction.stop,
  //         isMoving: false,
  //       };
  //       updateEllevators(updatedElevator);
  //     }, elevator.currentFloor * 1000);
  //   }, [elevator.currentFloor]);

  //   useEffect(() => {
  //     if (elevator.currentFloor !== 0) {
  //       setPrevCall(elevator.currentFloor);
  //       setTimeout(() => {
  //         const updatedElevator: IElevator = {
  //           ...elevator,
  //           direction: direction.down,
  //           isMoving: true,
  //             currentFloor: 0,
  //         };
  //         updateEllevators(updatedElevator);
  //       }, 2000);
  //     }
  //   }, [elevator.isMoving]);

  useEffect(() => {
    setNewFloor();
    setTimeout(() => {
      const updatedElevator: IElevator = {
        ...elevator,
        direction: direction.stop,
        isMoving: false,
      };
      updateEllevators(updatedElevator);
      setPrevCall(elevator.currentFloor);
      setTimeout(() => {
        if (elevator.currentFloor !== 0) {
          backToZero();
        }
        console.log("2000");
      }, 2000);
      console.log("1000");
    }, elevator.currentFloor * 1000);
  }, [elevator.currentFloor]);
  return (
    <React.Fragment>
      <motion.div
        animate={{ y: floor }}
        transition={{ type: "tween", duration: fast }}
      >
        <Icon component="elevator" size="lg" colorIcon={colorIcon} />
      </motion.div>
    </React.Fragment>
  );
};
export default Elevator;
