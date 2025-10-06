const ConsultModel = require('../models/Consultation');
const DocterModel = require('../models/Docter');
const PatientModel = require('../models/Patient');

const createConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;

    const doctor = await DocterModel.findById(doctorId);
    const patient = await PatientModel.findById(patientId);

    if (!doctor || !doctor.isActive || !patient || !patient.isActive) {
      return res.status(400).json({ error: 'Doctor or Patient not active' });
    }

    const consultation = new ConsultModel({ doctorId, patientId, notes });
    await consultation.save();
    res.status(201).json({ consultation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRecentConsultations = async (req, res) => {
  try {
    const consultations = await ConsultModel.find({ isActive: true })
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name age gender')
      .sort({ consultedAt: -1 })
      .limit(5);

    res.json(consultations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  createConsultation,
  getRecentConsultations
}
