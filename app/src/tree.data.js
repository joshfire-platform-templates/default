Joshfire.define(['joshfire/class', 'joshfire/tree.data', 'joshfire/vendor/underscore'], function(Class, DataTree, _) {

  return Class(DataTree, {

    buildTree: function() {

    var self = this;

      return [
        {
          id: 'datasourcelist',

          children: function(query, callback) {
            var ds = Joshfire.getDataSourceList();

            if (!ds || !ds.find){
              callback(['ERROR'], null);
            }

            ds.find({}, function (err, data) {

              // Our framework expect each item to have an id.
              var items = _.map(data, function(item, id) {
                return _.extend(item, { id: item.id });
              });

              callback(null, items);

            });
          }
        },
        {
          id: 'items',

          children: function(query, callback) {
            if (!self.app.currentDatasource) callback(null, []);

            var ds = Joshfire.getDataSource(self.app.currentDatasource);

            if (!ds || !ds.find){
              callback(['ERROR'], null);
            }

            ds.find({}, function (err, data) {

              var items = _.map(data.entries, function(item, id) {
                return _.extend(item, { id: item.sourceId || id });
              });

              console.warn('items', items);

              callback(null, items);

            });
          }
        }
      ];

    }
  });

});