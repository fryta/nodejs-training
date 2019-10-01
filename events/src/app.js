const express = require('express');
const now  = function() { return new Date(); };
const {card, recreateFrom} = require('./card')(now);
const ClientError = require('./ClientError');

module.exports = async function() {
  const app = express();

  const initStore = require('./es');
  const es = await initStore();
  const repository = require('./cardRepository')(recreateFrom, es);

  function withErrorHandling(fn) {
    return async function(req, res) {
      try {
        await fn(req.body);
        res.status(204).send();
      } catch (e) {
        if (e instanceof ClientError) {
          res.status(400).json({error: e.message});
        }
        console.log(e);
        res.status(500).send();
      }
    };
  }

  function withPersistence(fn) {
    return async (body) => {
      const c = await repository.load(body.uuid);
      fn(c, body);
      await repository.save(c);
    };
  }

  app.use(express.json());

  app.get('/limit/:uuid', async function (req, res) {
    const c = await repository.load(req.params.uuid);
    res.json({uuid: c.uuid(), limit: c.availableLimit()});
  });

  app.post('/limit', withErrorHandling(withPersistence(function(card, body) {
    card.assignLimit(body.amount);
  })));

  app.post('/withdrawal', withErrorHandling(withPersistence(function(card, body) {
    card.withdraw(body.amount);
  })));

  app.post('/repayment', withErrorHandling(withPersistence(function(card, body) {
    card.repay(body.amount);
  })));

  app.close = function() {
    return es.close();
  };

  return app;
};
