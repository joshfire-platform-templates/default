/**
 * Contain some UI elements that are used in data trees.
 */

Joshfire.define(['joshfire/uielements/list', 'joshfire/uielements/panel', 'joshfire/uielements/panel.manager', 'joshfire/uielements/button', 'joshfire/adapters/ios/uielements/video.youtube'], function(List, Panel, PanelManager, Button, Video) {
	return {
    uiHeader : {
      id: 'title', // the title or the logo
        type: Panel,
        innerTemplate: '<% if(Joshfire.factory.config.app.logo) { %>' + 
                          '<img class="applogo" src="<%= Joshfire.factory.config.app.logo.url %>" alt="<%= Joshfire.factory.config.app.name %>" />' +
                        '<% } else { %>' +
                          '<h1><%= Joshfire.factory.config.app.name %></h1>' +
                        '<% } %>'
      	}
	};
});
