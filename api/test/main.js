process.env.NODE_ENV = "test";
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

let should = chai.should();

chai.use(chaiHttp);

//First dummy test
describe('dummy', () => {
  beforeEach((done) => {
    console.log("Running test");
    done();
  });
});

//First index test
describe('index test', () => {
  it('it should respond with a simple success message', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.have.header('content-type', /^application\/json.*/);
        res.body.should.be.a('object');
        res.body.response.should.be.a('string');
        done();
      });
  });
});