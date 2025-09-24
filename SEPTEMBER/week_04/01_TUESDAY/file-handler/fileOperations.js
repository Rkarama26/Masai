
const fs = require("fs").promises;

//readfile
async function readfile(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
async function writefile(filePath, data) {
    try {
        await fs.writeFile(filePath, data, "utf-8");
        console.log("File written successfully");
    } catch (err) {
        console.log(err);
    }
}



module.exports = { readfile, writefile };