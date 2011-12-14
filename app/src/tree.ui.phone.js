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
                    '<div class="title"><h1><%= data.name %></h1>' +
                    '<% if (data.author && data.author[0]) { %><p class="author">By <strong><%= data.author[0].name %></strong></p><% } %>' +
                    '</div>' +
                    '<% if (data.articleBody) { %><p><%= data.articleBody %></p><% } %>',
                  onData: function(ui) {
                    var thisEl = app.ui.element('/content/detail/article').htmlEl;
                    if (ui.data.itemType === 'VideoObject' || ui.data.itemType === 'ImageObject') {
                      $(thisEl).hide();
                    }
                    else {
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