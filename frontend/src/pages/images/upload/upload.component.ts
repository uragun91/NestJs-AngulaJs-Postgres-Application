class UploadController {
  currentFileList: FileList;
  filesWithParams: { file: File; width: number; height: number }[] = [];

  $onInit() {}

  onFileChange() {
    const newFileParams = Array.from(this.currentFileList).map((file: File) => {
      return {
        file,
        width: 100,
        height: 100,
      };
    });
    this.filesWithParams = this.filesWithParams.concat(newFileParams);
  }
}

export const uploadComponent = {
  template: require('./upload.component.html'),
  controller: UploadController,
};
