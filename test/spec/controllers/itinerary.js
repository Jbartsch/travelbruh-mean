'use strict';

describe('Controller: ItineraryCtrl', function () {

  // load the controller's module
  beforeEach(module('travelBruhClientApp'));

  var ItineraryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItineraryCtrl = $controller('ItineraryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
