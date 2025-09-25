

const express = require('express')

const app = express();

const fs = require('fs');
let data = fs.readFileSync("data.txt", 'utf-8')

app.get("/read", (req, res) => {
    res.send(data)
})

const os = require('os');

app.get("/systemdetails", (req, res) => {
    res.json({
        "System Architecture": os.arch(),
        "Free Memory": os.freemem(),
        "Total Memory": os.totalmem(),
        "Hostname": os.hostname(),
        "Platform": os.platform()
    })
})



const dns = require('dns');
let dnsData = `
${dns.lookup('https://masaischool.com/', (err, address, family) => {
    if (err) {
        return `Error: ${err.message}`;
    }
    return `Address: ${address}, Family: ${family}`;
})}
`

app.get("/dns", (req, res) => {
    res.json({
        "hostName": "https://masaischool.com/",
        "ipAddress": dnsData
    })
})


app.get("/test", (req, res) => {
    res.send("Test route is working")
})

app.listen(3000, () => {
    console.log("app listen on port 3000")
})