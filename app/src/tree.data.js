Joshfire.define(['joshfire/class', 'joshfire/tree.data', 'joshfire/vendor/underscore'], function(Class, DataTree, _) {

  return Class(DataTree, {

    buildTree: function() {
      var self = this;

      // Joshfire datasources
      var datasources = Joshfire.factory.config.datasources;

      // transform these datasources in a Joshfire Framework friendly datasource type
      var datasourceArray = [];
      _.each(datasources, function(value, key) {
        if(_.isArray(value)) {
          _.each(value, function(val, index) {
            console.warn('val', 'key', val, key);
            datasourceArray.push( _.extend(Joshfire.factory.getDataSource(key).children[index], { id: key + index, name: val.name, col: val.col }) );  
          });
        } else {
          datasourceArray.push( _.extend(Joshfire.factory.getDataSource(key), { id: key }) );
        }
      });

      // Loop trough all datasources to create data tree branches
      var datachildren = [];
      _.each(datasourceArray, function(datasource, index) {
        datachildren.push(
          {
            'id': datasource.id,
            children: function(query, cb) {
              datasource.find({}, function (err, data) {
                // Make sure every entry has an id
                // Some datasource entries have an id (item.sourceID), others don't (id)
                var items = _.map(data.entries, function(item, id) {
                  return _.extend(item, { id: item.sourceId || id });
                }); 

                cb(null, items);
              });
            }
          });
      });

      // return the data tree
      return [
        {
          id: 'datasourcelist',
          children: function(query, callback) {
            callback(null, datasourceArray);
          }
        },
        {
          id: 'datasource',
          children: datachildren
        }
      ];

    }
  });

});