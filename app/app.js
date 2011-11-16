Joshfire.define(['joshfire/app', 'joshfire/class', './src/tree.data', './src/tree.ui', 'joshfire/utils/splashscreen', 'joshfire/uielements/panel'], function(BaseApp, Class, Data, UI, Splash, Panel) {
  
  return Class(BaseApp, {

    id: 'defaultApp',

    uiClass: UI,

    dataClass: Data,

    setup: function(callback) {
      var _this = this,
          footer = _this.ui.element('/footer'),
          itemList = _this.ui.element('/content/itemList'),
          detailPanel = _this.ui.element('/content/detail'),
          prevBtn = _this.ui.element('/header/prev'),
          title = _this.ui.element('/header/title');

      this.splash = new Splash();

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

        // Change title of our app
        title.htmlEl.innerHTML = datasourceId;
      });

      // Refresh content each time new data is attached
      itemList.subscribe('data', function(event, data) {
        itemList.refresh();
      });

      // Open item when selected
      itemList.subscribe('select', function(event, data) {
        _this.ui.element('/content/detail').show();
      });

      // Show prev button when viewing details
      detailPanel.subscribe('afterShow', function(event, data) {
        _this.ui.element('/header/prev').show();
      });

      // Show previous panel now
      prevBtn.subscribe('select', function(event, data) {
        _this.ui.element('/content').switchTo('itemList');
        // _this.ui.element('/header/prev') == this?
        // Also, we could hide the button after displaying /content/itemList
        _this.ui.element('/header/prev').hide();
      });

      callback(null, true);
    }

  });

});