
const supertest = require("supertest");
const app = require("../src/app");

const exercises = [
  {
    id: 1,
    name: "Doubles",
    currentTempo: "80",
    goalTempo: "90"   
  },
  {
    id: 2,
    name: "Paradiddles",
    currentTempo: "90",
    goalTempo: "100"
    
  }
]

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

describe("Exercises", () => {
  it("GET /exercises responds with 200 containing the user's exercises", () => {
    return supertest(app).get("/exercises").expect(200, exercises);
  });
});

describe("Create My Profile", () => {
  it("POST /profileform responds with 200 & the 'Create Profile' form", () => {
    return supertest(app).post("/createprofile").expect(200);
  });
});

describe("Edit Tempos", () => {
  it("POST /edittempos responds with 200 & the 'Edit Tempos' form", () => {
    return supertest(app).patch("/edittempos").expect(200);
  });
});
