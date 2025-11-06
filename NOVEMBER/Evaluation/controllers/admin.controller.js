const { generateAdminReportService } = require("../services/admin.service");

const generateAdminReport = async (req, res) => {
  try {
    const summary = await generateAdminReportService();
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error generating admin report:", error.message);
    res.status(500).json({ message: "Error generating report" });
  }
};

module.exports = { generateAdminReport };
