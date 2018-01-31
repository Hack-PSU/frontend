/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const admin = require('firebase-admin');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Deletes all documents in the provided collection
 * @param db
 * @param collectionPath
 * @param batchSize
 * @return {Promise<any>}
 */
function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

/**
 * Recursively batch deletes the collections in the provided collection, limiting
 * by the provided batch size.
 * @param db
 * @param query
 * @param batchSize
 * @param resolve
 * @param reject
 */
function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => snapshot.size);
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

// Scrub DB
describe('pre-registration tests', () => {
  before((done) => {
    deleteCollection(admin.firestore(), 'pre-registrations-test', 500)
      .then(() => {
        done();
      }).catch((err) => {
        done(err);
      });
  });


  it('it should respond with success', (done) => {
    const succMatrix = ['abc@xyz.com', 'myname@email.com', 'a@b.com'];
    const promises = [];
    succMatrix.forEach((email) => {
      promises.push(new Promise((resolve) => {
        chai.request(server)
          .post('/v1/register/pre')
          .type('form')
          .send({
            email,
          })
          .end((err, res) => {
            should.equal(err, null);
            res.should.have.status(200);
            resolve();
          });
      }));
    });
    Promise.all(promises).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });


  it('should error out each time', (done) => {
    const failMatrix = ['', 'jadlksfjalskdjf', 'j'];
    const promises = [];
    failMatrix.forEach((email) => {
      promises.push(new Promise((resolve) => {
        chai.request(server)
          .post('/v1/register/pre')
          .type('form')
          .send({
            email,
          })
          .end((err, res) => {
            res.should.have.status(400);
            resolve();
          });
      }));
    });
    Promise.all(promises).then(() => {
      done();
    }).catch((err) => {
      console.error(err);
    });
  });
});

