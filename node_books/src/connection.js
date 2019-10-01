const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/booksapi';

module.exports = () => MongoClient.connect(url, {bufferMaxEntries: 0}).then(function(client){
  return client.db();
});
