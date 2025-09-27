const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
 
// parse data to json 
app.use(express.json())

app.post("/data", (req, res) =>{
    res.send("Data received");
    console.log(req.body)
});











app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


 