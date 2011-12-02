Joshfire.define(['joshfire/class', 'joshfire/tree.data', 'joshfire/vendor/underscore'], function(Class, DataTree, _) {

  return Class(DataTree, {

    buildTree: function() {

      var self = this;

      return [
        {
          id: 'datasourcelist',

          children: function(query, callback) {
            var datasources = Joshfire.factory.config.datasources;

            if (!datasources) { callback(['ERROR'], null); }

            var datasourceArray = [];
            _.each(datasources, function(value, key) {
              if(_.isArray(value)) {
                _.each(value, function(val, index) {
                  datasourceArray.push( _.extend(Joshfire.factory.getDataSource(key).children[index], { id: key + index }) );  
                });
              } else {
                datasourceArray.push( _.extend(Joshfire.factory.getDataSource(key), { id: key }) );
              }
            });

            // Loop trough all items to create data tree branches
            _.each(datasourceArray, function(datasource, index) {
              self.set('/datasource/' + datasource.id,
                {
                  'id': datasource.id,
                  children: function(query, callback) {
                    datasource.find({}, function (err, data) {
                      // Make sure every entry has an id
                      // Some datasource entries have an id (item.sourceID), others don't (id)
                      var items = _.map(data.entries, function(item, id) {
                        return _.extend(item, { id: item.sourceId || id });
                      });

                      callback(null, items);
                    });
                  }
                });
            });

            callback(null, datasourceArray);
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