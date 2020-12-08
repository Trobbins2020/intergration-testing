const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../server");

describe("Express App", () => {
  it("should return a message from GET /", () => {
    return supertest(app)
      .get("/apps")
      .expect(200) // assert that you get a 200  OK status
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        const apps = res.body[0];
        expect(apps).to.include.all.keys(
          "App",
          "Category",
          "Rating",
          "Reviews",
          "Size",
          "Installs",
          "Type",
          "Price",
          "Content Rating",
          "Genres",
          "Last Updated",
          "Current Ver",
          "Android Ver"
        );
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });

  it("should be 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "Sort must be one of rating or app");
  });

  it("should be 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ genres: "MISTAKE" })
      .expect(
        400,
        "Genres must be one of Action, Puzzle, Strategy, Casual, Arcade or Card"
      );
  });

  it("should be 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ genres: "Action", sort: "rating" })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });
});
