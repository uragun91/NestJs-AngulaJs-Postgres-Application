"use strict";

import angular from "angular";
import "@uirouter/angularjs";
import "oclazyload";

import "./pages/auth/auth.module";
import { appRouting } from "./app.routing";
import { IMAGES_MODULE } from "./pages/images/images.module";
import { AUTH_MODULE } from "./pages/auth/auth.module";

const IMAGES_APP =  angular
  .module("imagesApp", [
    "ui.router",
    AUTH_MODULE.name,
    IMAGES_MODULE.name
  ])
  .config(appRouting);

export { IMAGES_APP };
