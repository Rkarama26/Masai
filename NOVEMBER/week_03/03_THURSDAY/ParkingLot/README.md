# Parking Lot Management System

A TypeScript-based parking lot management system that handles vehicle parking, unparking, and slot management for multiple vehicle types.

## Features

### Core Features

- Create parking lots with multiple floors and slots
- Park vehicles of different types
- Unpark vehicles using ticket IDs
- Display free/occupied slots by vehicle type

### Vehicle Types Supported

- **TRUCK**: Large vehicles
- **BIKE**: Two-wheeled vehicles
- **CAR**: Standard non-electric cars
- **EV Car**: Electric vehicles

### Slot Allocation

- **TRUCK**: Slot 0 on each floor
- **BIKE**: Slots 1-2 on each floor
- **CAR**: Remaining slots except the last one
- **EV Car**: The last slot on each floor (reserved)

## New Features Added

### 1. New Vehicle Types: "EV Cars" and "Cars"


**Approach**:

- Updated the `VehicleType` enum in `model/types.ts` to include:
  - `"EV Car"`
- The system distinguishes between "EV Car" and "Car" types during parking slot assignment.
- Commands use string values like "EV Car" and "Car", which map to the enum keys via `VehicleType[vType as keyof typeof VehicleType]`.

### 2. Reserved EV Slot on Each Floor

**Approach**:

- Modified the slot allocation logic in `ParkingLotController.createParkingLot()`.
- For each floor, the last slot (index `totalSlots - 1`) is always assigned to `VehicleType.EV_CAR`.
- Other slots follow the original logic: TRUCK (index 0), BIKE (indices 1-2), CAR (remaining except last).
- This ensures at least one EV slot per floor, regardless of `totalSlots` (as long as `totalSlots >= 1`).
- EV Cars prioritize their reserved slots, but can use other available slots if the reserved one is occupied.

### 3. New Parking Strategy: Nearest Parking

**Approach**:

- Created `NearestParkingStrategy` class in `strategy/NearestParkingStrategy.ts`, implementing `IParkingStrategy`.
- The strategy collects all available slots for the vehicle type, sorts them by floor ID (ascending) then slot ID (ascending), and selects the first (nearest).
- Updated `create_parking_lot` command to accept a fourth parameter: strategy ("random" or "nearest").
- Modified `ParkingLotController.createParkingLot()` to instantiate the appropriate strategy based on the input.


### 4. Hourly Parking Charges Calculation


**Approach**:

- Added `entryTime` field to `ITicket` interface and `Ticket` class, set to current time when ticket is generated.
- Defined hourly rates: CAR (20 rps), EV_CAR (25 rps), BIKE (10 rps), TRUCK (30 rps).
- Modified `ParkingLot.unParkVehicle()` to calculate duration in hours (rounded up), compute fee, and include it in the unpark message.
- The unpark response now shows: registration number, total fee, duration, and hourly rate.

### Building the Project

```bash
npm install
npx tsc
```

### Running the App

```bash
node dist/index.js <commands_file>
```

### Commands File Format

Each line in the commands file should contain a command followed by arguments, separated by spaces.

Example commands:

- `create_parking_lot PL123 2 6 nearest` - Create parking lot with 2 floors, 6 slots each, using nearest parking strategy
- `park_vehicle EV Car KA-01-1234 White` - Park an EV Car
- `park_vehicle Car KA-02-5678 Black` - Park a standard Car
- `unpark_vehicle PL123_0_5` - Unpark vehicle with ticket ID
- `display free_count EV Car` - Show free EV Car slots count
- `exit` - Exit the application

## Project Structure

- `index.ts`: Main entry point, reads commands from file
- `controller/`: Business logic controllers
- `model/`: Data models and types
- `strategy/`: Parking strategies

## Dependencies

- Node.js
- TypeScript
- readline 