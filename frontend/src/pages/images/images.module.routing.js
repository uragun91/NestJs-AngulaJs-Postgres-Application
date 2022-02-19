"use strict";

imagesRouting.$inject = ["$urlRouterProvider", "$stateProvider"];

function imagesRouting($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/images");

  $stateProvider.state({
    name: "images",
    url: "/images",
    component: "imagesComponent",
  });
  $stateProvider.state({
    name: "upload",
    url: "/upload",
    component: "uploadComponent"
  });
}

export { imagesRouting };
