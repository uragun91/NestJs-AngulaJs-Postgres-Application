import * as angular from 'angular';
import 'angular-cookies';
import '@uirouter/angularjs';

import './pages/auth/auth.module';
import { appRouting } from './app.routing';
import { AUTH_MODULE } from './pages/auth/auth.module';
import { appRunConfig } from './app-run.config';
import { FILES_MODULE } from './pages/files/files.module';

const FILES_APP = angular
  .module('filesApp', [
    'ngCookies',
    'ui.router',
    AUTH_MODULE.name,
    FILES_MODULE.name,
  ])
  .config(appRouting)
  .run(appRunConfig);

export { FILES_APP };
