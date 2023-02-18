const express = require('express');
const mongoose = require('mongoose');


// allows us to use information from .env in this file
require('dotenv').config()

// import car object from car.js
const item = require('./models/items')

// create app by calling express function
const app = express();

// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json());

// allow use of queries in URL (?limit=2&color=green) 
// extended allows nested objects in URL
app.use(express.urlencoded({extended:true}));

// tells express to serve our public folder by default when someone makes a request to this port
app.use(express.static('public'));

// string we get from MongoDB - we hide our username and password in our .env file
const connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.6pmvhu8.mongodb.net/FoodDatabase?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// app.post('/get_items', async (req, res) => {
//     // destructuring 
//     // renaming variable while destrucutring
//     const {nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;

//     // Model methods usually give us a promise, so we can wait for the response
//     let returnedValue = await item.create(req.body) {
//         name,
//         color,
//         age,
//         readyToEat
//     };
//     console.log(returnedValue);
//     if (returnedValue) {
//         console.log("upload complete");
//     }
//     res.send(returnedValue);
// })



app.post('/create_item', async (req, res) => {
   let response = await item.findByIdAndUpdate(req.body.id, {name: req.body.newName}, {new: true})
   console.log("response from collection", response);
    res.json(response)

})




app.get("/get_items/:product_id", async (req, res) => {
    console.log("get specific product route");
    // send to front end
    res.json(response);
  })


app.post('/create_fruit/:fruitId', (req, res) => {
    let id = req.params.fruitId
})

app.post('/create_fruit', (req, res) => {
    let id = req.query.idOfFruit
})

app.delete("/delete_nameless_data", async (req, res) => {
   let response = await MyFruit.deleteMany({name: ""});

   console.log(response);

   res.send({data: `deleted ${response.deletedCount} items.`})
})

app.get('/get_food_data', async (req, res) => {
    // get data from database
    let response = await MyFruit.find({});
    console.log(response);
    // send it back to front end
    res.json(response)

})

app.get('/get_single_fruit_using_id/:idOfFruit', async (req, res) => {
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.fruitId
    let id = req.params.idOfFruit;

    let response = await MyFruit.findById(id);
    console.log(response);
    res.send(response);
})

// this route is to set readyToEat to true
app.put('/update_one', async (req, res) => {
    let id = '63cd54377099d7e530cbb428';
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.fruitId
    // let filter = {_id: id};
    let myData = {readyToEat: true, color: "purple"};

    let response = await MyFruit.findByIdAndUpdate(id, myData, {new:true});
    console.log(response);
    res.send(response);
})
app.put('/update_many', async (req, res) => {
    let id = '63cd54377099d7e530cbb428';
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.fruitId
    let filter = {color: undefined};
    let myData = {readyToEat: false, color: "orange"};

    let response = await MyFruit.updateMany(filter, myData);
    console.log(response);
    res.send(response);
})
// change what the frontend tells us
app.put('/update_by_id', async (req, res) => {
    let id = '63cd54377099d7e530cbb428';
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.fruitId
    // update data comes from req.body {name: "banana", readyToEat: false, color: green}
    let myData = {name: "banana"}
    let response = await MyFruit.findByIdAndUpdate(id, myData, {new:true});
    console.log(response);
    res.send(response);
})


app.listen(5000, () => {
    console.log(`Server is listening on port 5000`)
});
