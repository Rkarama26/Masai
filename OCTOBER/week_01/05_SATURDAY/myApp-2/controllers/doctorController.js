const DocterModel = require('../models/Docter');
const ConsultModel = require('../models/Consultation');

const createDoctor = async (req, res) => {
    try {
        const doctor = new DocterModel(req.body);
        await doctor.save();
        res.status(201).json({ doctor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getDoctorPatients = async (req, res) => {
    try {
        const consultations = await ConsultModel.find({ doctorId: req.params.id, isActive: true })
            .populate('patientId', 'name age gender')
            .sort({ consultedAt: -1 })
            .limit(10);

        const patients = consultations.map(c => c.patientId);
        res.json(patients);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getConsultationCount = async (req, res) => {
    try {
        const count = await ConsultModel.countDocuments({ doctorId: req.params.id, isActive: true });
        res.json({ totalConsultations: count });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const softDeleteDoctor = async (req, res) => {
    try {
        await DocterModel.findByIdAndUpdate(req.params.id, { isActive: false });
        await ConsultModel.updateMany({ doctorId: req.params.id }, { isActive: false });
        res.json({ message: 'Doctor and related consultations marked inactive' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createDoctor,
    getDoctorPatients,
    getConsultationCount,
    softDeleteDoctor
}