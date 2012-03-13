var build = {
    baseUrl: '../',
    name: 'default',
    dir: '../export-optimized/',
    modules: [
      {
          name: 'desktop',
          adapter: 'ios',
          js: {
              'include': [
                'app.desktop'
              ]
          }
      },
      {
          name: 'phone',
          adapter: 'ios',
          js: {
              'include': [
                'app.phone'
              ]
          }
      },
      {
          name: 'tablet',
          adapter: 'ios',
          js: {
              'include': [
                'app.tablet'
              ]
          }
      },
      {
          name: 'tv',
          adapter: 'philips',
          js: {
              'include': [
                'app.tv'
              ]
          }
      }
    ]
};