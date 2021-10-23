const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    description: String,
    age: Number,
    gender: String,
    isActive: Boolean,
    status: Boolean,
    password: String,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);