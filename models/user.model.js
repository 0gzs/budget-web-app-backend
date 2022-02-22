const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
}, { timeseries: true });

const User = mongoose.model("User", userSchema);

module.exports = User;