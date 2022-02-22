'use strict';

import * as angular from 'angular';
import { filesInputDirective } from './files-input/files-input.directive';
import { filesRouting } from './files.module.routing';
import { filesComponent } from './files/files.component';
import { ngThumbDirective } from './ng-thumb/ng-thumb.directive';
import { FilesService } from './services/files.service';
import { uploadComponent } from './upload/upload.component';

const FILES_MODULE = angular
  .module('filesModule', [])
  .component('filesComponent', filesComponent)
  .component('uploadComponent', uploadComponent)
  .directive('ngThumb', ngThumbDirective)
  .directive('filesInput', filesInputDirective)
  .service('FilesService', FilesService)
  .config(filesRouting);

export { FILES_MODULE };
