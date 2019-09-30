const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/booksapi';

let booksPromise = MongoClient.connect(url, {bufferMaxEntries: 0}).then(function(client){
  return client.db().collection("books");
});

module.exports = {
  async createOrUpdate({title, slug, authors, isbn, description}) {
    const books = await booksPromise;

    return await books.updateOne(
      {isbn: isbn},
      { $set: {title, slug, authors, isbn, description} },
      {upsert: true}
    );
  },
  async find({isbn}) {
    const books = await booksPromise;

    return await books.findOne({isbn}, {projection: {_id: false}});
  },
  async remove({isbn}) {
    const books = await booksPromise;

    return await books.deleteOne({isbn});
  }
}