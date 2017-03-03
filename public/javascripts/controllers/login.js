angular.module('fb-tw-integration')
.controller('LoginCtrl', [
  '$scope',
  '$state',
  '$auth',
  'manage_fb_account',
  function($scope, $state, $auth, manage_fb_account) {
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(res){
      	if (res.data.error) {
      		alert(res.data.error);
      	} else {
	        manage_fb_account.addAccount(res.data);
          console.log("-------added account-------", res.data);
          $scope.accounts = manage_fb_account.accounts;
      	}
      });
    }

    $scope.accounts = manage_fb_account.accounts;
  }
]);

