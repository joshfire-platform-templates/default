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
              id: 'title',
              type: 'Panel',
              content: 'My App'
            }
          ]
        },
        {
          id: 'menu',
          type: List,
          dataPath: '/datasourcelist/',
          itemInnerTemplate: '<%= item.name %>',
          onData: function() {} // trigger data, WTF?
        },
        {
          id: 'content',
          type: PanelManager,
          uiMaster: '/menu',
          children: [
            {
              id: 'itemList',
              type: List,
              orientation: 'left',
              loadingTemplate: '<div>Loading itemList...</div>',
              itemInnerTemplate:
                '<p class="title"><%= item.title %></p>'
            },
            {
              id: 'detail',
              type: Panel,
              loadingTemplate: '<div>Loading detail...</div>',
              uiDataMaster: '/content/itemList',
              forceDataPathRefresh: true,
              innerTemplate: // Dirty… TODO: need to know before if it's a picture, a video, etc.
                '<h4 class="title"><%= data.title %></h4>'+
                '<% if (data.image) { %>'+
                '  <img style="max-width:100%" src="<%= data.image %>">'+
                '<% } %>'+
                '<% if (data.video) { %>'+
                '  <p><a href="<%= data.video %>"><%= data.video %></a></p>'+
                '<% } else { %>'+
                '  <p><a href="<%= data.link %>"><%= data.link %></a></p>'+
                '<% } %>'+
                '<p>Par <strong><%= data.creator || data.user %></strong></p>'
            }
            
          ]
        }
      ];
    }

  });

});