import { IHttpPromise } from "angular";

class AuthService {
  API_URL = "https://api.github.com";

  constructor(private $http: ng.IHttpService) {}

  logIn(): IHttpPromise<string> {
    const REPOS = "users/var-bin/repos";
    const URL = `${this.API_URL}/${REPOS}`;

    return this.$http.get<string>(URL);
  }

  signUp(): IHttpPromise<string> {
    return this.$http.get('/')
  }
}

AuthService.$inject = ["$http"];