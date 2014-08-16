requirejs.config({
    baseUrl: 'js/',
    paths: {
        'backbone': '../assets/backbone/backbone',
        'jquery': '../assets/jquery/dist/jquery',
        'json2': '../assets/json2/json2',
        'marionette': '../assets/backbone.marionette/lib/backbone.marionette',
        'underscore': '../assets/lodash/dist/lodash.underscore',
        'jquery-ui': '../assets/jquery-ui/jquery-ui',
        'localstorage': '../assets/backbone.localStorage/backbone.localStorage',
        'backbone.syphon': '../assets/backbone.syphon/lib/backbone.syphon',
        'tpl': '../assets/requirejs-underscore-tpl/underscore-tpl',
        'spin': '../assets/spin.js/spin',
        'spin.jquery': '../assets/spin.js/jquery.spin',
        'text': '../assets/requirejs-text/text',
        'backbone.picky': '../assets/backbone.picky/src/backbone.picky'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'jquery-ui': ['jquery'],
        'localstorage': ['backbone'],
        'spin.jquery': ['spin'],
        'tpl': ['text'],
        'backbone.syphon': ['backbone'],
        'backbone.picky': ['backbone']
    }

})

require(['app', 'apps/header/header_app'], function (ContactManager) {
    ContactManager.start();
})