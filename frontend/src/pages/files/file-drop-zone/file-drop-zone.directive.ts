import * as angular from 'angular';

export const fileDropZoneDiretive = () => {
  return {
    restrict: 'A',
    scope: {
      dropfiles: '=',
    },
    link: function (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes) {
      var processDragOverOrEnter;
      processDragOverOrEnter = (event: any) => {
        if (event != null) {
          event.preventDefault();
        }
        return false;
      };

      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);

      return element.bind('drop', (event) => {
        try {
          const files: any[] = [];
          scope.dropfiles = [];

          if (event != null) {
            event.preventDefault();
          }

          var fileCount = 0;
          angular.forEach(event.originalEvent.dataTransfer.files, (item) => {
            if (fileCount < 10) {
              files.forEach(function (item) {
                var reader = new FileReader();

                reader.readAsDataURL(item);

                reader.onload = function (evt) {
                  //For each file gather the attributes required
                  var newFile = {
                    extension: '.' + item.name.split('.').pop(),
                    name: item.name,
                    rawFile: item,
                    size: item.size,
                  };

                  scope.dropfiles.push(newFile);
                };
              });
            }
          });
        } catch (err) {
          // do noting
        }
      });
    },
  };
};
