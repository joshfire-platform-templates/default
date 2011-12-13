Joshfire.define(['joshfire/class', 'joshfire/tree.ui', 'joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button', 'joshfire/adapters/ios/uielements/video.youtube', 'src/ui-components'], function(Class, UITree, List, Panel, PanelManager, Button, Video, UI) {

  return Class(UITree, {

    buildTree: function() {

      var app = this.app;

      return [
        {
          id: 'sidebarleft',
          type: Panel,
          children: [
            {
              id: 'header',
              type: Panel,
              children: [ UI.uiHeader ]
            },
            {
              id: 'menu',
              type: List,
              dataPath: '/datasourcelist/',
              itemInnerTemplate: '<%= item.name %>',
              orientation:'left',
              beforeGridExit: function(self, direction) {
                if (direction == 'right') {
                  app.ui.moveTo('focus', '/content/itemList');
                  app.ui.element('/content/itemList').focusByIndex([0]);
                }
              }
            }
          ]
        },
        {
          id: 'content',
          type: PanelManager,
          uiMaster: '/sidebarleft/menu',
          children: [
            {
              id: 'itemList',
              type: List,
              orientation: 'left', // left means a list going down
              loadingTemplate: '<div class="loading"></div>',
              itemTemplate: '<li id="<%=itemHtmlId%>" data-josh-ui-path="<%= path %>" data-josh-grid-id="<%= item.id %>" ' + 
                              'class="josh-List joshover item-<%= item.source %> "' + 
                              '><%= itemInner %></li>',
              itemInnerTemplate:
                '<% if (item.source == "twitter") { %>' +
                  '<div class="tweet"><%= item.title %></div>' +
                '<% } else { %>' +
                  '<div class="preview"><img src="http://placehold.it/200x150" /></div>' +
                  '<div class="textsummary"><h3><%= item.title %></h3>' +
                  '<% var len = Math.min(300, item.content.length); var truncated = item.content.substring(0, len); %>' +
                  '<p><%= truncated %></p></div>' +
                '<% } %>',
              beforeGridExit: function(self, direction) {
                switch (direction) {
                  case 'left' :
                    app.ui.moveTo('focus', '/sidebarleft/menu');
                    break;
                }
              }
            },
            {
              id: 'itemGrid',
              type: List,
              loadingTemplate: '<div class="loading"></div>',
              itemTemplate: '<li id="<%=itemHtmlId%>" data-josh-ui-path="<%= path %>" data-josh-grid-id="<%= item.id %>" ' + 
                              'class="josh-List joshover item-<%= item.source %> "' + 
                              '><%= itemInner %></li>',
              itemInnerTemplate:
                '<% if (item.source == "youtube" || item.source == "flickr" ) { %>' +
                  '<div class="preview"><img src="<%= item.image %>"></div><div class="title"><%= item.title %></div>' +
                '<% } %>',
              beforeGridExit: function(self, direction) {
                // This is a Hack. This should be handled by a Grid Element of the Joshfire framework.

                // CSS impose a grid of 4 element in width
                var widthElements = 4;

                var coords = app.ui.element('/content/itemGrid').grid.currentCoords;

                switch (direction) {
                  case 'down' :
                    var gotoIndex = coords[0] + widthElements;
                    if( gotoIndex <  app.ui.element('/content/itemGrid').data.length ) {
                      app.ui.element('/content/itemGrid').grid.goTo( [gotoIndex, 0] );
                    }
                    break;
                  case 'up' :
                    var gotoIndex = coords[0] - widthElements;
                    if(gotoIndex < 0) {
                      app.ui.moveTo('focus', '/sidebarleft/menu');
                    } else {
                      // the followingline doesn't work well: the grid coordinates are not updated 
                      //app.ui.element('/content/itemList').focusByIndex(gotoIndex);
                      app.ui.element('/content/itemGrid').grid.goTo( [gotoIndex, 0] );
                    }
                  break;
                }
              }
            }
          ]
        },
        {
          id: 'detail',
          type: Panel,
          noMouseAutoFocus: true,
          moveOnFocus: true,
          loadingTemplate: '<div class="loading"></div>',
          autoShow: false,
          children: [
            {
              id: 'back',
              type: Button,
              label: 'Back'
            },
            {
              id: 'text',
              type: Panel,
              uiDataSync: '/detail',
              loadingTemplate: '<div class="loading"></div>',
              innerTemplate:
                '<div class="title"><h1><%= data.title %></h1>' +
                '<p class="author"><%= data.creator || data.user %></p></div>' +
                '<p><%= data.content %></p>',
              onData: function(ui) {
                var thisEl = app.ui.element('/detail/text').htmlEl;
                if (ui.data.source == 'youtube' || ui.data.source == 'twitter') {
                  $(thisEl).hide();
                } else {
                  $(thisEl).show();
                }
              }
            },
            {
              id: 'video',
              type: Panel,
              uiDataSync: '/detail',
              loadingTemplate: '<div class="loading"></div>',
              onData: function(ui) {
                var thisEl = app.ui.element('/detail/video').htmlEl,
                    player = app.ui.element('/detail/video/player.youtube');

                if (ui.data.source == 'youtube') {
                  player.playWithStaticUrl({
                    url: ui.data.url.replace('http://www.youtube.com/watch?v=', ''),
                    width: '480px'
                  });

                  $(thisEl).show();
                } else {
                  $(thisEl).hide();
                }
              },
              children: [
                {
                  id: 'title',
                  type: Panel,
                  uiDataSync: '/detail',                  
                  innerTemplate:
                    '<div class="title"><h1><%= data.title %></h1>' +
                    '<p class="author">By <strong><%= data.creator || data.user %></strong></p></div>'
                },
                {
                  id: 'player.youtube',
                  type: Video,
                  autoShow: true,
                  controls: true,
                  noAutoPlay: false
                }
              ]
            },
            {
              id: 'twitter',
              type: Panel,
              uiDataSync: '/detail',
              loadingTemplate: '<div class="loading"></div>',
              innerTemplate:
                '<div class="tweet"><%= data.text %><p class="date"><%= data.date %></p></div>',
              onData: function(ui) {
                var thisEl = app.ui.element('/detail/twitter').htmlEl;
                if (ui.data.source == 'twitter') {
                  $(thisEl).show();
                } else {
                  $(thisEl).hide();
                }
              }
            }
          ]
        }
      ];
    }

  });

});