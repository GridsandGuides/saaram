app.factory('Principal', ['$rootScope','$q', '$http', '$timeout', '$cookies', function ($rootScope,$q, $http, $timeout, $cookies) {
        var _identity = undefined,
                _authenticated = false;
        var cookieName = 'MC_v1';
        var principal = {
            // Check if the identity is resolved
            isIdentityResolved: function () {
              console.log(angular.isDefined($cookies.getObject(cookieName)));
              // if($cookies.getObject(cookieName) !== undefined){
                 return angular.isDefined($cookies.getObject(cookieName));
              // }else{
              //     return false;
              // }
            },
            // Check if the user is authenticated (Sometimes cookies may present before logging in)
            isAuthenticated: function () {
                return _authenticated;
            },
            // Set Cookies to Browser
            setCookie: function (identity) {
                _identity = identity;
                _authenticated = identity !== null;
                var date = new Date();
                var minutes = 30;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                $cookies.putObject(cookieName, identity, {'expires': date});
                console.log($cookies.getObject(cookieName));
            },
            // Get the Cookie when needed
            getCookie: function () {
              
                  return $cookies.getObject(cookieName);


            },
            // Delete the Cookie when needed
            deleteCookie: function () {
                $cookies.remove(cookieName);
            },
            // Set the idenity
            identity: function (force) {

                // Initiate the Promise
                var deferred = $q.defer();


                if (force === true)
                    _identity = undefined;

                // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                if ($cookies.getObject(cookieName)) {
                    _identity = $cookies.getObject(cookieName);
                    _authenticated = true;
                    deferred.resolve($cookies.getObject(cookieName));
                    console.log('Identity already present. Reusing it');
                    return deferred.promise;
                }

                // get data from server
                //if($cookies.getObject(cookieName).session_id !== ""){
                  $http.get('http://devdf.mycove.com:80/rest/user/session').success(function (data) {

                      if (data.session_id !== "") {
                          //_identity = data;
                          //_authenticated = true;
                          principal.setCookie(data);
                      }
                      deferred.resolve(_identity);
                  }).error(function (err) {

                      _identity = null;
                      _authenticated = false;
                      deferred.reject(_identity);

                  });
                //}


                return deferred.promise;
            },
            isInRole: function (role) {
                if (!_authenticated || !_identity.role)
                    return false;
                return _identity.role == role;
            },
            isInAnyRole: function (roles) {
                console.log(_identity);
                if (!_authenticated || !_identity.role)
                    return false;
                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i]))
                        return true;
                }

                return false;
            },
            clearIdentity : function(){
              this._identity = undefined;
            }
        };

        return principal;
    }]);
