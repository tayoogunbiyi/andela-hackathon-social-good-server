const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

module.exports = { db: mongoose.connection };
