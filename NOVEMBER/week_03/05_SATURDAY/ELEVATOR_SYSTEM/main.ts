import { ElevatorManager } from "./ElevatorManager";
import { ElevatorRequest } from "./ElevatorRequest";

const elevatorManager = new ElevatorManager(50, 4, 8); // 4 elevators, each with a capacity of 8
const request1 = new ElevatorRequest(5, 1); // Request from floor 5 to 1 going DOWN
const elevator1 = elevatorManager.requestElevator(request1);
