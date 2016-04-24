/* 
 * Profile Controller
*/
app.controller("ProfileController", ['$scope', '$auth', '$state','$http', function ($scope, $auth, $state,$http) {
    $http.get('http://localhost:8000/profile').success(function (profile) {
        console.log(profile);
        console.log($auth.getPayload().roles);
    }).error(function (error) {
        $scope.error = error;
    });
}]);