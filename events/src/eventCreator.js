const {LIMIT_ASSIGNED, CARD_WITHDRAWN, CARD_REPAID} = require("./eventTypes");

module.exports = (cardIdentifier, now) => {
  return {
    limitAssigned(amount){
      return {type: LIMIT_ASSIGNED, amount, card_id: cardIdentifier, date: now().toJSON()};
    },
    cardWithdrawn(amount){
      return {type: CARD_WITHDRAWN, amount, card_id: cardIdentifier, date: now().toJSON()};
    },
    cardRepaid(amount){
      return {type: CARD_REPAID, amount, card_id: cardIdentifier, date: now().toJSON()};
    }
  }
}