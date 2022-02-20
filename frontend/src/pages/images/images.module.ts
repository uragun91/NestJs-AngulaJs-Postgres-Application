'use strict';

import * as angular from 'angular';
import { filesInputDirective } from './files-input/files-input.directive';
import { imagesRouting } from './images.module.routing';
import { imagesComponent } from './images/images.component';
import { ngThumbDirective } from './ng-thumb/ng-thumb.directive';
import { uploadComponent } from './upload/upload.component';

const IMAGES_MODULE = angular
  .module('imagesModule', [])
  .component('imagesComponent', imagesComponent)
  .component('uploadComponent', uploadComponent)
  .directive('ngThumb', ngThumbDirective)
  .directive('filesInput', filesInputDirective)
  .config(imagesRouting);

export { IMAGES_MODULE };
