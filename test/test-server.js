global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans', _id: '57bd1593d8cd9fe199ccee0f'},
                        {name: 'Tomatoes', _id: '57bd1593d8cd9fe199ccee10'},
                        {name: 'Peppers', _id: '57bd1593d8cd9fe199ccee11'}, function() {
                    done();
                        });
        });
    });
    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.body.should.not.equal('null');
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body.should.include({ _id: '57bd1593d8cd9fe199ccee0f', name: 'Broad beans', __v: 0 });
                res.body.should.include({ _id: '57bd1593d8cd9fe199ccee10', name: 'Tomatoes', __v: 0 });
                res.body.should.include({ _id: '57bd1593d8cd9fe199ccee11', name: 'Peppers', __v: 0 });
                done();
            });
    });
    
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.body.should.not.equal('null');
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                done();
            });
    });
    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/57bd1593d8cd9fe199ccee11')
            .send({'name': 'Peppe', '_id': '57bd1593d8cd9fe199ccee11'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.body.should.not.equal('null');
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Peppe');
                done();
            });
    });
    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/57bd1593d8cd9fe199ccee11')
            .end(function(err, res) {
                should.equal(err, null);
                res.body.should.not.equal('null');
                res.should.be.a('object');
                res.should.be.json;
                res.should.have.status(201);
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});