'use strict';

describe('Controller: StaydetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('travelBruhClientApp'));

  var StaydetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StaydetailsCtrl = $controller('StaydetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
