import { ILocationService } from 'angular';
import { IUser } from '../../../models/user.interface';
import { AuthService } from '../services/auth.service';

class LoginController {
  static $inject = ['$scope', 'AuthService', '$location'];
  onSignupClick: () => void;
  isLoading = false;
  isWrongCredentialsError = false;

  isValid = false;
  values = {
    login: '',
    password: '',
  };

  constructor(
    private $scope: ng.IScope,
    private AuthService: AuthService,
    private $location: ILocationService,
  ) {}

  $onInit = () => {
    this.$scope.$watch(
      () => this.values,
      (values) => {
        this.isWrongCredentialsError = false;
        let isValid = true;

        if (!values.login || !values.password) {
          isValid = false;
        }
        this.isValid = isValid;
      },
      true,
    );
  };

  handleSubmit = () => {
    this.isLoading = true;
    this.AuthService.logIn(this.values.login, this.values.password)
      .then((user: unknown) => {
        const loggedInUser = user as IUser;

        window.localStorage.setItem('user', JSON.stringify(loggedInUser));
        this.AuthService.user = loggedInUser;

        this.$location.path('/files');
      })
      .catch((e) => {
        this.isLoading = false;
        if (e?.data === 'exception.wrong_credentials') {
          this.isWrongCredentialsError = true;
        }
      });
  };
}

export const loginComponent = {
  template: require('./login.component.html'),
  controller: LoginController,
  bindings: {
    onSignupClick: '&',
  },
};
