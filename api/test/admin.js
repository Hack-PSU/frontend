/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const firebase = require('firebase');
const admin = require('firebase-admin');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCpvAPdiIcqKV_NTyt6DZgDUNyjmA6kwzU',
  authDomain: 'hackpsu18.firebaseapp.com',
  databaseURL: 'https://hackpsu18.firebaseio.com',
  projectId: 'hackpsu18',
  storageBucket: 'hackpsu18.appspot.com',
  messagingSenderId: '1002677206617',
};
firebase.initializeApp(config);

const should = chai.should();

chai.use(chaiHttp);

// First dummy test
describe('test get registered hackers', () => {
  let listener = null;
  afterEach((done) => {
    firebase.auth().signOut();
    if (listener) {
      listener();
    }
    done();
  });
  // Failure test 1
  describe('No auth failure', () => {
    it('it should reject with an unauthorized message', (done) => {
      chai.request(server)
        .get('/v1/admin/registered')
        .end((err, res) => {
          console.log(err);
          res.should.have.status(401);
          err.response.body.should.be.a('object');
          should.equal(err.response.body.error, 'ID Token must be provided');
          done();
        });
    });
  });
  describe('no admin auth failure', () => {
    it('it should reject with an lack of privileges message', (done) => {
      firebase.auth().signInWithEmailAndPassword('test@email.com', 'password')
        .catch((err) => {
          done(err);
        });
      listener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken(true)
            .then((idToken) => {
              chai.request(server)
                .get('/v1/admin/registered')
                .set('content-type', 'application/json')
                .send({ idtoken: idToken })
                .end((err, res) => {
                  res.should.have.status(401);
                  err.response.body.should.be.a('object');
                  should.equal(err.response.body.error, 'You do not have sufficient permissions for this operation');
                  done();
                });
            }).catch((error) => {
              done(error);
            });
        }
      });
    });
  });
  describe('admin auth success', () => {
    it('it should accept and return an array of registered hackers', (done) => {
      firebase.auth().signInWithEmailAndPassword('admin@email.com', 'password')
        .catch((err) => {
          done(err);
        });
      listener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken(true)
            .then((idToken) => {
              chai.request(server)
                .get('/v1/admin/registered')
                .set('content-type', 'application/json')
                .send({ idtoken: idToken })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
                });
            }).catch((error) => {
              done(error);
            });
        }
      });
    });
  });
});

describe('test make admin', () => {
  let listener = null;
  afterEach(() => {
    firebase.auth().signOut();
    if (listener) {
      listener();
    }
  });
  describe('un-authenticated tries to make admin', () => {
    it('it should error out with not authenticated error', (done) => {
      chai.request(server)
        .post('/v1/admin/makeadmin')
        .set('content-type', 'application/json')
        .send({ uid: 'ykdPNZkuXXYLkmv4MmLeGnoSF8g2' })
        .end((err, res) => {
          res.should.have.status(401);
          err.response.body.should.be.a('object');
          err.response.body.error.should.be.equal('ID Token must be provided');
          done();
        });
    });
  });
  describe('user tries to make admin', () => {
    describe('user does not provide uid', () => {
      it('it should reject with lack of permissions', (done) => {
        firebase.auth().signInWithEmailAndPassword('test@email.com', 'password')
          .catch(err => done(err));
        listener = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true)
              .then((idToken) => {
                chai.request(server)
                  .post('/v1/admin/makeadmin')
                  .set('content-type', 'application/json')
                  .send({ idtoken: idToken })
                  .end((err, res) => {
                    res.should.have.status(401);
                    err.response.body.should.be.a('object');
                    err.response.body.error.should.be.equal('You do not have sufficient permissions for this operation');
                    done();
                  });
              }).catch(err => console.error(err));
          }
        });
      });
    });
    describe('user provides admin uid', () => {
      it('it should reject with lack of permissions', (done) => {
        firebase.auth().signInWithEmailAndPassword('test@email.com', 'password')
          .catch(err => done(err));
        listener = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true)
              .then((idToken) => {
                chai.request(server)
                  .post('/v1/admin/makeadmin')
                  .set('content-type', 'application/json')
                  .send({ idtoken: idToken, uid: 'gsOwfFcUHKfmRHTsmI7N1k7Ocie2' })
                  .end((err, res) => {
                    res.should.have.status(401);
                    err.response.body.should.be.a('object');
                    err.response.body.error.should.be.equal('You do not have sufficient permissions for this operation');
                    done();
                  });
              }).catch(err => console.error(err));
          }
        });
      });
    });
    describe('user provides valid uid', () => {
      it('it should reject with lack of permissions', (done) => {
        firebase.auth().signInWithEmailAndPassword('test@email.com', 'password')
          .catch(err => done(err));
        listener = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true)
              .then((idToken) => {
                chai.request(server)
                  .post('/v1/admin/makeadmin')
                  .set('content-type', 'application/json')
                  .send({ idtoken: idToken, uid: 'ykdPNZkuXXYLkmv4MmLeGnoSF8g2' })
                  .end((err, res) => {
                    res.should.have.status(401);
                    err.response.body.should.be.a('object');
                    err.response.body.error.should.be.equal('You do not have sufficient permissions for this operation');
                    done();
                  });
              }).catch(err => console.error(err));
          }
        });
      });
    });
  });
  describe('admin tries to make admin', () => {
    let genUid = null;
    after((done) => {
      if (genUid) {
        admin.auth().deleteUser(genUid);
      }
      if (listener) {
        listener();
      }
      firebase.auth().signOut();
      done();
    });
    before((done) => {
      admin.auth().createUser({
        email: 'temp@email.com',
        emailVerified: false,
        password: 'password',
      }).then((userRecord) => {
        genUid = userRecord.uid;
        done();
      }).catch(error => done(error));
    });
    describe('admin success', () => {
      it('it should succeed', (done) => {
        firebase.auth().signInWithEmailAndPassword('admin@email.com', 'password')
          .catch(err => done(err));
        listener = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true)
              .then((decodedToken) => {
                chai.request(server)
                  .post('/v1/admin/makeadmin')
                  .set('content-type', 'application/json')
                  .send({ idtoken: decodedToken, uid: genUid, privilege: 4 })
                  .end((err, res) => {
                    res.should.have.status(200);
                    should.equal('Success', res.text);
                    should.equal(err, null);
                    done();
                  });
              });
          }
        });
      });
    });
    describe('admin failures', () => {
      it('it should fail due to improper inputs', (done) => {
        firebase.auth().signInWithEmailAndPassword('admin@email.com', 'password')
          .catch(err => done(err));
        listener = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true)
              .then((decodedToken) => {
                chai.request(server)
                  .post('/v1/admin/makeadmin')
                  .set('content-type', 'application/json')
                  .send({ idtoken: decodedToken, privilege: 4 })
                  .end((err, res) => {
                    res.should.have.status(400);
                    err.response.body.should.be.a('object');
                    done();
                  });
              }).catch(err => done(err));
          }
        });
      });
    });
  });
});
