const httpClient = require("supertest");
const app = require("../../src/app");

describe("Book inventory", function() {
  it("allows to stock up the items", async function(){
    const createResult = await httpClient(app)
      .post('/book')
      .send({
        title: "JavaScript in Action",
        authors: ["James Smith", "Kate Donovan"],
        isbn: "0123456789",
        description: "The ultimate JS book!"
      })
      .set('Content-Type', 'application/json')
      .expect(302);

    const readResult = await httpClient(app)
      .get(createResult.header.location)
      .expect(200, {
        title: "JavaScript in Action",
        authors: ["James Smith", "Kate Donovan"],
        isbn: "0123456789",
        description: "The ultimate JS book!"
      });
  });
});