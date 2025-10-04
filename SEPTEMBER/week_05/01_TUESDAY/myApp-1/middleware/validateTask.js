const validateTask = (req, res, next) => {
    const { title, description, priority } = req.body;

    // Check required fields
    if (!title || !description || !priority) {
        return res.status(400).json({ message: "Incomplete Data Received" });
    }

    // Validate priority
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({ message: "Invalid priority value. Must be low, medium, or high." });
    }

    next(); // move to controller if validation passed
}

module.exports = validateTask;
