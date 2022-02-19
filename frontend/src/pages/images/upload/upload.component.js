class UploadController {
  $onInit() {
    console.log('onInit');
  }
}

export const uploadComponent = {
  template: require('./upload.component.html'),
  controller: UploadController,
}