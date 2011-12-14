Joshfire.define(['joshfire/class', 'joshfire/tree.ui', 'joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button', 'src/ui-components'], function(Class, UITree, List, Panel, PanelManager, Button, UI) {

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
            UI.uiHeader
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
                            "class='josh-List joshover item-<%= item.source %> mainitemlist " + 
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
                  "<div class='thumbnail' style='background-image:url(\"<%=item.image%>\")'></div>" + 
                '<% } else if (item.source == "twitter") { %>' +
                  '<div class="tweet"><%= item.title %></div>' +
                '<% } else { %>' +
                  '<%= item.title %><span class="list-arrow"></span>' +
                '<% } %>'
            },
            {
              id: 'detail',
              type: Panel,
              loadingTemplate: '<div class="loading"></div>',
              autoShow: false,
              children: [
                {
                  // Article
                  id: 'article',
                  type: Panel,
                  uiDataMaster: '/content/itemList',
                  forceDataPathRefresh: true,
                  loadingTemplate: '<div class="loading"></div>',
                  innerTemplate:
                    '<div class="title"><h1><%= data.title %></h1>' +
                    '<p class="author"><%= data.creator || data.user %></p></div>' +
                    '<p><%= data.content %></p>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/article').htmlEl;
                    if (ui.data.source == 'youtube' || ui.data.source == 'flickr') {
                      $(thisEl).hide();
                    } else {
                      $(thisEl).show();
                    }
                  }
                },
                {
                  // Flickr
                  id: 'image',
                  type: Panel,
                  uiDataMaster: '/content/itemList',
                  forceDataPathRefresh: true,
                  loadingTemplate: '<div class="loading"></div>',
                  innerTemplate: '<img src="<%= data.photo %>" />',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/image').htmlEl;
                    if (ui.data.source =='flickr') {
                      $(thisEl).show();
                    } else {
                      $(thisEl).hide();
                    }
                  }
                },  
                {
                  // Video
                  id: 'video',
                  type: Panel,
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