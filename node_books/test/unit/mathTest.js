const assert = require("assert");

describe("Math in JS", function(){
  it("should support +", function(done){
    setTimeout(function(){
      assert.equal(1 + 2, 2);
      done();
    }, 100);
  })
});
