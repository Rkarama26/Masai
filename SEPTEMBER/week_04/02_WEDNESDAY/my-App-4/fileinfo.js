

const path = require('path');

function pathinfo(filePath) {
    return {
        dirname: path.dirname(filePath),
        basename: path.basename(filePath),
        extname: path.extname(filePath)
    };
};

module.exports = pathinfo;
