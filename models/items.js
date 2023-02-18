const mongoose = require('mongoose');

const myItemsSchema = new mongoose.newSchema ({
    price: 2.00,
    inventory: 700,
    nextDelivery: new Date(),
    deliveryAmt: 200,
    name: "Toy Car"
    }
)

const item = mongoose.model('item', myItemsSchema)
module.exports = item
