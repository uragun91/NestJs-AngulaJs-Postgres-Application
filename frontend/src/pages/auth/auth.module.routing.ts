"use strict";

import { StateProvider, UrlRouterProvider } from "@uirouter/angularjs";

authRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function authRouting($urlRouterProvider: UrlRouterProvider, $stateProvider: StateProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider.state({
    name: 'auth',
    url: '/auth',
    component: 'auth'
  });
}

export { authRouting };
