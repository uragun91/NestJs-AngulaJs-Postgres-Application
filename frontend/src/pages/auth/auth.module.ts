"use strict";

import * as angular from "angular";
import { authRouting } from "./auth.module.routing";
import { authComponent } from "./auth/auth.component";
import { loginComponent } from "./login/login.component";
import { singUpComponent } from "./sign-up/sign-up.component";

const AUTH_MODULE = angular
  .module("authModule", [])
  .component("auth", authComponent)
  .component("login", loginComponent)
  .component("signUp", singUpComponent)
  .config(authRouting);

export { AUTH_MODULE };
