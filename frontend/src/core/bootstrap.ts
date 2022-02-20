"use strict";

import * as angular from "angular";
import { IMAGES_APP } from "../app";

angular.bootstrap(document, [IMAGES_APP.name], {
  strictDi: true,
});
