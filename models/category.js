const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
