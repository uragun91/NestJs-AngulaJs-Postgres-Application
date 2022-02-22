import { AuthService } from '../services/auth.service';

class SignUpController {
  static $inject = ['$scope', 'AuthService'];
  constructor(private $scope: ng.IScope, private AuthService: AuthService) {}

  onLoginClick: () => void;
  isValid: boolean = false;
  isLoading: boolean = false;
  isSignedUp: boolean = false;
  isUserExistsError: boolean = false;

  values = {
    login: '',
    password: '',
    confirmPassword: '',
  };

  $onInit = () => {
    this.$scope.$watch(
      () => this.values,
      (values) => {
        this.isUserExistsError = false;
        let isValid = true;
        if (values.login?.length < 3) {
          isValid = false;
        }

        if (!values.confirmPassword && !values.password) {
          isValid = false;
        }

        if (values.password !== values.confirmPassword) {
          isValid = false;
        }
        this.isValid = isValid;
      },
      true,
    );
  };

  handleSubmit = () => {
    this.isLoading = true;
    this.AuthService.signUp(this.values.login, this.values.password)
      .then(() => {
        this.isSignedUp = true;
      })
      .catch((e) => {
        this.isUserExistsError = e?.data === 'exception.user_already_exists';
      })
      .finally(() => {
        this.isLoading = false;
      });
  };
}

export const singUpComponent = {
  template: require('./sign-up.component.html'),
  controller: SignUpController,
  bindings: {
    onLoginClick: '&',
  },
};
