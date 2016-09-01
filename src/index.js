require('ng-admin');

angular.module('myApp', ['ng-admin'])
  .config(['NgAdminConfigurationProvider', nga => {
    const admin = nga.application('RoundAbout');

    require('./entity/messages')(nga, admin);
    require('./entity/contacts')(nga, admin);

    nga.configure(admin);
  }])
  .factory('serializeParams', [function() {
    return {
      request: function(config) {
        config.paramSerializer = (param) => param;
        config.params = JSON.stringify(config.params) || {};
        return config;
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('serializeParams');
  }])
  .config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
      if (operation == 'getList') {
        const dir = params._sortDir === 'DESC' ? -1 : 1;
        const sort = {};

        params.$skip = (params._page - 1) * params._perPage;
        params.$limit = params._perPage;

        if (params._sortField) {
          sort[params._sortField] = dir;
          params.$sort = sort;
        }

        delete params._page;
        delete params._perPage;
        delete params._sortField;
        delete params._sortDir;
      }

      if (operation == 'getList' && params._filters) {
        Object.keys(params._filters).reduce((acc, filter) => {
          if (filter === 'id') {
            acc[filter] = {
              $in: params._filters[filter]
            };
            return acc;
          }

          acc[filter] = {
            $regex: params._filters[filter],
            $options: 'i'
          };

          return acc;
        }, params);

        delete params._filters;
      }

      return { params: params };
    });
  }]);
