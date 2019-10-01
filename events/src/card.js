module.exports = function card() {
  let limit = null;
  let cash = 0;

  const limitAssigned = () => limit !== null;
  const notEnoughMoney = (amount) => cash < amount;

  return {
    assignLimit(amount) {
      if (limitAssigned()) {
        throw new Error("Cannot assign limit for the second time");
      }

      limit = amount;
      cash = amount;
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
    },
    repay(amount) {
      cash += amount;
    }
  };
};