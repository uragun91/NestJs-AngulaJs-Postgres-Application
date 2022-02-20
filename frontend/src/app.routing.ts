'use strict';

import { UrlRouterProvider } from '@uirouter/angularjs';

appRouting.$inject = ['$urlRouterProvider', '$stateProvider'];

function appRouting($urlRouterProvider: UrlRouterProvider) {
  $urlRouterProvider.otherwise('/images');
}

export { appRouting };
