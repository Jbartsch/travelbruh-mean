'use strict';

describe('Service: travelBruhFactory', function () {

  // load the service's module
  beforeEach(module('travelBruhClientApp'));

  // instantiate service
  var travelBruhFactory;
  beforeEach(inject(function (_travelBruhFactory_) {
    travelBruhFactory = _travelBruhFactory_;
  }));

  it('should do something', function () {
    expect(!!travelBruhFactory).toBe(true);
  });

});
