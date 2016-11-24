module.exports = app =>
  app
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
            // NOTE: this is a custom solution - perhaps refactor?
            if (filter === 'id' || filter === 'isAdmin') {
              const idFilter = params._filters[filter];
              return Object.assign(acc, { [filter]: idFilter });
            }

            // NOTE: Where is this code used? It's overriding all options (e.g. isAdmin = true)
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
