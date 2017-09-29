/* globals it: true} */
/* globals describe: true} */
// --- Above are JSHint's Linter Settings for this particular file --- //

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');

describe("Get /", function(){
  //we write all test that apply to this router
  it('should return a 200 response', function(done){
    //done lets mocha know that it is done and runs the next
    request(app).get("/").expect(200, done);
  });
  //next test
});
