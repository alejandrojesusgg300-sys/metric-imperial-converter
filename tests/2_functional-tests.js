'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // Convierte una entrada válida
  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, 'gal');
        assert.equal(
          res.body.string,
          '10 liters converts to 2.64172 gallons'
        );
        done();
      });
  });

  // Unidad inválida
  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  // Número inválido
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  // Número y unidad inválidos
  test('Convert an invalid number AND invalid unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  // Si no viene número, usa 1 por defecto
  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.equal(
          res.body.string,
          '1 kilograms converts to 2.20462 pounds'
        );
        done();
      });
  });

});
