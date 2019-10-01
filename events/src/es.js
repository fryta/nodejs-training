function initStore() {
  const es = require('eventstore')({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    dbName: 'card_eventstore',
    eventsCollectionName: 'events',
    snapshotsCollectionName: 'snapshots',
    transactionsCollectionName: 'transactions',
    timeout: 10000,
    options: {
      useNewUrlParser: true
    }
  });

  es.close = function(){
    es.store.db.close();
  };

  es.defineEventMappings({
    id: 'event_id'
  });

  return new Promise(function(resolve, reject) {
    es.init(function (err) {
      if(err) reject(err);

      resolve(es);
    });
  });
}

module.exports = initStore;