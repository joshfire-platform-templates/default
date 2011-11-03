Joshfire.define(['joshfire/class', 'joshfire/tree.data', 'joshfire/vendor/underscore'], function(Class, DataTree, _) {

  return Class(DataTree, {

    buildTree: function() {
      return [
        {
          id: 'items',

          children: function(query, callback) {
            var ds = Joshfire.getDataSource('main');

            if (!ds || !ds.find){
              callback(['ERROR'], null);
            }

            ds.find({}, function (err, data){

              var items = _.map(data.entries, function(item, id) {
                return _.extend(item, { id: item.sourceId });
              });

              callback(null, items);

            });
          }
        }
      ];
    }
  });

});