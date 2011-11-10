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

              // Our framework expect each item to have an id
              var items = _.map(data, function(item, id) {
                return _.extend(item, { id: item.name, sourceId: item.id, type: item.config.col });
              });

              // console.warn('self.app.data.get(\'/items\')', JSON.stringify(self.app.data.get('/items')));

              // for (var i = 0, l = items.length; i < l; i++) {
              //   self.app.data.set('/items/' + items[i].id, function() {alert(items[i].id)});
              // }
              // app.data.set('/talks/favorites/', 
              // _.select(app.data.get('/talks/all/'), 
              //    function (item){
              //      return _.contains(app.userSession.mytv.favorites, item.id);
              //    }
              //  )
              // );


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

              // Some datasources have an id (item.sourceID), others don't (id)
              var items = _.map(data.entries, function(item, id) {
                return _.extend(item, { id: item.sourceId || id });
              });

              callback(null, items);

            });
          }
        }
      ];

    }
  });

});