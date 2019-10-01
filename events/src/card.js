const eventCreatorFactory = require("./eventCreator");
const {LIMIT_ASSIGNED, CARD_WITHDRAWN, CARD_REPAID} = require("./eventTypes");

module.exports = function cardModule(now) {
  function card(cardIdentifier) {
    let limit = null;
    let cash = 0;
    let events = [];

    const eventCreator = eventCreatorFactory(cardIdentifier, now);
    const apply = (event) => {
      if (event.type === LIMIT_ASSIGNED) {
        limit = event.amount;
        cash = event.amount;
      }
      if (event.type === CARD_WITHDRAWN) {
        cash -= event.amount;
      }
      if (event.type === CARD_REPAID) {
        cash += event.amount;
      }
    };
    const limitAlreadyAssigned = () => limit !== null;
    const notEnoughMoney = (amount) => cash < amount;
    const storeAndApplyEvent = (specificEventCreator, amount) => {
      const event = specificEventCreator(amount);
      apply(event);
      events.push(event);
    };

    return {
      assignLimit(amount) {
        if (limitAlreadyAssigned()) {
          throw new Error("Cannot assign limit for the second time");
        }

        storeAndApplyEvent(eventCreator.limitAssigned, amount);
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

        storeAndApplyEvent(eventCreator.cardWithdrawn, amount);
      },
      repay(amount) {
        storeAndApplyEvent(eventCreator.cardRepaid, amount);
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