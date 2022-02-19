"use strict";

import angular from "angular";
import { imagesRouting } from "./images.module.routing";
import { imagesComponent } from "./images/images.component";
import { uploadComponent } from "./upload/upload.component";

const IMAGES_MODULE = angular
  .module("imagesModule", [])
  .component("imagesComponent", imagesComponent)
  .component("uploadComponent", uploadComponent)
  .config(imagesRouting);

export { IMAGES_MODULE };
