import * as angular from 'angular';
import 'angular-cookies';
import '@uirouter/angularjs';

import './pages/auth/auth.module';
import { appRouting } from './app.routing';
import { IMAGES_MODULE } from './pages/images/images.module';
import { AUTH_MODULE } from './pages/auth/auth.module';
import { appRunConfig } from './app-run.config';

const IMAGES_APP = angular
  .module('imagesApp', [
    'ngCookies',
    'ui.router',
    AUTH_MODULE.name,
    IMAGES_MODULE.name,
  ])
  .config(appRouting)
  .run(appRunConfig);

export { IMAGES_APP };
