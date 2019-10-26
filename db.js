const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/"

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

module.exports = { db: mongoose.connection };
