class SignUpController {
  static $inject = ['$scope'];
  constructor(private $scope: ng.IScope) {
  }

  onLoginClick: () => void;
  isValid: boolean = false;

  values = {
    login: '',
    password: '',
    confirmPassword: ''
  }

  $onInit = () => {
    this.$scope.$watch(() => this.values, (values) => {
      let isValid = true;
      if (values.login?.length < 3) {
        isValid = false
      }

      if (!values.confirmPassword && !values.password) {
        isValid = false;
      }

      if (values.password !== values.confirmPassword) {
        isValid = false
      }
      this.isValid = isValid;
    }, true)
  };


}

export const singUpComponent = {
  template: require('./sign-up.component.html'),
  controller: SignUpController,
  bindings: {
    onLoginClick: '&'
  }
}