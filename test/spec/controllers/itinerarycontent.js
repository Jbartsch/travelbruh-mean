'use strict';

describe('Controller: ItinerarycontentCtrl', function () {

  // load the controller's module
  beforeEach(module('travelBruhClientApp'));

  var ItinerarycontentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItinerarycontentCtrl = $controller('ItinerarycontentCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
