import { IPromise } from 'angular';

import { IUser } from '../../../models/user.interface';

export class AuthService {
  API_URL = 'http://localhost:8081';
  user: IUser | null = null;

  constructor(private $http: ng.IHttpService) {}

  logIn(email: string, password: string): IPromise<IUser> {
    const url = `${this.API_URL}/auth/login`;
    return this.$http
      .post<IUser>(url, {
        email,
        password,
      })
      .then((result) => result.data);
  }

  signUp(email: string, password: string): IPromise<void> {
    const url = `${this.API_URL}/auth/signup`;
    return this.$http
      .post<void>(url, {
        email,
        password,
      })
      .then((result) => result.data);
  }

  logout(): IPromise<void> {
    const url = `${this.API_URL}/auth/log-out`;
    return this.$http
      .post<void>(url, null)
      .then((result) => result.data)
      .then(() => (this.user = null));
  }
}

AuthService.$inject = ['$http'];
