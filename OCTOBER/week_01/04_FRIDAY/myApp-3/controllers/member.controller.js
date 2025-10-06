const MemberModel = require("../models/user.member");


//add-user
const addMember = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Basic validation
        if (!name || name.length < 3 || !email) {
            return res.status(400).json({ message: 'Invalid input. Name must be at least 3 characters and email is required.' });
        }
        const newMember = new MemberModel({
            name,
            email
        });

        const savedMember = await newMember.save();
        res.status(201).json(savedMember);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error adding member' });
    }
};
const getMemberBorrowedBooks = async (req, res) => {
    try {
        const { memberId } = req.params;

        const member = await MemberModel.findById(memberId).populate('borrowedBooks');

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.status(200).json({ borrowedBooks: member.borrowedBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { addMember, getMemberBorrowedBooks }