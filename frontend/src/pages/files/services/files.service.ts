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
    const url = `${this.API_URL}/users/files`;
    const formData = new FormData();
    for (var i in files) {
      formData.append('files', files[i]);
    }
    const headers: Record<string, any> = { 'Content-Type': undefined };
    var config = { headers };

    return this.$http
      .post<string[]>(url, formData, config)
      .then((result) =>
        result.data.map((fileUrl) => `${this.API_URL}${fileUrl}`),
      );
  }
}

FilesService.$inject = ['$http', 'AuthService'];
