class AuthController {
  mode: 'login' | 'signup' = 'login';

  $onInit = () => {
  };

  onSignUpClick(): void {
    this.mode = 'signup';
  }

  onLoginClick(): void {
    this.mode = 'login';
  }
}

export const authComponent = {
  template: require('./auth.component.html'),
  controller: AuthController
}