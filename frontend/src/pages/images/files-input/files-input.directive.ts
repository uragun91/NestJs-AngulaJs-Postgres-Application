export const filesInputDirective = () => {
  return {
    require: 'ngModel',
    link: function postLink(
      scope: ng.IScope,
      elem: JQuery,
      attrs: ng.IAttributes,
      ngModel: any,
    ) {
      elem.on('change', function (e) {
        var files = (elem[0] as HTMLInputElement).files;
        ngModel.$setViewValue(files);
      });
    },
  };
};
