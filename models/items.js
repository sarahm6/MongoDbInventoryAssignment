const mongoose = require('mongoose');

const myItemsSchema = new mongoose.newSchema ({
    price: Number,
    inventory: Number,
    nextDelivery: new Date(),
    deliveryAmt: Number,
    name: String
    }
)

const item = mongoose.model('item', myItemsSchema)
module.exports = item
