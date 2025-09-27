

const express = require("express");
const router = express.Router();
const roleCheck = require("../middlewares/roleCheckMiddleware");
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");



router.get("/", roleCheck(["admin", "hr"]), getAllEmployees);


// POST → Admin only
router.post("/", roleCheck(["admin"]), addEmployee);

// PUT → Admin & HR allowed
router.put("/:id", roleCheck(["admin", "hr"]), updateEmployee);

// DELETE → Admin only
router.delete("/:id", roleCheck(["admin"]), deleteEmployee);




module.exports = router;
