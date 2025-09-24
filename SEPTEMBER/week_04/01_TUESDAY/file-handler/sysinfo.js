
const os = require("os");

function getSystemInfo() {
    return {
        hostname: os.hostname(),
        architecture: os.arch(),
        cpumodel: os.cpus()[0].model,
        heapmemory: process.memoryUsage().heapTotal,
        platform: os.platform(),
        cpuCores: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homeDir: os.homedir(),
        uptime: os.uptime()
    };
}

module.exports = { getSystemInfo };