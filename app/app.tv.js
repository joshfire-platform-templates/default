Joshfire.define(['joshfire/app', 'joshfire/class', './src/tree.data', './src/tree.ui.tv', 'joshfire/utils/splashscreen', 'joshfire/uielements/panel'], function(BaseApp, Class, Data, UI, Splash, Panel) {
  
  return Class(BaseApp, {

    id: 'defaultApp',

    uiClass: UI,

    dataClass: Data,

    setup: function(callback) {
      var _this = this,
          menu = _this.ui.element('/menu'),
          itemList = _this.ui.element('/content/itemList'),
          detailPanel = _this.ui.element('/detail'),
          title = _this.ui.element('/header/title'),
          backBtn = _this.ui.element('/detail/back');

      this.splash = new Splash();

      // Change app name globally
      document.title = Joshfire.factory.config.app.name;


      // on lenu select, assign the corresponding dartaPath to itemList
      menu.subscribe('select', function(event, data) {
        console.warn('menu item has been selected', data[0][0]);
        var datasourceId = data[0][0];
        // Set the new dataPath
        _this.ui.element('/content/itemList').setDataPath('/datasource/' + datasourceId + '/');
        _this.ui.moveTo('focus', '/content/itemList');
      });

      // handle select on itemList
      itemList.subscribe('select', function(event, data) {
        _this.ui.element('/detail').show();
        _this.ui.moveTo('focus', '/detail/back');
      });

      // Close details when pushing back button
      backBtn.subscribe('select', function(event, data) {
        detailPanel.hide();
        _this.ui.moveTo('focus', '/content/itemList');
      });

      // select first item
      menu.selectByIndex(0);

      callback(null, true);
    }

  });

});