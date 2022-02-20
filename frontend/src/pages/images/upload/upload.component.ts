class UploadController {
  fileList: FileList;
  filesWithParams: { file: File; width: number; height: number }[] = [];

  $onInit() {}

  onFileChange() {
    this.filesWithParams = Array.from(this.fileList).map((file: File) => {
      return {
        file,
        width: 100,
        height: 100,
      };
    });
    console.log(this.fileList);
  }
}

export const uploadComponent = {
  template: require('./upload.component.html'),
  controller: UploadController,
};
