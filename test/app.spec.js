const supertest = require("supertest");
const app = require("../src/app")



describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

describe("Exercises", () => {
  it("GET /exercises responds with 200 containing the user's exercises", () => {
    return supertest(app).get("/exercises/25").expect(200);
  });
});

describe("Create My Profile", () => {
  it("GET /user responds with 200 & the 'Create Profile' form", () => {
    return supertest(app).get("/").expect(200);
  });
});

describe("Edit Tempos", () => {
  it("GET /edittempos/ responds with 200 & the 'Edit Tempos' form", () => {
    return supertest(app).get("/").expect(200);
  });
});
