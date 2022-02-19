"use strict";

appRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function appRouting($urlRouterProvider) {
  $urlRouterProvider.otherwise("/images");
}

export { appRouting };
