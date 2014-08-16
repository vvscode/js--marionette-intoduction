define([
    'marionette',
    'apps/config/marionette/regions/dialog'
], function (Marionette) {
    var ContactManager = new Marionette.Application;

    ContactManager.addRegions({
        mainRegion: "#main-region",
        dialogRegion: Marionette.Region.Dialog.extend({
            el: "#dialog-region"
        }),
        headerRegion: '#header-region'
    });

    ContactManager.getCurrentRoute = function () {
        return Backbone.history.fragment;
    }

    ContactManager.navigate = function (route, options) {
        options = options || {};
        Backbone.history.navigate(route, options);
    }

    ContactManager.on('initialize:after', function () {
        if (Backbone.history) {
            require(['apps/contacts/contacts_app', 'apps/about/about_app'], function(){
                Backbone.history.start();

                if (ContactManager.getCurrentRoute() === "") {
                    ContactManager.trigger('contacts:list');
                }

            });
        }
    });

    return ContactManager;
});

