Joshfire.define(['joshfire/class', 'joshfire/tree.ui', 'joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button'], function(Class, UITree, List, Panel, PanelManager, Button) {

  return Class(UITree, {

    buildTree: function() {

      var app = this.app;

      app.currentDatasource = false;

      return [
        {
          id: 'sidebarleft',
          type: Panel,
          children: [
            {
              id: 'title',
              type: 'Panel',
              htmlClass: 'header',
              content: '{Logo}'
            },
            {
              id: 'menu',
              type: List,
              dataPath: '/datasourcelist/',
              itemInnerTemplate: '<div class="picto"></div><div class="name"><%= item.id %></div>',
              onData: function() {} // trigger data, WTF?
            }
          ]
        },
        {
          id: 'sidebarright',
          type: Panel,
          children: [
            {
              id: 'header',
              type: Panel,
              htmlClass: 'header',
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
                  content: '{Logo}'
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
                  loadingTemplate: '<div class="loading"></div>',
                  itemTemplate: "<li id='<%=itemHtmlId%>' data-josh-ui-path='<%= path %>' data-josh-grid-id='<%= item.id %>' class='josh-List joshover item-<%= item.source %>'><%= itemInner %></li>",
                  itemInnerTemplate:
                    '<% if (item.source == "youtube") { %>' +
                     '<div class="title"><%= item.title %></div><div class="abstract"><% if(item.abstract.length > 70) { %><%= item.abstract.substring(0, 70) %>…<% } else { %><%= item.abstract %><% } %></div><div class="preview"><img src="<%= item.image %>"></div><span class="list-arrow"></span>' +
                    '<% } else { %>' +
                     '<%= item.title %><span class="list-arrow"></span>' +
                    '<% } %>'
                },
                {
                  id: 'detail',
                  type: Panel,
                  uiDataMaster: '/sidebarright/content/itemList',
                  loadingTemplate: '<div class="loadin">Loading details</div>',
                  autoShow: false,
                  children: [
                    {
                      id: 'text',
                      type: Panel,
                      uiDataMaster: '/sidebarright/content/itemList',
                      forceDataPathRefresh: true,
                      loadingTemplate: '<div class="loadin">Loading text</div>',
                      innerTemplate:
                        '<div class="title"><h1><%= data.title %></h1>' +
                        '<p class="author"><%= data.creator || data.user %></p></div>' +
                        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
                      onData: function(ui) {
                        var thisEl = app.ui.element('/sidebarright/content/detail/text').htmlEl;
                        if (ui.data.source != 'youtube') {
                          $(thisEl).show();
                        } else {
                          $(thisEl).hide();
                        }
                      }
                    },
                    {
                      id: 'video',
                      type: Panel,
                      uiDataMaster: '/sidebarright/content/itemList',
                      forceDataPathRefresh: true,
                      loadingTemplate: '<div class="loadin">Loading video</div>',
                      onData: function(ui) {
                        var thisEl = app.ui.element('/sidebarright/content/detail/video').htmlEl,
                            player = app.ui.element('/sidebarright/content/detail/video/player.youtube');

                        if (ui.data.source == 'youtube') {
                          player.playWithStaticUrl({
                            url: ui.data.url.replace('http://www.youtube.com/watch?v=', ''),
                            width: '480px',
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
                          uiDataMaster: '/sidebarright/content/itemList',
                          innerTemplate:
                            '<div class="title"><h1><%= data.title %></h1>' +
                            '<p class="author">By <strong><%= data.creator || data.user %></strong></p></div>'
                        },
                        {
                          id: 'player.youtube',
                          type: 'video.youtube',
                          autoShow: true,
                          controls: true,
                          noAutoPlay: false,
                          // uiDataMaster: '/content/itemList'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
    }

  });

});