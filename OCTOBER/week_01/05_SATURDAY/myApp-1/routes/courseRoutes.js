
const express = require("express");
const courseRouter = express.Router();
const CourseModel = require("../models/Course");
const EnrollModel = require("../models/Enrollment");

// POST /courses
courseRouter.post("/add-course", async (req, res) => {
    try {
        const { title, description } = req.body;

        const course = new CourseModel({ title, description });
        await course.save();

        res.status(201).json({ message: " Course created successfully", course });
    } catch (error) {
        res.status(400).json({ message: " Failed to create course", error: error.message });
    }
});


courseRouter.get("/:id/students", async (req, res) => {
    try {
        const courseId = req.params.id;

        const enrollments = await EnrollModel.find({ courseId, isActive: true })
            .populate({
                path: "studentId",
                match: { isActive: true },
            });

        const activeStudents = enrollments
            .filter(e => e.studentId) // Filter out inactive/
            .map(e => e.studentId);

        res.status(200).json({ courseId, students: activeStudents });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch course students",
            error: error.message,
        });
    }
});


module.exports = courseRouter;
