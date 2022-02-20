'use strict';

import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';

imagesRouting.$inject = ['$urlRouterProvider', '$stateProvider'];

function imagesRouting(
  $urlRouterProvider: UrlRouterProvider,
  $stateProvider: StateProvider,
) {
  $urlRouterProvider.otherwise('/images');

  $stateProvider.state({
    name: 'images',
    url: '/images',
    component: 'imagesComponent',
  });
  $stateProvider.state({
    name: 'upload',
    url: '/upload',
    component: 'uploadComponent',
  });
}

export { imagesRouting };
