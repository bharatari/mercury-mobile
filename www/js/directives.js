angular.module('MercuryApp.directives', [])

.directive('photonBackgroundImage', [function() {
    function link(scope, element, attrs) {
        /*
        scope.$watch(attrs.src, function(value) {
            if(value) {
                var image = new Image();
                image.src = attrs.src;
                console.log(element);
                element.find('post-image-alt')[0].src = image;
            }
        }); */
    }
    return {
        link: link,
        restrict: 'E',
        scope: {
            imageSrc: '@'
        },
        templateUrl: '../templates/photon-background-image.html'
    }
}]);
