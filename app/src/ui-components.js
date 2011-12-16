/**
 * Contain some UI elements that are used in data trees.
 */

Joshfire.define(['joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button', 'joshfire/adapters/ios/uielements/video.youtube'], function(List, Panel, PanelManager, Button, Video) {
	return {
    tplHeader : '<% if(Joshfire.factory.config.app.logo) { %>' + 
                  '<img class="applogo" src="<%= Joshfire.factory.config.app.logo.url %>" alt="<%= Joshfire.factory.config.app.name %>" />' +
                '<% } else { %>' +
                  '<%= Joshfire.factory.config.app.name %>' +
                '<% } %>',

    tplTweetItem :  '<div class="tweet">' +
                  '<% if (item.author) { %>' +
                    '<% if (item.author[0] && item.author[0].image) { %>' +
                      '<img src="<%= item.author[0].image.contentURL %>" alt="" />' +
                    '<% } %>' +
                    '<p class="user"><span class="name"><%= item.author[0].name %></span>' +
                    '<% if (item.author[0]["foaf:nick"]) { %>' +
                      ' <span class="login">@<%= item.author[0]["foaf:nick"] %></span>' +
                    '<% } %>' +
                    '</p>' +
                  '<% } %>' +
                  '<p class="content"><%= item.name %></p>' +
                  '<p class="date"><%= item.datePublished %></p>' +                  
                '</div>',

    tplTweetPage : '<div class="tweet">' +
                    '<div class="tweet-header">' +
                    '<% if (data.author) { %>' +
                      '<% if (data.author[0] && data.author[0].image) { %>' +
                        '<img src="<%= data.author[0].image.contentURL %>" alt="" />' +
                      '<% } %>' +
                      '<p class="username"><%= data.author[0].name %></p>' +
                      '<% if (data.author[0]["foaf:nick"]) { %>' +
                        ' <p class="userlogin">@<%= data.author[0]["foaf:nick"] %></p>' +
                      '<% } %>' +
                    '<% } %>' +
                    '</div>' +
                    '<div class="tweet-content">' +
                      '<p class="content"><%= data.name %></p>' +
                      '<p class="date"><%= data.datePublished %></p>' +                  
                    '</div>' +
                  '</div>',                

    tplEventItem : '<div class="event">' +
                    '<% var d = new Date(item.startDate); %>' + 
                    '<p class="startDate"><%= d.getHours() %>:<%= d.getMinutes() %></p>' +     
                    '<p class="content"><%= item.name %></p>' +                 
                  '</div>',

    tplEventPage : '<div class="event">' +
                    '<% var d = new Date(data.startDate); %>' + 
                    '<div class="coords">' +
                      '<p class="startDate"><%= d.getHours() %>:<%= d.getMinutes() %></p>' + 
                      '<% if (data.location) { %>' + 
                        '<p class="location"><%= data.location.name %></p>' +  
                      '<% } %>' +
                    '</div>' +
                    '<div class="event-content">' +
                      '<h2 class="name"><%= data.name %></h2>' +
                      '<p class="description"><%= data.description %></p>' +
                    '</div>' +
                  '</div>',

    tplItemPreview :  '<% if (item.image) { %>' +
                        '<div class="preview"><img src="<%= item.image.contentURL %>"></div>' +
                      '<% } %>',

    tplItemThumbnail :  '<% if (item.image && item.image.contentURL) { %>' +
                          '<div class="thumbnail" style="background-image:url(\'<%=item.image.contentURL%>\')"></div>' +
                        '<% } %>',
    
    tplDataAuthor:  '<% if (data.author && data.author[0]) { %>' +
                      '<p class="author">By <strong><%= data.author[0].name %></strong></p>' +
                    '<% } %>',

    tplAboutPage: '<div class="aboutpage">' +
                    '<% if(Joshfire.factory.config.app.logo) { %>' + 
                      '<img class="applogo" src="<%= Joshfire.factory.config.app.logo.url %>" alt="<%= Joshfire.factory.config.app.name %>" />' +
                    '<% } %>' +
                    '<h2 class="appname"><%= Joshfire.factory.config.app.name %></h2>' +
                    '<div class="abouthtml"><%= Joshfire.factory.config.template.options.abouthtml %></div>' +
                  '</div>',

    getItemDescriptionTemplate: function (maxLength) {
      return '<% if (item.description) { %>' +
        '<div class="abstract">' +
          '<% if (item.description.length > ' + maxLength + ') {' +
            'print(item.description.substring(0, ' + maxLength + ') + "…");' +
          '} else {' +
            'print(item.description); ' +
          '} %>' +
        '</div>' +
        '<% } %>';
    }

	};
});