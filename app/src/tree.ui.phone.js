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
              //scroller: false, // do not use iScroll it's crappy crap (and doesn't work with a grid made of floats)
              type: List,
              htmlClass: 'abs100',
              loadingTemplate: '<div class="loading"></div>',
              itemTemplate: "<li id='<%=itemHtmlId%>' " + 
                            "data-josh-ui-path='<%= path %>' data-josh-grid-id='<%= item.id %>'" + 
                            "class='josh-List joshover item-<%= item.source %> " + 
                            // grid view
                            "<% if (item.itemType === 'ImageObject') { %>" +
                              "grid" +
                            "<% } else { %>" +
                            // list view
                              "list" +
                            "<% } %>" +
                            "' >" +
                            "<%= itemInner %>" + 
                            "</li>",
              itemInnerTemplate:
                '<% if (item.itemType === "VideoObject") { %>' +
                  '<div class="title"><%= item.name %></div>' +
                  '<div class="abstract"><% if (item.description && item.description.length > 70) { %><%= item.description.substring(0, 70) %>…<% } else { %><%= item.description %><% } %></div>' +
                  '<% if (item.thumbnail && item.thumbnail[0]) { %><div class="preview"><img src="<%= item.thumbnail[0].contentURL %>"></div><% } %>' +
                  '<span class="list-arrow"></span>' +
                '<% } else if ((item.itemType === "ImageObject") && item.thumbnail && item.thumbnail[0]) { %>' +
                  "<div class='thumbnail' style='background-image:url(\"<%=item.thumbnail[0].contentURL%>\")'></div>" + 
                '<% } else if (item.itemType === "Article/Status") { %>' +
                  '<div class="tweet"><%= item.name %></div>' +
                '<% } else { %>' +
                  '<%= item.name %><span class="list-arrow"></span>' +
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
                    '<div class="title"><h1><%= data.name %></h1>' +
                    '<% if (data.author && data.author[0]) { %><p class="author">By <strong><%= data.author[0].name %></strong></p><% } %>' +
                    '</div>' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/text').htmlEl;
                    if (ui.data.itemType === 'VideoObject' || ui.data.itemType === 'Article/Status') {
                      $(thisEl).hide();
                    }
                    else {
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

                    if (ui.data.itemType === 'VideoObject') {
                      player.playWithStaticUrl({
                        url: ui.data.contentURL.replace('http://www.youtube.com/watch?v=', ''),
                        width: '100%'
                      });
                      $(thisEl).show();
                    }
                    else {
                      $(thisEl).hide();
                    }
                  },
                  children: [
                    {
                      id: 'title',
                      type: Panel,
                      uiDataMaster: '/content/itemList',
                      innerTemplate:
                        '<div class="title"><h1><%= data.name %></h1>' +
                        '<% if (data.author && data.autor[0]) { %><p class="author">By <strong><%= data.author[0].name %></strong></p><% } %>' +
                        '</div>'
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
                    '<div class="tweet"><%= data.name %>' +
                    '<% if (data.datePublished) { %><p class="date"><%= data.datePublished %></p><% } %>' +
                    '</div>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/twitter').htmlEl;
                    if (ui.data.itemType === 'Article/Status') {
                      $(thisEl).show();
                    }
                    else {
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