module.exports = db => {
  const books = db.collection('books');

  return {
    async createOrUpdate({title, slug, authors, isbn, description}) {
      return await books.updateOne(
        {isbn: isbn},
        { $set: {title, slug, authors, isbn, description} },
        {upsert: true}
      );
    },
    async find({isbn}) {
      return await books.findOne({isbn}, {projection: {_id: false}});
    },
    async findAll() {
      return await books
        .find({}, {projection: {_id: false}})
        .toArray();
    },
    async remove({isbn}) {
      return await books.deleteOne({isbn});
    }
  }
};