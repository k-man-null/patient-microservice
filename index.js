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

        publishMessage(data).catch(console.error);

        return res.status(200).json({ data });
    } catch (err) {

        return res.status(500).json({ error: err.message });
    }
});



async function publishMessage(data) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    const customAttributes = {
        origin: 'nodejs-sample',
        username: 'gcp',
      };
    try {
      const messageId = await pubSubClient
        .topic('appointment')
        .publishMessage(dataBuffer, customAttributes);
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }
  
 


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});