const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

const item = require('./models/items')
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));


const connectionString = `mongodb+srv://perScholasUser:<password>@mongosetupcluster.uxrtp52.mongodb.net/MongoDbInventory/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


app.post('/create_item', async (req, res) => {
   let response = await item.findByIdAndUpdate(req.body.id, {name: req.body.newName}, {new: true})
    res.json(response)
})


app.get("/get_items", async (req, res) => {
    let response = await item.find({})
    res.json(response);
  })

app.get('/get_items_data', async (req, res) => {
    let response = await item.find({new: req.params.true});
    console.log(response);
    res.json(response)
})

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`)
});
