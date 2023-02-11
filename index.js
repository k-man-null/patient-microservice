const express = require('express')
const {PubSub} = require('@google-cloud/pubsub');

const app = express()

const doctors = [
    { name: "Dr. Sarah Johnson" },
    { name: "Dr. Michael Brown" },
    { name: "Dr. Amy Rodriguez" },
    { name: "Dr. John Smith" },
    { name: "Dr. Jane Doe" }
  ];

const pubsub = new PubSub();


app.get('/doctors', (req, res) => {
    try {
        
        const data = doctors

        
        return res.status(200).json({ data });
    } catch (err) {
        
        return res.status(500).json({ error: err.message });
    }
});




app.post('/appointment', async (req, res) => {
    try {
        
        const data = req.body.appointment

        sendNotificationMessage(data);

        return res.status(200).json({ data });
    } catch (err) {
        
        return res.status(500).json({ error: err.message });
    }
});



async function sendNotificationMessage(message) {
    await pubsub.topic("appointment").publish(Buffer.from(JSON.stringify({ message })));
  }


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});