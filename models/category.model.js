const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, default: new Date }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
