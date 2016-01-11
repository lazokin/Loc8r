(function(){

  angular
    .module('loc8rApp')
    .service('loc8rData', loc8rData);

  loc8rData.$inject = ['$http'];
  function loc8rData($http) {
    var locationByCoords = function(lat, lng) {
      return $http.get('api/locations?lat=' + lat + '&lng=' + lng + '&maxDistance=20');
    };
    return {
      locationByCoords: locationByCoords
    };
  };

})();
