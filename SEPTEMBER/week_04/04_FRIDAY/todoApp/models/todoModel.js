const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

// Read 
function readDB() {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
}

// Write
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
