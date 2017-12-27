process.env.NODE_ENV = "test";
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
const admin = require('firebase-admin');
const serviceAccount = require("../hackpsu18-firebase-adminsdk-xf07l-ccc564f4ad");
const validator = require("email-validator");

let should = chai.should();

chai.use(chaiHttp);

//Scrub DB
describe('pre-registration tests', () => {
  before((done) => {
    deleteCollection(admin.firestore(), 'pre-registrations-test', 500)
      .then(() => {
        done();
      }).catch(err => {
      done(err);
    });
  });


  it('it should respond with success', (done) => {
    const succMatrix = ["abc@xyz.com", "myname@email.com", "a@b.com"];
    const promises = [];
    succMatrix.forEach(email => {
      promises.push(new Promise((resolve, reject) => {
        chai.request(server)
          .post('/register/pre')
          .type('form')
          .send({
            'email': email
          })
          .end((err, res) => {
            should.equal(err, null);
            console.log(err);
            res.should.have.status(200);
            resolve();
          });
      }));
    });
    Promise.all(promises).then(() => {
      done();
    }).catch(err => {
      done(err);
    });
  });


  it('should error out each time', (done) => {
    const failMatrix = ["", "jadlksfjalskdjf", "j"];
    const promises = [];
    failMatrix.forEach(email => {
      promises.push(new Promise((resolve, reject) => {
        chai.request(server)
          .post('/register/pre')
          .type('form')
          .send({
            'email': email
          }).end((err, res) => {
          res.should.have.status(400);
          resolve();
        });
      }));
    });
    Promise.all(promises).then(() => {
      done();
    });
  });
});

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      var batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted) => {
    if (numDeleted === 0) {
      resolve();
      return;
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
  })
    .catch(reject);
}
