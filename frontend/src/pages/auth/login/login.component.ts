class LoginController {
  static $inject = ['$scope'];
  onSignupClick: () => void;

  isValid = false;
  values = {
    login: '',
    password: ''
  }

  constructor(private $scope: ng.IScope) {}

  $onInit = () => {
    this.$scope.$watch(() => this.values, (values) => {
      let isValid = true;

      if (!values.login || !values.password) {
        isValid = false;
      }
      this.isValid = isValid
    }, true)
  };

}

export const loginComponent = {
  template: require("./login.component.html"),
  controller: LoginController,
  bindings: {
    onSignupClick: '&'
  }
}
