const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const urlParser = require('./urlparser');

const testURL = "https://example.com:8080/products/item?id=123&sort=asc#reviews";

const parsed = urlParser(testURL);
console.log("Parsed URL:", parsed);

app.get('/parseurl', (req, res) => {
    res.json(parsed);
})


const pathinfo = require('./fileinfo');

const testFilePath = "data.txt";
const fileInfo = pathinfo(testFilePath);
console.log("File Info:", fileInfo);

app.get('/fileinfo', (req, res) => {
    res.json(fileInfo);
});
