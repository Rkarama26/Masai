const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startLocation: {
        type: String,
        required: [true, 'Start location is required']
    },
    endLocation: {
        type: String,
        required: [true, 'End location is required']
    },
    distance: {
        type: Number,
        required: [true, 'Distance is required'],
        validate: {
            validator: function (v) { return v > 0; },
            message: 'Distance must be greater than 0'
        }
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required']
    },
    endTime: {
        type: Date,
        required: [true, 'End time is required']
    }
}, { _id: true });

const vehicleSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: [true, 'Registration number is required'],
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['car', 'truck', 'bike'],
        required: [true, 'Vehicle type is required']
    },
    model: {
        type: String,
        required: [true, 'Model is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    trips: {
        type: [tripSchema],
        default: []
    }
}, { timestamps: true });

// ensure unique index on registrationNumber
vehicleSchema.index({ registrationNumber: 1 }, { unique: true });

const VehicleModel = mongoose.model('Vehicle', vehicleSchema);
module.exports = VehicleModel;
