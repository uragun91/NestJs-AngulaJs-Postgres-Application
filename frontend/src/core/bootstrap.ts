'use strict';

import * as angular from 'angular';
import { FILES_APP } from '../app';

angular.bootstrap(document, [FILES_APP.name], {
  strictDi: true,
});
