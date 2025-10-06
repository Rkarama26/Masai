

const express = require("express");
const StudentModel = require("../models/Student");
const CourseModel = require("../models/Course");
const EnrollModel = require("../models/Enrollment");
const enrollRoutes = express.Router();


// POST /enroll
enrollRoutes.post("/", async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ message: "studentId and courseId are required" });
        }

        //  if not active
        const student = await StudentModel.findById(studentId);
        if (!student || !student.isActive) {
            return res.status(400).json({ message: "Student not found or inactive" });
        }

        //  if course not active
        const course = await CourseModel.findById(courseId);
        if (!course || !course.isActive) {
            return res.status(400).json({ message: "Course not found or inactive" });
        }

        // if already enrolled
        const existingEnrollment = await EnrollModel.findOne({ studentId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student already enrolled in this course" });
        }

        // Enroll student
        const enrollment = new EnrollModel({ studentId, courseId });
        await enrollment.save();

        res.status(201).json({
            message: " Student enrolled successfully",
            enrollment,
        });
    } catch (error) {
        res.status(500).json({
            message: " Failed to enroll student",
            error: error.message,
        });
    }
});

//  DELETE /students/:id
enrollRoutes.delete("/students/:id", async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await StudentModel.findById(studentId);
        if (!student || !student.isActive) {
            return res.status(404).json({ message: "Student not found or already inactive" });
        }

        //  student inactive
        student.isActive = false;
        await student.save();

        // Mark all enrollments inactive
        await EnrollModel.updateMany({ studentId }, { isActive: false });

        res.status(200).json({
            message: "Student and related enrollments marked as inactive",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to deactivate student",
            error: error.message,
        });
    }
});

//  DELETE /courses/:id 
enrollRoutes.delete("/courses/:id", async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await CourseModel.findById(courseId);
        if (!course || !course.isActive) {
            return res.status(404).json({ message: "Course not found or already inactive" });
        }

        //  course inactive
        course.isActive = false;
        await course.save();

        // Mark all enrollments inactive
        await EnrollModel.updateMany({ courseId }, { isActive: false });

        res.status(200).json({
            message: "Course and related enrollments marked as inactive",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to deactivate course",
            error: error.message,
        });
    }
});

module.exports = enrollRoutes;
