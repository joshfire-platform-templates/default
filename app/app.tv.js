Joshfire.define(['joshfire/app', 'joshfire/class', './src/tree.data', './src/tree.ui.tv', 'joshfire/utils/splashscreen', 'joshfire/uielements/panel'], function(BaseApp, Class, Data, UI, Splash, Panel) {
  
  return Class(BaseApp, {

    id: 'defaultApp',

    uiClass: UI,

    dataClass: Data,

    setup: function(callback) {
      var _this = this,
          footer = _this.ui.element('/footer'),
          itemList = _this.ui.element('/content/itemList'),
          detailPanel = _this.ui.element('/content/detail'),
          title = _this.ui.element('/header/title');

      this.splash = new Splash();

      // Change app name globally
      document.getElementsByTagName('title')[0].textContent = Joshfire.factory.config.app.name;

      // Change app name globally
      htmlTitle = Joshfire.factory.config.app.name;

      // Populate footer
      footer.subscribe('data', function(event, data) {
        // We have data, remove splashscreen
        // Todo: it may better to remove it "onAfterShow" or "onAfterInsert"
        _this.splash.remove();

        // Select the first tab on our footer
        footer.selectByIndex(0);
      });

      // Handle clicks on footer
      footer.subscribe('select', function(event, data) {
        var datasourceId = data[0][0];

        // Set the new dataPath
        _this.ui.element('/content/itemList').setDataPath('/datasource/' + datasourceId + '/');

        // Show itemList, because we could be on a detail panel
        _this.ui.element('/content').switchTo('itemList');
      });

      // Refresh content each time new data is attached
      itemList.subscribe('data', function(event, data) {
        itemList.refresh();
      });

      // Open item when selected
      itemList.subscribe('select', function(event, data) {
        _this.ui.element('/content/detail').show();
      });

      callback(null, true);
    }

  });

});