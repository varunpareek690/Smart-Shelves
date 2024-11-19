const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    retailerEmail: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
