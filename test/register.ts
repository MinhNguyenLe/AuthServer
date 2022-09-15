import chai from "chai";
import { appStart } from "../index";
import chaiHttp from "chai-http";

chai.should();

chai.use(chaiHttp);

describe("POST /api/register", () => {
  it("It should POST register", (done) => {
    const account = {
      email: "example@gmail.com",
      password: "password",
    };
    chai
      .request(appStart())
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
    chai
      .request(appStart())
      .post("/api/tasks")
      .send(task)
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.be.eq("The name should be at least 3 chars long!");
        done();
      });
  });
});
