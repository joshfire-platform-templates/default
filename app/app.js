Joshfire.define(['joshfire/app', 'joshfire/class', './src/tree.data', './src/tree.ui', 'joshfire/utils/splashscreen', 'joshfire/uielements/panel'], function(BaseApp, Class, Data, UI, Splash, Panel) {
  
  return Class(BaseApp, {

    id: 'defaultApp',

    uiClass: UI,

    dataClass: Data,

    setup: function(callback) {
      var self = this,
          footer = self.ui.element('/footer'),
          itemList = self.ui.element('/content/itemList'),
          title = self.ui.element('/header/title');

      this.splash = new Splash();

      // Populate footer
      footer.subscribe('data', function(event, data) {
        // Menu is built, remove splashscreen
        self.splash.remove();

        // Select the first tab on our footer
        footer.selectByIndex(0);
      });

      // Handle clicks on footer
      footer.subscribe('select', function(event, data) {
        var datasourceId = data[0][0];

        self.currentDatasource = datasourceId;

        // TODO: find a way to get items specifice to this datasource…
        self.ui.element('/content/itemList').setDataPath('/items/');

        title.htmlEl.innerHTML = datasourceId;
      });

      // Refresh content each time a new data is attached
      itemList.subscribe('data', function(event, data) {
        itemList.refresh();
      });

      callback(null, true);
    }

  });

});