import { FilesService } from '../services/files.service';

class UploadController {
  currentFileList: FileList;
  files: File[] = [];
  filesContents: string[] = [];
  filesUploaded: boolean = false;
  links: string[];
  isUploading: boolean = false;

  constructor(private $scope: ng.IScope, private FilesService: FilesService) {}

  $onInit() {}

  onFileChange(): void {
    this.files = this.files.concat(Array.from(this.currentFileList));

    Promise.all(this.files.map((file) => file.text())).then((result) => {
      this.filesContents = result;
      this.$scope.$digest();
    });
  }

  uploadFiles(): void {
    this.isUploading = true;
    this.FilesService.postImages(this.files).then((links) => {
      this.files = [];
      this.filesContents = [];
      this.currentFileList = null;

      this.links = links;
      this.filesUploaded = true;
    });
  }
}

UploadController.$inject = ['$scope', 'FilesService'];

export const uploadComponent = {
  template: require('./upload.component.html'),
  controller: UploadController,
};
