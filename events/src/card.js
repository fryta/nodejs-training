const eventTypes = require("./eventTypes");

module.exports = function cardModule(now) {
  return function card(cardIdentifier) {
    let limit = null;
    let cash = 0;
    let events = [];

    const limitAlreadyAssigned = () => limit !== null;
    const notEnoughMoney = (amount) => cash < amount;
    const storeEvent = (type, amount) => events.push({type, amount, card_id: cardIdentifier, date: now().toJSON()});

    return {
      assignLimit(amount) {
        if (limitAlreadyAssigned()) {
          throw new Error("Cannot assign limit for the second time");
        }

        limit = amount;
        cash = amount;

        storeEvent(eventTypes.LIMIT_ASSIGNED, amount);
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

        cash -= amount;
        storeEvent(eventTypes.CARD_WITHDRAWN, amount);
      },
      repay(amount) {
        cash += amount;
        storeEvent(eventTypes.CARD_REPAID, amount);
      },
      pendingEvents(){
        return events;
      },
      uuid(){
        return cardIdentifier;
      }
    };
  };
}