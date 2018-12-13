var expect = require('chai').expect;
var structName = require('../calcTest');

describe('#getLotName',function(){

context('with wrong args', function(){
  it('should return null', function(){
    expect(structName.getLotName("Southside Structure")).to.equal(null);
    });
  });

  context('with Nutwood arg', function(){
    it('should return: nutwood.js file',function(){
      expect(structName.getLotName("Nutwood Parking Structure")).to.equal("nutwood.js");
    });
  });

  context('with State College arg', function(){
    it('should return: state-college.js file',function(){
      expect(structName.getLotName("State College Structure")).to.equal("state-college.js");
    });
  });

  context('with Eastside arg', function(){
    it('should return: eastside.js file',function(){
      expect(structName.getLotName("Eastside Structure")).to.equal("eastside.js");
    });
  });

  context('with Lot A/G arg', function(){
    it('should return: lotAG.js file',function(){
      expect(structName.getLotName("Lot A & G")).to.equal("lotAG.js");
    });
  });

  context('with EvFree arg', function(){
    it('should return: ev-church.js file',function(){
      expect(structName.getLotName("EvFree Church")).to.equal("ev-church.js");
    });
  });
});
