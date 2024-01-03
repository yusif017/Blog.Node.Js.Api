const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    categoryId: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
