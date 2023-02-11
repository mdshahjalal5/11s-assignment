const express = require('express')
const app = express()
const port = process.env.PORT || 5500;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://11-assignment:zdAnPa5vJSi3vP8v@cluster0.ckb7hbl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("11-assignment").collection("services2");
async function run() {
    try {
        const cursor =collection.find({});
        const services = await cursor.toArray()
        console.log(services)
    } finally {

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})