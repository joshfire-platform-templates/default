Joshfire.define(['joshfire/app', 'joshfire/class', './src/tree.data', './src/tree.ui', 'joshfire/utils/splashscreen', 'joshfire/uielements/panel'], function(BaseApp, Class, Data, UI, Splash, Panel) {
  
  return Class(BaseApp, {

    id: 'defaultApp',

    uiClass: UI,

    dataClass: Data,

    setup: function(callback) {
      var self = this;

      this.splash = new Splash();

      // TODO: use self.data.get('/datasourcelist/');
      var ds = Joshfire.getDataSourceList();

      if (!ds || !ds.find) throw new Error('ds not found');

      ds.find({}, function (err, data) {

        // Our framework expect each item to have an id.
        var items = _.map(data, function(item, id) {
          return _.extend(item, { id: item.name, label: item.name.charAt(0).toUpperCase() + item.name.slice(1) });
        });

        self.ui.element('/footer').setData(items);

        self.ui.element('/footer').subscribe('input', function(){
          console.log('footer input', arguments)
        });

        self.splash.remove();

        var firstTab = self.ui.element('/footer').selectByIndex(0);
        // self.ui.element('/content/itemsList').setLoading(true);
      });
      // / end of todo

      // Refresh content each time a new data is attached
      self.ui.element('/content/itemsList').subscribe('data', function(event, data) {
        console.warn('DATA before refresh', self.ui.element('/content/itemsList').data);
        self.ui.element('/content/itemsList').refresh();
        console.warn('DATA after refresh', self.ui.element('/content/itemsList').data);
      });

      callback(null, true);
    }

  });

});