module.exports = app => app
  .factory('serializeParams', [() => {
    const request = (config) => {
      const paramSerializer = param => param;
      const params = JSON.stringify(config.params) || '';
      return Object.assign({}, config, { paramSerializer, params });
    };

    return { request };
  }])
  .config(['$httpProvider', $httpProvider =>
    $httpProvider.interceptors.push('serializeParams'),
  ])
  .config(['RestangularProvider', (RestangularProvider) => {
    RestangularProvider.addFullRequestInterceptor(
      (element, operation, what, url, headers, params) => {
        if (operation === 'getList') {
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

        if (operation === 'getList' && params._filters) {
          Object.keys(params._filters).reduce((acc, filter) => {
            if (filter === 'id') {
              const idFilter = params._filters[filter];
              return Object.assign(acc, { [filter]: idFilter });
            }

            const regexFilter = {
              $regex: params._filters[filter],
              $options: 'i',
            };

            Object.assign(acc, { [filter]: regexFilter });

            return acc;
          }, params);

          delete params._filters;
        }

        return { params };
      });
  }]);
