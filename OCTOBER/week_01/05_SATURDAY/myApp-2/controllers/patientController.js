const ConsultModel = require('../models/Consultation');
const PatientModel = require('../models/Patient');

const createPatient = async (req, res) => {
  try {
    const patient = new PatientModel(req.body);
    await patient.save();
    res.status(201).json({ patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPatientDoctors = async (req, res) => {
  try {
    const consultations = await ConsultModel.find({ patientId: req.params.id, isActive: true })
      .populate('doctorId', 'name specialization');
    const doctors = consultations.map(c => c.doctorId);
    res.json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPatientsByGender = async (req, res) => {
  try {
    const gender = req.query.gender;
    const patients = await PatientModel.find({ gender, isActive: true });
    res.json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const softDeletePatient = async (req, res) => {
  try {
    await PatientModel.findByIdAndUpdate(req.params.id, { isActive: false });
    await ConsultModel.updateMany({ patientId: req.params.id }, { isActive: false });
    res.json({ message: 'Patient and related consultations marked inactive' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  createPatient,
  getPatientDoctors,
  getPatientsByGender,
  softDeletePatient

}