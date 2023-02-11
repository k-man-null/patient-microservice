const express = require('express')
const { PubSub } = require('@google-cloud/pubsub');

const app = express()

app.use(express.json())

const doctors = [
    { name: "Dr. Sarah Johnson" },
    { name: "Dr. Michael Brown" },
    { name: "Dr. Amy Rodriguez" },
    { name: "Dr. John Smith" },
    { name: "Dr. Jane Doe" }
];

const pubsub = new PubSub({
    projectId: 'zendeta',
    keyFilename: './keyfile.json'
});


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
    //console.log(pubsub)
    const messageId =  await pubsub.topic("appointment").publishMessage(Buffer.from("JSON.stringify(message)"),
    (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Message published to topic ${topicName}`);
        }});
    console.log(`Message ${messageId} published.`);
}


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});