import { IFile } from '../../../models/file.interface';
import { AuthService } from '../../auth/services/auth.service';
import { FilesService } from '../services/files.service';

class FilesController {
  files: IFile[] = [];
  isLoading = false;
  API_URL: string;

  constructor(
    private FilesService: FilesService,
    private AuthService: AuthService,
    private $location: ng.ILocationService,
  ) {}

  $onInit(): void {
    this.API_URL = this.FilesService.API_URL;
    this.isLoading = true;
    this.FilesService.getUserFiles().then((files: IFile[]) => {
      this.files = files;
      this.isLoading = false;
    });
  }

  onLogout(): void {
    this.AuthService.logout().then(() => {
      this.$location.path('/auth');
    });
  }
}

FilesController.$inject = ['FilesService', 'AuthService', '$location'];

export const filesComponent = {
  template: require('./files.component.html'),
  controller: FilesController,
};
