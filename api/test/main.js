process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

// First index test
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
