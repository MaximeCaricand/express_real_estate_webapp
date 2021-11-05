const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:3000/content";
var mongoose = require('mongoose');
var db;

describe('connection mongodb', function() {
    before(function(done) {
        db = mongoose.connect('mongodb://localhost:27017/realEstateDB');
        done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });
});

describe('pages found', function() {
    it('content', function(done) {
        request.get({ url: baseUrl }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('sale', function(done) {
        request.get({ url: baseUrl + "/sale" }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('rent', function(done) {
        request.get({ url: baseUrl + "/rent" }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('login', function(done) {
        request.get({ url: baseUrl + "/login" }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('register', function(done) {
        request.get({ url: baseUrl + "/register" }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
            done();
        });
    });
});