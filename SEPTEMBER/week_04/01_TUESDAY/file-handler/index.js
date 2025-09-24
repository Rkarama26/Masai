const { readfile, writefile } = require("./fileOperations");

//file operations 
const filePath = "./data.txt";
writefile(filePath, "Hello, World!");
readfile(filePath);



const { getSystemInfo } = require("./sysinfo");

//system info
const sysInfo = getSystemInfo();
console.log(sysInfo);