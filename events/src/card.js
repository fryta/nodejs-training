const eventTypes = require("./eventTypes");

module.exports = function cardModule(now) {
  function card(cardIdentifier) {
    let limit = null;
    let cash = 0;
    let events = [];

    const apply = (event) => {
      if (event.type === eventTypes.LIMIT_ASSIGNED) {
        limit = event.amount;
        cash = event.amount;
      }
      if (event.type === eventTypes.CARD_WITHDRAWN) {
        cash -= event.amount;
      }
      if (event.type === eventTypes.CARD_REPAID) {
        cash += event.amount;
      }
    };
    const limitAlreadyAssigned = () => limit !== null;
    const notEnoughMoney = (amount) => cash < amount;
    const storeAndApplyEvent = (type, amount) => {
      const event = {type, amount, card_id: cardIdentifier, date: now().toJSON()};
      apply(event);
      events.push(event);
    };

    return {
      assignLimit(amount) {
        if (limitAlreadyAssigned()) {
          throw new Error("Cannot assign limit for the second time");
        }

        storeAndApplyEvent(eventTypes.LIMIT_ASSIGNED, amount);
      },
      availableLimit() {
        return cash;
      },
      withdraw(amount) {
        if (!limitAlreadyAssigned()) {
          throw new Error("No limit assigned");
        }

        if(notEnoughMoney(amount)){
          throw new Error("Not enough money");
        }

        storeAndApplyEvent(eventTypes.CARD_WITHDRAWN, amount);
      },
      repay(amount) {
        storeAndApplyEvent(eventTypes.CARD_REPAID, amount);
      },
      pendingEvents(){
        return events;
      },
      uuid(){
        return cardIdentifier;
      },
      apply
    };
  }

  function recreateFrom(cardIdentifier, events){
    return events.reduce((card, event) => {
      card.apply(event);
      return card;
    }, card(cardIdentifier));
  }

  return {card, recreateFrom};
}