requirejs.config({
    baseUrl: 'js/',
    paths: {
        'backbone': '../assets/backbone/backbone',
        'jquery': '../assets/jquery/dist/jquery',
        'json2': '../assets/json2/json2',
        'marionette': '../assets/backbone.marionette/lib/backbone.marionette',
        'underscore': '../assets/lodash/dist/lodash.underscore',
        'jquery-ui': '../assets/jquery-ui/jquery-ui'
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
        'jquery-ui': {
            deps: ['jquery']
        }
    }

})

require(['app'], function(ContactManager){
    ContactManager.start();
})