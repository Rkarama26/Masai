const express = require('express');
const router = express.Router();
const vc = require('../controllers/vehicleController');

// vehicle
router.post('/', vc.createVehicle);         // POST /vehicles
router.get('/', vc.getAllVehicles);         // GET /vehicles
router.put('/:id', vc.updateVehicle);       // PUT /vehicles/:id
router.delete('/:id', vc.deleteVehicle);    // DELETE /vehicles/:id

//  Trip
router.post('/:id/trips', vc.addTrip);                          // POST /vehicles/:id/trips
router.put('/:id/trips/:tripId', vc.updateTripById);            // PUT /vehicles/:id/trips/:tripId
router.put('/:id/trips/index/:index', vc.updateTripByIndex);    // PUT /vehicles/:id/trips/index/:index
router.delete('/:id/trips/:tripId', vc.deleteTripById);         // DELETE /vehicles/:id/trips/:tripId
// alternative fast delete
// router.delete('/:id/trips/:tripId', vc.deleteTripByIdFast);

/* operators operations */
router.get('/query/longer-than/:km', vc.getVehiclesWithTripLongerThan);  // GET /vehicles/query/longer-than/200
router.get('/query/start-in', vc.getVehiclesWithTripStartIn);            // GET /vehicles/query/start-in?cities=Delhi,Mumbai
router.get('/query/start-after', vc.getVehiclesWithTripsAfter);         // GET /vehicles/query/start-after?date=2024-01-01
router.get('/query/cars-or-trucks', vc.getCarsOrTrucks);                // GET /vehicles/query/cars-or-trucks

module.exports = router;
