import { UrlRouterProvider } from '@uirouter/angularjs';
import { IUser } from './models/user.interface';
import { AuthService } from './pages/auth/services/auth.service';

appRunConfig.$inject = [
  '$rootScope',
  '$location',
  '$cookies',
  '$http',
  'AuthService',
];

function appRunConfig(
  $rootScope: ng.IRootScopeService,
  $location: ng.ILocationService,
  $cookies: ng.cookies.ICookiesService,
  $http: ng.IHttpProvider,
  AuthService: AuthService,
) {
  $http.defaults.withCredentials = true;
  delete $http.defaults.headers.common['X-Requested-With'];
  const lsUserString = window.localStorage.getItem('user');
  if (lsUserString) {
    try {
      const user: IUser = JSON.parse(lsUserString);
      AuthService.user = user;
    } catch {
      // do nothing
    }
  }

  $rootScope.$on('$locationChangeStart', function () {
    const publicPages = ['/auth'];
    const isRestrictedPage = publicPages.indexOf($location.path()) === -1;
    const isAuthenticated = Boolean($cookies.get('Authentication'));

    if (isRestrictedPage && !isAuthenticated) {
      $location.path('/auth');
    }
  });
}

export { appRunConfig };
