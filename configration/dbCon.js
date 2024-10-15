const mongoose = require('mongoose');
const MONGODB = 'mongodb://localhost:27017/Blog-Admin-App';

const db = mongoose.connect(MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Err', err));

module.exports = db;