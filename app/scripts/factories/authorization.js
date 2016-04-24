app.factory('Authorization', ['$rootScope', '$state', '$auth', '$q', function ($rootScope, $state, $auth, $q) {
        return {
            isInAnyRole: function (roles) {
                for (var i = 0; i < roles.length; i++) {
                    if ($auth.getPayload().roles.indexOf(roles[i]) !== -1) {
                        console.log('Exitst');
                        return true;
                    }
                }
                return false;
            },
            authorize: function () {
                console.log("Token Not Valid ? : " + !$auth.isAuthenticated());
                console.log("State Name not Equal to app.auth ? : " + ($rootScope.toState.name !== 'app.auth'));
                console.log("Over All : " + (!$auth.isAuthenticated() && $rootScope.toState.name !== 'app.auth'));
                console.log($rootScope.toState);
                if (!$auth.isAuthenticated() && $rootScope.toState.name !== 'app.auth') {
                    $rootScope.event.preventDefault();
                    $state.go('app.auth');
                } else {
                    console.log("ELSE PART");
                    console.log("Token Valid ? : " + $auth.isAuthenticated());
                    console.log("State Name not Equal to app.auth ? : " + $rootScope.toState.name !== 'app.auth');
                    console.log($rootScope.toState.data);
                    console.log(this.isInAnyRole($rootScope.toState.data));
                    if (!this.isInAnyRole($rootScope.toState.data)) {
                        $state.go('app.unauthorized');
                    }
                }
            }
        };
    }]);
