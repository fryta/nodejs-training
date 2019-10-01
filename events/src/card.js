const eventCreatorFactory = require("./eventCreator");
const {LIMIT_ASSIGNED, CARD_WITHDRAWN, CARD_REPAID} = require("./eventTypes");
const eventTrackerFactory = require("./eventTracker");

module.exports = (now) => {
  const card = (cardIdentifier) => {
    let limit = null;
    let cash = 0;

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
    const eventCreator = eventCreatorFactory(cardIdentifier, now);
    const {applyWithRecord, ...eventTracker} = eventTrackerFactory(apply);

    return {
      ...eventTracker,
      apply,
      assignLimit(amount) {
        if (limitAlreadyAssigned()) {
          throw new Error("Cannot assign limit for the second time");
        }

        const event = eventCreator.limitAssigned(amount);
        applyWithRecord(event);
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

        const event = eventCreator.cardWithdrawn(amount);
        applyWithRecord(event);
      },
      repay(amount) {
        const event = eventCreator.cardRepaid(amount);
        applyWithRecord(event);
      },
      uuid(){
        return cardIdentifier;
      }
    };
  }

  const recreateFrom = (cardIdentifier, events) => {
    return events.reduce((card, event) => {
      card.apply(event);
      return card;
    }, card(cardIdentifier));
  }

  return {card, recreateFrom};
}