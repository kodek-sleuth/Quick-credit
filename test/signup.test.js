/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */

const library = require('./libraries/library');

const userDetails = require('./utils/utils');

const adminTable = require('../Api/Controllers/databaseController');

describe('App Authorisation Signup', () => {
  it('Should not signup new admin if his email already exists', (done) => {
    // Incase of an email that exists in database
    library.server.post('/api/v1/auth/signup')
      .set('Content-Type', 'multipart/form-data')
      .field('Fullname', 'Yahya Jalal')
      .field('Email', 'yahya@gmail.com')
      .field('Password', 'stealth')
      .field('isAdmin', 'True')
      .attach('Image', '/home/kodek-sleuth/Pictures/code.jpeg')
      .end((error, res) => {
        library.expect(res.body).to.have.property('Status');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Email is already taken');
        library.expect(res.body.Status).to.equals('401');
        done();
      });
  });

  it('Should not signup new admin if his name already exists', (done) => {
    // Incase of a fullname that exists in database
    library.server.post('/api/v1/auth/signup')
      .set('Content-Type', 'multipart/form-data')
      .field('Fullname', 'Yahya Jalal')
      .field('Email', 'abel@gmail.com')
      .field('Password', 'stealth')
      .field('isAdmin', 'True')
      .attach('Image', '/home/kodek-sleuth/Pictures/code.jpeg')
      .end((error, res) => {
        library.expect(res.body).to.have.property('Status');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Name is already taken');
        library.expect(res.body.Status).to.equals('401');
        done();
      });
  });

  it('Should not signup new admin if email is not provided', (done) => {
    // Incase of a fullname that exists in database
    library.server.post('/api/v1/auth/signup')
      .set('Content-Type', 'multipart/form-data')
      .field('Fullname', 'Yahya Jalal')
      .field('Password', 'stealth')
      .field('isAdmin', 'True')
      .attach('Image', '/home/kodek-sleuth/Pictures/code.jpeg')
      .end((error, res) => {
        library.expect(res.body).to.have.property('Status');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Missing Email field');
        library.expect(res.body.Status).to.equals('401');
        done();
      });
  });

  it('Should not signup new admin if his name is missing', (done) => {
    // Incase of a fullname that exists in database
    library.server.post('/api/v1/auth/signup')
      .set('Content-Type', 'multipart/form-data')
      .field('Fullname', 'Yahya Jalal')
      .field('Email', 'abel@gmail.com')
      .field('Password', 'stealth')
      .field('isAdmin', 'True')
      .attach('Image', '/home/kodek-sleuth/Pictures/code.jpeg')
      .end((error, res) => {
        library.expect(res.body).to.have.property('Status');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Name is missing');
        library.expect(res.body.Status).to.equals('401');
        done();
      });
  });

  it('Should not signup new admin if his name/email/isAdmin is an integer', (done) => {
    // Incase of a fullname that exists in database
    library.server.post('/api/v1/auth/signup')
      .set('Content-Type', 'multipart/form-data')
      .field('Fullname', 'Yahya Jalal')
      .field('Email', 'abel@gmail.com')
      .field('Password', 'stealth')
      .field('isAdmin', 'True')
      .attach('Image', '/home/kodek-sleuth/Pictures/code.jpeg')
      .end((error, res) => {
        library.expect(res.body).to.have.property('Status');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Email, Name or ');
        library.expect(res.body.Status).to.equals('401');
        done();
      });
  });
});
