import { IHttpPromise } from 'angular';
import { IUser } from '../../../models/user.interface';

export class AuthService {
  API_URL = 'http://localhost:8081';
  user: IUser | null = null;

  constructor(private $http: ng.IHttpService) {}

  logIn(email: string, password: string): IHttpPromise<IUser> {
    const url = `${this.API_URL}/auth/login`;
    return this.$http
      .post(url, {
        email,
        password,
      })
      .then((result) => result.data);
  }

  signUp(email: string, password: string): IHttpPromise<string> {
    const url = `${this.API_URL}/auth/signup`;
    return this.$http
      .post(url, {
        email,
        password,
      })
      .then((result) => result.data);
  }
}

AuthService.$inject = ['$http'];
