Joshfire.define(['joshfire/class', 'joshfire/tree.data', 'joshfire/vendor/underscore'], function(Class, DataTree, _) {

  return Class(DataTree, {

    buildTree: function() {

      var self = this;

      return [
        {
          id: 'datasourcelist',

          children: function(query, callback) {
            var datasources = Joshfire.getDataSourceList();

            if (!datasources || !datasources.find) callback(['ERROR'], null);

            datasources.find({}, function (err, data) {

              // Our framework expect each item to have an id
              var items = _.map(data, function(item, id) {
                return _.extend(item, { id: item.name, sourceId: item.id, type: item.config.col });
              });

              // Loop trough all items to create data tree branches
              _.each(items, function(datasource, index) {
                self.set('/datasource/' + datasource.id,
                  {
                    'id': datasource.id,
                    children: function(query, callback) {
                      var ds = Joshfire.getDataSource(datasource.id);

                      ds.find({}, function (err, data) {

                        // Some datasources have an id (item.sourceID), others don't (id)
                        var items = _.map(data.entries, function(item, id) {
                          return _.extend(item, { id: item.sourceId || id });
                        });

                        callback(null, items);
                      });
                    }
                  });
              });

              callback(null, items);

            });
          }
        },
        {
          id: 'datasource',
          children: []
        }

      ];

    }
  });

});