const express = require('express')

const app = express()

const doctors = [
    { name: "Dr. Sarah Johnson" },
    { name: "Dr. Michael Brown" },
    { name: "Dr. Amy Rodriguez" },
    { name: "Dr. John Smith" },
    { name: "Dr. Jane Doe" }
  ];
  


app.get('/doctors', (req, res) => {
    try {
        // Perform asynchronous operation
        const data = doctors

        // Send the response back to the client
        return res.status(200).json({ data });
    } catch (err) {
        // Handle errors
        return res.status(500).json({ error: err.message });
    }
});


app.post('/appointment', (req, res) => {
    try {
        // Perform asynchronous operation
        const data = req.body.appointment


        // Send the response back to the client
        return res.status(200).json({ data });
    } catch (err) {
        // Handle errors
        return res.status(500).json({ error: err.message });
    }
});



const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});