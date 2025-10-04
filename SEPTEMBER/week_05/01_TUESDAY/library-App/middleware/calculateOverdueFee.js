
// check while returning 
const calculateOverdueFee = async (req, res, next) => {
    const { returnDate, dueDate } = req.body;

    try {
        if (returnDate && dueDate) {
            const returnTime = new Date(returnDate);
            const dueTime = new Date(dueDate);

            if (returnTime > dueTime) {
                const diffTime = returnTime - dueTime;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                req.body.overdueFees = diffDays * 10; // Rs. 10 per day
            } else {
                req.body.overdueFees = 0;
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = calculateOverdueFee;
