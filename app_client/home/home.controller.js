(function() {

  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
  function homeCtrl ($scope, loc8rData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'ParmaFindr',
      strapline: 'Find the best chicken parmigiana near you!'
    };
    vm.sidebar = {
      content: 'Looking for a great parma? ParmaFindr helps you find the best chicken parmigiana near you. Prefer the chips on the side or some ham on the top? ParmaFindr will help you find the taste you\'re looking for.'
    };
    vm.message = "Checking your location";
    vm.getData = function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      loc8rData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong";
      });
    };
    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };
    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };
    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  }
})();
