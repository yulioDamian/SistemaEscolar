angular.module('angular-max-length',[])
    .directive('uiMaxlength', function () {
    return {
        require: 'ngModel',
        link: function(scope, el, attrs, model) {
            var max_length = parseInt(attrs.uiMaxlength, 10);

            var input_value_parser = function(value) {
                if(value.length > max_length) {
                    value = value.substring(0, max_length);
                    model.$setViewValue(value);
                    model.$render();
                }

                return value;
            };

            model.$parsers.push(input_value_parser);
        }
    };
})