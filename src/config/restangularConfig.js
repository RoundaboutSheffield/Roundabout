const { prop, pick, mergeAll, compose, forEach, keys, evolve } = require('ramda');

const dir = direction =>
  (direction === 'DESC'
    ? -1
    : 1);

const $skip = ({ _page, _perPage }) =>
  ({ $skip: (_page - 1) * _perPage });

const $limit =
  pick(['_perPage']);

const sort = ({ _sortField, _sortDir }) =>
  (_sortField
    ? { [_sortField]: dir(_sortDir) }
    : {});

const $sort = params =>
  ({ $sort: sort(params) });

const toRegExFilter = filter =>
  ({
    $regex: filter,
    $options: 'i',
  });

const setRegExFilters =
  evolve({
    username: toRegExFilter,
  });

const filters = compose(setRegExFilters, prop('_filters'));

const cleanseParams = (obj) => {
  forEach(k => delete obj[k], keys(obj));
  return obj;
};

module.exports = app =>
  app
  .config(['RestangularProvider', (RestangularProvider) => {
    RestangularProvider.addFullRequestInterceptor(
      (element, operation, what, url, headers, params) => {
        const newParams = mergeAll([
          filters(params),
          $sort(params),
          $skip(params),
          $limit(params),
        ]);
        Object.assign(cleanseParams(params), newParams);
      });
  }]);
