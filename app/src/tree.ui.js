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
              content: 'My App'
            }
          ]
        },
        {
          id: 'content',
          type: PanelManager,
          uiMaster: '/footer',
          children: [
            {
              id:               'itemList',
              type:             List,
              orientation:      'left',
              loadingTemplate: '<div style="padding:40px;">Loading...</div>',
              itemInnerTemplate:
                '<div class="clearfix">'+
                '    <p class="title"><%= item.title %></p>'+
                '</div>'
            }
          ]
        },
        {
          id: 'footer',
          type: List,
          dataPath: '/datasourcelist/',
          itemInnerTemplate: '<%= item.name %>',
          onData: function() {} // trigger data, WTF?
        }
      ];
    }

  });

});