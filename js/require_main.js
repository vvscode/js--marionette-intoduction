requirejs.config({
    baseUrl: '',
    paths: {
        backbone: 'assets/backbone/backbone',
        jquery: 'assets/jquery/dist/jquery',
        json2: 'assets/json2/json2',
        marionette: 'assets/backbone.marionette/lib/backbone.marionette',
        underscore: 'assets/lodash/dist/lodash.underscore',

    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        }
    }

})

require(['marionette'], function(bbm){
    alert($.fn.jquery);
})