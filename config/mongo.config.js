const config = require('./config')
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(config.mongo_db , { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('MongoDB connected!!');
});

module.exports = mongoose;