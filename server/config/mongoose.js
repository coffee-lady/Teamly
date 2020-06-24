const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = require('./config').mongoURI;

const client = new MongoClient(uri, {
  useUnifiedTopology: true
});

client.connect(err => {
  if (err) {
    console.error(err);
    client.close();
  }
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => console.error(err));

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2')
});

process.on('SIGINT', () => {
  process.exit(0)
});

process.on('SIGTERM', () => {
  process.exit(0);
});

require('../models/user.model');
require('../models/task.model');
require('../models/project.model');