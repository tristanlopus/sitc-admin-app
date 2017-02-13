var app = angular.module('adminApp')

app.factory('getProjectSites', ['$log', '$q', '$http', function($log, $q, $http) {

  return function() {
    $log.log('getProjectSites ran!')
    var defer = $q.defer()

     $http({
      url: "app/appServer/getProjectSites.php",
      method: "GET"
    }).then(
      function(response) {
        var sites = {}
        response.data.forEach(function(currentSite) {
          sites[currentSite.projectSite_id] = currentSite
        })

        defer.resolve(sites)
      },
      function(error) {
        //TODO error handling
      })

    return defer.promise
  }

}])

app.factory('getCrew', ['$log', '$q', '$http', function($log, $q, $http) {

  return function() {
    $log.log('getCrew ran!')
    var defer = $q.defer()

     $http({
      url: "app/appServer/getCrew.php",
      method: "GET"
    }).then(
      function(response) {
        var crew = {}
        response.data.forEach(function(currentCrew) {
          // $log.log(currentCrew.firstName)
          crew[currentCrew.person_id] = currentCrew
        })
        defer.resolve(crew)
      },
      function(error) {
        //TODO error handling
      })

    return defer.promise
  }
}])

app.factory('toggleSiteActive', ['$log', '$q', '$http', '$mdToast', function($log, $q, $http, $mdToast) {
  return function(mySiteId, myActiveStatus) {

    return $http({
      url: "app/appServer/toggleSiteActive.php",
      method: 'GET',
      params: {
        isActive: myActiveStatus,
        siteId: mySiteId
      }
    })
  }
}])

app.factory('updateActiveCrew', ['$log', '$q', '$http', '$mdToast', function($log, $q, $http, $mdToast) {
  return function(myPersonId, myActiveStatus, paramsToUpdate) {

    if (!paramsToUpdate) {
      paramsToUpdate = {}
    }

    paramsToUpdate["isActive"] = myActiveStatus
    paramsToUpdate["personId"] = myPersonId

    return $http({
      url: "app/appServer/updateActiveCrew.php",
      method: 'GET',
      params: paramsToUpdate
    })

  }
}])