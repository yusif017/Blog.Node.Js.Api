const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  email: { type: String, required: true,  unique: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
