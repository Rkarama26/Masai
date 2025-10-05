const VehicleModel = require('../models/vehicle.model');

function formatMongooseError(err) {
    if (err.name === 'ValidationError') {
        return Object.values(err.errors).map(e => e.message).join(', ');
    }
    if (err.code === 11000) {
        return 'Duplicate key error: registrationNumber must be unique';
    }
    return err.message;
}

/*  Vehicle CRUD ---------------- */

// create
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await VehicleModel.create(req.body);
        res.status(201).json({ message: 'Vehicle created', vehicle });
    } catch (err) {
        res.status(400).json({ error: formatMongooseError(err) });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json({ message: 'Vehicles retrieved', vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update vehicle 
exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Vehicle.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: 'Vehicle not found' });
        res.json({ message: 'Vehicle updated', vehicle: updated });
    } catch (err) {
        res.status(400).json({ error: formatMongooseError(err) });
    }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const removed = await Vehicle.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ message: 'Vehicle not found' });
        res.json({ message: 'Vehicle deleted', vehicle: removed });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Trip Operations ---------------- */

// Add a trip to a vehicle
exports.addTrip = async (req, res) => {
    try {
        const { id } = req.params; // vehicle id
        const trip = req.body; // must include startLocation, endLocation, distance, startTime, endTime

        // push and validate
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        vehicle.trips.push(trip);
        await vehicle.save(); // validation runs
        res.status(201).json({ message: 'Trip added', trip: vehicle.trips[vehicle.trips.length - 1] });
    } catch (err) {
        res.status(400).json({ error: formatMongooseError(err) });
    }
};

// Update trip by trip _id
exports.updateTripById = async (req, res) => {
    try {
        const { id, tripId } = req.params; // vehicle id, trip _id
        const updates = req.body; // e.g., { url?:..., endLocation?:..., distance?:... }

        // find and update using positional operator
        const vehicle = await Vehicle.findOneAndUpdate(
            { _id: id, 'trips._id': tripId },
            { $set: Object.fromEntries(Object.entries(updates).map(([k, v]) => [`trips.$.${k}`, v])) },
            { new: true, runValidators: true }
        );

        if (!vehicle) return res.status(404).json({ message: 'Vehicle or trip not found' });

        const updatedTrip = vehicle.trips.id(tripId);
        res.json({ message: 'Trip updated', trip: updatedTrip });
    } catch (err) {
        res.status(400).json({ error: formatMongooseError(err) });
    }
};

// Update trip by index 
exports.updateTripByIndex = async (req, res) => {
    try {
        const { id, index } = req.params; // vehicle id, trip index
        const updates = req.body;

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        const idx = parseInt(index, 10);
        if (isNaN(idx) || idx < 0 || idx >= vehicle.trips.length) {
            return res.status(400).json({ message: 'Invalid trip index' });
        }

        Object.assign(vehicle.trips[idx], updates);
        await vehicle.save();
        res.json({ message: 'Trip updated', trip: vehicle.trips[idx] });
    } catch (err) {
        res.status(400).json({ error: formatMongooseError(err) });
    }
};

// Delete a trip by tripId
exports.deleteTripById = async (req, res) => {
    try {
        const { id, tripId } = req.params;
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        const trip = vehicle.trips.id(tripId);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        trip.remove();
        await vehicle.save();
        res.json({ message: 'Trip deleted', trips: vehicle.trips });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a trip by profile-like index (alternate): $pull by _id
exports.deleteTripByIdFast = async (req, res) => {
    try {
        const { id, tripId } = req.params;
        const vehicle = await Vehicle.findByIdAndUpdate(
            id,
            { $pull: { trips: { _id: tripId } } },
            { new: true }
        );
        if (!vehicle) return res.status(404).json({ message: 'Vehicle or trip not found' });
        res.json({ message: 'Trip removed', trips: vehicle.trips });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// using Mongoose query operators like $gte, $lte, $in


exports.getVehiclesWithTripLongerThan = async (req, res) => {
    try {
        const { km } = req.params;
        const val = Number(km);
        const vehicles = await Vehicle.find({ 'trips.distance': { $gt: val } });
        res.json({ message: `Vehicles with trip > ${val} km`, vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVehiclesWithTripStartIn = async (req, res) => {
    try {
        const cities = req.query.cities ? req.query.cities.split(',') : req.body.cities;
        if (!cities || !Array.isArray(cities) && typeof cities !== 'object') {
            return res.status(400).json({ message: 'Provide cities as query like ?cities=Delhi,Mumbai' });
        }
        const vehicles = await Vehicle.find({ 'trips.startLocation': { $in: cities } });
        res.json({ message: `Vehicles with trips starting in ${cities}`, vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVehiclesWithTripsAfter = async (req, res) => {
    try {
        const { date } = req.query; // e.g., ?date=2024-01-01
        if (!date) return res.status(400).json({ message: 'Provide date query param like ?date=2024-01-01' });
        const d = new Date(date);
        const vehicles = await Vehicle.find({ 'trips.startTime': { $gte: d } });
        res.json({ message: `Vehicles with trips starting after ${d.toISOString()}`, vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCarsOrTrucks = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ type: { $in: ['car', 'truck'] } });
        res.json({ message: 'Car or truck vehicles', vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
