module.exports = app => app
  .directive('logout', ['$http', ($http) => {
    const directive = {
      restrict: 'E',
      template: '<div><span class="glyphicon glyphicon-user"></span>&nbsp;Logout</div>',
      link(scope, element) {
        element.on('click', () => {
          $http.post('/users/logout')
            .then(() => {
              window.location.href = '/';
            });
        });
      },
    };

    return directive;
  }]);
