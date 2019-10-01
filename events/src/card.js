const eventTypes = require("./eventTypes");

module.exports = function card() {
  let limit = null;
  let cash = 0;
  let events = [];

  const limitAssigned = () => limit !== null;
  const notEnoughMoney = (amount) => cash < amount;
  const storeEvent = (type, amount) => events.push({type, amount});

  return {
    assignLimit(amount) {
      if (limitAssigned()) {
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
      if (!limitAssigned()) {
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
    }
  };
};