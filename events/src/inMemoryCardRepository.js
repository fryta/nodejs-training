module.exports = (recreateFrom) => {
  let storedEvents = {};

  const getCardEvents = (cardIdentifier) => storedEvents[cardIdentifier] || [];

  return {
    async save(card) {
      const existingCardEvents = getCardEvents(card.uuid());
      storedEvents[card.uuid()] = [...existingCardEvents, ...card.pendingEvents()];
      card.flushEvents();
    },
    async load(cardIdentifier) {
      return recreateFrom(cardIdentifier, getCardEvents(cardIdentifier));
    },
  }
};
