import * as angular from 'angular';

export const ngThumbDirective = ($window: ng.IWindowService) => {
  const helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function (item: any) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function (file: any) {
      const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    },
  };

  return {
    restrict: 'A',
    template: '<canvas/>',
    link: function (
      scope: ng.IScope,
      element: JQuery,
      attributes: ng.IAttributes,
    ) {
      if (!helper.support) return;

      const params = scope.$eval(attributes.ngThumb);

      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;

      const canvas: JQuery<HTMLCanvasElement> =
        element.find<HTMLCanvasElement>('canvas');
      const reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event: any) {
        const img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      function onLoadImage() {
        const width =
          params.width || (this.width / this.height) * params.height;
        const height =
          params.height || (this.height / this.width) * params.width;
        canvas.attr({ width: width, height: height });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    },
  };
};

ngThumbDirective.$inject = ['$window'];
