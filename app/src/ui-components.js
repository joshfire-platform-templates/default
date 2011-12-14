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

    tplTweetItem :  '<div class="tweet">'+
                  '<img src="<%= item.user.avatar %>" />'+
                  '<p class="user"><span class="name"><%= item.user.name %></span><span class="login">@<%= item.user.login %></span></p>'+
                  '<p class="content"><%= item.title %></p>' +
                '</div>'

	};
});
