require('dotenv').config();
const dotenv = require('dotenv');

const express = require('express');
const app = express()
const PORT =3001;
const router = express.Router();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes=require('./routes/categoryRoutes')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/category', categoryRoutes);

app.use('/', router);
app.listen(PORT, function () {
    console.log(`localhost:${PORT} çalısıyor`)
})