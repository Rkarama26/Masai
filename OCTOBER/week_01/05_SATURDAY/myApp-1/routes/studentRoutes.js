const express = require("express");
const StudentModel = require("../models/Student");
const EnrollModel = require("../models/Enrollment");
const studentRouter = express.Router();

// POST /students – 
studentRouter.post("/add-student", async (req, res) => {
    const { name, email } = req.body;
    try {
        const student = new StudentModel({ name, email });
        await student.save();

        res.status(201).json({ message: " Student created successfully", student });
    } catch (error) {
        res.status(400).json({ message: " Failed to create student", error: error.message });
    }
});

studentRouter.get("/:id/courses", async (req, res) => {
    try {
        const studentId = req.params.id;

        const enrollments = await EnrollModel.find({ studentId, isActive: true })
            .populate({
                path: "courseId",
                match: { isActive: true },
            });

        const activeCourses = enrollments
            .filter(e => e.courseId) // Filter out inactive
            .map(e => e.courseId);

        res.status(200).json({ studentId, courses: activeCourses });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch student's courses",
            error: error.message,
        });
    }
});

module.exports = studentRouter;
