'use strict';

import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';

filesRouting.$inject = ['$urlRouterProvider', '$stateProvider'];

function filesRouting(
  $urlRouterProvider: UrlRouterProvider,
  $stateProvider: StateProvider,
) {
  $urlRouterProvider.otherwise('/files');

  $stateProvider.state({
    name: 'files',
    url: '/files',
    component: 'filesComponent',
  });
  $stateProvider.state({
    name: 'upload',
    url: '/upload',
    component: 'uploadComponent',
  });
}

export { filesRouting };
