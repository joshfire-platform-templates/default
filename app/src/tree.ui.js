Joshfire.define(['joshfire/class', 'joshfire/tree.ui', 'joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button'], function(Class, UITree, List, Panel, PanelManager, Button) {

  return Class(UITree, {

    buildTree: function() {

      var app = this.app;

      app.currentDatasource = false;

      return [
        {
          id: 'header',
          type: Panel,
          children: [
            {
              id: 'prev',
              type: Button,
              label: 'Prev',
              autoShow: false
            },
            {
              id: 'title',
              type: 'Panel',
              content: '_title_'
            }
          ]
        },
        {
          id: 'content',
          type: PanelManager,
          uiMaster: '/footer',
          children: [
            {
              id:               'itemsList',
              type:             List,
              orientation:      'left',
              loadingTemplate: '<div style="padding:40px;">Loading...</div>',
              itemInnerTemplate:
                '<div class="clearfix">'+
                // '    <p class="title"><a href="<%= item.link %>"><%= item.title %></a></p>'+
                '    <p class="title"><%= item.title %></p>'+
                '</div>',
              onState: function(ui, ev, data) {
                console.warn('onState', ui, ev, data);
              },
              onSelect: function(ui, type, data) {
                console.warn('onSelect', ui, type, data);
              }
            }
          ]
        },
        {
          id: 'footer',
          type: List,
          onSelect: function(ui, type, data, token) {
            var datasourceId = data[0][0];

            console.warn('Selected Footer Item', datasourceId);

            app.currentDatasource = datasourceId;

            console.warn('app.currentDatasource', app.currentDatasource);

            app.ui.element('/content/itemsList').setDataPath('/items/');

            // app.ui.element('/content/itemsList').refresh();
          }
        }
      ];
    }

  });

});