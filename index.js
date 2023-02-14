const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5500;
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://11-assignment:zdAnPa5vJSi3vP8v@cluster0.ckb7hbl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const services = client.db("11-assignment").collection("services2");
const orders = client.db("11-assignment").collection("orders");
async function run() {
    try {
        app.get('/services', async function named(q, s){
            const limit = parseInt(q.query.limit); 
             const servicesData = await services.find({}).limit(limit).toArray();
            s.send({ servicesData });
        })
        app.get('/service/:id', async (q, s)=>{
            const id =  q.params.id;
            const filter = {
                _id: new ObjectId(id)
            }
            const serviceData =await services.findOne(filter);
            s.send({serviceData})
        })
        app.post('/orders', function(q, s){
            const review = q.body;
            orders.insertOne(review)
            .then(res => s.send(res))
        })
        app.get(`/update/:id`, async (q,s)=>{
            const id = q.params.id;
            console.log(id,' get id ');
            const query = { _id: new ObjectId(id)}
            console.log(query, 'query ')
             const singleOrder =  await orders.findOne(query)
             console.log(singleOrder, 'singleorder fs')
            s.send(singleOrder);
        })
        app.get('/orders', async (q,s)=>{
            let query = {}
            if(q.query.email){
                query = {
                    mail: q.query.email,
                }
                console.log(query, "query")
            }
            // const ordersData = orders.find()
            const ordersData = await orders.find(query).toArray();
            console.log(ordersData, 'orders data ')
            s.send(ordersData)
        })
        app.delete('/review', async (q, s)=>{
            let query = {}
            if(q.query.id){
                query = {_id:new ObjectId(q.query.id)}
                console.log(query, 'delete query')
            }
            const cursor =await orders.deleteOne(query)
            console.log(cursor, 'cursor')
            s.send(cursor)
        })
        app.put('/review', async (q, s)=>{
            let query = {}
            const review = q.body.review;
            if(q.query.id){
                query = {_id:new ObjectId(q.query.id)}
                console.log(query, 'upadte query')
            }
            const updateDoc = {
                
                $set:{
                    review
                }

                
            }
            console.log(updateDoc, 'updatedoc');
            const cursor =await orders.updateOne(query,updateDoc,{upsert:true} )
            console.log(cursor, 'cursor')
            s.send(cursor)
        })
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