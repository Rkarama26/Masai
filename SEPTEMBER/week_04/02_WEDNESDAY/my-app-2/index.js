
const express = require("express");
//calling express
const app = express();

//create a route
app.get("/test", (req, res) => {
    res.send("this is the test route ")
})


app.get("/home", (req, res) => {
    res.send("This is home page")
})

app.get("/contact", (req, res) => {
    res.send("Contact us at contact@contact.com")
})

app.get("/about", (req, res) => {
    res.json({ message: "welcome to about to page" })
})





//listening on port 
app.listen(3000, () => {
    console.log('Example app listening on 3000 port ')
})