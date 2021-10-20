const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: String,
    userId: String,
    description: String,
    isActive: Boolean,
    status: Boolean,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);