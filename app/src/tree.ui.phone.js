Joshfire.define(['joshfire/class', 'joshfire/tree.ui', 'joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button'], function(Class, UITree, List, Panel, PanelManager, Button) {

  return Class(UITree, {

    buildTree: function() {

      var app = this.app;

      return [
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
              type: Panel,
              htmlClass: 'abs100',
              innerTemplate: '<%= Joshfire.factory.config.app.name %>'
            }
          ]
        },
        {
          id: 'content',
          type: PanelManager,
          uiMaster: '/footer',
          children: [
            {
              id: 'itemList',
              scroller: false, // do not use iScroll it's crappy crap (and doesn't work with a grid made of floats)
              type: List,
              htmlClass: 'abs100',
              loadingTemplate: '<div class="loading"></div>',
              itemTemplate: "<li id='<%=itemHtmlId%>' " + 
                            "data-josh-ui-path='<%= path %>' data-josh-grid-id='<%= item.id %>'" + 
                            "class='josh-List joshover item-<%= item.source %> " + 
                            // grid view
                            "<% if(item.source == 'flickr') { %>" +
                              "grid" +
                            "<% } else { %>" +
                            // list view
                              "list" +
                            "<% } %>" +
                            "' >" +
                            "<%= itemInner %>" + 
                            "</li>",
              itemInnerTemplate:
                '<% if (item.source == "youtube") { %>' +
                  '<div class="title"><%= item.title %></div><div class="abstract"><% if(item.abstract && item.abstract.length > 70) { %><%= item.abstract.substring(0, 70) %>…<% } else { %><%= item.abstract %><% } %></div><div class="preview"><img src="<%= item.image %>"></div><span class="list-arrow"></span>' +
                '<% } else if (item.source == "flickr") { %>' +
                  '<div class="preview"><img src="<%= item.image %>"></div>' + 
                '<% } else if (item.source == "twitter") { %>' +
                  '<div class="tweet"><%= item.title %></div>' +
                '<% } else { %>' +
                  '<%= item.title %><span class="list-arrow"></span>' +
                '<% } %>'
            },
            {
              id: 'detail',
              type: Panel,
              uiDataMaster: '/content/itemList',
              loadingTemplate: '<div class="loading"></div>',
              autoShow: false,
              children: [
                {
                  id: 'text',
                  type: Panel,
                  uiDataMaster: '/content/itemList',
                  forceDataPathRefresh: true,
                  loadingTemplate: '<div class="loading"></div>',
                  innerTemplate:
                    '<div class="title"><h1><%= data.title %></h1>' +
                    '<p class="author"><%= data.creator || data.user %></p></div>' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/text').htmlEl;
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
                  uiDataMaster: '/content/itemList',
                  forceDataPathRefresh: true,
                  loadingTemplate: '<div class="loading"></div>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/video').htmlEl,
                        player = app.ui.element('/content/detail/video/player.youtube');

                    if (ui.data.source == 'youtube') {
                      player.playWithStaticUrl({
                        url: ui.data.url.replace('http://www.youtube.com/watch?v=', ''),
                        width: '100%'
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
                      uiDataMaster: '/content/itemList',
                      innerTemplate:
                        '<div class="title"><h1><%= data.title %></h1>' +
                        '<p class="author">By <strong><%= data.creator || data.user %></strong></p></div>'
                    },
                    {
                      id: 'player.youtube',
                      type: 'video.youtube',
                      autoShow: true,
                      controls: true,
                      noAutoPlay: false
                    }
                  ]
                },
                {
                  id: 'twitter',
                  type: Panel,
                  uiDataMaster: '/content/itemList',
                  forceDataPathRefresh: true,
                  loadingTemplate: '<div class="loading"></div>',
                  innerTemplate:
                    '<div class="tweet"><%= data.title %><p class="date"><%= data.date %></p></div>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/twitter').htmlEl;
                    if (ui.data.source == 'twitter') {
                      $(thisEl).show();
                    } else {
                      $(thisEl).hide();
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'footer',
          type: List,
          dataPath: '/datasourcelist/',
          itemInnerTemplate: '<div class="picto item-<%= item.config.col %>"></div><div class="name"><%= item.name %></div>',
          onData: function() {} // trigger data, WTF?
        }
      ];
    }

  });

});