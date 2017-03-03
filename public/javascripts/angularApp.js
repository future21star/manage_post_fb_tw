var app = angular.module('fb-tw-integration', ['ui.router', 'satellizer', 'btford.socket-io'])
.config([
  '$authProvider',
  function($authProvider) {
    $authProvider.facebook({
      clientId: '649277678594701',
      scope: ['manage_pages', 'publish_actions'],
    });
  }
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider  , $urlRouterProvider) {
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/partials/login.html',
      controller: 'LoginCtrl',
      resolve: {
        accountsPromise: ['manage_fb_account', function(manage_fb_account) {
          return manage_fb_account.getAllAccounts();
        }]
      }
    })
    .state('account', {
      url: '/account/{account_id}',
      templateUrl: 'views/partials/account.html',
      controller: 'AccountCtrl',
      resolve: {
        account_info: ['$stateParams', 'manage_fb_account', function($stateParams, manage_fb_account) {
          return manage_fb_account.getAccountInfo($stateParams.account_id);
        }]
      }
    })
    .state('page', {
      url: '/page/{page_id}',
      templateUrl: 'views/partials/page.html',
      controller: 'PageCtrl',
      resolve: {
        full_page_info: ['$stateParams', 'manage_fb_account', function($stateParams, manage_fb_account) {
          return manage_fb_account.getFullPageInfo($stateParams.page_id);
        }]
      }
    });    
    $urlRouterProvider.otherwise('login');
  }
]);