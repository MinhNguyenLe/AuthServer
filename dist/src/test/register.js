"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const index_1 = require("index");
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe("POST /api/register", () => {
  it("It should POST register", (done) => {
    const account = {
      email: "example@gmail.com",
      password: "password",
    };
    chai_1.default
      .request((0, index_1.appStart)())
      .post("/api/register")
      .send(account)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("id").eq(4);
        response.body.should.have.property("name").eq("Task 4");
        response.body.should.have.property("completed").eq(false);
        done();
      });
  });
  it("It should NOT POST a new task without the name property", (done) => {
    const task = {
      completed: false,
    };
    chai_1.default
      .request((0, index_1.appStart)())
      .post("/api/tasks")
      .send(task)
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.be.eq("The name should be at least 3 chars long!");
        done();
      });
  });
});
