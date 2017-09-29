var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

//before every test
before(function(done){
  db.sequelize.sync({force: true}).then(function(){
    done();
  });
});
//-------------------------------------------test get
describe('Get /tacos', function(){
  it('should return a 200 response', function(done){
    request(app).get("/tacos").expect(200, done);
  });
});
//-----------------------------------------test post
describe('POST /tacos', function(){
  it('should create and redirect to /tacos after posting a valid taco', function(done){
    request(app).post("/tacos").type('form').send({
      name: 'Yum taco',
      amount: 1300
    }).expect('Location', '/tacos')
    .expect(302, done);
  });
});
//---------------------------------------test delete
describe('Delete /tacos/id', function(){
  it('should return a 200 response on delete a valid taco', function(done){
    request(app).delete("/tacos/1")
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('msg');
      expect(response.body.msg).to.equal('success');
      done();
    });
  });
});
