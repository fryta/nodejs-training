// 1) thisful programming with prototypes
function Programmer1() {
  this.knownLanguages = [];
}
Programmer1.prototype.learnNewLanguage = function(language) {
  this.knownLanguages.push(language);
}
Programmer1.prototype.isPragmatic = function() {
  return this.knownLanguages.length > 2;
}

const programmer1 = new Programmer1();
programmer1.learnNewLanguage('Java');
programmer1.learnNewLanguage('Ruby');
console.log(programmer1.isPragmatic()); // false
programmer1.learnNewLanguage('Python');
console.log(programmer1.isPragmatic()); // true


['Java', 'Ruby', 'Python'].forEach(programmer1.learnNewLanguage, programmer1);


class Programmer2 {
  constructor() {
    this.languages = [];
  }
  learnNewLanguage(lang) {
    this.languages.push(lang);
  }
  isPragmatic() {
    return this.languages.length > 2;
  }
}

const programmer2 = new Programmer2();
programmer2.learnNewLanguage('Java');
programmer2.learnNewLanguage('Ruby');
console.log(programmer2.isPragmatic()); // false
programmer2.learnNewLanguage('Python');
console.log(programmer2.isPragmatic()); // true


['Java', 'Ruby', 'Python'].forEach(programmer2.learnNewLanguage, programmer2);


function createProgrammer() {
  const languages = [];

  return {
    learnNewLanguage: (language) => languages.push(language),
    isPragmatic: () => languages.length > 2
  }
}

const programmer3 = createProgrammer();
programmer3.learnNewLanguage('Elm');
programmer3.learnNewLanguage('Clojure');
console.log(programmer3.isPragmatic()); // false
programmer3.learnNewLanguage('Haskell');
console.log(programmer3.isPragmatic()); // true