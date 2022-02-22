import { IHttpPromise, IPromise } from 'angular';
import { IFile } from '../../../models/file.interface';
import { AuthService } from '../../auth/services/auth.service';

export class FilesService {
  API_URL = 'http://localhost:8081';

  constructor(
    private $http: ng.IHttpService,
    private AuthService: AuthService,
  ) {}

  getUserFiles(): IPromise<IFile[]> {
    const url = `${this.API_URL}/users/files`;

    return this.$http.get<IFile[]>(url).then((result) => {
      return result.data;
    });
  }

  postImages(files: File[]): IPromise<string[]> {
    return;
  }
}

FilesService.$inject = ['$http', 'AuthService'];
