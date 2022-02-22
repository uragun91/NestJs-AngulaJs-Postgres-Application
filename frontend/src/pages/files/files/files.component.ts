import { IFile } from '../../../models/file.interface';
import { FilesService } from '../services/files.service';

class FilesController {
  files: IFile[] = [];
  isLoading = false;
  API_URL: string;

  constructor(private FilesService: FilesService) {}

  $onInit(): void {
    this.API_URL = this.FilesService.API_URL;
    this.isLoading = true;
    this.FilesService.getUserFiles().then((files: IFile[]) => {
      this.files = files;
      this.isLoading = false;
    });
  }
}

FilesController.$inject = ['FilesService'];

export const filesComponent = {
  template: require('./files.component.html'),
  controller: FilesController,
};
